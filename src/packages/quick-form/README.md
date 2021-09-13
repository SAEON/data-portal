# @saeon/quick-form
Quickly add localised state to your component tree - there are many form-helper libraries in the world. Many of them try to draw components, which makes these libraries larger than necessary, limited in terms of what they include, and generally unnecessary considering how easy React makes it to manage state.

# Usage

#### First install it
```sh
npm i @saeon/quick-form
```

#### Then include it in your project
```js
import Q from '@saeon/quick-form'
```

#### And then use it

```jsx
const Component = props => (
  <MyForm>
    <Q value1={false} value2={true}>
      {(updateForm, { value1, value2 }) => (
        <div>
          {/* Input 1 */}
          <button onClick={() => updateForm({ value1: !value1 })}>{value1}</button>
          {/* Input 2 */}
          <button onClick={() => updateForm({ value2: !value2 })}>{value2}</button>
        </div>
      )}
    </Q>
  </MyForm>
)
```

The Q component will re-render every time a form attribute's value changes. You can specify effects to run when this happens:

```jsx
<Q
 value={false}
 effects={[
   (fields) => alert('Effect 1'),
   (fields) => alert('Effect 2'),
   ... etc.
 ]}
>
  {(updateForm, { ...fields }) => (
    <div onClick={() => updateForm({value: !value})}>{fields.value}</div>
  )}
</Q>
)
```

It's especially useful to use in a 'nested' fashion for maintaining performance of controlled inputs in large forms

```jsx
const debounce = (cb, duration = 0) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      cb(...args)
    }, duration)
  }
}

const Form = () => (
  <Q val1 val2 val3 val4 etc>
    {(update, fields) => {
      return (
        <div>
          {/* val1  */}
          <Q
            effects={[
              /**
               * Debounce the update
               * to the main form
               */
              debounce(({ value }) => {
                if (fields.val1 !== value) {
                  update({ val1: value })
                }
              }, 500),
            ]}
            value={fields.val1}
          >
            {(update, { value }) => (
              /**
               * Debouncing the onChange handler
               * doesn't work so well
               */
              <input onChange={e => update({ value: e.target.value })} value={value} />
            )}
          </Q>

          {/* val2 */}
          <Q>...</Q>

          {/* val2 */}
          <Q>...</Q>

          {/* val99 */}
          <Q>...</Q>
        </div>
      )
    }}
  </Q>
)
```