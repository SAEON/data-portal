export default ({ schema }) => async (req, res, next) => {
  req.ctx = {
    db: {},
    schema,
  }
  next()
}
