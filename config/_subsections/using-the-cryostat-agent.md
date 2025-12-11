## [Using the Cryostat Agent](#using-the-cryostat-agent)

The **Cryostat Agent** is an optional component of **Cryostat**, implemented as a **Java Instrumentation Agent**, which acts as a plugin for applications running on the **JVM**. Prior to the **Agent**, **Cryostat** always extracted data from the **JVM** by initiating a connection over **JMX**. It then fetched the **JFR** data from an **MBean** and pulled it over the network back toward the **Cryostat** server to make it accessible to end users.

The **Agent** works differently. It is responsible for fetching data from the **JVM** and sending it back to **Cryostat** over `HTTP`. The **Agent** works by looking for **MBean** and **JFR** data within itself and the application it is plugged into. It is also able to communicate back to **Cryostat** about the application instance the **Cryostat Agent** is attached to and how to reach it. The **Cryostat Agent** also pushes its own Java Flight Recorder **(JFR)** data back to **Cryostat** by initiating network connections with **Cryostat**, which may then analyze and save the data to make it accessible to end users.

The **Agent** may also be configured, using the property `cryostat.agent.api.writes-enabled` or the corresponding environment variable `CRYOSTAT_AGENT_API_WRITES_ENABLED`, to allow bi-directional read-write access over `HTTP`. This enables dynamic *Start/Stop/Delete* of `Flight Recordings` as well as on-demand **JFR** pulls much like what **Cryostat** does over **JMX**.

The programming interfaces for **Cryostat** and its **Agent** are designed to implement **Cryostat's** specific feature set, rather than being generalized and flexible like **JMX**. The benefit of this is that the security considerations are easier to understand and model, but choosing to use the **Cryostat Agent** over **JMX** may also forego the ability to interoperate with other **JMX** tooling such as `JDK Mission Control`, `visualvm`, `jconsole`, `hawtio`, etc.

<ol>
    <li>The <b>Cryostat Agent</b> retrieves a wide range of information from those <b>Cryostat</b> applications such as <code>memory usage</code>, <code>CPU utilization</code>, etc. </li>
    <li>The <b>Cryostat</b> analyzes these collected data to identify problems that might be affecting the application’s performance.</li>
    <li>The <b>Agent</b> is a third-party <b>Java Instrumentation Agent</b> for developers which can be installed on the target <b>JVM</b> program through the command-line arguments or directly attaching to the running <b>JVM</b> instance.</li>
    <li>The <b>Agent</b> is foreign code for developers to audit and inspect before including it in their application builds. It is a small amount of code to inspect and likely easier to trust than <b>JMX</b>.</li>
    <li>Unlike <b>JMX</b>, the <b>JVM</b> doesn’t come with the <b>Agent</b> included, so developers are required to add the <b>Cryostat Agent</b> to their application builds, then rebuild and deploy the application.</li>
    <li>Once the <b>Agent</b> has been installed or attached to the running <b>JVM</b> instance, it can begin collecting data and sending it to <b>Cryostat</b> for analysis. If enabled, the <b>Cryostat</b> server that the <b>Cryostat Agent</b> is registered with may also begin to send remote management requests to dynamically <i>Start</i>, <i>Stop</i>, or <i>Delete</i> <code>Flight Recordings</code> as well as to retrieve <b>JFR</b> and <b>MBean</b> data.</li>
</ol>

