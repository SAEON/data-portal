import React, { useContext, forwardRef, useState, useMemo } from 'react'
import { AtlasContext } from '../../../state'
import { SideMenuContext } from '../../index'
import { FixedSizeList as List } from 'react-window'
import { Box, Card, TextField, InputAdornment, Typography, IconButton } from '@material-ui/core'
import { Search as SearchIcon, Close as CloseIcon } from '@material-ui/icons'
import { MessageDialogue, Record } from '../../../../'
import Minisearch from 'minisearch'
import QuickForm from '@saeon/quick-form'
import { debounce } from '../../../../../lib/fns'

const LIST_PADDING_SIZE = 0
const ITEM_SIZE = 32
const ITEM_Y_PADDING = 4
const ITEM_X_PADDING = 2

export default () => {
  const [textSearch, setTextSearch] = useState('')
  const { gqlData } = useContext(AtlasContext)
  const { width, height } = useContext(SideMenuContext)
  const [selectedRecords, setSelectedRecords] = useState([])

  const records = gqlData.data?.catalogue.records.nodes

  const minisearch = useMemo(() => {
    const minisearch = new Minisearch({
      fields: [
        'titles.0.title',
        'descriptions.0.description',
        'creators.0.name',
        'subtitle',
        'contributors.0.name',
      ],
      storeFields: ['id'],
      extractField: (document, fieldName) => {
        return fieldName.split('.').reduce((doc, key) => doc && doc[key], document)
      },
      searchOptions: {
        fuzzy: 0.7,
      },
    })

    if (records) {
      minisearch.addAll(records.map(({ target }) => target._source))
    }

    return minisearch
  }, [records])

  const searchResults = useMemo(() => {
    return textSearch
      ? minisearch.search(textSearch).map(({ id, score }) => [id, score])
      : records?.map(node => [node.target._source.id, undefined]) || []
  }, [records, textSearch, minisearch])

  return (
    <>
      <Box m={1}>
        <QuickForm value={''} effects={[debounce(({ value }) => setTextSearch(value), 250)]}>
          {({ updateForm, value }) => (
            <TextField
              autoComplete="off"
              fullWidth
              id="filter-available-layers"
              size="small"
              value={value}
              onChange={e => updateForm({ value: e.target.value })}
              placeholder="Search layers..."
              variant="outlined"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </QuickForm>
      </Box>
      <Box m={1}>
        <List
          width={width - 16}
          height={height - 48 - 28 - 36}
          innerElementType={forwardRef(({ style, ...otherProps }, ref) => (
            <div
              ref={ref}
              style={{ ...style, height: `${parseFloat(style.height) + LIST_PADDING_SIZE * 2}px` }}
              {...otherProps}
            />
          ))}
          itemCount={searchResults?.length}
          itemSize={ITEM_SIZE + 2 * ITEM_Y_PADDING}
        >
          {({ index, style }) => {
            const id = searchResults[index][0]
            const isSelected = selectedRecords.includes(id)
            const record = records.find(({ target }) => {
              return target._source.id === id
            }).target._source

            return (
              <div
                style={{
                  ...style,
                  top: `${parseFloat(style.top) + LIST_PADDING_SIZE}px`,
                  padding: `${index && ITEM_Y_PADDING}px ${
                    ITEM_X_PADDING + 6
                  }px ${ITEM_Y_PADDING}px ${ITEM_X_PADDING}px`,
                }}
              >
                <Card
                  style={{
                    backgroundColor: isSelected ? 'rgb(0 255 215 / 22%)' : 'rgb(0 0 0 / 5%)',
                    border: isSelected ? '1px solid rgb(0 255 215 / 50%)' : 'inherit',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    cursor: 'pointer',
                  }}
                >
                  {/* Title */}
                  <Typography
                    onClick={() =>
                      selectedRecords.includes(id)
                        ? setSelectedRecords(
                            [...selectedRecords].filter(selectedId => selectedId !== id)
                          )
                        : setSelectedRecords([...selectedRecords, id])
                    }
                    variant="caption"
                    style={{ paddingLeft: 8, alignSelf: 'center' }}
                  >
                    {record.titles[0]?.title.truncate(35)}
                  </Typography>

                  {/* Metadata item controls */}
                  <div style={{ marginLeft: 'auto', alignSelf: 'center' }}>
                    <MessageDialogue
                      title={onClose => (
                        <div style={{ display: 'flex' }}>
                          <Typography style={{ marginRight: 'auto', alignSelf: 'center' }}>
                            METADATA RECORD
                          </Typography>
                          <IconButton
                            onClick={onClose}
                            style={{ marginLeft: 'auto', alignSelf: 'center' }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </div>
                      )}
                      tooltipTitle={`${record.titles[0]?.title} (score: ${
                        searchResults[index][1]?.toFixed(2) || 'NA'
                      })`}
                      iconProps={{ size: 'small', fontSize: 'small' }}
                      dialogueContentProps={{ style: { padding: 0 } }}
                      dialogueProps={{ fullWidth: true }}
                      paperProps={{ style: { maxWidth: 'none' } }}
                    >
                      <Record
                        id={
                          record.alternateIdentifiers?.find(
                            ({ alternateIdentifierType }) =>
                              alternateIdentifierType.toLowerCase() === 'plone'
                          ).alternateIdentifier
                        }
                      />
                    </MessageDialogue>
                  </div>
                </Card>
              </div>
            )
          }}
        </List>
      </Box>
    </>
  )
}
