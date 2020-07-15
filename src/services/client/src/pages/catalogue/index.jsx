import React, { useEffect, useState } from 'react'
import PageContent from './layout/content/index'
import Header from './layout/header'
import { getStateFromUri } from '../../lib/uri-state'

export default () => {
  const { terms = [] } = getStateFromUri()
  const [subjects, updateSubjects] = useState(terms) // TODO I think this is needed to trigger updates to children. But seems

  useEffect(() => {
    if (terms.length !== subjects.length) {
      updateSubjects(terms)
    }
  })

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <div style={{ height: '100%' }}>
        <Header updateSubjects={updateSubjects} />
        <PageContent subjects={subjects} />
      </div>
    </div>
  )
}
