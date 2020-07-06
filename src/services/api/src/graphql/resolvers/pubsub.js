import apolloServerKoa from 'apollo-server-koa'

const { PubSub } = apolloServerKoa

export default new PubSub()

export const ON_FILTER_CHANGE = 'ON_FILTER_CHANGE'
