import apolloServerKoa from 'apollo-server-koa'

const { PubSub } = apolloServerKoa

export default new PubSub()

export const POSTGIS_TABLE_EXISTS = 'POSTGIS_TABLE_EXISTS'
