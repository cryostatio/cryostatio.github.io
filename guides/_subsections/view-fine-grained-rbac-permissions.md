## [View Fine-Grained RBAC Permissions](#view-fine-grained-rbac-permissions)
Starting with Cryostat 4.3, Administrators who install Cryostat may now configure it so that Kubernetes/OpenShift Roles are associated with different API accesses. By crafting a set of Roles, RoleBindings to associate users/groups to those roles, and editing the Cryostat instances' individual RBAC mappings, administrators have the flexibility to define a read/write split between different users, or to allow certain users access to JFR only while others also gain access to Heap Dumps, or to prevent any non-admin user from defining new Credentials or Automated Rules, etc.

Alongside this feature, Cryostat supports a Permissions page to view the currently assigned RBAC permissions for the logged in Cryostat user.

<ol>
    <li>
        {% include howto_step.html
          summary="Navigate to the <i>Security/Permissions</i> Tab"
          image-name="4.2.0/view-rbac-permissions-1.png"
          text="Click the <i>Permissions</i> tab under <i>Security</i>. This will display a table showing the RBAC bindings for the currently logged in user. Each cryostat resource, such as recordings and heap dumps has a set of supported actions that can be <b>Authorized</b> or <b>Unauthorized</b> for a given user."
        %}
    </li>
</ol>

Actions that the current user is allowed to perform will be displayed as <b>Authorized</b> while actions that are restricted will be displayed as <b>Unauthorized</b>