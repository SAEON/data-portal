/**
 * TODO
 *
 * The github shapefiles really should be in this repository,
 * otherwise unforeseen bugs will result. But I was struggling to
 * get authentication to work (especially with gdal vsicurl)
 */
export default {
  'sa-municipality-boundaries-2016': {
    source: 'public',
    uri: 'http://www.demarcation.org.za/site/wp-content/uploads/2016/12/2016-Boundaries-Local.zip',
    description: 'Detailed municipality boundary polygons from http://www.demarcation.org.za',
  },
  'sa-district-boundaries-2016': {
    source: 'public',
    uri: 'http://www.demarcation.org.za/site/wp-content/uploads/2016/12/2016-Boundaries-District.zip',
    description: 'Detailed district boundary polygons from http://www.demarcation.org.za',
  },
  'sa-provinces-2011-simplified': {
    source: 'github',
    uri: 'https://github.com/SAEON/shapefiles/raw/stable/provinces-sa-simplified.zip',
    description: 'Simplified provincial boundary polygons (2011)',
  },
  'africa-countries-simplified': {
    source: 'github',
    uri: 'https://github.com/SAEON/shapefiles/raw/stable/africa-countries-simplified.zip',
    description: 'Simplified African country boundary polygons',
  },
  biomes: {
    source: 'github',
    uri: 'https://github.com/SAEON/shapefiles/raw/stable/biomes.zip',
    description: 'Polygons showing South African biomes',
  },
  'continents-simplified': {
    source: 'github',
    uri: 'https://github.com/SAEON/shapefiles/raw/stable/continents-simplified.zip',
    description: 'Continents polygons',
  },
  'sa-district-boundaries-2011-simplified': {
    source: 'github',
    uri: 'https://github.com/SAEON/shapefiles/raw/stable/districts-sa-2011-simplified.zip',
    description: 'Simplified district boundary polygons (2011)',
  },
  'sa-municipality-boundaries-2011-simplified': {
    source: 'github',
    uri: 'https://github.com/SAEON/shapefiles/raw/stable/municipalities-sa-2011-simplified.zip',
    description: 'Simplified municipality boundary polygons (2011)',
  },
}
