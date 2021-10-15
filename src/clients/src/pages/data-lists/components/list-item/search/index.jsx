import { useContext, useRef, memo, useCallback } from 'react'
import { context as listContext } from '../_context'
import CardContent from '@mui/material/CardContent'
import Collapse from '../../../../../components/collapse'
import QuickForm from '@saeon/quick-form'
import debounce from '../../../../../lib/fns/debounce'
import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-min-noconflict/mode-json'
import 'ace-builds/src-min-noconflict/theme-vibrant_ink'
import 'ace-builds/src-min-noconflict/ext-language_tools'

const Editor = memo(
  ({ update, search, id }) => {
    const ref = useRef(null)

    const doUpdate = useCallback(
      obj => {
        if (JSON.stringify(search) !== JSON.stringify(obj.search)) {
          update(obj)
        }
      },
      [search, update]
    )

    return (
      <Collapse title="Search" subheader="Configure list search DSL object" defaultExpanded>
        <CardContent>
          <div style={{ height: 800, width: '100%' }}>
            <QuickForm search={JSON.stringify(search, null, 2)}>
              {(updateQ, { search }) => {
                return (
                  <AceEditor
                    ref={e => (ref.current = e)}
                    height="100%"
                    width="100%"
                    name={`ace-editor-${id}`}
                    value={search}
                    onValidate={debounce(annotations => {
                      const error = annotations.find(({ type }) => type === 'error')
                      if (error) {
                        doUpdate({ preventSave: JSON.stringify(error) })
                      } else {
                        doUpdate({ search: JSON.parse(search), preventSave: false })
                      }
                    }, 500)}
                    onChange={debounce(search => updateQ({ search }))}
                    editorProps={{ $blockScrolling: false, $blockSelectEnabled: true }}
                    mode="json"
                    theme="vibrant_ink"
                    setOptions={{
                      wrap: true,
                      enableBasicAutocompletion: false,
                      enableLiveAutocompletion: false,
                      enableSnippets: false,
                      firstLineNumber: 1,
                      newLineMode: 'unix',
                      useSoftTabs: true,
                      tabSize: 2,
                      scrollPastEnd: 8,
                      selectionStyle: 'line',
                      highlightActiveLine: true,
                      highlightSelectedWord: true,
                      cursorStyle: 'ace',
                      animatedScroll: true,
                      displayIndentGuides: true,
                      fadeFoldWidgets: true,
                      vScrollBarAlwaysVisible: false,
                      scrollSpeed: 1,
                      highlightGutterLine: true,
                      fontSize: 12,
                      fixedWidthGutter: true,
                      showPrintMargin: false,
                    }}
                  />
                )
              }}
            </QuickForm>
          </div>
        </CardContent>
      </Collapse>
    )
  },
  () => true
)

export default () => {
  const props = useContext(listContext)
  return <Editor {...props} />
}
