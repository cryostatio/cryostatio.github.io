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

### [Using ClusterCryostats](#using-clustercryostats)
In [Deploying Cryostat](/get-started#deploying-cryostat), you created a single-namespace `Cryostat` Custom Resource
(`CR`) instance.

Single-namespace `Cryostat` `CR`s instruct the Operator to deploy restricted Cryostat instances which are only able
to see target applications deployed in the same namespace as the Cryostat instance, which is the same Namespace that
the `CR` is created within.

If you chose to install the Operator in **All Namespaces** mode, you may also be interested in
creating `CluterCryostat` `CR`s. In this configuration, the Operator is able to see `Cryostat` and `ClusterCryostat`
`CR`s in any project (`Namespace`) and create Cryostat deployments corresponding to either `CR` kind. Both of these
`CRs` are `Namespace`-specific, and the `Namespace` is also involved in determining which OpenShift users are able to
access the Cryostat instance. For more information please see the following documents:
- [Multi-namespace](https://github.com/cryostatio/cryostat-operator/blob/main/docs/multi-namespace.md).
- [Authorization Properties](https://github.com/cryostatio/cryostat-operator/blob/main/docs/config.md#authorization-properties)

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
