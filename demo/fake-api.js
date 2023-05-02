import {
  createServer,
  Model,
  Response,
} from "https://cdn.jsdelivr.net/npm/miragejs@0.1.47/+esm";
import { Server } from "https://cdn.jsdelivr.net/npm/mock-socket@9.2.1/+esm";

var wsUrl =
  (window.location.protocol === "https:" ? "wss" : "ws") +
  "://cryostat-demo.local:8181/fake";
var wsServer = new Server(wsUrl);
var websocket;
wsServer.on("connection", (socket) => {
  websocket = socket;
  socket.on("message", (_) => {
    socket.send(
      JSON.stringify({
        meta: {
          category: "WsClientActivity",
          type: {
            type: "application",
            subtype: "json",
          },
          serverTime: +Date.now(),
        },
        message: {
          localhost: "connected",
        },
      })
    );
  });
});

createServer({
  models: {
    target: Model,
    recording: Model,
    archive: Model,
    rule: Model,
  },

  seeds(server) {
    server.create("target", {
      alias: "Fake Target",
      connectUrl: "http://fake-target.local:1234",
    });
  },

  routes() {
    this.get("/health", () => ({
      cryostatVersion: "v2.3.0-live-demo",
      dashboardAvailable: false,
      dashboardConfigured: false,
      datasourceAvailable: false,
      datasourceConfigured: false,
      reportsAvailable: true,
      reportsConfigured: false,
    }));

    this.get("/api/v1/notifications_url", () => ({
      notificationsUrl: wsUrl,
    }));

    this.post("/api/v2.1/auth", () => {
      return new Response(
        200,
        { "X-WWW-Authenticate": "None" },
        {
          meta: {
            status: "OK",
          },
          data: {
            result: {
              username: "demo",
            },
          },
        }
      );
    });
    this.post(
      "/api/v2.1/auth/token",
      () =>
        new Response(
          400,
          {},
          'Resource downloads are not supported in this demo'
        )
    );

    this.get("/api/v1/targets", (schema) => schema.targets.all().models);
    this.get("/api/v2.1/discovery", (schema) => ({
      meta: {
        status: "OK",
        type: "application/json",
      },
      data: {
        result: {
          name: "Universe",
          nodeType: "Universe",
          labels: {},
          children: [
            {
              name: "Demo realm",
              nodeType: "Realm",
              labels: {},
              children: [
                {
                  name: "Fake Target",
                  nodeType: "JVM",
                  labels: [],
                  target: {
                    ...schema.targets.all()[0],
                    jvmId: "abcd1234",
                    annotations: {
                      platform: { "io.cryostat.demo": "this-is-not-real" },
                      cryostat: { hello: "world" },
                    },
                    labels: { "app.selector": "cryostat-demo" },
                  },
                },
              ],
            },
          ],
        },
      },
    }));
    this.get("/api/v1/recordings", (schema) => schema.archives.all().models);
    this.get("/api/beta/fs/recordings", () => []);
    this.delete(
      "/api/beta/recordings/:targetId/:recordingName",
      (schema, request) => {
        var recordingName = request.params.recordingName;
        var recording = schema.archives.where({ name: recordingName });
        schema.archives.findBy({ name: recordingName }).destroy();
        var msg = {
          meta: {
            category: "ArchivedRecordingDeleted",
            type: { type: "application", subType: "json" },
            serverTime: +Date.now(),
          },
          message: {
            recording: {
              ...recording.models[0].attrs,
            },
            target: request.params.targetId,
          },
        };
        websocket.send(JSON.stringify(msg));
        return new Response(200);
      }
    );

    this.post("/api/v1/targets/:targetId/recordings", (schema, request) => {
      let attrs = request.requestBody;
      return schema.recordings.create({
        id: Math.floor(Math.random() * 1000),
        downloadUrl: "",
        reportUrl: "",
        name: attrs.get("recordingName"),
        state: "RUNNING",
        startTime: +Date.now(),
        duration: attrs.get("duration") * 1000 || 0,
        continuous: attrs.get("duration") == 0,
        toDisk: attrs.get("toDisk") || false,
        maxSize: attrs.get("maxSize") || 0,
        maxAge: attrs.get("maxAge") || 0,
        metadata: { labels: { imaginary: true } },
      });
    });
    this.get(
      "/api/v1/targets/:targetId/recordings",
      (schema) => schema.recordings.all().models
    );
    this.delete(
      "/api/v1/targets/:targetId/recordings/:recordingName",
      (schema, request) => {
        var recordingName = request.params.recordingName;
        var recording = schema.recordings.where({ name: recordingName });
        schema.recordings.findBy({ name: recordingName }).destroy();
        var msg = {
          meta: {
            category: "ActiveRecordingDeleted",
            type: { type: "application", subType: "json" },
            serverTime: +Date.now(),
          },
          message: {
            recording: {
              ...recording.models[0].attrs,
            },
            target: request.params.targetId,
          },
        };
        websocket.send(JSON.stringify(msg));
        return new Response(200);
      }
    );
    this.patch(
      "/api/v1/targets/:targetId/recordings/:recordingName",
      (schema, request) => {
        var body = request.requestBody;
        var recordingName = request.params.recordingName;
        var recording = schema.recordings.where({ name: recordingName });
        switch (body) {
          case "STOP":
            recording.update({ state: "STOPPED" });
            var msg = {
              meta: {
                category: "ActiveRecordingStopped",
                type: { type: "application", subType: "json" },
                serverTime: +Date.now(),
              },
              message: {
                recording: {
                  ...recording.models[0].attrs,
                },
                target: request.params.targetId,
              },
            };
            websocket.send(JSON.stringify(msg));
            break;
          case "SAVE":
            var msg = {
              meta: {
                category: "ActiveRecordingSaved",
                type: { type: "application", subType: "json" },
                serverTime: +Date.now(),
              },
              message: {
                recording: {
                  ...recording.models[0].attrs,
                  size: Math.ceil(Math.random() * 1000000),
                  archivedTime: +Date.now(),
                },
                target: request.params.targetId,
              },
            };
            websocket.send(JSON.stringify(msg));
            schema.archives.create(recording.models[0].attrs);
            break;
        }
        return new Response(200);
      }
    );
    this.get("/api/v1/targets/:targetId/recordingOptions", () => []);
    this.get("/api/v1/targets/:targetId/events", () => [
      {
        category: ["GC", "Java Virtual Machine"],
        name: "GC Heap Configuration",
        typeId: "jdk.GCHeapConfiguration",
        description: "The configuration of the garbage collected heap",
      },
    ]);
    this.get("/api/v1/targets/:targetId/templates", () => [
      {
        name: "Demo Template",
        provider: "Demo",
        type: "TARGET",
        description: "This is not a real event template, but it is here!",
      },
    ]);
    this.get("/api/v2/probes", () => []);

    this.post("/api/v2/rules", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      return {
        data: {
          result: schema.rules.create(attrs),
        },
      };
    });
    this.get("/api/v2/rules", (schema) => ({
      data: { result: schema.rules.all().models },
    }));
    this.get("/api/v2.2/credentials", () => ({ data: { result: [] } }));

    // TODO
    this.post("/api/v2.2/graphql", (schema, request) => {
      var query = JSON.parse(request.requestBody).query.trim();
      var begin = query.substring(0, query.indexOf("{"));
      var name = "unknown";
      for (var n of begin.split(" ")) {
        if (n == "{") {
          break;
        }
        if (!n || n == "query") {
          continue;
        }
        name = n.substring(0, n.indexOf("("));
        break;
      }
      if (name === "unknown" || !name) {
        return new Response(
          400,
          {},
          `${JSON.stringify(
            request.url
          )} (query: '${name}') currently unsupported in demo`
        );
      }
      let data = {};
      switch (name) {
        case "ArchivedRecordingsForTarget":
        case "UploadedRecordings":
          data = {
            archivedRecordings: {
              data: schema.archives.all().models,
            },
          };
          break;
      }
      console.log(`Handling ${name}`);
      return { data };
    });
  },
});
