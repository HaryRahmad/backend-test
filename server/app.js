const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const Controller = require('./controllers/controller')
const router = express.Router()

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(router)

router.get('/books', Controller.getBook)
router.post('/borrowBook', Controller.memberBorrow)
router.get('/members', Controller.getMember)
router.post('/returnBook', Controller.returnBook)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})