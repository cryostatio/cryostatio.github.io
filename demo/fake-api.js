import {
  createServer,
  Model,
  Response,
} from "https://cdn.jsdelivr.net/npm/miragejs@0.1.47/+esm";
import { Server } from "https://cdn.jsdelivr.net/npm/mock-socket@9.2.1/+esm";

var wsUrl =
  (window.location.protocol === "https:" ? "wss" : "ws") +
  "://cryostat-demo.local:8181/fake";
// window.WebSocket = WebSocket;
var wsServer = new Server(wsUrl);
wsServer.on("connection", (socket) => {
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
      (_, request) =>
        new Response(
          400,
          {},
          `${JSON.stringify(request.url)} unsupported in demo`
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
    this.get("/api/v1/recordings", () => []);
    this.get("/api/beta/fs/recordings", () => []);

    this.post("/api/v1/targets/:targetId/recordings", (schema, request) => {
      let attrs = request.requestBody;
      console.log(attrs);
      return schema.recordings.create({
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

    this.get("/api/v2/rules", () => ({ data: { result: [] } }));
    this.get("/api/v2.2/credentials", () => ({ data: { result: [] } }));

    // TODO
    this.post(
      "/api/v2.2/graphql",
      (_, request) =>
        new Response(
          400,
          {},
          `${JSON.stringify(request.url)} currently unsupported in demo`
        )
    );
  },
});
