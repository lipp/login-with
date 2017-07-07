#!/usr/bin/env sh
np
if [ $? -eq 0 ]
then
	version=$(git describe --abbrev=0 --tags | cut -c2-)
	docker build -t lipp/login-with:$version -i lipp/login-with:latest . && docker push lipp/login-with
else
	exit
fi
