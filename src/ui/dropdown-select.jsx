import React, { PureComponent } from 'react'
import debounce from '../lib/debounce'
import { TextField, FontIcon, DropdownMenu, ListItemControl, SelectionControl, List, ListItem } from 'react-md'
import sift from 'sift'

const listItemStyle = {
  backgroundColor: 'rgba(220, 220, 220, 0.5)',
  margin: '2px 0'
}

export default class extends PureComponent {
  state = { searchTerm: '', filteredItems: [], visible: false }

  componentDidMount() {
    this.updateItems()
  }

  updateItems = () =>
    this.setState({
      filteredItems: (this.state.searchTerm
        ? [...this.props.items].filter(item =>
            item.value.toUpperCase().indexOf(this.state.searchTerm) >= 0 || this.props.selectedItems.includes(item.id)
              ? true
              : false
          )
        : [...this.props.items]
      )
        .sort((a, b) => {
          const aVal = a.value.toUpperCase()
          const bVal = b.value.toUpperCase()
          return aVal >= bVal ? 1 : -1
        })
        .splice(0, 20)
    })

  updateSearchTerm = searchTerm =>
    this.setState({ searchTerm: searchTerm.toUpperCase(), visible: true }, debounce(() => this.updateItems()))

  toggleItemSelect = item => {
    const { id, selectedItems, onItemToggle } = this.props

    onItemToggle({
      id,
      selectedItems: selectedItems.includes(item.id)
        ? [...selectedItems].filter(id => (id === item.id ? false : true))
        : [...selectedItems, item.id]
    })
  }

  render() {
    const { updateSearchTerm, toggleItemSelect } = this
    const { searchTerm, filteredItems } = this.state
    const { selectedItems, items, id, label } = this.props

    return (
      <>
        <DropdownMenu
          id={`filter-component-${label}-${id}`}
          style={{ width: '100%' }}
          listStyle={{ width: '100%' }}
          defaultVisible={false}
          visible={this.state.visible}
          onVisibilityChange={() => this.setState({ visible: !this.state.visible })}
          anchor={{
            x: DropdownMenu.HorizontalAnchors.INNER_LEFT,
            y: DropdownMenu.VerticalAnchors.BOTTOM
          }}
          position={DropdownMenu.Positions.BELOW}
          menuItems={(() => {
            const result =
              filteredItems.length > 0
                ? filteredItems.map(item => (
                    <ListItemControl
                      key={item.id}
                      primaryAction={
                        <SelectionControl
                          id={`filter-select-option-${item.id}-${item.label}`}
                          name={'filter-select-option'}
                          onChange={() => toggleItemSelect(item)}
                          type={'checkbox'}
                          label={(item.value || '(UNKNOWN)').truncate(25).toUpperCase()}
                          checked={selectedItems.includes(item.id) ? true : false}
                          labelBefore
                        />
                      }
                    />
                  ))
                : 'No search result'

            if (result.length >= 20) result.push('...')
            return result
          })()}
        >
          <TextField
            id={`atlas-filter-${id}`}
            key={id}
            autoComplete="off"
            style={{ width: '100%' }}
            leftIcon={<FontIcon>search</FontIcon>}
            label={label}
            onChange={val => updateSearchTerm(val)}
            fullWidth={true}
            value={searchTerm}
          />
        </DropdownMenu>
        <List>
          {items
            .filter(sift({ id: { $in: selectedItems } }))
            .sort((a, b) => {
              const aVal = a.value.toUpperCase()
              const bVal = b.value.toUpperCase()
              return aVal >= bVal ? 1 : -1
            })
            .map(item => (
              <ListItem
                style={listItemStyle}
                key={item.id}
                onClick={() => toggleItemSelect(item)}
                rightIcon={<FontIcon>close</FontIcon>}
                primaryText={(item.value || '(UNKNOWN)').truncate(25).toUpperCase()}
              />
            ))}
        </List>
      </>
    )
  }
}
