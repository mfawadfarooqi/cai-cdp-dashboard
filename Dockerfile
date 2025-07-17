FROM node:14-alpine as builder
COPY package*.json ./
RUN npm install --legacy-peer-deps && mkdir /ng-app && mv ./node_modules ./ng-app
WORKDIR /ng-app
COPY . .
RUN npm run ng build --aot --staging --source-map=false --max_old_space_size=8192
FROM nginx:stable-alpine
RUN mkdir -p /usr/share/nginx/html/cdpfrontend/dist \
#&& mkdir -p /etc/nginx/certs/ \
#&& mkdir -p /etc/letsencrypt/live/cydea.tech/
RUN apk add nano iputils bash
COPY --from=builder /ng-app/dist /usr/share/nginx/html/cdpfrontend/dist/
#ADD fullchain1.pem  /etc/letsencrypt/live/cydea.tech/
#ADD privkey1.pem  /etc/letsencrypt/live/cydea.tech/
#ADD options-ssl-nginx.conf /etc/letsencrypt/
RUN addgroup -g 1000 -S www-data \
&& adduser -u 1000 -D -S -G www-data www-data ||:
#ADD nginx.conf /etc/nginx/
RUN chmod 775 -R /usr/share/nginx/html
ADD cdpfrontend.conf /etc/nginx/conf.d/
EXPOSE 7500:7500
