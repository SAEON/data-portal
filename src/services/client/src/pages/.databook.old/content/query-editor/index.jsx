import { useContext, useRef, useEffect } from 'react'
import useLocalStorage from '../../../../hooks/use-localstorage'
import { context as databookContext } from '../../context'
import Header from './header'
import Editor from './editor'
import useStyles from '../../style'
import clsx from 'clsx'
import { nanoid } from 'nanoid'

export default () => {
  const classes = useStyles()
  const activeEditorRef = useRef()
  const { sql, setSql, databook, abortQuery } = useContext(databookContext)
  const { _id: databookId } = databook.doc

  /**
   * Ace editor maintains it's own state, but syncs to
   * localstorage lazily so that on page reload the SQL
   * is kept
   */
  const [activeTabIndex, setActiveTabIndex] = useLocalStorage(`${databookId}-activeEditorIndex`, 0)
  const [editors, setEditors] = useLocalStorage(`${databookId}-editors`, [
    {
      id: nanoid(4),
      sql,
    },
  ])

  /**
   * Set the active editor on component load
   * This will always be the last editor
   */
  useEffect(() => {
    activeEditorRef.current = editors[activeTabIndex] || -1
  }, [activeTabIndex, editors])

  return (
    <div className={clsx(classes.layout, classes.bg)}>
      {/* TOOLBAR */}
      <Header
        editors={editors}
        activeTabIndex={activeTabIndex}
        addEditorFn={() => {
          setEditors([...editors, { id: nanoid(4), sql: '' }])
          setActiveTabIndex(editors.length)
        }}
        setActiveTabFn={(event, newValue) => setActiveTabIndex(newValue)}
        executeQueryFn={() => {
          const { sql } = editors[activeTabIndex]
          setSql(sql)
        }}
        cancelQueryFn={abortQuery}
      />

      {/* EDITORS */}
      {editors.map((editor, tabIndex) => {
        const { id } = editor

        if (activeTabIndex !== tabIndex) {
          return null
        }

        return (
          <Editor
            key={id}
            editor={editor}
            disableCloseBtn={editors.length < 2}
            activeEditorRef={activeEditorRef}
            updateCacheFn={sql => {
              setImmediate(() => {
                setEditors(
                  [...editors].map(editor =>
                    editor.id === id ? Object.assign({ ...editor }, { sql }) : editor
                  )
                )
              })
            }}
            closeEditorFn={() => {
              const newEditors = [...editors].filter(({ id: eId }) => id !== eId)
              setEditors(newEditors)
              setActiveTabIndex(activeTabIndex - 1)
            }}
          />
        )
      })}
    </div>
  )
}
