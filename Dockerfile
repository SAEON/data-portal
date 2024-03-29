# Build client
FROM node:20.4.0 as client

ARG API_ADDRESS=http://localhost:3000
ARG CLIENTS_DEFAULT_NOTICES="Welcome to the SAEON Data Portal!,info"
ARG CLIENTS_PUBLIC_ADDRESS=http://localhost:3000
ARG CLIENTS_SEARCH_FILTER_CONFIG_PATH=client-filters.json
ARG CURATOR_CONTACT=Missing contact information
ARG DEPLOYMENT_ENV=development
ARG ESRI_API_KEY=''
ARG PROXY_ADDRESS=https://proxy.saeon.ac.za
ARG TECHNICAL_CONTACT=Missing contact information

WORKDIR /data-portal-clients

RUN echo "API_ADDRESS=$API_ADDRESS" > .env
RUN echo "CLIENTS_DEFAULT_NOTICES=$CLIENTS_DEFAULT_NOTICES" >> .env
RUN echo "CLIENTS_PUBLIC_ADDRESS=$CLIENTS_PUBLIC_ADDRESS" >> .env
RUN echo "CLIENTS_SEARCH_FILTER_CONFIG_PATH$CLIENTS_SEARCH_FILTER_CONFIG_PATH" >> .env
RUN echo "CURATOR_CONTACT=$CURATOR_CONTACT" >> .env
RUN echo "DEPLOYMENT_ENV=$DEPLOYMENT_ENV" >> .env
RUN echo "ESRI_API_KEY=$ESRI_API_KEY" >> .env
RUN echo "PROXY_ADDRESS=$PROXY_ADDRESS" >> .env
RUN echo "TECHNICAL_CONTACT=$TECHNICAL_CONTACT" >> .env

COPY clients .
RUN npm install -g chomp@0.2.17 & npm ci --omit=dev
RUN chomp build

# Build API
FROM node:20.4.0-alpine

ARG ALLOWED_ORIGINS
ARG API_ADDRESS
ARG APP_KEY
ARG CLIENT_FILTER_CONFIG_PATH
ARG CURATOR_CONTACT
ARG DEFAULT_ADMIN_EMAIL_ADDRESSES
ARG DEFAULT_SYSADMIN_EMAIL_ADDRESSES
ARG DEPLOYMENT_ENV
ARG DOCKER_DATA_VOLUME
ARG DOCKER_NETWORK
ARG DOCKER_TMP_VOLUME
ARG ELASTICSEARCH_ADDRESS
ARG HOSTNAME
ARG LOG_QUERY_DETAILS
ARG MONGO_DB
ARG MONGO_DB_ADDRESS
ARG MONGO_DB_PASSWORD
ARG MONGO_DB_USERNAME
ARG NODE_ENV
ARG NODE_TLS_REJECT_UNAUTHORIZED
ARG ODP_CLIENT_ID
ARG ODP_HOSTNAME
ARG ODP_CLIENT_AUTH_SCOPES
ARG ODP_CLIENT_SECRET
ARG ODP_FILTER_PATH
ARG ODP_SSO_CLIENT_ID
ARG ODP_SSO_CLIENT_SCOPES
ARG ODP_SSO_CLIENT_SECRET
ARG SAEON_ODP_INTEGRATION_SCHEDULE
ARG SITEMAP_INTEGRATION_SCHEDULE
ARG TECHNICAL_CONTACT
ARG TZ

ENV ALLOWED_ORIGINS=$ALLOWED_ORIGINS
ENV API_ADDRESS=$API_ADDRESS
ENV APP_KEY=$APP_KEY
ENV CLIENT_FILTER_CONFIG_PATH=$CLIENT_FILTER_CONFIG_PATH
ENV CURATOR_CONTACT=$CURATOR_CONTACT
ENV DEFAULT_ADMIN_EMAIL_ADDRESSES=$DEFAULT_ADMIN_EMAIL_ADDRESSES
ENV DEFAULT_SYSADMIN_EMAIL_ADDRESSES=$DEFAULT_SYSADMIN_EMAIL_ADDRESSES
ENV DEPLOYMENT_ENV=$DEPLOYMENT_ENV
ENV DOCKER_DATA_VOLUME=$DOCKER_DATA_VOLUME
ENV DOCKER_NETWORK=$DOCKER_NETWORK
ENV DOCKER_TMP_VOLUME=$DOCKER_TMP_VOLUME
ENV ELASTICSEARCH_ADDRESS=$ELASTICSEARCH_ADDRESS
ENV HOSTNAME=$HOSTNAME
ENV LOG_QUERY_DETAILS=$LOG_QUERY_DETAILS
ENV MONGO_DB_ADDRESS=$MONGO_DB_ADDRESS
ENV MONGO_DB_PASSWORD=$MONGO_DB_PASSWORD
ENV MONGO_DB_USERNAME=$MONGO_DB_USERNAME
ENV MONGO_DB=$MONGO_DB
ENV NODE_ENV=$NODE_ENV
ENV NODE_TLS_REJECT_UNAUTHORIZED=$NODE_TLS_REJECT_UNAUTHORIZED
ENV ODP_CLIENT_ID=$ODP_CLIENT_ID
ENV ODP_HOSTNAME=$ODP_HOSTNAME
ENV ODP_CLIENT_AUTH_SCOPES=$ODP_CLIENT_AUTH_SCOPES
ENV ODP_CLIENT_SECRET=$ODP_CLIENT_SECRET
ENV ODP_FILTER_PATH=$ODP_FILTER_PATH
ENV ODP_SSO_CLIENT_ID=$ODP_SSO_CLIENT_ID
ENV ODP_SSO_CLIENT_SCOPES=$ODP_SSO_CLIENT_SCOPES
ENV ODP_SSO_CLIENT_SECRET=$ODP_SSO_CLIENT_SECRET
ENV SAEON_ODP_INTEGRATION_SCHEDULE=$SAEON_ODP_INTEGRATION_SCHEDULE
ENV SITEMAP_INTEGRATION_SCHEDULE=$SITEMAP_INTEGRATION_SCHEDULE
ENV TECHNICAL_CONTACT=$TECHNICAL_CONTACT
ENV TZ=$TZ

WORKDIR /app
COPY api .
COPY --from=client /data-portal-clients/dist /app/src/clients
RUN npm ci --omit=dev
ENV PATH="$PATH:/app/bin"
RUN chmod +x bin/sdp
RUN chmod +x bin/start

EXPOSE 3000
CMD start