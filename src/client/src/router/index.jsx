import LayoutProvider, { context as layoutContext } from '../contexts/layout'
import { useContext } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from '../components/header'
import Routes from './routes'
import Footer from '../components/footer'

const Content = () => {
  const { headerRef, setContentRef } = useContext(layoutContext)

  return (
    <div
      ref={el => setContentRef(el)}
      style={{
        position: 'relative',
        minHeight: `calc(100% - ${headerRef?.offsetHeight || 0}px)`,
      }}
    >
      <Routes />
    </div>
  )
}

export default () => {
  return (
    <Router>
      <LayoutProvider>
        <Header />
        <Content />
        <Footer />
      </LayoutProvider>
    </Router>
  )
}
