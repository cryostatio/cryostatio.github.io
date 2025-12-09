## [Cryostat Architecture](#cryostat-architecture)

### [General Application Architecture w.r.t Security](#general-application-architecture-wrt-security)

The **Cryostat {{ site.data.versions.cryostat.version }}** application as a whole consists of the following components:

* **Cryostat** Deployment
    * Service + Route → Auth container
        * **Cryostat** Pod
            * Auth Proxy container instance
            * Agent Proxy (Gateway) container instance
            * **Cryostat** container instance
            * Grafana container instance
            * **jfr-datasource** container instance
    * (optional, included by default) Storage Deployment
        * Service (no Route) → Pod
        * cryostat-storage container instance
            * PersistentVolumeClaim for SeaweedFS data
    * Database Deployment
        * Service (no Route) → Pod
        * cryostat-db container instance
            * PersistentVolumeClaim for Postgres Database data
    * (optional) **Cryostat** Report Generator Deployment
        * Service (no Route) → Pods
        * **Cryostat** Report Generator Pod(s)
            * cryostat-report container instance
    * Operator Pod
        * cryostat-operator instance, containing various controllers
    * (optional, OpenShift-specific) Console Plugin Deployment
        * Service (no Route) → Pods
        * cryostat-openshift-console-plugin Pod
            * cryostat-openshift-console-plugin/backend container instance

The <code>Routes</code> are configured with TLS Re-Encryption so all connections from outside the cluster use HTTPS/WSS using the cluster's TLS cert externally. Internally, <code>Service</code> connections between **Cryostat** components use TLS with **cert-manager** (described in more detail below) to ensure that connections are private even within the cluster namespace. Each **Auth Proxy** container is either an <code>oauth2-proxy</code> configured with htpasswd Basic authentication, or an <code>openshift-oauth-proxy</code> delegating to the cluster's internal authentication/authorization server and optional htpasswd authentication.

### [Sample Deployment Scenario](#sample-deployment-scenario)

<figure>
  <a href="{{ site.url }}/images/{{ site.data.versions.cryostat.version }}/cryostat-architecture.dot.svg" target="_blank">
    <img src="{{ site.url }}/images/{{ site.data.versions.cryostat.version }}/cryostat-architecture.dot.svg" alt="Cryostat installation graph">
  </a>
</figure>

In this scenario, the **Cryostat Operator** is installed into its own <code>namespace</code>. It runs here separately with its privileged <code>serviceaccount</code>. **Cryostat Custom Resource** objects are created to request the **Operator** to create **Cryostat** instances. The CR has a field for a list of <code>namespace</code> names that the associated **Cryostat** instance should be deployed across. When the **Cryostat** instances are created, they are supplied with an environment variable informing them which <code>namespaces</code> should be monitored. These **Cryostat** instances are deployed into their own separate install <code>namespaces</code> as well and run with their own lower privileged <code>serviceaccounts</code>. Using these privileges they perform an <code>Endpoints</code> query to discover target applications across each of the listed <code>namespaces</code>. **Cryostat** will only automatically discover those target applications (potentially including itself) that are located within these <code>namespaces</code>. **Cryostat** queries the **Kubernetes/OpenShift** API server for <code>Endpoints</code> objects within each <code>namespace</code>, then filters them for ports with either the name <code>jfr-jmx</code> or the number 9091 (or both). Other applications, within the <code>namespace</code> or otherwise, may be registered via the **Custom Targets API** or the **Discovery Plugin API** (ex. using the **Cryostat Agent**), but **Cryostat** will not be aware that these applications may be in other <code>namespaces</code>.

The **Cryostat Operator** also creates <code>NetworkPolicy</code> objects to control the ingress of traffic to the various **Cryostat** components. The main **Cryostat Service** is allowed to receive traffic from any <code>namespace</code> within the cluster, or from its <code>Route</code>. The database, storage, and report generator <code>Services</code> are only allowed to receive traffic that originates from the **Cryostat** instance in the same <code>namespace</code>.

The **Agent Proxy (Gateway)** container acts as an alternative to the **Auth Proxy**, specifically for use by **Cryostat Agent** instances, and in particular those deployed and configured by the **Operator's** autoconfiguration feature. This **Proxy Gateway** allows **Cryostat Agent** instances to use **TLS Client Authentication** with a <code>Certificate</code> supplied by the **Operator** (via **cert-manager**) instead of Bearer auth tokens.

