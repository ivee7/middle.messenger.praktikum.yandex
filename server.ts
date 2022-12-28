const express = require('express')
const app = express()
const PORT = Number(process.env.PORT) | 3000

app.use(express.static('dist'));

app.listen(PORT, () => {
    console.log(`Web Messenger Server is launched on port ${PORT}...`)
})