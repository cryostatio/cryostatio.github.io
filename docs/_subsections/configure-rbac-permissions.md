## [Configure RBAC Permissions](#configure-rbac-permissions)

Starting with **Cryostat** 4.3, Administrators who install **Cryostat** may now configure it so that Kubernetes/OpenShift Roles are associated with different API accesses. By crafting a set of Roles, RoleBindings to associate users/groups to those roles, and editing the Cryostat instances' individual RBAC mappings, administrators have the flexibility to define a read/write split between different users, or to allow certain users access to JFR only while others also gain access to Heap Dumps, or to prevent any non-admin user from defining new Credentials or Automated Rules, etc.

The **Cryostat Operator** supports this linking of Kubernetes/Openshift Roles to Cryostat RBAC mappings through a number of **Custom Resource** properties under <code>authorizationOptions: rbacPermissions</code>:

```yaml
spec:
  authorizationOptions:
    rbacPermissions:
      activerecordings:delete: pods/exec:create
      activerecordings:read: pods:get
      activerecordings:write: pods/exec:create
      archivedrecordings:delete: pods/exec:create
      archivedrecordings:read: pods:get
      archivedrecordings:write: pods/exec:create
      asyncprofiler:delete: pods/exec:create
      asyncprofiler:read: pods:get
      asyncprofiler:write: pods/exec:create
      audit:read: pods/exec:create
      automatedrules:delete: pods/exec:create
      automatedrules:read: pods:get
      automatedrules:write: pods/exec:create
      certificates:read: pods:get
      credentials:delete: pods/exec:create
      credentials:read: pods:get
      credentials:write: pods/exec:create
      discoverynodes:read: pods:get
      discoverynodes:write: pods/exec:create
      discoveryplugins:delete: pods/exec:create
      discoveryplugins:read: pods:get
      discoveryplugins:write: pods/exec:create
      eventtemplates:delete: pods/exec:create
      eventtemplates:read: pods:get
      eventtemplates:write: pods/exec:create
      eventtypes:read: pods:get
      heapdumps:delete: pods/exec:create
      heapdumps:read: pods:get
      heapdumps:write: pods/exec:create
      matchexpressions:read: pods:get
      probes:delete: pods/exec:create
      probes:read: pods:get
      probes:write: pods/exec:create
      probetemplates:delete: pods/exec:create
      probetemplates:read: pods:get
      probetemplates:write: pods/exec:create
      recordingmetadata:read: pods:get
      recordingmetadata:write: pods/exec:create
      reports:read: pods:get
      reports:write: pods/exec:create
      targets:delete: pods/exec:create
      targets:read: pods:get
      targets:write: pods/exec:create
      threaddumps:delete: pods/exec:create
      threaddumps:read: pods:get
      threaddumps:write: pods/exec:create
      unifiedlogs:delete: pods/exec:create
      unifiedlogs:read: pods:get
      unifiedlogs:write: pods/exec:create
```

This configuration will set up **Read-Only** access to a user with **Read-Only** access to the cryostat namespace, as they will have the <code>pods:get</code> permission but not the <code>pods/exec:create</code> permission. Under this configuration **Cryostat** will allow read operations ex. view active recordings, view archives, list event templates and event types, but deny any write or delete operations.

By default, **Cryostat** will fall back on the <code>pods/exec:create</code> permission to map to any permissions not explicitly configured. This can be overridden using the <code> rbacDefaultPermissions: defaultPermission </code> property, or tuned more granularly through <code> defaultReadPermission, defaultWritePermission, </code> and <code> defaultDeletePermission </code>

```yaml
spec:
    authorizationOptions:
        rbacDefaultPermissions:
            defaultReadPermission: pods:get
            defaultWritePermission: pods/exec:create
            defaultDeletePermission: pods/exec:create
            defaultPermission: pods/exec:create
```

Kubernetes RBAC also allows for authorization checks on resource names by pure string matching: the named permission does not need to actually be associated with a real resource Kind in the cluster. It is therefore possible to configure **Cryostat** as follows:

```yaml
spec:
  authorizationOptions:
    # Deny by default. Any permission without an explicit mapping below falls
    # through to these, which point at a synthetic resource that no Role grants.
    rbacDefaultPermissions:
      defaultReadPermission: cryostatnothing:get
      defaultWritePermission: cryostatnothing:get
      defaultDeletePermission: cryostatnothing:get
      defaultPermission: cryostatnothing:get

    rbacPermissions:
      "activerecordings:read": cryostatactiverecordings:get
      "activerecordings:write": cryostatactiverecordings:update
      "activerecordings:delete": cryostatactiverecordings:delete

      "archivedrecordings:read": cryostatarchivedrecordings:get
      "archivedrecordings:write": cryostatarchivedrecordings:update
      "archivedrecordings:delete": cryostatarchivedrecordings:delete

      ...
```

Individual users or user groups can then be granted granular permissions within the **Cryostat** API using standard Kubernetes Roles:

```yaml
kind: Role
metadata:
  name: cryostat-all-reader
  namespace: cryostat-installation-namespace
rules:
  # Entry gate. The auth proxy performs a SelfSubjectAccessReview for
  # "get pods" in the install namespace before any request reaches Cryostat.
  # Without this rule the user is rejected at the proxy and none of the
  # permissions below are ever evaluated.
  - apiGroups:
      - ""
    resources:
      - pods
    verbs:
      - get

  - apiGroups:
      - ""
    resources:
      - cryostatactiverecordings
      - cryostatarchivedrecordings
      ...
    verbs:
      - get
```

Then you can create a <code>RoleBinding</code> to grant the readonly set of permissions to a user. This can be combined with a tiered ladder of read-write permissions and read-write-delete (all actions) permissions to grant different users varying levels of access within Cryostat. Using this same concept it is also possible to separate permissions for different resource types: for example, you can configure **Cryostat** such that some users have access to only `Flight Recorder` while others also gain access to `Heap Dumps`.

These permission checks are performed within the **Cryostat** instance's installation namespace (the namespace where the Custom Resource is located) by default, so users need to hold the appropriate permissions via a <code>Role</code> within that namespace. You may also configure **Cryostat** to require a <code>ClusterRole</code> and <code>ClusterRoleBinding</code>:

```yaml
spec:
  authorizationOptions:
    # users/clients only need to hold the given permission in the CR
    # installation namespace (cryostat-rbac), not cluster-wide
    namespacedRBACPermissions: true
```

By default, **Cryostat** will cache SSAR decisions for 1 minute, this can be overridden by setting the <code>decisionCacheTTL</code> property to 0s, ensuring that a fresh SSAR is performed for each operation:

```yaml
spec:
    authorizationOptions:
        RBACCacheOptions:
            decisionCacheTTL: 0s
```

To view the RBAC Mappings for a given user within **Cryostat**, see [View Fine-Grained RBAC Permissions](/guides/#view-fine-grained-rbac-permissions)
