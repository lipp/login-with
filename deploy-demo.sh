#!/usr/bin/env sh
now -e LW_SUBDOMAIN=auth.login-with.com -e LW_JWT_SECRET=@lw-token-secret -e LW_SESSION_SECRET=@lw-session-secret \
	-e LW_REDDIT_CLIENTID=@lw-reddit-clientid -e LW_REDDIT_CLIENTSECRET=@lw-reddit-clientsecret \
	-e LW_LINKEDIN_CLIENTID=@lw-linkedin-clientid -e LW_LINKEDIN_CLIENTSECRET=@lw-linkedin-clientsecret \
	-e LW_INSTAGRAM_CLIENTID=@lw-instagram-clientid -e LW_INSTAGRAM_CLIENTSECRET=@lw-instagram-clientsecret \
	-e LW_GITHUB_CLIENTID=@lw-github-clientid -e LW_GITHUB_CLIENTSECRET=@lw-github-clientsecret \
	-e LW_TWITTER_CONSUMERKEY=@lw-twitter-consumerkey -e LW_TWITTER_CONSUMERSECRET=@lw-twitter-consumersecret \
	-e LW_FACEBOOK_APPID=@lw-facebook-appid -e LW_FACEBOOK_APPSECRET=@lw-facebook-appsecret \
	-e LW_GOOGLE_CLIENTID=@lw-google-clientid -e LW_GOOGLE_CLIENTSECRET=@lw-google-clientsecret && now alias auth.login-with.com
