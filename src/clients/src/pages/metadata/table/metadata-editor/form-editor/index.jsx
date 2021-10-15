import { useContext } from 'react'
import { context as editorContext } from '../context'
import Fade from '@mui/material/Fade'
import ObjectField from '../../../components/obj-form-field'
import FormGroup from '@mui/material/FormGroup'

export default () => {
  const { view, json } = useContext(editorContext)

  const isIn = view === 'form'

  return (
    <Fade unmountOnExit in={isIn} key="form-editor">
      <span style={{ display: isIn ? 'inherit' : 'none' }}>
        <FormGroup>
          {/* TITLES */}
          <ObjectField
            root="titles"
            update={() => null}
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

          {/* CREATORS */}
          <ObjectField
            root="creators"
            update={() => null}
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
            update={() => null}
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
        </FormGroup>
      </span>
    </Fade>
  )
}
