import getCurrentDirectory from '../../lib/get-current-directory.js'
import { join } from 'path'

const __dirname = getCurrentDirectory(import.meta)

export const defaultWebLayers = {
  'local-municipality-boundaries-2016':
    'http://www.demarcation.org.za/site/wp-content/uploads/2016/12/2016-Boundaries-Local.zip',
  'district-municipality-boundaries-2016':
    'http://www.demarcation.org.za/site/wp-content/uploads/2016/12/2016-Boundaries-District.zip',
}

export const defaultDiskLayers = {
  'sa-provinces-2011': join(__dirname, './lib/provinces-2011/PR_SA_2011.shp'),
}
