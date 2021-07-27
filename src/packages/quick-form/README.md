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

The Q component will (or at least should) re-render every time a form attribute's value changes. You can specify effects to run when this happens:

```jsx
...
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