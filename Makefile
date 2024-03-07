#!/bin/bash
front-dev:
	(cd ./front && npm run dev)
back-dev:
	(cd ./node && npm run dev)
dnode:
	cd ./node && docker compse up -d
db:
	cd ./node/db && docker composeup -d