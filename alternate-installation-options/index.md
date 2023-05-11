---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---

{:.cryostat-heading-1}
Cryostat {{ site.data.versions.cryostat.version }}

* auto-gen TOC:
{:toc}

## [Alternate Installation Options](#alternate-installation-options)

The recommended method to install the Cryostat Operator is via OperatorHub on the [Get Started](/get-started) page. If needed, see below for alternative methods to install the Cryostat Operator. All of the installation options require [cert-manager](/get-started#install-cert-manager) as a prerequisite.

Once the operator is installed, proceed to the [Setup](/get-started#setup) section of the Get Started page.

### [Install with kubectl](#install-with-kubectl)
```
$ kubectl create namespace cryostat-operator-system
$ kubectl apply -k 'github.com/cryostatio/cryostat-operator//config/default?ref=v{{ site.data.versions.cryostat.version }}'
```

### [Install with operator bundle](#install-with-operator-bundle)
1. Download [Operator SDK](https://github.com/operator-framework/operator-sdk/releases/tag/v{{ site.data.versions.operator-sdk.version }}) >= {{ site.data.versions.operator-sdk.version }}
2. Install Operator Lifecycle Manager into your cluster, if not already present.
    ```
    $ operator-sdk olm install
    ```
3. Install the operator bundle
    ```
    $ operator-sdk run bundle quay.io/cryostat/cryostat-operator-bundle:{{ site.data.versions.cryostat.version }}
    ```

### [Using ClusterCryostats](#using-clustercryostats)
In [Deploying Cryostat](/get-started#deploying-cryostat), you created a single-namespace `Cryostat` Custom Resource
(`CR`) instance.

Single-namespace `Cryostat` `CR`s instruct the Operator to deploy restricted Cryostat instances which are only able
to see target applications deployed in the same namespace as the Cryostat instance, which is the same Namespace that
the `CR` is created within.

If you chose to install the Operator in **All Namespaces** mode, you may also be interested in
creating `CluterCryostat` `CR`s. In this configuration, the Operator is able to see `Cryostat` and `ClusterCryostat`
`CR`s in any project (`Namespace`) and create Cryostat deployments corresponding to either `CR` kind.

`ClusterCryostat` `CR`s instruct the Operator to deploy cross-namespace Cryostat instances. A `ClusterCryostat` has
an `installNamespace`, which is the namespace where the Cryostat `Deployment` will reside, and a list of
`targetNamespaces`, which are all of the namespaces that the Cryostat server will watch for target applications.
The `targetNamespaces` list does not necessarily need to contain the `installNamespace`, if you do not want Cryostat
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

## [Uninstalling Cryostat Operator](#uninstalling-cryostat-operator)
Follow step 1 in the [Uninstalling Cryostat Operator](/get-started#uninstalling-cryostat-operator) section of the Get Started page. At step 2, run the following instead:

### [Uninstall with kubectl](#uninstall-with-kubectl)
```
$ kubectl delete -k github.com/cryostatio/cryostat-operator//config/default?ref=v{{ site.data.versions.cryostat.version }}
```
### [Uninstall with operator bundle](#uninstall-with-operator-bundle)
```
$ operator-sdk cleanup cryostat-operator
```
