import React, { useContext, useEffect, useState } from 'react'
import PageContent from './layout/content/index'
import Header from './layout/header'
import { CatalogueContext } from '../../modules/provider-catalogue'
import useStyles from './style'
import clsx from 'clsx'

const getSearchState = () =>
  decodeURIComponent(window.location.search.replace('?search=', ''))
    .split(',')
    .filter(_ => _)

export default () => {
  const { themes } = useContext(CatalogueContext)
  const classes = useStyles()

  const [subjects, updateSubjects] = useState(getSearchState())

  useEffect(() => {
    const newSubjects = getSearchState()
    if (newSubjects.length !== subjects.length) {
      updateSubjects(getSearchState())
    }
  })

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <div
        className={clsx({
          [classes.root]: true,
        })}
      >
        <Header themes={themes} updateSubjects={updateSubjects} />
        <PageContent subjects={subjects} />
      </div>
    </div>
  )
}
