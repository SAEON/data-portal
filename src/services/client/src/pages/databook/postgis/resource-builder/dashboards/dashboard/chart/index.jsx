import RemoveChartButton from './_remove-chart-button'

export default ({ chart, dashboard }) => {
  const { id } = chart
  return (
    <div>
      <div key={id}>Chart: {id}</div>
      <RemoveChartButton chart={chart} dashboard={dashboard} />
    </div>
  )
}
