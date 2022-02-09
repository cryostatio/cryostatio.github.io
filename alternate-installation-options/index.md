---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: posts
---

{:.cryostat-heading-1}
Cryostat {{ site.data.versions.cryostat.version }}

## [Alternate Installation Options](#alternate-installation-options)

The recommended method to install the Cryostat Operator is via OperatorHub on the [Get Started](/get-started) page. If needed, see below for alternative methods to install the Cryostat Operator. All of the installation options require [cert-manager](/get-started#install-cert-manager) as a prerequisite.

Once the operator is installed, proceed to the [Setup](/get-started#setup) section of the Get Started page.

### Install with kubectl
```
$ kubectl create namespace cryostat-operator-system
$ kubectl apply -k 'github.com/cryostatio/cryostat-operator//config/default?ref=v{{ site.data.versions.cryostat.version }}'
```

### Install with operator bundle
1. Download [Operator SDK](https://github.com/operator-framework/operator-sdk/releases/tag/v1.5.2) >= 1.5.2
2. Install Operator Lifecycle Manager into your cluster, if not already present.
    ```
    $ operator-sdk olm install
    ```
3. Install the operator bundle
    ```
    $ operator-sdk run bundle quay.io/cryostat/cryostat-operator-bundle:{{ site.data.versions.cryostat.version }}
    ```

## [Uninstalling Cryostat Operator](#uninstalling-cryostat-operator)
Follow steps 1 and 2 in the [Uninstalling Cryostat Operator](/get-started#uninstalling-cryostat-operator) section of the Get Started page. At step 3, run the following instead:

### Uninstall with kubectl
```
$ kubectl delete -k github.com/cryostatio/cryostat-operator//config/default?ref=v{{ site.data.versions.cryostat.version }}
```
### Uninstall with operator bundle
```
$ operator-sdk cleanup cryostat-operator
```