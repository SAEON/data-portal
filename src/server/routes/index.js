import express from 'express'
var router = express.Router()

router.get('/', async (req, res) => {
  res.send('hello world')
})

export default router
