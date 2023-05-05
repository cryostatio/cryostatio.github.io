#!/usr/bin/env bash

set -x
set -e

if [ "$#" -ne 1 ]; then
  echo "One argument (web demo branch) required."
  exit 1
fi

scratch="$(mktemp -d)"

function cleanup() {
  rm -rf "${scratch}"
}
trap cleanup EXIT

pushd "${scratch}"
git clone --depth 1 https://github.com/cryostatio/cryostat-web --branch "$1"
pushd cryostat-web
yarn install
yarn run clean
ASSET_PATH=/assets/demo/site/ yarn build:notests
popd
popd

rm -rf assets/demo/site
mkdir -p assets/demo
cp -r "${scratch}/cryostat-web/dist" assets/demo/site
pushd demo
yarn install
yarn format-html -- ../assets/demo/site/index.html
popd
patch -p0 < demo/index.html.patch