With this setup, the target applications are not able to assume the privileges associated with the <code>serviceaccounts</code> for the **Cryostat Operator** or each of the **Cryostat** instances. Each **Cryostat** instance can discover and become aware of target **JVM** applications across any of the <code>namespaces</code> that this particular instance is monitoring. The separated <code>namespaces</code> also ease administration and access management, so cluster administrators can assign roles to users that allow them to work on projects within <code>namespaces</code>, and assign other roles to other users that allow them to acces **Cryostat** instances that may have visibility into those <code>namespaces</code>.

### [Agent Autoconfiguration](#agent-autoconfiguration)

Using labels on a <code>Deployment's</code> <code>.spec.template.metadata.labels</code> field, a user can request the **Cryostat Operator** to patch their application <code>Deployment</code> to add and configure the **Cryostat Agent**. The two required labels are <code>cryostat.io/namespace</code> and <code>cryostat.io/name</code>. These should be populated with values corresponding to the installation <code>namespace</code> of a **Cryostat Custom Resource** that the user wishes their application to be registered with. The **Cryostat Operator** will validate that the application <code>Deployment</code> belongs to one of the Target <code>Namespaces</code> of the **Cryostat CR**, and ignore the request if it does not. The patching done by the **Cryostat Operator** involves mounting <code>volumes</code> to the </code>Deployment's</code> <code>Pods</code> containing the **Cryostat Agent** JAR and various TLS certificates required for secure communications; patching the <code>JAVA_TOOL_OPTIONS</code> environment variable to append the <code>-javaagent:/path/to/cryostat-agent.jar</code> flag so that the application statically attaches the **Cryostat Agent** at startup; and adding additional environment variables to the <code>Deployment</code> to configure the **Cryostat Agent** to load the TLS certificates, determine its own callback URL, and to communicate with the **Cryostat Agent** <code>Service</code> in its own <code>Namespace</code>. The **Cryostat Operator** places an Agent <code>Service</code> in each Target <code>namespace</code>, which points at the **Agent Proxy (Gateway)** component of the associated **Cryostat** instance.

The environment variable selection can be modified using the <code>cryostat.io/java-options-var</code> label. This defaults to <code>JAVA_TOOL_OPTIONS</code> as described above.

If the <code>Deployment</code> template describes a <code>Pod</code> containing more than one container, the <code>cryostat.io/container</code> can be used to select a container by name. This container will be the one configured to use the **Cryostat Agent**. If this is not specified, the **Operator** will default to picking the first container within the <code>Pod</code>.

The label <code>cryostat.io/read-only</code> can be used to configure the injected **Cryostat Agent** instance to only accept "read" requests on its internal webserver. The **Cryostat Agent** will permit the **Cryostat** instance to perform actions such as querying for the list of active **Flight Recordings**, or the list of registered **JFR** Event Types, or reading MBean metrics. The agent will reject actions such as starting new **Flight Recordings**.

The label <code>cryostat.io/callback-port</code> can be used to control the HTTPS port exposed by the **Cryostat Agent** instance, which is how the **Agent** receives requests from the **Cryostat** instance. This defaults to 9977. If this port number is already used by the application or has some other meaning within the larger deployment, then this label can be used to change the **Cryostat Agent** HTTPS port number.

### [Flow of JFR Data](#flow-of-jfr-data)

