import { useCallback } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import Collection from './_collection'
import NumberOfRecords from './_number-of-records'
import Schema from './_schema'
import Institution from './_institution'
import DefaultLanguage from './_default-language'
import DefaultSchemaVersion from './_default-schema-version'
import DefaultLicense from './_default-license'
import DefaultResourceType from './_default-resource-type'
import ObjectField from './components/obj-field'
import debounce from '../../../../../../lib/fns/debounce'

export const fieldProps = {
  fullWidth: true,
  margin: 'normal',
  variant: 'outlined',
}

export default ({
  form,
  setForm,
  schemaVersions,
  institutionOptions,
  schemaOptions,
  loadingCollections,
  licenseOptions,
}) => {
  const update = useCallback(obj => setForm({ ...form, ...obj }), [form, setForm])

  const updateCreators = useCallback(
    creators => setForm({ ...form, metadata: { ...form.metadata, ...creators } }),
    [form, setForm]
  )

  const updateContributors = useCallback(
    contributors => setForm({ ...form, metadata: { ...form.metadata, ...contributors } }),
    [form, setForm]
  )

  const updateTitles = useCallback(
    titles => setForm({ ...form, metadata: { ...form.metadata, ...titles } }),
    [form, setForm]
  )

  return (
    <FormGroup>
      <NumberOfRecords update={update} numRecords={form.numRecords} />
      <Schema
        update={debounce(obj =>
          update({
            schema: obj,
            metadata: Object.assign({ ...form.metadata }, { schemaVersion: '' }),
          })
        )}
        value={form.schema?.value || ''}
        options={schemaOptions}
      />
      <Institution
        update={debounce(update)}
        institution={form.institution}
        institutionOptions={institutionOptions}
      />
      <Collection
        update={debounce(update)}
        loading={loadingCollections}
        collectionOptions={form.collectionOptions}
        collection={form.collection}
      />

      {/* DEFAULT VALUES */}
      <DefaultLanguage
        language={form.metadata?.language || ''}
        update={debounce(obj => update({ metadata: Object.assign({ ...form.metadata }, obj) }))}
      />
      <DefaultSchemaVersion
        options={schemaVersions[form.schema?.value] || ['']}
        value={form.metadata.schemaVersion || ''}
        update={debounce(obj => update({ metadata: Object.assign({ ...form.metadata }, obj) }))}
        schemaVersion={form.metadata.schemaVersion}
      />
      <DefaultLicense
        rightsList={form.metadata.rightsList}
        options={licenseOptions}
        update={debounce(obj => update({ metadata: Object.assign({ ...form.metadata }, obj) }))}
      />
      <DefaultResourceType
        resourceTypeGeneral={form.metadata.types?.resourceTypeGeneral || ''}
        update={debounce(obj => update({ metadata: Object.assign({ ...form.metadata }, obj) }))}
      />

      {/* CREATORS */}
      <ObjectField
        root="creators"
        update={updateCreators}
        fields={[
          {
            defaultValue: '',
            name: 'name',
            type: 'text',
            helperText: 'Provide (full) name',
            label: 'Name',
          },
          {
            defaultValue: [{ affiliation: '' }],
            name: 'affiliation',
            type: 'arrayOfObjects',
            objectFields: {
              defaultValue: { affiliation: '' },
              name: 'affiliation',
              type: 'text',
              label: 'Affiliation',
              helperText: ({ i }) => `Affiliation ${i + 1}`,
            },
          },
        ]}
      />

      {/* CONTRIBUTORS */}
      <ObjectField
        root="contributors"
        update={updateContributors}
        fields={[
          {
            defaultValue: '',
            name: 'name',
            type: 'text',
            helperText: 'Provide (full) name',
            label: 'Name',
          },
          {
            defaultValue: '',
            name: 'contributorType',
            type: 'select',
            helperText: 'Contribution type?',
            label: 'Contributor type',
            options: ['projectManager', 'HostingInstitution'],
          },
          {
            defaultValue: [{ affiliation: '' }],
            name: 'affiliation',
            type: 'arrayOfObjects',
            objectFields: {
              defaultValue: { affiliation: '' },
              name: 'affiliation',
              type: 'text',
              label: 'Affiliation',
              helperText: ({ i }) => `Affiliation ${i + 1}`,
            },
          },
        ]}
      />

      {/* TITLES */}
      <ObjectField
        root="titles"
        update={updateTitles}
        fields={[
          {
            defaultValue: '',
            name: 'title',
            type: 'text',
            helperText: ({ i }) => `title ${i + 1}`,
            label: 'Title',
          },
        ]}
      />
    </FormGroup>
  )
}
