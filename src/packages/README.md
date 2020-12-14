<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [NPM packages](#npm-packages)
    - [Publishing packages to NPM](#publishing-packages-to-npm)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# NPM packages

This project includes some bespoke NPM package development:

- [@saeon/ol-react](/src/packages/ol-react)
- [@saeon/snap-menus](/src/packages/snap-menus)
- [@saeon/logger](/src/packages/logger)

To publish packages to the public NPM registry (where all the @saeon packages are published) you need to [create an NPM account](https://docs.npmjs.com/creating-a-new-npm-user-account). This allows you to publish the packages - you will also need to make sure that you are part of the @saeon organization. To publish these packages under new names you will need to fork the repository, and then update the `name` fields in all the `package.json` files.

Once you have an account you should be able to login via the CLI:

```sh
npm login
```

### Publishing packages to NPM

During development packages are referenced directly via the source code entry point. During deployment packages are consumed from the NPM registry. This means that when making changes to dependency packages, these packages need to be re-published. This is straightforward; from the root of a package that supports publishing to NPM, these scripts are available:

- `npm run publish:patch`
- `npm run publish:minor`
- `npm run publish:major`

It's also possible to publish all packages at once; from the root of this repository, these scripts are available:

- `npm run publish-all-packages:patch`
- `npm run publish-all-packages:minor`
- `npm run publish-all-packages:major`

Running one of these scripts will result in all other packages updating their dependency lists to use the newly published package versions. **However**. If you published a package individually, then you will need to update the dependency version where the package is used. This can either be done manually via updating the appropriate `package.json` file, or all at once:

- `npm run update-packages`

It's also useful to see which packages will be updated by this script. To do that, run:

- `npm run check-package-updates`
