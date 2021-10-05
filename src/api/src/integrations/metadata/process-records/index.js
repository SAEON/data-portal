import transformForEs from './_transform-for-es.js'
import insertToEs from './_insert-to-es.js'

export default async data => await insertToEs(transformForEs(data))
