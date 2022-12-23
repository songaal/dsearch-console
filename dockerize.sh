#!/bin/bash
npm cache clean -f
npm install
npm install -g yarn
export VERSION="$(cat package.json | grep version | head -1 | awk -F= "{ print $2 }" | sed -E 's/(version)|[:,\",]//g' | tr -d '[[:space:]]')"
yarn build --reset-cache
docker build -t dcr.danawa.io/dsearch-console-dev:latest .
docker tag dcr.danawa.io/dsearch-console-dev:latest dcr.danawa.io/dsearch-console-dev:${VERSION}
docker push dcr.danawa.io/dsearch-console-dev:latest
docker push dcr.danawa.io/dsearch-console-dev:${VERSION}
