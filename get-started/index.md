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
Follow the steps below to install the Cryostat Operator via [OperatorHub](https://operatorhub.io/operator/cryostat-operator).

### [Install cert-manager](#install-cert-manager)
The Cryostat Operator requires [cert-manager](https://cert-manager.io/) to run.
If not already installed in your cluster, please 
[install](https://cert-manager.io/docs/installation/) it using your preferred method.
Once installed, proceed with the operator installation steps below.

**Warning**: Although it is possible to [disable cert-manager integration](https://github.com/cryostatio/cryostat-operator/blob/v2/docs/config.md#disabling-cert-manager-integration), it is NOT recommended to
do so unless cert-manager is unavailable AND one of the following applies to you:
- You have another solution for encrypting traffic
- You trust everything running in the same cluster where the Cryostat Operator is deployed

### [Install via OperatorHub](#install-via-operatorhub)
See below for a summary of the installation steps from the Cryostat Operator page on [OperatorHub](https://operatorhub.io/cryostat-operator). For more details, visit [Installing the Cryostat Operator from OperatorHub](https://developers.redhat.com/articles/2022/01/20/install-cryostat-operator-kubernetes-operatorhubio#). 

**If Operator Lifecycle Manager (OLM) and OperatorHub are already installed and available on your cluster, skip to Step 3:**

1. Install the Operator Lifecycle Manager:
```
$ curl -sL https://github.com/operator-framework/operator-lifecycle-manager/releases/download/v0.21.1/install.sh | bash -s v0.21.1
```
2. Verify the installation was successful by confirming all pods are `READY`:
```
$ kubectl get pods -n olm
```
3. Install Cryostat from OperatorHub:
{% include howto_step.html
  details-attributes="open"
  summary="Cryostat on OperatorHub"
  image-name="cryostat-operatorhub-search.png"
%}
Use the search bar to find the Cryostat (provided by Red Hat) catalog item.
{% include howto_step.html
  summary="Select the Cryostat Operator and click the Install button"
  image-name="cryostat-operatorhub-install.png"
%}
Choose the namespace for Cryostat to be deployed into. This should be the same namespace that contains your JVM applications which you intend to monitor or profile using Cryostat.
{% include howto_step.html
  summary="Install the Operator"
  image-name="cryostat-operatorhub-install-in-progress.png"
%}
Click "Install" and wait for the installation to complete.
{% include howto_step.html
  summary="Create a Cryostat instance"
  image-name="cryostat-operatorhub-install-complete.png"
%}
Once the installation is complete, click "Create Cryostat" to create a Cryostat Custom Resource instance. This provides configuration information for the Operator to know
the specifics of how to deploy your Cryostat instance. Continue to [Setup](#setup).

**Note**: Alternative methods for installing the operator are described in [Alternate Installation Options](/alternate-installation-options) (not recommended).
## [Setup](#setup)

### [Configuring Applications](#configuring-applications)
The following sections will briefly describe how to configure your Java applications so that Cryostat is able to discover and monitor them.
These examples will assume the application is built with Maven, packaged into an image with a `Dockerfile`, and running in Kubernetes,
but the instructions will be similar for other toolchains and platforms as well.

#### [Using the Cryostat Agent](#using-the-cryostat-agent)

[The Cryostat Agent](/guides/#using-the-cryostat-agent)
is compatible with Cryostat versions 2.3.0 and newer, and application JDKs 11 and newer. If you are using an older version of Cryostat, please upgrade.
If your application uses a recent version of JDK8 with JFR support, please either upgrade to JDK11+ or [continue to the next section](#using-jmx)
to learn how to configure your application without the Cryostat Agent.

The Cryostat Agent JAR must be available to your application JVM. The JAR asset can be downloaded [directly from upstream](https://github.com/cryostatio/cryostat-agent/releases),
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
                  <version>0.2.0</version>
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

**Note**: You may be required to [authenticate to the GitHub Maven Packages registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-apache-maven-registry#installing-a-package) in order to pull this JAR.

The next time we build our application, the Cryostat Agent JAR will be located at `target/dependency/cryostat-agent.jar`. Then we can update our Dockerfile:

```Dockerfile
...
COPY target/dependency/cryostat-agent.jar /deployments/app/
...
# We are using a framework where the JAVA_OPTS environment variable can be used to pass JVM flags
ENV JAVA_OPTS="-javaagent:/deployments/app/cryostat-agent.jar"
```

Next we must rebuild our container image. This is specific to your application but will likely look something like `docker build -t docker.io/myorg/myapp:latest -f src/main/docker/Dockerfile .`.
Push that updated image or otherwise get it updated in your Kubernetes registry, then modify your application `Deployment` to supply JVM system properties or environment variables configuring
the Cryostat Agent:

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
              value: "myapp"
            - name: CRYOSTAT_AGENT_BASEURI
              value: "http://cryostat.mynamespace.mycluster.svc:8181"
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.PodIP
            - name: CRYOSTAT_AGENT_CALLBACK
              value: "http://$(POD_IP):9977"
              # Replace "abcd1234" with a base64-encoded authentication token
            - name: CRYOSTAT_AGENT_AUTHORIZATION
              value: "Bearer abcd1234"
          ports:
            - containerPort: 9977
              protocol: TCP
          resources: {}
      restartPolicy: Always
status: {}
```

Port number `9977` is the default HTTP port that the Agent exposes for its internal webserver that services Cryostat requests. The `CRYOSTAT_AGENT_AUTHORIZATION` value is particularly
noteworthy: these are the credentials that the Agent will include in API requests it makes to Cryostat to advertise its own presence. You should create a Kubernetes `Service Account` for
this purpose and replace `abcd1234` with the base64-encoded authentication token associated with the service account. For testing purposes you may use your own user account's
authentication token, for example with `oc whoami --show-token`.

Finally, create a `Service` to enable Cryostat to make requests to this Agent:

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

More details about the configuration options for the Cryostat Agent [are available here](https://github.com/cryostatio/cryostat-agent/blob/main/README.md#configuration).

#### [Using JMX](#using-jmx)
Cryostat is also able to use Java Management Extensions (JMX) to communicate with target applications. This is a standard JDK feature that can be enabled by passing JVM
flags to your application at startup. A basic and insecure setup suitable for testing requires only the following three flags:

```
-Dcom.sun.management.jmxremote.port=9091
-Dcom.sun.management.jmxremote.ssl=false
-Dcom.sun.management.jmxremote.authenticate=false
```

[comment]: # TODO explain how to configure SSL and auth for JMX, or link to external docs

In a real scenario you should enable both SSL and authentication on your application. You can then [trust the certificate](/guides/#add-a-trusted-certificate)
and [store the credentials](/guides/#store-jmx-credentials).

Depending on your application or its framework, you may set these flags directly in a `Dockerfile` entrypoint, an environment variable, or similar. This may or
may not require a container image rebuild, and it will require the container to be restarted. Once this is done the application container will be listening for
incoming JMX connections on port `9091`. Let's assume it can be done by setting an environment variable, so we only need to modify our `Deployment`:

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
              value: "-Dcom.sun.management.jmxremote.port=9091 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false"
            ...
```

Next, we need to configure a Kubernetes `Service` to expose this port for cluster-internal traffic, so that Cryostat can see
and connect to this application JMX port.

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

Cryostat queries the Kubernetes API server and looks for `Service`s with a port either named `jfr-jmx` or with the number `9091`. One or both of these conditions
must be met or else Cryostat will not automatically detect your application. In this case you may wish to use the [Cryostat Agent](#using-the-cryostat-agent-with-jmx)
to enable discovery, while keeping communications over JMX rather than HTTP.

#### [Using the Cryostat Agent with JMX](#using-the-cryostat-agent-with-jmx)
The two prior sections have discussed:
  - How to use the Cryostat Agent to do application discovery and expose data over HTTP.
  - How to use Kubernetes `Service` configurations for discovery and JMX to expose data.

There is a third, hybrid approach: **using the Cryostat Agent to do application discovery, and JMX to expose data**. This may be
useful since the Agent HTTP data model is readonly, whereas JMX is read-write. This means that using JMX to communicate between Cryostat and your applications
allows for more dynamic flexibility, for example, the ability to start and stop Flight Recordings on demand. Using the Cryostat Agent for application discovery
is also more flexible than depending on `Service`s with specially-named or specially-numbered ports. 

For more context about these concepts, please review
the previous two sections on [using the Cryostat Agent](#using-the-cryostat-agent) and [using JMX](#using-jmx).

Add dependency configuration to `pom.xml`:
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
                  <version>0.2.0</version>
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
              value: "myapp"
            - name: CRYOSTAT_AGENT_BASEURI
              value: "http://cryostat.mynamespace.mycluster.svc:8181"
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.PodIP
            - name: CRYOSTAT_AGENT_CALLBACK
              value: "http://$(POD_IP):9977"
            - name: CRYOSTAT_AGENT_AUTHORIZATION
              # Replace "abcd1234" with a base64-encoded authentication token
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
              value: "-javaagent:/deployments/app/cryostat-agent.jar -Dcom.sun.management.jmxremote.port=9091 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false"
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
    - name: "jfr-jmx"
      port: 9091
      targetPort: 9091
    - name: "cryostat-agent"
      port: 9977
      targetPort: 9977
...
```

### [Deploying Cryostat](#deploying-cryostat)
Create a `Cryostat` object to deploy and set up Cryostat in the `cryostat-operator-system` namespace. For
full details on how to configure the Cryostat deployment, see
[Configuring Cryostat](https://github.com/cryostatio/cryostat-operator/blob/v{{ site.data.versions.cryostat.version }}/docs/config.md). 

If running Cryostat on Kubernetes, you will also need to add Ingress configurations to your Cryostat resource.
See the [Network Options](https://github.com/cryostatio/cryostat-operator/blob/v{{ site.data.versions.cryostat.version }}/docs/config.md#network-options) section of Configuring Cryostat for examples.

You can create the resource graphically in the OperatorHub UI after following [Install via OperatorHub](#install-via-operatorhub):

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

You can also create the resource manually using a YAML definition like the following:

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
```
$ kubectl apply -f cryostat.yaml
```

### [Deploy an Application](#deploy-an-application)
For demo purposes, let's go ahead and deploy a sample application to our
OpenShift cluster in the same namespace as our Cryostat instance. If you have
deployed Cryostat into a namespace where you are already running other
applications, feel free to [continue to the next step](#open-the-cryostat-web-ui).

```bash
$ oc new-app --docker-image=quay.io/andrewazores/quarkus-test:0.0.10
$ oc patch svc/quarkus-test -p '{"spec":{"$setElementOrder/ports":[{"port":9097},{"port":8080}],"ports":[{"name":"jfr-jmx","port":9097}]}}'
```

This is a Quarkus container in JVM mode with JMX enabled and pre-configured to
listen on port 9097.  After deploying the container we patch its service to
name the 9097 service port `jfr-jmx`. Cryostat will detect and use this port
to determine that this is a compatible Java application that it should monitor.

### [Open the Cryostat Web UI](#open-the-cryostat-web-ui)
Let's visit the Cryostat web dashboard UI.

We can get there from the Cryostat resource's Status field:

{% include howto_step.html
  details-attributes="open"
  summary="Cryostat Resource Status"
  image-name="cryostat-resource-status.png"
%}

Or, we can open the application link from the Topology view:

{% include howto_step.html
  details-attributes="open"
  summary="Topology View"
  image-name="topology-view.png"
%}

We can also find the URL using `oc`:
```bash
$ oc get cryostat -o jsonpath='{$.items[0].status.applicationUrl}'
```

### [Authenticate through Cryostat](#authenticate-through-cryostat)

#### [OpenShift Authentication](#openshift-authentication)
When deployed in OpenShift, Cryostat will use the existing internal cluster
authentication system to ensure all requests come from users with correct
access to the Cryostat instance and the namespace that it is deployed within.

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
Once you have authenticated through the cluster's SSO login you will be
redirected back to the Cryostat web application. The redirect URL contains
an access token for Cryostat's service account with the permissions you have
granted to it. The Cryostat web application passes this OpenShift token back
to the Cryostat server on each request using `Bearer` authorization headers.
The Cryostat server forwards this token back to the OpenShift auth server on
each client request to check the token authorization for the current request.
This access token will eventually expire and you will be required to log back
in on the cluster SSO login page.

For direct access to the Cryostat HTTP API you may follow the same pattern.
Using a client such as `curl`, an OpenShift auth token can be passed with
requests using the `Authorization: Bearer` header. The token must be base64
encoded. For example,
```
curl -v -H "Authorization: Bearer $(oc whoami -t | base64)" https://cryostat.example.com:8181/api/v1/targets
```

#### [Other Platforms Authentication](#other-platforms-authentication)

In non-OpenShift environments, Cryostat will default to no authentication.
Access to the web application and the HTTP API will be unsecured. You should
either configure Cryostat's built-in `Basic` authentication system, or better,
place an authenticating reverse proxy server in front of Cryostat so that
accesses to the Cryostat application must first pass through the reverse
proxy. The configuration of a reverse proxy is out of scope of this guide.

##### [Basic Auth](#basic-auth)

Cryostat includes a very rudimentary HTTP `Basic` authentication implementation.
This can be configured by creating a `cryostat-users.properties` file in the
Cryostat server `conf` directory, defined by the environment variable
`CRYOSTAT_CONFIG_PATH` and defaulting to `/opt/cryostat.d/conf.d`.
The credentials stored in the Java properties file are the user name and a
SHA-256 sum hex of the user's password. The property file contents should look
like:

```
user1=abc123
user2=def987
```
Where `abc123` and `def987` are substituted for the SHA-256 sum hexes of the
desired user passwords. These can be obtained by ex.
`echo -n PASS | sha256sum | cut -d' ' -f1`. The `Basic` user credentials `user:pass`
would therefore be entered as
`user:d74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1`.

This mechanism only supports fully-privileged user definitions, authorized to
perform any action within the Cryostat API.

Once the `cryostat-users.properties` file defining the user credentials is
created, the environment variable `CRYOSTAT_AUTH_MANAGER` should be set
to the value `io.cryostat.net.BasicAuthManager` to enable the corresponding
auth implementation.

## [Next Steps](#next-steps)
Now that you have installed and deployed Cryostat and know how to access its
web client, continue on to [Guides]({% link guides/index.md %}) for
guides through various common actions and workflows.

## [Uninstalling Cryostat Operator](#uninstalling-cryostat-operator)
In order to ensure that objects created by the operator and recordings created
by Cryostat are properly removed, the Cryostat Operator must remain installed
when attempting to delete the Cryostat custom resource, or any Recording
custom resources.

To completely remove Cryostat and all objects and recordings created by it:
1. Delete any Recording custom resources.
    - If Cryostat is no longer deployed, you must redeploy it by creating a
      Cryostat custom resource.
    - If the Cryostat Operator has already been uninstalled, please reinstall it
      before deleting any Recording custom resources.
2. Delete the Cryostat custom resource.
    - If the Cryostat Operator has already been uninstalled, please reinstall it
      before deleting the Cryostat custom resource.
3. Uninstall the Cryostat Operator. 
    - **Warning**: This command also removes the `my-cryostat-operator` namespace and all of its contents, including any applications deployed in the namespace.
    ```
    $ kubectl delete -f https://operatorhub.io/install/cryostat-operator.yaml
    ```
