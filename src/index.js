import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/router.js'

dotenv.config()

const app = express()

// Configura o CORS para permitir qualquer origem, sem cookies
app.use(cors({
  origin: '*',
  credentials: false
}))

app.use(express.json())
app.use(router)

const porta = process.env.PORT || 8002

app.listen(porta, '0.0.0.0', () => {
  console.log("Servidor no ar na porta " + porta)
})