More details about the configuration options for the **Cryostat Agent** [are available here](https://github.com/cryostatio/cryostat-agent/blob/{{site.data.versions.cryostat.release-branch}}/README.md#configuration).

### [Advanced Agent Configuration](#advanced-agent-configuration)

#### [Manually Installing the Cryostat Agent](#manually-installing-the-cryostat-agent)

If you are:
- not using the **Cryostat Operator**
- unable to deploy an **Agent** to your application
- requiring **JMX** connections only
- requiring no-downtime instrumentation of **Agents**

then the [Getting Started](/get-started/#using-the-cryostat-agent) automatic **Agent** configuration may not be
suitable for your use case. Below are descriptions of how to manually attach the **Cryostat Agent** to your
application.

##### [Dynamically Attaching the Cryostat Agent](#dynamically-attaching-the-cryostat-agent)

Starting with **Cryostat** 3.0 and **Cryostat Agent** 0.4 it is possible to attach the **Cryostat Agent** to your application while the
application is running, with no rebuild, redeployment, or restart. To do this, the **Agent JAR** must still be available in your application's
filesystem (see [above](#statically-attaching-the-cryostat-agent) for details on how and where to acquire it), and you must be able to execute
a new Java process in the same space as the application.

Let's make this concrete with an example. We will assume you are running your application in **Kubernetes** and that you have manually downloaded
the **Cryostat Agent JAR** to your workstation.

```bash
$ kubectl cp \
    /path/to/cryostat-agent-shaded.jar \
    -n my-namespace \
    mypod:/tmp/cryostat/cryostat-agent-shaded.jar
$ kubectl exec \
    -n my-namespace \
    mypod -c mycontainer \
    -i -t -- \
      java -jar /tmp/cryostat/cryostat-agent-shaded.jar \
      -Dcryostat.agent.baseuri=http://cryostat:8181 \
      -Dcryostat.agent.authorization.type="kubernetes" \
      -Dcryostat.agent.callback=http://${POD_IP}:9977 \
      -Dcryostat.agent.api.writes-enabled=true
```

1. Replace `/path/to/cryostat-agent-shaded.jar` with the real path to the **JAR** on your workstation
2. Replace `my-namespace` with the namespace your application is deployed in
3. Replace `mypod` with the name of your application's Pod
4. Replace `mycontainer` with the name of your application's container within its Pod (or remove this if it is the only container in the Pod)
5. Replace `http://cryostat:8181` with the correct internal Service URL for your **Cryostat** server within the same **Kubernetes** cluster
6. Replace `${POD_IP}` with the application Pod's IP Address as found in its Status using `kubectl get -o yaml`

By following this procedure you will copy the **Cryostat Agent JAR** into the application's filesystem (`kubectl cp`), then launch the
**Agent** as a Java process (`kubectl exec`). When the **Agent** is launched in this manner it will look for other Java processes. If it
finds exactly one other Java process then it will use that process' Attach API and ask the JVM to load the Agent's **JAR**, passing its
`-D` arguments over and setting them as system properties in the application JVM after the Attach API loads the **JAR**. If you have multiple
Java processes running within the application container then you can either specify a particular PID to the **Cryostat Agent** so that it
only attaches to that JVM, or you can use the wildcard `*` asterisk so that the Agent attaches to every JVM it finds (other than its own
bootstrap JVM). You can run the **Agent** with the `-h` flag to get details about its options:

```bash
$ java -jar cryostat-agent-{{site.data.versions.agent.version}}-shaded.jar -h
Usage: CryostatAgent [-hV] [-D=<String=String>]...
                     [--smartTrigger=<smartTriggers>]... [@<filename>...]
                     [<pid>]
Launcher for Cryostat Agent to self-inject and dynamically attach to workload
JVMs
      [@<filename>...]   One or more argument files containing options.
      [<pid>]            The PID to attach to and attempt to self-inject the
                           Cryostat Agent. If not specified, the Agent will
                           look to find exactly one candidate and attach to
                           that, failing if none or more than one are found.
                           Otherwise, this should be a process ID, or the '*'
                           wildcard to request the Agent attempt to attach to
                           all discovered JVMs.
  -D, --property=<String=String>
                         Optional property definitions to supply to the
                           injected Agent copies to add or override property
                           definitions once the Agent is running in the
                           workload JVM. These should be specified as key=value
                           pairs, ex. -Dcryostat.agent.baseuri=http://cryostat.
                           service.local . May be specified more than once.
  -h, --help             Show this help message and exit.
      --smartTrigger=<smartTriggers>
                         Smart Triggers definition. May be specified more than
                           once.
  -V, --version          Print version information and exit.
```

*Note*: this procedure will only attach the **Cryostat Agent** to the application once, for the application process' current lifecycle. If the
application process is restarted then the **Agent** will no longer be loaded, and you will need to perform the steps above again to re-attach it.
If you scale up your application so there are more Replicas then these additional instances will also not have the **Agent** attached. This
workflow is useful primarily for one-off troubleshooting or profiling scenarios. If you find yourself performing these steps often then
consider [statically attaching the Agent](#statically-attaching-the-cryostat-agent) so that the configuration for attaching it occurs at
every application startup.

##### [Statically Attaching the Cryostat Agent](#statically-attaching-the-cryostat-agent)

The **Cryostat Agent** **JAR** must be available to your application **JVM**. The **JAR** asset can be downloaded [directly from upstream](https://github.com/cryostatio/cryostat-agent/packages),
or from [Maven Central](https://mvnrepository.com/artifact/io.cryostat/cryostat-agent). For most use cases the `-shaded` **JAR** would be appropriate.
You may also include the Agent as a dependency in your application's `pom.xml` to automate the download:

```xml
<project>
  ...
  <build>
    <plugins>
      <plugin>
        <artifactId>maven-dependency-plugin</artifactId>
        <version>{{ site.data.versions.maven-plugins.dependency.version }}</version>
        <executions>
          <execution>
            <phase>prepare-package</phase>
            <goals>
              <goal>copy</goal>
            </goals>
            <configuration>
              <artifactItems>
                <artifactItem>
                  <groupId>io.cryostat</groupId>
                  <artifactId>cryostat-agent</artifactId>
                  <version>{{ site.data.versions.agent.version }}</version>
                  <classifier>shaded</classifier>
                </artifactItem>
              </artifactItems>
              <stripVersion>true</stripVersion>
            </configuration>
          </execution>
        </executions>
      </plugin>
    </plugins>
    ...
  </build>
  ...
</project>
```

The next time we build our application, the **Cryostat Agent** **JAR** will be located at `target/dependency/cryostat-agent-shaded.jar`. Then we can update our **Dockerfile**:

```Dockerfile
...
COPY target/dependency/cryostat-agent-shaded.jar /deployments/app/
...
# Assume we are using an application framework where the JAVA_OPTS environment variable can be used to pass JVM flags
ENV JAVA_OPTS="-javaagent:/deployments/app/cryostat-agent-shaded.jar"
```

The **Cryostat Agent** is also available as an **OCI Container Image** on [quay.io](https://quay.io/repository/cryostat/cryostat-agent-init).
We can use this directly in our application **Dockerfile** in a multi-stage build, rather than downloading the **Agent** **JAR** from GitHub or Maven Central:

```Dockerfile
ARG cryostat_agent_version

FROM quay.io/cryostat/cryostat-agent-init:${cryostat_agent_version} AS cryostat_agent

FROM ${application_base_img}
COPY --from=cryostat_agent /cryostat/agent/cryostat-agent-shaded.jar /deployments/app/cryostat-agent-shaded.jar
...
# Assume we are using an application framework where the JAVA_OPTS environment variable can be used to pass JVM flags
ENV JAVA_OPTS="-javaagent:/deployments/app/cryostat-agent-shaded.jar"
```

Next we must rebuild our container image. This is specific to your application but will likely look something like
`docker build -t docker.io/myorg/myapp:latest -f src/main/docker/Dockerfile --build-arg cryostat_agent_version={{ site.data.versions.agent.version }} .`
(omit the `--build-arg` if you are not using the multi-stage build step above). Push that updated image or otherwise get it updated in your
**Kubernetes** registry, then modify your application `Deployment` to supply **JVM** system properties or environment variables configuring
the **Cryostat Agent**:

```yaml
apiVersion: apps/v1
kind: Deployment
...
spec:
  ...
  template:
    ...
    spec:
      containers:
        - name: sample-app
          image: docker.io/myorg/myapp:latest
          env:
            - name: CRYOSTAT_AGENT_APP_NAME
              # Replace this with any value you like to use to identify your application.
              value: "myapp"
            - name: NAMESPACE
              valueFrom:
                fieldRef:
                  fieldPath: metadata.namespace
              # Update this to correspond to the name of your Cryostat instance
              # if it is not 'cryostat'.
            - name: CRYOSTAT_INSTANCE_NAME
              value: cryostat
            - name: CRYOSTAT_AGENT_BASEURI
              # This assumes that the target application # and the Cryostat instance are in the same
              # Namespace, but you may choose to configure the Agent to communicate with a Cryostat in
              # a different Namespace, too.
              # (https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)
              value: https://$(CRYOSTAT_INSTANCE_NAME).$(NAMESPACE).svc.cluster.local:4180
            - name: CRYOSTAT_AGENT_API_WRITES_ENABLED
              # Set this to 'true' to turn on the "write" or "mutation" capabilities of the
              # Agent's HTTP API. This defaults to 'false', so the Agent HTTP API only exposes
              # readonly access to certain low-sensitivity calls. If this is 'true' then the
              # Agent will allow Cryostat to dynamically request JFR recordings to be started,
              # stopped, deleted, etc. as well as listed and retrieved.
              value: true
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            - name: CRYOSTAT_AGENT_CALLBACK
              # This infers the Agent Callback directly from the Pod's IP address using the
              # Kubernetes Downward API. Use this value directly as provided. The port number
              # 9977 can be changed but must match the containerPort below.
              value: "http://$(POD_IP):9977"
              # This tells the Agent to look for its Kubernetes serviceaccount token mounted to
              # its own Pod at the default filesystem path, and use the token there for Bearer
              # Authorization to the Cryostat instance. This should be the correct behaviour in
              # most scenarios and allows you to configure the serviceaccount's authorization by
              # using standard Kubernetes RBAC for the application Pod's serviceaccount.
            - name: CRYOSTAT_AGENT_AUTHORIZATION_TYPE
              value: kubernetes

              # These two environment variables should not be set in a production environment.
              # For development and testing it can be useful to disable TLS trust and hostname
              # verification. In practice, you should provide the Agent with the Cryostat instance's
              # TLS certificate so that the Agent can trust it and only establish connections to
              # that trusted instance. Configuration of the Agent's TLS trust is covered elsewhere.
            - name: CRYOSTAT_AGENT_WEBCLIENT_TLS_TRUST_ALL
              value: "true"
            - name: CRYOSTAT_AGENT_WEBCLIENT_TLS_VERIFY_HOSTNAME
              value: "false"
          ports:
            - containerPort: 9977
              protocol: TCP
          resources: {}
      restartPolicy: Always
status: {}
```

Port number `9977` is the default HTTP port that the **Agent** exposes for its internal webserver that services **Cryostat** requests.
If this port number conflicts with another port used by your application, be sure to change both the `ports.containerPort` spec
as well as the `CRYOSTAT_AGENT_CALLBACK` environment variable.

Finally, create a `Service` to enable **Cryostat** to make requests to this **Agent**:

```yaml
apiVersion: v1
kind: Service
...
spec:
  ports:
    - name: "cryostat-agent"
      port: 9977
      targetPort: 9977
...
```

You may also be interested in using the **Cryostat Agent** for application discovery, but using **JMX** for remote management and data
access rather than the **Cryostat Agent** HTTP API. In that case, simply set `CRYOSTAT_AGENT_API_WRITES_ENABLED=false` to turn off as much
of the **Cryostat Agent** HTTP API as possible, then continue to [the next section](#using-jmx) to additionally configure your application
to enable and expose **JMX** for remote management and data access. If the **Cryostat Agent** detects that the application it is attached
to has **JMX** enabled then it will publish itself to the **Cryostat** server with both an **Agent** HTTP URL and a **JMX** URL. If **JMX**
is not detected then it will only publish the HTTP URL.
