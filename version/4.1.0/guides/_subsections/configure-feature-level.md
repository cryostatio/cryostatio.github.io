### [Configure Feature Level](#configure-feature-level)
Some features in the **web-client** UI are *Beta*-level features. This indicates that they are still underdoing design and development, and may have significant limitations, or be redesigned or even removed in the future.

For those reasons, *Beta* features are hidden by default in the **Cryostat** UI. They can be enabled by following the steps below.

<ol>
  <li>
    {% include_relative _subsections/common/navigate-to-settings.md %}
  </li>
  <li>
    {% include howto_step.html
      summary="Locate the Advanced settings"
      image-name="4.0.0/advanced-setting.png"
      text="
        The <i>Advanced</i> tab within this view contains a control to set the <b>Feature Level</b> of the UI. This is set to <i>Production</i> by default. You can enable additional features by setting this to <i>Beta</i>, with the aforementioned caveats in mind. Once this is set, a <i>Beta</i> badge will appear on the <b>Cryostat</b> application titlebar. Additional features enabled by this setting, such as <b>Dashboard</b> cards, will be labelled with a similar badge to indicate the feature level. If you set the feature level back to <i>Production</i> then any <i>Beta</i>-level features will be hidden from the UI again.
      "
    %}
  </li>
</ol>
