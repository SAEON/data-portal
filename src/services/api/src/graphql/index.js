import publicServer, { schema as _publicSchema } from './api-public/index.js'
import internalServer, { schema as _internalSchema } from './api-internal/index.js'

export const publicSchema = _publicSchema
export const internalSchema = _internalSchema
export default {
  publicServer,
  internalServer,
}
