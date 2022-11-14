import { useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'

export default ({ routes: _routes }) => {
  const routes = useMemo(() => _routes.filter(({ element }) => element), [_routes])

  return (
    <Routes>
      {routes.map(({ label, to, element: Element }) => {
        return <Route key={label} path={to} element={<Element />} />
      })}
    </Routes>
  )
}
