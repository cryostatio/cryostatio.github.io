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
    this.timing = 0;

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
          "Resource downloads are not supported in this demo"
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
        reportUrl: `/api/beta/reports/${encodeURIComponent(
          request.params.targetId
        )}/${encodeURIComponent(attrs.get("recordingName"))}`,
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
    this.get(
      "/api/beta/reports/:targetId/:recordingName",
      () => {
        return new Response(
          200,
          {},
          {
            Demo: {
              score: 100,
              name: "Fake Demo Result",
              topic: "demo",
              description:
                "Remember, all of this data is static, fake, and entirely within your browser.",
            },
            VMOperations: {
              score: 0.5943414499999999,
              name: "VMOperation Peak Duration",
              topic: "vm_operations",
              description:
                "Summary:\nNo excessively long VM operations were found in this recording (the longest was 23.774 ms).",
            },
            PasswordsInSystemProperties: {
              score: 75.0,
              name: "Passwords in System Properties",
              topic: "system_properties",
              description:
                "Summary:\nThe system properties in the recording may contain passwords.\n\nExplanation:\nThe following suspicious system properties were found in this recording: javax.net.ssl.keyStorePassword,javax.net.ssl.trustStorePassword,com.sun.management.jmxremote.password.file. The following regular expression was used to exclude strings from this rule: \u0027\u0027(passworld|passwise)\u0027\u0027.\n\nSolution:\nIf you wish to keep having passwords in your system properties, but want to be able to share recordings without also sharing the passwords, please disable the \u0027\u0027Initial System Property\u0027\u0027 event.",
            },
            Options: {
              score: 0.0,
              name: "Command Line Options Check",
              topic: "jvm_information",
              description:
                "Summary:\nNo undocumented, deprecated or non-recommended option flags were detected.",
            },
            PasswordsInEnvironment: {
              score: 75.0,
              name: "Passwords in Environment Variables",
              topic: "environment_variables",
              description:
                "Summary:\nThe environment variables in the recording may contain passwords.\n\nExplanation:\nThe following suspicious environment variables were found in this recording: CRYOSTAT_JDBC_PASSWORD, CRYOSTAT_JMX_CREDENTIALS_DB_PASSWORD. The following regular expression was used to exclude strings from this rule: \u0027\u0027(passworld|passwise)\u0027\u0027.\n\nSolution:\nIf you wish to keep having passwords in your environment variables, but want to be able to share recordings without also sharing the passwords, please disable the \u0027\u0027Initial Environment Variable\u0027\u0027 event.",
            },
            MethodProfiling: {
              score: 0.6705776661956153,
              name: "Method Profiling",
              topic: "method_profiling",
              description:
                "Summary:\nNo methods where optimization would be particularly efficient could be detected.",
            },
            ManyRunningProcesses: {
              score: 0.20309488837692125,
              name: "Competing Processes",
              topic: "processes",
              description:
                "Summary:\n1 processes were running while this Flight Recording was made.\n\nExplanation:\nAt 5/5/23, 5:17:27.180 PM, a total of 1 other processes were running on the host machine that this Flight Recording was made on.\n\nSolution:\nIf this is a server environment, it may be good to only run other critical processes on that machine.",
            },
            StackdepthSetting: {
              score: 25.0,
              name: "Stackdepth Setting",
              topic: "jvm_information",
              description:
                "Summary:\nSome stack traces were truncated in this recording.\n\nExplanation:\nThe Flight Recorder is configured with a maximum captured stack depth of 64. 3.11 % of all traces were larger than this option, and were therefore truncated. If more detailed traces are required, increase the \u0027\u0027-XX:FlightRecorderOptions\u003dstackdepth\u003d\u003cvalue\u003e\u0027\u0027 value.\nEvents of the following types have truncated stack traces: org.openjdk.jmc.flightrecorder.rules.jdk.general.StackDepthSettingRule$StackDepthTruncationData@21e159e2,org.openjdk.jmc.flightrecorder.rules.jdk.general.StackDepthSettingRule$StackDepthTruncationData@174930bc,org.openjdk.jmc.flightrecorder.rules.jdk.general.StackDepthSettingRule$StackDepthTruncationData@4f5d6223",
            },
            PasswordsInArguments: {
              score: 0.0,
              name: "Passwords in Java Arguments",
              topic: "jvm_information",
              description:
                "Summary:\nThe recording does not seem to contain passwords in the application arguments.",
            },
          }
        );
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
        case "ArchivedRecordingsForAutomatedAnalysis":
          data = {
            archivedRecordings: {
              data: schema.archives.all().models,
            },
          };
          break;
        case "ActiveRecordingsForAutomatedAnalysis":
          data = {
            targetNodes: [
              {
                recordings: {
                  active: {
                    data: schema.recordings.all().models,
                  },
                },
              },
            ],
          };
          break;
        case "MBeanMXMetricsForTarget":
          data = {
            targetNodes: [
              {
                mbeanMetrics: {
                  thread: {
                    threadCount: Math.ceil(Math.random() * 5),
                    daemonThreadCount: Math.ceil(Math.random() * 5),
                  },
                  os: {
                    arch: "x86_64",
                    availableProcessors: Math.ceil(Math.random() * 8),
                    version: "10.0.1",
                    systemCpuLoad: Math.random(),
                    systemLoadAverage: Math.random(),
                    processCpuLoad: Math.random(),
                    totalPhysicalMemorySize: Math.ceil(Math.random() * 64),
                    freePhysicalMemorySize: Math.ceil(Math.random() * 64),
                  },
                  memory: {
                    heapMemoryUsage: {
                      init: Math.ceil(Math.random() * 64),
                      used: Math.ceil(Math.random() * 64),
                      committed: Math.ceil(Math.random() * 64),
                      max: Math.ceil(Math.random() * 64),
                    },
                    nonHeapMemoryUsage: {
                      init: Math.ceil(Math.random() * 64),
                      used: Math.ceil(Math.random() * 64),
                      committed: Math.ceil(Math.random() * 64),
                      max: Math.ceil(Math.random() * 64),
                    },
                    heapMemoryUsagePercent: Math.random(),
                  },
                  runtime: {
                    bootClassPath: "/path/to/boot/classpath",
                    classPath: "/path/to/classpath",
                    inputArguments: ["-Xmx1g", "-Djava.security.policy=..."],
                    libraryPath: "/path/to/library/path",
                    managementSpecVersion: "1.0",
                    name: "Java Virtual Machine",
                    specName: "Java Virtual Machine Specification",
                    specVendor: "Oracle Corporation",
                    startTime: Date.now(),
                    // systemProperties: {...}
                    uptime: Date.now(),
                    vmName: "Java HotSpot(TM) 64-Bit Server VM",
                    vmVendor: "Oracle Corporation",
                    vmVersion: "25.131-b11",
                    bootClassPathSupported: true,
                  },
                },
              },
            ],
          };
          break;
      }
      return { data };
    });
  },
});
