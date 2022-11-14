FROM nginx:1.20-alpine

ARG GROUP_NAME ${GROUP_NAME}
ARG GROUP_ID ${GROUP_ID}
ARG USER_NAME ${USER_NAME}
ARG USER_ID ${USER_ID}

RUN addgroup -S --g $GROUP_ID $GROUP_NAME && \
		adduser -u $USER_ID -G $USER_NAME -D $USER_NAME && \
		adduser $USER_NAME $GROUP_NAME && \
		chown -R $USER_NAME:$GROUP_NAME /var/cache/nginx && \
		chmod -R g+w /var/cache/nginx && \
		chown -R nginx:nginx /etc/nginx/conf.d

COPY ./infra/docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./infra/docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

USER $USER_NAME

WORKDIR /var/www/backend
