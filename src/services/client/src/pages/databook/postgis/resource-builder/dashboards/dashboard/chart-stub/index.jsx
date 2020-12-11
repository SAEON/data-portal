import RemoveChartButton from './_remove-chart-button'

export default ({ chart: id, dashboard }) => {
  return (
    <div>
      <div key={id}>Chart: {id}</div>
      <RemoveChartButton chartId={id} dashboard={dashboard} />
    </div>
  )
}
