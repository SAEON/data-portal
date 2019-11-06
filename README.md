# @SAEON/Atlas
Install the package via the [NPM registry](https://npmjs.com/package/@saeon/atlas)

```sh
npm install @saeon/atlas
```

## Example

```jsx
import {
  Map,
  ahocevarBaseMap,
  cdngiAerial,
  clusterLayer,
  clusterSource,
  SingleFeatureSelector,
  LayerManager
} from '@saeon/atlas'

const mapStyle = { width: '500px', height: '500px' }
const pointData = [{
  "id": 1,
  "name": "A",
  "location": "{\"type\":\"Point\",\"coordinates\":[15.3,37.7]}"
}]

class App extends PureComponent {
  constructor(props) {
    super(props)

    // Create layers
    this.clusteredSites = clusterSource({ data: pointData, locAttribute: 'location' })
    this.clusteredSitesLayer = clusterLayer(this.clusteredSites, 'sites')

    /**
     * This array is passed to the OpenLayers Map constructor
     * new Map({ ... layers: this.layers ...})
     * https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html
     */
    this.layers = [ahocevarBaseMap(), this.clusteredSitesLayer]

    /**
     * This object is passed to the OpenLayers View constructor
     * new View(this.viewOptions)
     * https://openlayers.org/en/latest/apidoc/module-ol_View-View.html
     */
    this.viewOptions = {}
  }

  render() {
    return (
      <Map style={mapStyle} viewOptions={this.viewOptions} layers={this.layers}>
        {({ map }) => (
          <>

            {/* Module that handles selecting/deselecting features  */}
            <SingleFeatureSelector map={map}>
              {({ selectedFeature, unselectFeature }) => (selectedFeature ? <div>popup</div> : '')}
            </SingleFeatureSelector>

            {/* Module for adjusting layer settings */}
            {/* Editable settings: opacity, visibility, adding / removing */}
            <LayerManager map={map}>
              {({ layers, updateOpacity, toggleVisible, removeLayer, addLayer }) => (
                <ul>
                  <li>
                    <button onClick={() => addLayer(cdngiAerial())}>Add layer</button>
                  </li>
                  {layers.map((layer, i) => (
                    <li key={i}>
                      {layer.id}
                      <span>({JSON.stringify(layer.visible)})</span>
                      <button onClick={() => toggleVisible(layer)}>Toggle visible</button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={layer.opacity * 100}
                        onChange={e => updateOpacity(layer, e.target.value / 100)}
                      />
                      <button onClick={() => removeLayer(layer)}>Remove layer</button>
                    </li>
                  ))}
                </ul>
              )}
            </LayerManager>
          </>
        )}
      </Map>
    )
  }
}
```

## Modules
TODO

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
This project uses [semantic versioning](https://docs.npmjs.com/about-semantic-versioning). This means that package versioning is controlled by 3 numbers: `major.minor.patch`, which in the case of this project means:

- **major** - Users should expect breaking changes
- **minor** - Users should not expect breaking changes
- **patch** - Minor changes, updates, improvements, etc.

With this in mind, 3 scripts are defined in the `package.json` file:

- `publish-patch` - Patch version is bumped, and code is pushed to NPM
- `publish-minor` - Minor version is bumped, and code is pushed to NPM
- `publish-major` - Major version is bumped, and code is pushed to NPM

Running these scripts will provide CLI prompts that you need to answer, and then a new package version will be pushed to NPM. In all cases existing changes are committed prior to version bump, and then the code on that branch is packaged. **Please don't push non-master branch changes to the NPM registry**!! Unless otherwise intended, please run the `publish-patch` script (`npm run publish-patch`).