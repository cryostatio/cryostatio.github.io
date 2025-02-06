---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: get-started
---

{:.cryostat-heading-1}
Cryostat {{ site.data.versions.cryostat.version }}

* auto-gen TOC:
{:toc}

## [Installing Cryostat Operator](#installing-cryostat-operator)
Follow the steps below to install the **Cryostat Operator** via [**OperatorHub**](https://operatorhub.io/operator/cryostat-operator).

### [Install cert-manager](#install-cert-manager)

The **Cryostat Operator** requires [**cert-manager**](https://cert-manager.io/) v{{ site.data.versions.cert-manager.version }}+ to run.
If not already installed in your cluster, please
[install](https://cert-manager.io/docs/installation/) it using your preferred method.
Once installed, proceed with the **Operator** installation steps below.

<span style="color:red">**Warning**:</span> Although it is possible to [disable **cert-manager** integration](https://github.com/cryostatio/cryostat-operator/blob/{{site.data.versions.cryostat.release-branch}}/docs/config.md#disabling-cert-manager-integration), it is NOT recommended to
do so unless **cert-manager** is unavailable AND one of the following applies to you:
- You have another solution for encrypting traffic
- You trust everything running in the same cluster where the **Cryostat Operator** is deployed

### [Install via OperatorHub](#install-via-operatorhub)
See below for a summary of the installation steps from the **Cryostat Operator** page on [**OperatorHub**](https://operatorhub.io/cryostat-operator). For more details, visit [Installing the **Cryostat Operator** from OperatorHub](https://developers.redhat.com/articles/2022/01/20/install-cryostat-operator-kubernetes-operatorhubio#).

1. Install the Operator Lifecycle Manager **(OLM)**:
    Check if **OLM** is already installed:
    ```bash
    $ operator-sdk olm status
    $ # or without the operator-sdk binary,
    $ POD="$(kubectl get -l app=olm-operator -n olm pod -o 'jsonpath={.items[0].metadata.name}')"
    $ kubectl exec -n olm "pod/${POD}" -- olm --version
    ```

    **If Operator Lifecycle Manager (OLM) and OperatorHub are already installed and available on your cluster, skip to Step 3:**

    Install **OLM**:

    ```bash
    $ operator-sdk olm install
    $ # or without the operator-sdk binary,
    $ curl -sL https://github.com/operator-framework/operator-lifecycle-manager/releases/download/v{{site.data.versions.operator-lifecycle-manager.version}}/install.sh | bash -s v{{site.data.versions.operator-lifecycle-manager.version}}
    ```

2. Verify the installation was successful by confirming all pods are `Running`:
```bash
$ kubectl get pods -n olm
NAME                                READY   STATUS    RESTARTS   AGE
catalog-operator-77b8589cd8-8bntf   1/1     Running   0          3m9s
olm-operator-5ccf676d8b-7rgss       1/1     Running   0          3m9s
operatorhubio-catalog-pb896         1/1     Running   0          3m3s
packageserver-8cccc99dd-dv8rp       1/1     Running   0          3m3s
packageserver-8cccc99dd-g7lkh       1/1     Running   0          3m3s
```

3. Install **Cryostat** from **OperatorHub**:
{% include howto_step.html
  details-attributes="open"
  summary="Cryostat on OperatorHub"
  image-name="cryostat-operatorhub-search.png"
%}
Use the search bar to find the **Red Hat build of Cryostat** catalog item.
{% include howto_step.html
  summary="Select the Cryostat Operator and click the Install button"
  image-name="cryostat-operatorhub-install.png"
%}
Click "*Install*" and wait for the installation to complete.
{% include howto_step.html
  summary="Install the Operator"
  image-name="cryostat-operatorhub-install-in-progress.png"
%}

Continue to [Setup](#setup).

## [Setup](#setup)

### [Deploying Cryostat](#deploying-cryostat)

{% include howto_step.html
  summary="Create a Cryostat instance"
  image-name="cryostat-operatorhub-install-complete.png"
%}
Once the installation is complete, click *Create Cryostat* to create a **Cryostat CR** instance in an **OpenShift
Project** (**Kubernetes Namespace**) of your choice. This provides configuration information for the **Operator** to know the
specifics of how to deploy your **Cryostat** instance. For full details on how to configure the **Cryostat** deployment, see
[Configuring **Cryostat**](https://github.com/cryostatio/cryostat-operator/blob/{{site.data.versions.cryostat.release-branch}}/docs/config.md).

If running **Cryostat** on **Kubernetes** and not **OpenShift**, you will also need to add **Ingress** configurations to your **Cryostat**
custom resource (**CR**).
See the [Network Options](https://github.com/cryostatio/cryostat-operator/blob/{{site.data.versions.cryostat.release-branch}}/docs/config.md#network-options) section of Configuring **Cryostat** for examples.

You can create the **CR** graphically in the **OperatorHub** UI after following [Install via OperatorHub](#install-via-operatorhub):

{% include howto_step.html
  details-attributes="open"
  summary="Installed Operators View"
  image-name="installed-operators.png"
%}
{% include howto_step.html
  summary="Cryostat Resources Before"
  image-name="cryostat-resources-before.png"
%}
This is where you will configure your **Cryostat** installation. The **Target Namespaces** field is worth special attention. If you do not set this,
then the **Cryostat** instance will default to have visibility of other applications within its own (installation) **Namespace** only. By setting a
list of **Target Namespace** names you can create a Cryostat instance which has visibility of applications in other **Namespaces** in the cluster,
which may or may not include Cryostat's own installation **Namespace**.
{% include howto_step.html
  summary="Cryostat Resource Creation"
  image-name="cryostat-resource-creation.png"
%}
{% include howto_step.html
  summary="Cryostat Resources After"
  image-name="cryostat-resources-after.png"
%}

You can also create the **CR** manually using a **YAML** definition like the following:

```yaml
apiVersion: operator.cryostat.io/v1beta2
kind: Cryostat
metadata:
  name: cryostat-sample
spec:
  enableCertManager: true
  targetNamespaces:
    - cryostat
    - apps1
    - apps2
  trustedCertSecrets: []
  eventTemplates: []
  storageOptions:
    pvc:
      labels: {}
      annotations: {}
      spec: {}
  reportOptions:
    replicas: 0
```

Then apply the resource:
```bash
$ oc apply -f cryostat.yaml
$ # or alternatively
$ kubectl apply -f cryostat.yaml
```

### [Open the Cryostat Web UI](#open-the-cryostat-web-ui)
Let's visit the **Cryostat** web dashboard UI.

We can get there from the **Cryostat** **CR**'s status fields:

{% include howto_step.html
  details-attributes="open"
  summary="Cryostat Resource Status"
  image-name="cryostat-resource-status.png"
%}

Or, we can open the application link from the **OpenShift** Console *Topology* view:

{% include howto_step.html
  details-attributes="open"
  summary="Topology View"
  image-name="topology-view.png"
%}

We can also find the **URL** using `oc`:
```bash
$ oc get cryostat -o jsonpath='{$.items[0].status.applicationUrl}'
```

#### [Authenticate through Cryostat](#authenticate-through-cryostat)

##### [OpenShift Authentication](#openshift-authentication)
When deployed in **OpenShift**, **Cryostat** will use the existing internal cluster
authentication system to ensure all requests come from users with correct
access to the **Cryostat** instance and the namespace that it is deployed within.

{% include howto_step.html
  details-attributes="open"
  summary="OpenShift SSO Login"
  image-name="sso-auth-page.png"
%}
{% include howto_step.html
  details-attributes="open"
  summary="OpenShift Service Account Permissions"
  image-name="permissions-auth-page.png"
%}
Once you have authenticated through the cluster's **SSO** login you will be
redirected back to the **Cryostat web** application.

For direct access to the **Cryostat HTTP API** you may follow the same pattern.
Using a client such as `curl`, an **OpenShift** auth token can be passed with
requests using the `Authorization: Bearer` header. For example,
```bash
$ curl -v -H "Authorization: Bearer $(oc whoami -t)" https://cryostat.example.com:8181/api/v1/targets
```

##### [Other Platforms Authentication](#other-platforms-authentication)

In non-OpenShift environments, **Cryostat** will default to no authentication.
Access to the web application and the HTTP API will be unsecured.

###### [Basic Auth](#basic-auth)

The **Cryosotat Deployment** includes an `oauth2-proxy` instance which will pass through
all traffic by default, but by using the **Cryostat CR**
*Advanced > Authorization Options > Basic Auth* configuration property you can enable an
`HTTP Basic` authentication system. You will need to create a **Secret** containing an
`htpasswd` file defining the users that should be granted access, then reference this
**Secret** in the **CR** *Authorization Options*.

### [Deploy an Application](#deploy-an-application)
For demo purposes, let's go ahead and deploy a sample application to our
**OpenShift** cluster in the same `namespace` as our **Cryostat** instance. If you have
deployed **Cryostat** into a `namespace` where you are already running other
applications, feel free to [continue to the next step](#configuring-applications).

```bash
$ oc new-app --image=quay.io/redhat-java-monitoring/quarkus-cryostat-agent:latest
$ oc patch svc/quarkus-cryostat-agent -p '{"spec":{"$setElementOrder/ports":[{"port":9097},{"port":8080}],"ports":[{"name":"jfr-jmx","port":9097}]}}'
```

This is a **Quarkus** container in **JVM** mode with **JMX** enabled and pre-configured to
listen on `port 9097`.  After deploying the container we patch its service to
name the `9097` service port `jfr-jmx`. **Cryostat** will detect and use this port
to determine that this is a compatible Java application that it should monitor.

#### [Configuring Applications](#configuring-applications)
There are two methods of configuring your Java applications so that **Cryostat** is able to discover and monitor them:

1. [using the **Cryostat Agent** for discovery and connectivity](#using-the-cryostat-agent)
2. [using platform mechanisms for discovery and Java Management Extensions (**JMX**) for connectivity](#using-jmx)

The following sections will briefly explain how to accomplish each of these approaches by example. For simplicity the examples will assume your application
is built with **Maven**, packaged into an image with a `Dockerfile`, and running in **Kubernetes**, but the procedure will be similar for other toolchains and platforms as well.

##### [Using the Cryostat Agent](#using-the-cryostat-agent)

[The **Cryostat Agent**](/guides/#using-the-cryostat-agent)
is compatible with **Cryostat** versions 2.3.0 and newer, and application **JDKs 11** and newer.
If you are using an older version of **Cryostat** we recommend upgrading to ensure compatibility.
Please see the [version compatibility chart](https://github.com/cryostatio/cryostat-agent?tab=readme-ov-file#run-requirements) to ensure
that your **Cryostat** server version and **Cryostat Agent** version are correct.
If your application uses a later version of **JDK8** with **JFR** support, please either upgrade to **JDK11+** or [continue to the next section](#using-jmx)
to learn how to configure your application without the **Cryostat Agent**.

##### [Automatic Configuration of the Cryostat Agent](#automatic-configuration-of-the-cryostat-agent)

Since **Cryostat** version 4.0.0, the **Operator** can assist you in automating the use
of the **Cryostat Agent** with your applications. By adding the `cryostat.io/name`
and `cryostat.io/namespace` labels to your application Pod (or Deployment spec template)
you can inform the **Cryostat Operator** that you wish for your application to be
instrumented with the **Cryostat Agent**. The **Operator** will
[dynamically inject](#dynamically-attaching-the-cryostat-agent) the **Agent** to your
application and supply it with the required configuration parameters to register with
the **Cryostat** instance specified by your `cryostat.io/namespace`/`cryostat.io/name`
labels.

The following additional labels are available to customize aspects of the injection process:
- `cryostat.io/callback-port`: by default the **Agent** uses port `9977` as the `HTTP` port
for receiving requests from the **Cryostat** instance. You can use this label to specify a
different port number in case `9977` is already used by your application.
- `cryostat.io/container`: by default the **Operator** will inject the **Agent** to the first
container within the Pod. Use this if your Pod runs multiple containers and the first one
is not the one you are interested in injecting the **Agent** into.
- `cryostat.io/read-only`: by default the **Agent** instance is configured with read-write
access for the **Cryostat** instance, allowing full usage of actions such as starting
**Flight Recordings**. If you only want the **Agent** instance to allow read access you
can set this label to `true`.
- `cryostat.io/java-options-var`: by default the **Operator** uses the `JAVA_TOOL_OPTIONS`
environment variable to add the `-javaagent` flag so that the application **JVM** loads the
**Agent**. This value will be appended to any existing value of the environment variable.
If your application or framework requires the use of another environment variable, such as
`MODULE_OPTS` or `JAVA_OPTS_APPEND`, then you can use this label to customize which variable
the **Operator** uses.

##### [Manually Installing the Cryostat Agent](#manually-installing-the-cryostat-agent)

If you are:
- not using the **Cryostat Operator**
- unable to deploy an **Agent** to your application
- requiring **JMX** connections only
- requiring no-downtime instrumentation of **Agents**
then the above automatic **Agent** configuration may not be suitable for your use case.
Below are descriptions of how to manually attach the **Cryostat Agent** to your application.

###### [Dynamically Attaching the Cryostat Agent](#dynamically-attaching-the-cryostat-agent)

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

###### [Statically Attaching the Cryostat Agent](#statically-attaching-the-cryostat-agent)

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
        <version>3.3.0</version>
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

More details about the configuration options for the **Cryostat Agent** [are available here](https://github.com/cryostatio/cryostat-agent/blob/{{site.data.versions.cryostat.release-branch}}/README.md#configuration).

You may also be interested in using the **Cryostat Agent** for application discovery, but using **JMX** for remote management and data
access rather than the **Cryostat Agent** HTTP API. In that case, simply set `CRYOSTAT_AGENT_API_WRITES_ENABLED=false` to turn off as much
of the **Cryostat Agent** HTTP API as possible, then continue to [the next section](#using-jmx) to additionally configure your application
to enable and expose **JMX** for remote management and data access. If the **Cryostat Agent** detects that the application it is attached
to has **JMX** enabled then it will publish itself to the **Cryostat** server with both an **Agent** HTTP URL and a **JMX** URL. If **JMX**
is not detected then it will only publish the HTTP URL.

##### [Using JMX](#using-jmx)
**Cryostat** is also able to use Java Management Extensions (**JMX**) to communicate with target applications. This is a standard JDK feature that can be enabled by passing **JVM**
flags to your application at startup. A basic and insecure setup suitable for testing requires only the following three flags:

```
-Dcom.sun.management.jmxremote.port=9091
-Dcom.sun.management.jmxremote.ssl=false
-Dcom.sun.management.jmxremote.authenticate=false
```

[comment]: # TODO explain how to configure SSL and auth for JMX, or link to external docs

It is recommended that you enable both `SSL` and authentication on your application. You can then [trust the certificate](/guides/#add-a-trusted-certificate)
and [store the credentials](/guides/#store-credentials).

Depending on your application or its framework, you may set these flags directly in a `Dockerfile` entrypoint, an environment variable, or similar. This may or
may not require a container image rebuild, and it will require the container to be restarted. Once this is done the application container will be listening for
incoming **JMX** connections on port `9091`. Let's assume it can be done by setting an environment variable, so we only need to modify our `Deployment`:

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
            - name: JAVA_OPTS
              value: >-
                -Dcom.sun.management.jmxremote.port=9091
                -Dcom.sun.management.jmxremote.ssl=false
                -Dcom.sun.management.jmxremote.authenticate=false
            ...
```

Next, we need to configure a **Kubernetes** `Service` to expose this port for cluster-internal traffic, so that **Cryostat** can see
and connect to this application **JMX** port.

```yaml
apiVersion: v1
kind: Service
...
spec:
  ports:
    - name: "jfr-jmx"
      port: 9091
      targetPort: 9091
...
```

**Cryostat** queries the **Kubernetes** API server and looks for `Service`s with a port either named `jfr-jmx` or with the number `9091`.
One or both of these conditions <span style="color:red">must</span> be met or else **Cryostat** will not automatically detect your
application. In this case you may wish to use the [**Cryostat Agent**](#using-the-cryostat-agent) to enable discovery, while keeping
communications over **JMX** rather than HTTP. If you do use the **Cryostat Agent** for discovery and **JMX** for remote management,
you may combine both of the `Service` definitions into a single `Service` with two exposed `ports`.

## [Next Steps](#next-steps)
Now that you have installed and deployed **Cryostat** and know how to access its
**web client**, continue on to [Guides]({% link guides/index.md %}) for
guides through various common actions and workflows.

## [Uninstalling Cryostat Operator](#uninstalling-cryostat-operator)
Reference [**OLM**](https://olm.operatorframework.io/docs/tasks/uninstall-operator/#combine-steps-2-and-3)
guide on uninstalling **Operators**.
- Delete all **Cryostat** Custom Resources before uninstalling the **Cryostat Operator**.
- The **Cryostat Operator**'s **ClusterServiceVersion** and `Subscription` can be found in the **Namespace** **openshift-operators**.
