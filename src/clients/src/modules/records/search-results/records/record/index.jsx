import Descriptions from './_descriptions'
import Titles from './_titles'
import Footer from './footer'

export default ({ i, length, ..._source }) => {
  return (
    <>
      <Titles {..._source} />
      <Descriptions {..._source} />
      <Footer {..._source} />
    </>
  )
}
