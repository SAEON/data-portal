import apolloServerKoa from 'apollo-server-koa'

const { PubSub } = apolloServerKoa

export default new PubSub()

export const DATA_READY = 'DATA_READY'
