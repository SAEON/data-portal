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
  <div>
    <MyForm>
      {/* Specify form fields as attributes */}
      <Q value={false}>
        {(updateForm, { value }) => (
          <div
          onClick={() => updateForm({value: !value})}
          >{value}</div>
        )}
      </Q>
    </MyForm>
  </div>
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
    <div
      onClick={() => updateForm({value: !value})}
    >{fields.value}</div>
  )}
</Q>
)
```