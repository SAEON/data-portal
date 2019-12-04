# @SAEON/Atlas
Install the package via the [NPM registry](https://npmjs.com/package/@saeon/atlas)

```sh
npm install @saeon/atlas
```

## Modules
The basis of the Atlas is that it comprises of many `Modules`. Please see `./dev/index.jsx` (in this repository) for a working proof of concept that uses all the 'built-in' modules. This documentation describes how the example works, and is aimed at showing how to structure your own modules. These examples show two different mechanisms for 'composition' when authoring modules.

### Built in modules

#### SingleFeatureSelector
TODO

#### LayerManager
The OpenLayers library maintains it's own layer state. This is problematic when using React.js, since React will not update state automatically in response to changes to an OpenLayers `map` instance. This modules provides an array of 'proxy' layer objects, and helper functions to update these objects; these proxy layer objects are stored in React state. Essentially this module 'binds' react state to OpenLayers state, and makes working with layers easier.

TODO example

### Example 1
```jsx
class App extends PureComponent {
  constructor(props) { ... }

  render() {
    return (
      <Map>
        {({ map }) => (
          <>
            {/* Add your modules here */}
            <Module1 map={map} />
            <Module2 map={map}/>
            <Module3 map={map}/>
          </>
        )}
      </Map>
    )
  }
}
```

### Example 2
Since you can define your own modules, you can define composition. Nested module composition might be useful if, for example, Module1 contained filtering logic that you want to make available to other modules.

```jsx
class App extends PureComponent {
  constructor(props) { ... }

  render() {
    return (
      <Map>
        {({ map }) => (
          <Module1 map={map}>
          {({ someFn }) => (
            <Module2 map={map}>
            {({ ... }) => (
              <Module3 map={map}></Module3>
            )}</Module2>
          )}
          </Module1>
        )}
      </Map>
    )
  }
}
```

# Developers
To contribute code to this component fork the source code, install dependencies, and start the development server (`webpack-dev-server`). Please work on a branch OTHER than the master branch!

```sh
# First fork the source code to your own repository space
git clone <repository URL> saeon-atlas
cd saeon-atlas
git checkout -b <your-branch-name>
npm install
npm start
```

Presumably, if you are going to work on the source code for this package, you likely don't want to have to publish the package to NPM, then install from NPM just to test that your souce code changes are working! To get around this problem, use the [npm link](https://docs.npmjs.com/cli/link.html) command.

```sh
# From the directory containing the component source code
npm link

# From the directory in the project in which you are consuming the package
npm link @saeon/atlas
```

**NOTE** - when using `npm link`, after making source code changes to the package you need to **rebuild** the package (and NOT update the package on NPM). The command to do this is `npm run build`

# Publish to NPM
There are 4 scripts included in this repository for publishing - when you clone this repository you need to check that they are executable:

```sh
chmod +x ./scripts/*
```

If you don't already have an NPM account, [create one](https://www.npmjs.com/login)! Then login from the root of the source code

```sh
npm login
# Enter your username
# Enter your password
# Enter your email address (probably best to use a work email address, since this is public)
```

This project uses [semantic versioning](https://docs.npmjs.com/about-semantic-versioning). This means that package versioning is controlled by 3 numbers: `major.minor.patch`, which in the case of this project means:

- **major** - Users should expect breaking changes
- **minor** - Users should not expect breaking changes
- **patch** - Minor changes, updates, improvements, etc.

With this in mind, 3 scripts are defined in the `package.json` file:

- `publish-patch` - Patch version is bumped, and code is pushed to NPM
- `publish-minor` - Minor version is bumped, and code is pushed to NPM
- `publish-major` - Major version is bumped, and code is pushed to NPM

Running these scripts will provide CLI prompts that you need to answer, and then a new package version will be pushed to NPM. In all cases existing changes are committed prior to version bump, and then the code on that branch is packaged. **Please don't push non-master branch changes to the NPM registry**!! Unless otherwise intended, please run the `publish-patch` script (`npm run publish-patch`).