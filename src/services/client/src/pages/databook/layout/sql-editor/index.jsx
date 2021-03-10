import { useContext, useRef, useEffect } from 'react'
import useLocalStorage from '../../../../hooks/use-localstorage'
import { context as dataContext } from '../../contexts/data-provider'
import { context as databookContext } from '../../contexts/databook-provider'
import useStyles from '../../style'
import clsx from 'clsx'
import { nanoid } from 'nanoid'
import Header from './header'
import Editor from './editor'
import useTheme from '@material-ui/core/styles/useTheme'

export default () => {
  const { id: databookId } = useContext(databookContext)
  const { exeSqlQuery, cancelSqlQuery } = useContext(dataContext)
  const defaultSql = ''
  const classes = useStyles()
  const activeEditorRef = useRef()
  const theme = useTheme()

  /**
   * Ace editor maintains it's own state, but syncs to
   * localstorage lazily so that on page reload the SQL
   * is kept
   */
  const [activeTabIndex, setActiveTabIndex] = useLocalStorage(`${databookId}-activeEditorIndex`, 0)
  const [editors, setEditors] = useLocalStorage(`${databookId}-editors`, [
    {
      id: nanoid(4),
      sql: defaultSql,
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
    <div className={clsx(classes.layout)} style={{ backgroundColor: theme.backgroundColor }}>
      {/* TOOLBAR (Tab headers) */}
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
          exeSqlQuery(sql)
        }}
        cancelQueryFn={cancelSqlQuery}
      />

      {/* EDITORS (Tab Panels) */}
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
              setActiveTabIndex(activeTabIndex > 0 ? activeTabIndex - 1 : 0)
            }}
          />
        )
      })}
    </div>
  )
}
