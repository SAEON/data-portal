import Ace from './ace'
import { useState, useContext, useRef, useEffect } from 'react'
import { context as databookContext } from '../../context'
import { Toolbar, IconButton, Tabs, Tab, Avatar, Tooltip } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import PlayIcon from 'mdi-react/PlayArrowIcon'
import PlusIcon from 'mdi-react/PlusIcon'
import DeleteIcon from 'mdi-react/DeleteIcon'
import useStyles from '../../style'
import clsx from 'clsx'
import { nanoid } from 'nanoid'

export default () => {
  const { sql, setSql } = useContext(databookContext)
  const activeEditorRef = useRef()
  const [editors, setEditors] = useState([
    {
      id: nanoid(4),
      sql,
    },
  ])
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const classes = useStyles()
  const theme = useTheme()

  useEffect(() => {
    activeEditorRef.current = editors[activeTabIndex]
  }, [activeTabIndex, editors])

  return (
    <div className={clsx(classes.layout, classes.bg)}>
      <Toolbar disableGutters variant="dense" className={clsx(classes.toolbar)}>
        {/* EDITORS */}
        <Tabs
          variant={editors.length > 5 ? 'scrollable' : 'standard'}
          value={activeTabIndex}
          onChange={(event, newValue) => setActiveTabIndex(newValue)}
          aria-label="simple tabs example"
        >
          {editors.map(({ id }, i) => (
            <Tab
              key={id}
              className={clsx(classes.tab)}
              label={
                <Tooltip title={`Query editor ${id}`}>
                  <Avatar className={clsx(classes.smallAvatar)} variant="circle">
                    {i + 1}
                  </Avatar>
                </Tooltip>
              }
              id={`tab-${id}`}
            />
          ))}
        </Tabs>

        {/* ADD TAB BUTTON */}
        <IconButton
          onClick={() => {
            setEditors([...editors, { id: nanoid(4), sql: '' }])
            setActiveTabIndex(editors.length)
          }}
          size="small"
        >
          <PlusIcon size={14} />
        </IconButton>

        {/* PLAY BUTTON */}
        <Tooltip title="Execute query" placement="left-start">
          <IconButton
            className={clsx(classes.playButton)}
            onClick={() => {
              const { sql } = editors[activeTabIndex]
              setSql(sql)
            }}
            size="small"
          >
            <PlayIcon style={{ color: theme.palette.success.main }} />
          </IconButton>
        </Tooltip>
      </Toolbar>
      {editors.map(({ id, sql }, i) => {
        return (
          <div
            key={id}
            style={{ position: 'relative', height: 'calc(100% - 48px)' }}
            role="tabpanel"
            hidden={activeTabIndex !== i}
            id={`simple-tabpanel-${i}`}
            aria-labelledby={`simple-tab-${i}`}
          >
            {activeTabIndex === i && (
              <>
                <Ace ref={activeEditorRef} key={id} sql={sql} />
                <Tooltip title="Close current editor" placement="left-start">
                  <span style={{ zIndex: 99, position: 'absolute', right: 4, bottom: 4 }}>
                    <IconButton
                      onClick={() => {
                        const newEditors = [...editors].filter(({ id: eId }) => id !== eId)
                        setEditors(newEditors)
                        setActiveTabIndex(activeTabIndex - 1)
                      }}
                      disabled={editors.length < 2}
                      size="small"
                    >
                      <DeleteIcon size={20} />
                    </IconButton>
                  </span>
                </Tooltip>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
