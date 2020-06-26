# @saeon/quick-form
Quickly add localised state to your component tree - there are many form-helper libraries in the world. Many of them try to draw components, which makes these libraries larger than necessary, limited in terms of what they include, and generally unecessary considering how easy React makes it manage state.

# Usage

#### First install it
```sh
npm i @saeon/quick-form
```

#### Then include it in your project
```js
import QuickForm from '@saeon/quick-form'
```

#### And then use it

```jsx
const Component = props => (
  <div>
    <SomeComponent>
    {/* Specify form fields as attributes */}
    <QuickForm myBooleanValue={false}>
      {({updateForm, ...fields}) => (
        <div
         onClick={() => updateForm({myBooleanValue: !myBooleanValue})}
        >{fields.myBooleanValue}</div>
      )}
    </QuickFormk>
    </SomeComponent>
  </div>
)
```

The QuickForm component will (or at least should) rerender everytime a form attribute's value changes. You can specify effects to run when this happens:

```jsx
...
<QuickForm
 myBooleanValue={false}
 effects={[
   () => alert('Effect 1'),
   () => alert('Effect 2),
   ... etc.
 ]}
>
  {({updateForm, ...fields}) => (
    <div
      onClick={() => updateForm({myBooleanValue: !myBooleanValue})}
    >{fields.myBooleanValue}</div>
  )}
</QuickFormk>
)
```