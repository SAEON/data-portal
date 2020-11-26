import getCurrentDirectory from '../../lib/get-current-directory.js'
import { join } from 'path'

const __dirname = getCurrentDirectory(import.meta)

export const defaultWebLayers = {
  'sa-municipality-boundaries-2016':
    'http://www.demarcation.org.za/site/wp-content/uploads/2016/12/2016-Boundaries-Local.zip',
  'sa-district-boundaries-2016':
    'http://www.demarcation.org.za/site/wp-content/uploads/2016/12/2016-Boundaries-District.zip',
}

export const defaultDiskLayers = {
  // 'sa-provinces-2011': join(__dirname, './lib/provinces-sa-2011/PR_SA_2011.shp'),
  // 'sa-provinces-2011-simplified': join(
  //   __dirname,
  //   './lib/provinces-sa-simplified/provinces generalised2.shp'
  // ),
  // 'africa-countries-simplified': join(
  //   __dirname,
  //   './lib/africa-countries-simplified/africa countries simplified2.shp'
  // ),
  // biomes: join(__dirname, './lib/biomes/biomes.shp'),
  // 'continents-simplified': join(__dirname, './lib/continents-simplified/kontinente simple.shp'),
  // 'sa-district-boundaries-2011-simplified': join(
  //   __dirname,
  //   './lib/districts-sa-2011-simplified/DC_SA_2011_simplified.shp'
  // ),
  // 'sa-municipality-boundaries-2011-simplified': join(
  //   __dirname,
  //   './lib/municipalities-sa-2011-simplified/MN_SA_2011_simplified.shp'
  // ),
}
