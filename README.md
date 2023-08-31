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

- `bundle exec jekyll serve --watch --livereload --open-url --future --config _config.yml,_config-dev.yml`

This will start a local development server, open your default browser pointing to the local build on that server, with the server watching for project filesystem changes and hot-reloading the browser when changes are detected and rebuilt.
