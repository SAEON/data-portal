/**
 * TODO
 *
 * The github shapefiles really should be in this respository,
 * otherwise unforseen bugs will result. But I was struggling to
 * get authentication to work (especially with gdal vsicurl)
 */
export default {
  'sa-municipality-boundaries-2016': {
    source: 'public',
    uri: 'http://www.demarcation.org.za/site/wp-content/uploads/2016/12/2016-Boundaries-Local.zip',
    description: '...',
  },
  'sa-district-boundaries-2016': {
    source: 'public',
    uri:
      'http://www.demarcation.org.za/site/wp-content/uploads/2016/12/2016-Boundaries-District.zip',
    description: '...',
  },
  'sa-provinces-2011-simplified': {
    source: 'github',
    uri: 'https://github.com/SAEON/shapefiles/raw/stable/provinces-sa-simplified.zip',
    description: '...',
  },
  'africa-countries-simplified': {
    source: 'github',
    uri: 'https://github.com/SAEON/shapefiles/raw/stable/africa-countries-simplified.zip',
    description: '...',
  },
  biomes: {
    source: 'github',
    uri: 'https://github.com/SAEON/shapefiles/raw/stable/biomes.zip',
    description: '...',
  },
  'continents-simplified': {
    source: 'github',
    uri: 'https://github.com/SAEON/shapefiles/raw/stable/continents-simplified.zip',
    description: '...',
  },
  'sa-district-boundaries-2011-simplified': {
    source: 'github',
    uri: 'https://github.com/SAEON/shapefiles/raw/stable/districts-sa-2011-simplified.zip',
    description: '...',
  },
  'sa-municipality-boundaries-2011-simplified': {
    source: 'github',
    uri: 'https://github.com/SAEON/shapefiles/raw/stable/municipalities-sa-2011-simplified.zip',
    description: '...',
  },
}
