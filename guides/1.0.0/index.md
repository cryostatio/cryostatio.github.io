---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: guides
permalink: /version/1.0.0/guides/
---

{:.cryostat-heading-1}
Cryostat 1.0.0

Create and manage JDK Flight Recordings to troubleshoot your containerized Java applications

{:.cryostat-heading-2}
Now available for Kubernetes 1.19+ and OpenShift 4.6+

## [Installing Cryostat Operator](#installing-cryostat-operator)
Coming soon to [OperatorHub](https://operatorhub.io/). In the meantime, you can install
the Cryostat Operator using kubectl, or by deploying the bundle image with Operator SDK.

### Install cert-manager
The Cryostat Operator requires [cert-manager](https://cert-manager.io/) to run.
If not already installed in your cluster, please 
[install](https://cert-manager.io/docs/installation/) it using your preferred method.
Once installed, proceed with one of the Cryostat Operator installation options below.

### Install with kubectl
```
$ kubectl create namespace cryostat-operator-system
$ kubectl apply -k github.com/cryostatio/cryostat-operator//config/default?ref=v1.0.0
```

### Install with operator bundle
1. Download [Operator SDK](https://github.com/operator-framework/operator-sdk/releases/tag/v1.5.2) >= 1.5.2
2. Install Operator Lifecycle Manager into your cluster, if not already present.
    ```
    $ operator-sdk olm install
    ```
3. Install the operator bundle
    ```
    $ operator-sdk run bundle quay.io/cryostat/cryostat-operator-bundle:1.0.0
    ```

## [Setup](#setup)

### Deploying Cryostat
Create a `Cryostat` object to deploy and set up Cryostat in the `cryostat-operator-system` namespace. For
full details on how to configure the Cryostat deployment, see
[Configuring Cryostat](https://github.com/cryostatio/cryostat-operator/blob/v1.0.0/docs/config.md).

To create the resource manually, use a YAML definition like the following:

```yaml
apiVersion: operator.cryostat.io/v1beta1
kind: Cryostat
metadata:
  name: cryostat-sample
spec:
  minimal: false
```

Or, create the resource graphically in the OperatorHub UI (only available if
you installed Cryostat via operator bundle):

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
When deployed in OpenShift, Cryostat will use the existing internal cluster
authentication system to ensure all requests come from users with correct
access to the namespace. In practical terms, this means that you must supply
your OpenShift account token. When using the web client you will be asked once
when the client first loads, after which your token will be remembered for the
duration of the session so you don't need to re-authenticate on every request.

{% include howto_step.html
  details-attributes="open"
  summary="Token Authentication"
  image-name="token-auth-page.png"
%}

We can retrieve our token like so:

```bash
$ oc whoami -t
```

and paste the output into the `Token` input field.

## [Next Steps](#next-steps)
Now that you have installed and deployed Cryostat and know how to access its
web client, continue on to [Getting Started]({% link getting-started/index.md %}) for
guides through various common actions and workflows.
