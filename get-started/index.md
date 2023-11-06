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
The **Cryostat Operator** requires [cert-manager](https://cert-manager.io/) to run.
If not already installed in your cluster, please
[install](https://cert-manager.io/docs/installation/) it using your preferred method.
Once installed, proceed with the **Operator** installation steps below.

<span style="color:red">**Warning**:</span> Although it is possible to [disable cert-manager integration](https://github.com/cryostatio/cryostat-operator/blob/{{site.data.versions.cryostat.release-branch}}/docs/config.md#disabling-cert-manager-integration), it is NOT recommended to
do so unless cert-manager is unavailable AND one of the following applies to you:
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
  image-name="`cryostat-operatorhub-install.png`"
%}
Choose your **Operator** installation mode:
1. In `All Namespaces` installation mode, the **Cryostat Operator** instance will watch for **Cryostat** or
**ClusterCryostat** Custom Resources (**CR**s) created in any `Namespace` and create corresponding **Cryostat** instances.
2. In the `A specific namespace` installation mode, you must also select an installation `Namespace`, and the **Cryostat Operator** instance will only watch for **Cryostat** or **ClusterCryostat** instances created in that same `Namespace`.
{% include howto_step.html
  summary="Install the Operator"
  image-name="cryostat-operatorhub-install-in-progress.png"
%}
Click "*Install*" and wait for the installation to complete. In this example we will proceed with **All Namespaces**.

Continue to [Setup](#setup).

## [Setup](#setup)

**Note:** An alternative setup using the multi-namespace **ClusterCryostat CR** is described in
[Alternate Setup](#alternate-setup). For simplicity we will continue with the single-namespace **Cryostat CR**.

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
apiVersion: operator.cryostat.io/v1beta1
kind: Cryostat
metadata:
  name: cryostat-sample
spec:
  minimal: false
  enableCertManager: true
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
redirected back to the **Cryostat web** application. The redirect URL contains
an access token for **Cryostat's** service account with the permissions you have
granted to it. The **Cryostat web** application passes this **OpenShift** token back
to the **Cryostat** server on each request using `Bearer` authorization headers.
The **Cryostat** server forwards this token back to the **OpenShift** auth server on
each client request to check the token authorization for the current request.
This access token will eventually expire and you will be required to log back
in on the cluster **SSO** login page.

For direct access to the **Cryostat HTTP API** you may follow the same pattern.
Using a client such as `curl`, an **OpenShift** auth token can be passed with
requests using the `Authorization: Bearer` header. The token <span style="color:red">must</span> be `base64`
encoded. For example,
```bash
$ curl -v -H "Authorization: Bearer $(oc whoami -t | base64)" https://cryostat.example.com:8181/api/v1/targets
```

##### [Other Platforms Authentication](#other-platforms-authentication)

In non-OpenShift environments, **Cryostat** will default to no authentication.
Access to the web application and the HTTP API will be unsecured. You should
either configure **Cryostat's** built-in `Basic` authentication system, or better,
place an authenticating reverse proxy server in front of **Cryostat** so that
accesses to the **Cryostat** application must first pass through the reverse
proxy. The configuration of a reverse proxy is out of scope of this guide.

###### [Basic Auth](#basic-auth)

**Cryostat** includes a very rudimentary HTTP `Basic` authentication implementation.
This can be configured by creating a `cryostat-users.properties` file in the
**Cryostat** server `conf` directory, defined by the environment variable
`CRYOSTAT_CONFIG_PATH` and defaulting to `/opt/cryostat.d/conf.d`.
The credentials stored in the Java properties file are the user name and a
SHA-256 sum hex of the user's password. The property file contents should look
like:

```properties
user1=abc123
user2=def987
```
Where `abc123` and `def987` are substituted for the SHA-256 sum hexes of the
desired user passwords. These can be obtained by ex.
`echo -n PASS | sha256sum | cut -d' ' -f1`. The `Basic` user credentials `user:pass`
would therefore be entered as
`user:d74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1`.

This mechanism only supports fully-privileged user definitions, authorized to
perform any action within the **Cryostat** API.

Once the `cryostat-users.properties` file defining the user credentials is
created, the environment variable `CRYOSTAT_AUTH_MANAGER` should be set
to the value `io.cryostat.net.BasicAuthManager` to enable the corresponding
auth implementation.

### [Deploy an Application](#deploy-an-application)
For demo purposes, let's go ahead and deploy a sample application to our
**OpenShift** cluster in the same `namespace` as our **Cryostat** instance. If you have
deployed **Cryostat** into a `namespace` where you are already running other
applications, feel free to [continue to the next step](#open-the-cryostat-web-ui).

```bash
$ oc new-app --docker-image=quay.io/andrewazores/quarkus-test:0.0.10
$ oc patch svc/quarkus-test -p '{"spec":{"$setElementOrder/ports":[{"port":9097},{"port":8080}],"ports":[{"name":"jfr-jmx","port":9097}]}}'
```

This is a **Quarkus** container in **JVM** mode with **JMX** enabled and pre-configured to
listen on `port 9097`.  After deploying the container we patch its service to
name the `9097` service port `jfr-jmx`. **Cryostat** will detect and use this port
to determine that this is a compatible Java application that it should monitor.

#### [Configuring Applications](#configuring-applications)
There are three methods of configuring your Java applications so that **Cryostat** is able to discover and monitor them:

1. [using the **Cryostat Agent** for discovery and connectivity](#using-the-cryostat-agent)
2. [using platform mechanisms for discovery and Java Management Extensions (**JMX**) for connectivity](#using-jmx)
3. [using the **Cryostat Agent** for discovery and **JMX** for connectivity](#using-the-cryostat-agent-with-jmx)

The following sections will briefly explain how to accomplish each of these approaches by example. For simplicity the examples will assume your application
is built with **Maven**, packaged into an image with a `Dockerfile`, and running in **Kubernetes**, but the procedure will be similar for other toolchains and platforms as well.

##### [Using the Cryostat Agent](#using-the-cryostat-agent)

[The **Cryostat Agent**](/guides/#using-the-cryostat-agent)
is compatible with **Cryostat** versions 2.3.0 and newer, and application **JDKs 11** and newer. If you are using an older version of **Cryostat**, we recommend upgrading to ensure compatibility.
If your application uses a recent version of **JDK8** with **JFR** support, please either upgrade to **JDK11+** or [continue to the next section](#using-jmx)
to learn how to configure your application without the **Cryostat Agent**.

The **Cryostat Agent** **JAR** must be available to your application **JVM**. The **JAR** asset can be downloaded [directly from upstream](https://github.com/cryostatio/cryostat-agent/releases),
or you may use the following snippet in your `pom.xml` to streamline this.

```xml
<project>
  ...
  <repositories>
    <repository>
      <id>github</id>
      <url>https://maven.pkg.github.com/cryostatio/cryostat-agent</url>
    </repository>
  </repositories>
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
                  <version>0.2.1</version>
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

<span style="color:red">**Note**:</span> You may be required to [authenticate to the GitHub Maven Packages registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-apache-maven-registry#installing-a-package) in order to pull this **JAR**.

The next time we build our application, the **Cryostat Agent** **JAR** will be located at `target/dependency/cryostat-agent.jar`. Then we can update our **Dockerfile**:

```Dockerfile
...
COPY target/dependency/cryostat-agent.jar /deployments/app/
...
# We are using a framework where the JAVA_OPTS environment variable can be used to pass JVM flags
ENV JAVA_OPTS="-javaagent:/deployments/app/cryostat-agent.jar"
```

Next we must rebuild our container image. This is specific to your application but will likely look something like `docker build -t docker.io/myorg/myapp:latest -f src/main/docker/Dockerfile .`.
**Push** that updated image or otherwise get it updated in your Kubernetes registry, then modify your application `Deployment` to supply **JVM** system properties or environment variables configuring
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
            - name: CRYOSTAT_AGENT_BASEURI
              # Update this to correspond to the name of your Cryostat instance
              # if it is not 'cryostat'. This assumes that the target application
              # and the Cryostat instance are in the same Namespace, but you may
              # choose to configure the Agent to communicate with a Cryostat in
              # a different Namespace, too.
              # (https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)
              value: https://cryostat.$(NAMESPACE).svc:8181
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            - name: CRYOSTAT_AGENT_CALLBACK
              # This infers the Agent Callback directly from the Pod's IP address using the
              # Kubernetes Downward API. Use this value directly as provided. The port number
              # 9977 can be changed but must match the containerPort below.
              value: "http://$(POD_IP):9977"
              # Replace "abcd1234" with a base64-encoded authentication token. For example,
              # in your terminal, do 'oc whoami -t | base64' to use your user account's
              # token as the token that the Agent will pass to authorize itself with
              # the Cryostat server.
            - name: CRYOSTAT_AGENT_AUTHORIZATION
              value: "Bearer abcd1234"
          ports:
            - containerPort: 9977
              protocol: TCP
          resources: {}
      restartPolicy: Always
status: {}
```

Port number `9977` is the default HTTP port that the **Agent** exposes for its internal webserver that services **Cryostat** requests. The `CRYOSTAT_AGENT_AUTHORIZATION` value is particularly
noteworthy: these are the credentials that the **Agent** will include in API requests it makes to **Cryostat** to advertise its own presence. You should create a **Kubernetes** `Service Account` for
this purpose and replace `abcd1234` with the `base64-encoded` authentication token associated with the service account. For testing purposes you may use your own user account's
authentication token, for example with `oc whoami --show-token`.

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

**Cryostat** queries the **Kubernetes** API server and looks for `Service`s with a port either named `jfr-jmx` or with the number `9091`. One or both of these conditions
<span style="color:red">must</span> be met or else **Cryostat** will not automatically detect your application. In this case you may wish to use the [**Cryostat Agent**](#using-the-cryostat-agent-with-jmx)
to enable discovery, while keeping communications over **JMX** rather than HTTP.

##### [Using the Cryostat Agent with JMX](#using-the-cryostat-agent-with-jmx)
The two prior sections have discussed:
  - How to use the **Cryostat Agent** to do application discovery and expose data over HTTP.
  - How to use **Kubernetes** `Service` configurations for discovery and **JMX** to expose data.

There is a third, hybrid approach: **using the Cryostat Agent to do application discovery, and JMX to expose data**. This may be
useful since the **Agent** HTTP data model is readonly, whereas **JMX** is read-write. This means that using **JMX** to communicate between **Cryostat** and your applications
allows for more dynamic flexibility, for example, the ability to `start` and `stop` Flight Recordings on demand. Using the **Cryostat Agent** for application discovery
is also more flexible than depending on `Service`s with specially-named or specially-numbered ports.

For more context about these concepts, please review
the previous two sections on [using the **Cryostat Agent**](#using-the-cryostat-agent) and [using **JMX**](#using-jmx).

Add dependency configurations to `pom.xml`:
```xml
<project>
  ...
  <repositories>
    <repository>
      <id>github</id>
      <url>https://maven.pkg.github.com/cryostatio/cryostat-agent</url>
    </repository>
  </repositories>
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
                  <version>0.2.1</version>
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

Modify the application `Deployment`:
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
            - name: CRYOSTAT_AGENT_BASEURI
              # Update this to correspond to the name of your Cryostat instance
              # if it is not 'cryostat'. This assumes that the target application
              # and the Cryostat instance are in the same Namespace, but you may
              # choose to configure the Agent to communicate with a Cryostat in
              # a different Namespace, too.
              # (https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)
              value: https://cryostat.$(NAMESPACE).svc:8181
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            - name: CRYOSTAT_AGENT_HOSTNAME
              value: $(POD_IP)
            - name: CRYOSTAT_AGENT_CALLBACK
              # This infers the Agent Callback directly from the Pod's IP address using the
              # Kubernetes Downward API. Use this value directly as provided. The port number
              # 9977 can be changed but must match the containerPort below.
              value: "http://$(POD_IP):9977"
              # Replace "abcd1234" with a base64-encoded authentication token. For example,
              # in your terminal, do 'oc whoami -t | base64' to use your user account's
              # token as the token that the Agent will pass to authorize itself with
              # the Cryostat server.
            - name: CRYOSTAT_AGENT_AUTHORIZATION
              value: "Bearer abcd1234"
              # This environment variable is key to the "hybrid" setup.
              # This instructs the Agent to register itself with Cryostat
              # as reachable via JMX, rather than reachable via HTTP.
            - name: CRYOSTAT_AGENT_REGISTRATION_PREFER_JMX
              value: "true"
              # Here we configure the application to load the Agent JAR as
              # well as to enable JMX, since we want the Agent to register
              # itself as reachable via JMX.
            - name: JAVA_OPTS
              value: >-
                -javaagent:/deployments/app/cryostat-agent.jar
                -Dcom.sun.management.jmxremote.port=9091
                -Dcom.sun.management.jmxremote.ssl=false
                -Dcom.sun.management.jmxremote.authenticate=false
          ports:
            - containerPort: 9977
              protocol: TCP
          resources: {}
      restartPolicy: Always
status: {}
```

Create an application `Service`:
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

### [Alternate Setup](#alternate-setup)

#### [Using ClusterCryostats](#using-clustercryostats)
In [Deploying **Cryostat**](#deploying-cryostat), you created a single-namespace **Cryostat** Custom Resource
(**CR**) instance.

Single-namespace **Cryostat CRs** instruct the **Operator** to deploy restricted **Cryostat** instances which are only able
to see target applications deployed in the same namespace as the **Cryostat** instance, which is the same `Namespace` that
the **CR** is created within.

If you chose to install the **Operator** in **All Namespaces** mode as assumed in this guide, you may also be interested in
creating **CluterCryostat CRs**. In this configuration, the **Operator** is able to see **Cryostat** and **ClusterCryostat
CR\`s** in any project (`Namespace`) and create **Cryostat** deployments corresponding to either **CR** kind in each of their
respective **Namespaces**. Both of these **CRs** are **Namespace**-specific, and the **Namespace** is used to determine which
**OpenShift** users are able to access the **Cryostat** instance. For more information, please see the following documents:
- [Multi-namespace](https://github.com/cryostatio/cryostat-operator/blob/{{site.data.versions.cryostat.release-branch}}/docs/multi-namespace.md).
- [Authorization Properties](https://github.com/cryostatio/cryostat-operator/blob/{{site.data.versions.cryostat.release-branch}}/docs/config.md#authorization-properties)

**ClusterCryostat CRs** instruct the **Operator** to deploy cross-namespace **Cryostat** instances. A **ClusterCryostat** has
an `installNamespace`, which is the namespace where the **Cryostat Deployment** will reside, and a list of
`targetNamespaces`, which are all of the namespaces that the **Cryostat** server will watch for target applications.
The `targetNamespaces` list does not necessarily need to contain the `installNamespace`, if you do not want **Cryostat**
to see itself in the target applications that it watches.

```yaml
apiVersion: operator.cryostat.io/v1beta1
kind: ClusterCryostat
metadata:
  name: clustercryostat-sample
spec:
  enableCertManager: true
  installNamespace: cryostat-testing
  minimal: false
  reportOptions:
    resources: {}
  storageOptions:
    pvc:
      spec:
        resources: {}
  targetNamespaces:
  - cryostat-testing
  - my-apps-a
  - my-apps-b
```

## [Next Steps](#next-steps)
Now that you have installed and deployed **Cryostat** and know how to access its
**web client**, continue on to [Guides]({% link guides/index.md %}) for
guides through various common actions and workflows.

## [Uninstalling Cryostat Operator](#uninstalling-cryostat-operator)
Reference [**OLM**](https://olm.operatorframework.io/docs/tasks/uninstall-operator/#combine-steps-2-and-3)
guide on uninstalling **Operators**. Please be sure to delete all **Cryostat** and **ClusterCryostat** Custom Resources before
uninstalling the **Cryostat Operator**.
- If your **Cryostat Operator** was installed in **All Namespaces** mode, then its **ClusterServiceVersion** and
`Subscription` can be found in the **Namespace** **openshift-operators**.
- If your **Cryostat Operator** was installed in **A specific Namespace**, then the **ClusterServiceVersion** and
`Subscription` will be in that same **Namespace**.
