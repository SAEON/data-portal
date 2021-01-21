import publicServer, { schema as _publicSchema } from './public-facing/index.js'
import internalServer, { schema as _internalSchema } from './internal/index.js'

export const publicSchema = _publicSchema
export const internalSchema = _internalSchema
export default {
  publicServer,
  internalServer,
}