**Cryostat** traditonally connects to other **JVM** applications within its cluster using remote JMX, using cluster-internal URLs so that no traffic will leave the cluster. **Cryostat** supports connecting to target **JVMs** with JMX auth credentials enabled ("Basic" style authentication). When a connection attempt to a target fails due to a <code>SecurityException</code>, Cryostat responds to the requesting client with an HTTP 427 status code and the header <code>X-JMX-Authenticate: Basic</code>. The client is expected to create a [Stored Credential](/guides/#store-credentials) object via the **Cryostat API** before retrying the request, which results in the required target credentials being stored in an encrypted database table. When deployed in **OpenShift** the requests are already encrypted using **OpenShift** TLS re-encryption as mentioned above, so the credentials are never transmitted in cleartext. The table is encrypted with a passphrase either provided by the user at deployment time, or generated by the **Operator** if none is specified. It is also possible to configure **Cryostat** to trust SSL certificates used by target JVMs by adding the certificate to a <code>Secret</code> and linking that to the **Cryostat CR**, which will add the certificate to the SSL trust store used by **Cryostat**. The Operator also uses **cert-manager** to generate a self-signed CA and provides **Cryostat's** auth proxy with certificates as a mounted volume. For more information on setting this up, see [Configuring the Operator](/config/#configure-the-cryostat-operator)

In more recent releases, **JVM** applications may optionally be instrumented with the **Cryostat Agent**, which uses the local **JDK** Instrumentation API to hook into the target application. The **Cryostat Agent** then exposes a **JDK** HTTP(S) webserver, generates credentials to secure it, and looks up its supplied configuration to locate the **Cryostat** server instance it should register with. Once it is registered the **Cryostat Agent** creates a <code>Stored Credential</code> object on the server corresponding to itself, then clears its generated password from memory retaining only the hash. From this point on, the **Agent** and **Cryostat** server communicate with each other using Basic authentication bidirectionally, and with TLS enabled on each webserver if enabled/configured.

**Cryostat** and the associated **Operator** will only monitor the **Kubernetes** <code>namespace(s)</code> that they are deployed within (see [Scenarios](#sample-deployment-scenario) above). The **Operator** creates <code>NetworkPolicy</code> objects to control ingress to **Cryostat** components by default, and the **Custom Resource** can be optionally configured so that the **Operator** also creates <code>NetworkPolicy</code> objects to control egress from **Cryostat** components. This way, end user administrators or developers can be sure of which set of **JVMs** they are running which are visible to **Cryostat** and thus which **JVMs'** data they should be mindful of. Even without the egress <code>NetworkPolicy</code> objects, **Cryostat** will only attempt to discover workload applications within its configured Target <code>Namespaces</code>.

Once **Cryostat** has established a **JMX** or HTTP(S) connection to a target application its primary purpose is to enable **JFR** recordings on the target **JVM** and expose them to the end user. These recordings can be transferred from the target **JVM** back to **Cryostat** over the **JMX**/HTTP(S) connection. **Cryostat** does this for four purposes:

* to generate [Automated Rules](/guides/#create-an-automated-rule) Reports of the **JFR** contents, served to clients over HTTPS. These may be generated by the **Cryostat** container itself or by cryostat-reports sidecar container(s) depending on the configuration.
* to stream **JFR** file contents into the cryostat-storage container "archives", which saves them in a **Kubernetes** <code>PersistentVolumeClaim</code>. If the **Cryostat** instance is configured with an ["external" storage provider](/guides/#external-storage), then rather than a cryostat-storage container this is an independent object storage service that may be managed by the user, or another team, or may be a commerically available object storage service outside of the **Kubernetes** cluster.
* to stream a snapshot of the **JFR** contents over HTTPS to a requesting client's GET request
* to upload a snapshot of the **JFR** contents using HTTPS POST to the **jfr-datasource**

("archived" **JFR** copies can also be streamed back out to clients over HTTPS, or POSTed to **jfr-datasource**, and Automated Rules Reports can also be made of them)

Here, "the client" may refer to an end user's browser when using **Cryostat's** web interface, or may be the end user using a direct HTTP(S) client (ex. HTTPie or curl), or may be any other external process acting as an automated external client. All of these cases are handled identically by **Cryostat**.

**jfr-datasource** receives file uploads by POST request from the Cryostat container. Cryostat and **jfr-datasource** run together within the same Pod and use the local loopback network interface, so the file contents do not travel across the network outside of the <code>Pod</code>. These files are held in transient storage by the **jfr-datasource** container and the parsed **JFR** data contents held in-memory to make available for querying by the Grafana dashboard container, which also runs within the same Pod and communicates over the local loopback network interface.

### [Cryostat Authz Specifics](#cryostat-authz-specifics)

When deployed in **OpenShift**, the **Cryostat** <code>Service</code> is fronted by an instance of the **OpenShift OAuth Proxy**. This proxy will accept <code>Authorization: Bearer abcd1234</code> headers from CLI clients, or will send interactive clients through the OAuth login flow to gain an authorization token and cookie. These tokens are the ones provided by **OpenShift OAuth** itself, ie. the user's account for that **OpenShift** instance/cluster. On each HTTPS request, the **OAuth Proxy** instance in front of **Cryostat** receives the token and sends its own request to the internal **OpenShift OAuth** server to validate the token. If **OpenShift OAuth** validates the token the request is accepted. If **OpenShift OAuth** does not validate the token, or the user does not provide a token, then the request is rejected with a 401. The default RBAC configuration requires clients to pass a create pods/exec access check in the **Cryostat** instance's installation <code>namespace</code>.

When deployed outside of **OpenShift**, the **Cryostat** <code>Service</code> is instead fronted by an instance of **OAuth2 Proxy**. This behaves very similarly to the **OpenShift OAuth Proxy** except without the integration to the cluster's internal OAuth server. Instead, users are able to configure an htpasswd file to define <code>Authorization: Basic base64(user:pass)</code>-style authentication. In this mode there is no RBAC, users either have an account and may access **Cryostat** or they have no account.
