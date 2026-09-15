# cryostatio.github.io

GitHub Pages source for cryostat.io

Made with [Jekyll](https://jekyllrb.com). For development help, see
[Testing your GitHub Pages site locally with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll).

## Development

### Prerequisites

On Fedora, you will likely need to `dnf install:`

- `rubygem-bundler`
- `ruby-devel`
- `rubygems`
- `ruby`
- `make`
- `gcc`
- `gcc-c++`

Other distros should be similar. Then,

- `bundle install`

to install project dependencies.

### Run Locally

- `bundle exec jekyll serve --watch --livereload --open-url --config _config.yml,_config-dev.yml`

This will start a local development server, open your default browser pointing to the local build on that server, with the server watching for project filesystem changes and hot-reloading the browser when changes are detected and rebuilt.

### Versioned documentation

`docs/` and `guides/` contain the latest documentation. Archived releases live in
`version/<version>/docs/` and `version/<version>/guides/`, with their own `index.md`
and `_subsections/`. The shared version selector uses the release list in
`_data/versions.yaml` and only offers versions with an index page for that section.
The Docs section was introduced during 4.1.0, so earlier releases are only listed
under Guides. The 4.1.0 Docs archive was restored from `4cfdc91^`, immediately before
the 4.2.0 release update.

Before updating the latest documentation for a new release:

1. Copy both `docs/` and `guides/` into `version/<outgoing-version>/`, preserving
   their layouts and relative subsection includes.
2. Replace references to `site.data.versions` in the copied content with the
   outgoing release's values, including dependency versions and release branches.
   Pin image paths and links to archived docs and guides to the same release;
   links within the same page can use fragment-only URLs.
3. Add the outgoing version to `documentation` in `_data/versions.yaml`, then
   update the current release values and latest content.
4. Run `bundle exec jekyll build` and check both version selectors, including
   navigation back to Latest and the archived content's links and images.
