#!/usr/bin/env sh
np --no-yarn
if [ $? -eq 0 ]
then
	version=$(git describe --abbrev=0 --tags | cut -c2-)
	docker build -t lipp/login-with:$version -t lipp/login-with:latest . && docker push lipp/login-with:latest && docker push lipp/login-with:$version
else
	exit
fi
