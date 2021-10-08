import { useContext, useMemo } from 'react'
import QuickForm from '@saeon/quick-form'
import { context as newMetadataFormContext } from '../../_context'
import { context as metadataContext } from '../../../../context'
import FormGroup from '@material-ui/core/FormGroup'
import Collection from './_collection'
import NumberOfRecords from './_number-of-records'
import Schema from './_schema'
import Institution from './_institution'
import DefaultLanguage from './_default-language'
import DefaultSchemaVersion from './_default-schema-version'
import DefaultCreators from './_default-creators'
import DefaultContributors from './_default-contributors'
import DefaultLicense from './_default-license'
import DefaultResourceType from './_default-resource-type'

export const fieldProps = {
  fullWidth: true,
  margin: 'normal',
  variant: 'outlined',
}

const schemaVersions = {
  'saeon-datacite-4-3': ['http://datacite.org/schema/kernel-4'],
  'iso19115-saeon-profile': [''],
}

export default () => {
  const { institutions, schemas } = useContext(metadataContext)
  const { formRef } = useContext(newMetadataFormContext)

  const schemaOptions = useMemo(
    () => schemas.map(name => ({ label: name, value: name })),
    [schemas]
  )

  const institutionOptions = useMemo(
    () => institutions.map(name => ({ label: name, value: name })),
    [institutions]
  )
  return (
    <QuickForm
      effects={[
        form => {
          formRef.current = form
        },
      ]}
      numRecords={1}
      schema={schemaOptions[0]}
      institution={institutionOptions[0]}
      collection={{}}
      metadata={{}}
    >
      {(update, { numRecords, schema, institution, collection, metadata }) => {
        return (
          <FormGroup>
            <NumberOfRecords update={update} numRecords={numRecords} />
            <Schema
              update={obj =>
                update({
                  schema: obj,
                  metadata: Object.assign({ ...metadata }, { schemaVersion: '' }),
                })
              }
              value={schema.value || ''}
              options={schemaOptions}
            />
            <Institution
              update={update}
              institution={institution}
              institutionOptions={institutionOptions}
            />
            <Collection
              formRef={formRef}
              institution={institution.value}
              update={update}
              collection={collection}
            />

            {/* DEFAULT VALUES */}
            <DefaultLanguage
              language={metadata.language}
              update={obj => update({ metadata: Object.assign({ ...metadata }, obj) })}
            />
            <DefaultSchemaVersion
              options={schemaVersions[schema?.value] || ['']}
              value={metadata.schemaVersion || ''}
              update={obj => update({ metadata: Object.assign({ ...metadata }, obj) })}
              schemaVersion={metadata.schemaVersion}
            />
            <DefaultLicense
              rightsList={metadata.rightsList}
              options={['Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)']}
              update={obj => update({ metadata: Object.assign({ ...metadata }, obj) })}
            />
            <DefaultResourceType
              resourceTypeGeneral={metadata.types?.resourceTypeGeneral || ''}
              update={obj => update({ metadata: Object.assign({ ...metadata }, obj) })}
            />

            {/* CREATORS */}
            <DefaultCreators
              update={creators =>
                update({ metadata: Object.assign({ ...formRef.current.metadata }, creators) })
              }
            />

            {/* CONTRIBUTORS */}
            <DefaultContributors
              update={contributors =>
                update({ metadata: Object.assign({ ...formRef.current.metadata }, contributors) })
              }
            />
          </FormGroup>
        )
      }}
    </QuickForm>
  )
}
