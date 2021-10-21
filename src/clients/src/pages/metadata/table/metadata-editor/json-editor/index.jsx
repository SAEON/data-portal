import { useContext, useRef } from 'react'
import { context as editorContext } from '../context'
import Fade from '@mui/material/Fade'
import QuickForm from '@saeon/quick-form'
import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-min-noconflict/mode-json'
import 'ace-builds/src-min-noconflict/theme-vibrant_ink'
import 'ace-builds/src-min-noconflict/ext-language_tools'
import debounce from '../../../../../lib/fns/debounce'

export default () => {
  const { activeEditor, json, updateMetadata } = useContext(editorContext)
  const ref = useRef(null)

  const isIn = activeEditor === 'json'

  return (
    <Fade unmountOnExit in={isIn} key="json-editor">
      <span style={{ display: isIn ? 'inherit' : 'none' }}>
        <div style={{ height: 700, width: '100%' }}>
          <QuickForm json={JSON.stringify(json, null, 2)}>
            {(update, { json }) => {
              return (
                <AceEditor
                  ref={e => (ref.current = e)}
                  height="100%"
                  width="100%"
                  name={`ace-editor}`}
                  value={json}
                  onValidate={debounce(annotations => {
                    const error = annotations.find(({ type }) => type === 'error')
                    if (!error) {
                      updateMetadata(json)
                    }
                  })}
                  onChange={debounce(json => update({ json }))}
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
      </span>
    </Fade>
  )
}
