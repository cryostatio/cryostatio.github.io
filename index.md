---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

{:.cryostat-heading-1}
Cryostat 1.0.0

Create and manage JDK Flight Recordings to troubleshoot your containerized Java applications

{:.cryostat-heading-2}
Now available for Kubernetes 1.19+ and OpenShift 4.6+

## Installing Cryostat Operator
Coming soon to [OperatorHub](https://operatorhub.io/). In the meantime, you can install
the Cryostat Operator using kubectl, or by deploying the bundle image with Operator SDK.

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

## Deploying Cryostat
Create a `Cryostat` object to deploy and set up Cryostat in the `cryostat-operator-system` namespace. For
full details on how to configure the Cryostat deployment, see
[Configuring Cryostat](https://github.com/cryostatio/cryostat-operator/blob/v1.0.0/docs/config.md).
```yaml
apiVersion: operator.cryostat.io/v1beta1
kind: Cryostat
metadata:
  name: cryostat-sample
spec:
  minimal: false
```
