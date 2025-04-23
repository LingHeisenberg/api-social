import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/router.js'

dotenv.config()

const app = express()

// Configura o CORS para permitir qualquer origem, sem cookies
app.use(cors({
  origin: '*',             // Permite qualquer origem
  credentials: false       // ❌ Não permite envio de cookies (importante)
}))

app.use(express.json())
app.use(router)

const porta = process.env.PORT || 8002

app.listen(porta, () => {
  console.log("Servidor no ar na porta " + porta)
})
