import { updateValidationRules } from '../../../../src/mongo/index.js'

export default async () => {
  console.info('Updating validation rules...')
  await updateValidationRules()
}
