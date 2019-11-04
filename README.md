# @SAEON/Atlas
Install the package via the [NPM registry](https://npmjs.com/package/@saeon/atlas)

```
npm install @saeon/atlas
```

## Documentation
TODO: An example of how to use the Atlas API will go here!

## Developers
To contribute code to this component clone the repository onto your local computer, install dependencies, and start the development server (`webpack-dev-server`). Please work on a branch OTHER than the master branch!

```
git clone <repository URL> saeon-atlas
cd saeon-atlas
git checkout -b <your-branch-name>
npm install
npm start
```

## Publish to NPM
This project uses (semantic versioning)[https://docs.npmjs.com/about-semantic-versioning]. This means that package versioning is controlled by 3 numbers: `major.minor.patch`, which in the case of this project means:

- **major** - Users should expect breaking changes
- **minor** - Users should not expect breaking changes
- **patch** - Minor changes, updates, improvements, etc.

With this in mind, 3 scripts are defined in the `package.json` file:

- `publish-patch` - Patch version is bumped, and code is pushed to NPM
- `publish-minor` - Minor version is bumped, and code is pushed to NPM
- `publish-major` - Major version is bumped, and code is pushed to NPM

In all cases existing changes are committed prior to version bump, **the master branch** is checked out and pushed, and then the NPM package is updated. This is to prevent pushing changes to NPM from anything other than the master branch. For obvious reasons.

Running these scripts will provide CLI prompts that you need to answer, and then a new package version will be pushed to NPM