const connectToMongo = require('./db');
connectToMongo(); 
const express = require('express')
var cors = require('cors')
 

const app = express()
const port = 5004

app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(express.json())
app.use('/api/auth', require("./Routes/auth"))
app.use('/api/admin', require("./Routes/admin"))
app.use('/api/user', require("./Routes/user"))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
