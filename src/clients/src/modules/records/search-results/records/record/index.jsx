import Header from './header'
import Descriptions from './_descriptions'
import Titles from './_titles'
import Footer from './footer'

export default ({ i, length, ..._source }) => {
  return (
    <>
      {/* <Header {..._source} /> */}
      <Titles {..._source} />
      <Descriptions {..._source} />
      <Footer {..._source} />
    </>
  )
}
