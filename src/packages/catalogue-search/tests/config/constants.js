import dotenv from 'dotenv'
dotenv.config()

export const API_ADDRESS = process.env.API_ADDRESS || 'http://192.168.116.66:9200'
