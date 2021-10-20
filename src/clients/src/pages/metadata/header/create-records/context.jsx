import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { context as metadataContext } from '../../context'
import { gql, useLazyQuery, useMutation } from '@apollo/client'

export const context = createContext()

const Provider = ({
  children,
  institutionOptions,
  schemaOptions,
  schemaVersions,
  licenseOptions,
  rows,
  setRows,
}) => {
  const [form, setForm] = useState({
    numRecords: 1,
    schema: schemaOptions[0],
    institution: institutionOptions[0],
    collectionOptions: [],
    collection: {},
    metadata: {},
  })

  const [createMetadata, { error: createMetadataError, loading: createMetadataLoading }] =
    useMutation(
      gql`
        mutation ($institution: String!, $numberOfRecords: Int, $input: MetadataInput!) {
          createMetadata(
            institution: $institution
            numberOfRecords: $numberOfRecords
            input: $input
          ) {
            id
            doi
            sid
            institution
            collection
            schema
            validated
            errors
            state
            title
          }
        }
      `,
      {
        onCompleted: ({ createMetadata: newRecords }) => {
          setRows([...newRecords.map((record, i) => ({ i: rows.length + i, ...record })), ...rows])
        },
        update: (cache, { data: { createMetadata: newRecords } }) => {
          cache.modify({
            fields: {
              indexedMetadata: (existing = []) => [...newRecords, ...existing],
            },
          })
        },
      }
    )

  const [getCollections, { error, loading: loadingCollections }] = useLazyQuery(
    gql`
      query ($institution: String!) {
        collections(institution: $institution)
      }
    `,
    {
      onCompleted: ({ collections }) => {
        const collectionOptions = collections.map(({ key: value, name: label }) => ({
          value,
          label,
        }))
        setForm({ ...form, collection: collectionOptions[0], collectionOptions })
      },
    }
  )

  useEffect(() => {
    if (form.institution) {
      getCollections({
        variables: {
          institution: form.institution.value,
        },
      })
    }
  }, [form.institution, getCollections])

  if (error) {
    throw error
  }

  return (
    <context.Provider
      value={{
        form,
        setForm,
        loadingCollections,
        schemaVersions,
        schemaOptions,
        licenseOptions,
        institutionOptions,
        createMetadata,
        createMetadataError,
        createMetadataLoading,
      }}
    >
      {children}
    </context.Provider>
  )
}

export default ({ children }) => {
  const { institutions, schemas, rows, setRows } = useContext(metadataContext)

  const schemaOptions = useMemo(
    () => schemas.map(name => ({ label: name, value: name })),
    [schemas]
  )

  const institutionOptions = useMemo(
    () => institutions.map(name => ({ label: name, value: name })),
    [institutions]
  )

  return (
    <Provider
      schemaOptions={schemaOptions}
      institutionOptions={institutionOptions}
      licenseOptions={['Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)']}
      schemaVersions={{
        'saeon-datacite-4-3': ['http://datacite.org/schema/kernel-4'],
        'iso19115-saeon-profile': [''],
      }}
      rows={rows}
      setRows={setRows}
    >
      {children}
    </Provider>
  )
}
