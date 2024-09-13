const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const Controller = require('./controllers/controller')
const router = express.Router()
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Library API',
    version: '1.0.0',
    description: 'API documentation for the Library system',
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: 'Development server',
    },
  ],
};


const options = {
  swaggerDefinition,
  apis: ['./controllers/controller.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.get('/books', Controller.getBook)
router.post('/borrowBook', Controller.memberBorrow)
router.get('/members', Controller.getMember)
router.post('/returnBook', Controller.returnBook)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app