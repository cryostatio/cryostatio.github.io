---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: get-started
---

{:.cryostat-heading-1}
Cryostat {{ site.data.versions.cryostat.version }}

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

Note: Alternative methods for installing the operator are described in [Alternate Installation Options](/alternate-installation-options) (not recommended).
## [Setup](#setup)

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
applications, feel free to continue to the next step.

```bash
$ oc new-app --docker-image=quay.io/andrewazores/quarkus-test:0.0.10
$ oc patch svc/quarkus-test -p '{"spec":{"$setElementOrder/ports":[{"port":9097},{"port":8080}],"ports":[{"name":"jfr-jmx","port":9097}]}}'
```

This is a Quarkus container in JVM mode with JMX enabled and pre-configured to
listen on port 9097.  After deploying the container we patch its service to
name the 9097 service port `jfr-jmx`. Cryostat will detect and use this port
to determine that this is a compatible Java application that it should monitor.

### Open the Cryostat Web UI
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
either configure Cryostat's built-in Basic authentication system, or better,
place an authenticating reverse proxy server in front of Cryostat so that
accesses to the Cryostat application must first pass through the reverse
proxy. The configuration of a reverse proxy is out of scope of this guide.

##### [Basic Auth](#basic-auth)

Cryostat includes a very rudimentary HTTP Basic authentication implementation.
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
`echo -n PASS | sha256sum | cut -d' ' -f1`. The Basic user credentials `user:pass`
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
