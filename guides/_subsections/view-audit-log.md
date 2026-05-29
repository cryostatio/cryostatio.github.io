## [View the Audit Log](#view-the-audit-log)
**Cryostat** can persist audit history for changes to its entities when
audit logging is enabled. This history includes changes to targets and discovery
data, recordings, automated rules, credentials, diagnostic resources, event
templates, JMC Agent probe templates, garbage collection requests, and
async-profiler recordings.

The **Audit Log** view lets you query audit revisions by time range, inspect the
entities changed by each revision, and download a JSON report for offline audit
analysis. Some revisions might show an unknown user when the change was created
by a system task or another operation without a direct user request context.
Delete revisions may also contain fewer entity details than create or update
revisions.

Audit logging must be enabled for the **Cryostat** deployment before this view
can show audit history. For new **Cryostat Operator** deployments, audit logging
is enabled by default. Existing deployments might require an explicit
configuration update. Because audit history is persisted in the **Cryostat**
database, enabling audit logging can increase storage usage over time. For more
information about enabling or disabling audit logging, see
[Audit Logging](/docs/#audit-logging).

<ol>
  <li>
    {% include howto_step.html
      summary="Navigate to the <i>Security/Audit Log</i> view"
      image-name="4.2.0/audit-log-1.png"
      caption="
        Click <i>Audit Log</i> in the sidebar under the <i>Security</i> heading. The
        view opens with <i>Start Time</i> and <i>End Time</i> controls for
        choosing the audit query range.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Query audit revisions"
      image-name="4.2.0/audit-log-2.png"
      caption="
        Select the <i>Start Time</i> and <i>End Time</i> values for the audit
        history you want to inspect, then click the <i>Query</i> icon button.
        The table displays matching revisions with their revision number,
        timestamp, and username when one is available.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Expand a revision to view entity changes"
      image-name="4.2.0/audit-log-3.png"
      caption="
        Expand a revision row to view the entity changes recorded in that
        revision. Each entity table shows the entity ID, operation type, and
        available fields for the audited entity.
      "
    %}
  </li>
  <li>
    {% include howto_step.html
      summary="Download the audit log report"
      image-name="4.2.0/audit-log-4.png"
      caption="
        After a query returns revisions, click the <i>Download audit log as
        JSON</i> icon button to download the full audit report for the selected
        time range.
      "
    %}
  </li>
</ol>
