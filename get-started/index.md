---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: guides
---

{:.cryostat-heading-1}
Cryostat {{ site.data.versions.cryostat.version }}

## [Installing Cryostat Operator](#installing-cryostat-operator)
Follow the steps below to install the Cryostat Operator via [OperatorHub](https://operatorhub.io/cryostat-operator).

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

### Deploying Cryostat
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

### Deploy an Application
For demo purposes, let's go ahead and deploy a sample application to our
OpenShift cluster in the same namespace as our Cryostat instance. If you have
deployed Cryostat into a namespace where you are already running other
applications, feel free to continue to the next step.

```bash
$ oc new-app --docker-image=quay.io/andrewazores/quarkus-test:0.0.2
$ oc patch svc/quarkus-test -p '{"spec":{"$setElementOrder/ports":[{"port":9096},{"port":9999}],"ports":[{"name":"jfr-jmx","port":9096}]}}'
```

This is a Quarkus container in JVM mode with JMX enabled and pre-configured to
listen on port 9096.  After deploying the container we patch its service to
name the 9096 service port `jfr-jmx`. Cryostat will detect and use this port
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

### Authenticate through Cryostat

#### OpenShift
When deployed in OpenShift, Cryostat will use the existing internal cluster
authentication system to ensure all requests come from users with correct
access to the namespace.

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
granted to it. This access token will eventually expire and you will be
required to log back in on the cluster SSO login page.

#### Kubernetes

When deployed in other Kubernetes environments, Cryostat will use a Bearer
Token authentication scheme. This will require you to paste in an access token
for Cryostat to use when making Kubernetes API requests. You may create and
configure a separate Service Account for Cryostat to use for this purpose, or
you may simply use an access token from your own user account.

[comment]: FIXME This token auth page contains outdated nav drawer and masthead.
{% include howto_step.html
  details-attributes="open"
  summary="OpenShift SSO Login"
  image-name="token-auth-page.png"
%}

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
