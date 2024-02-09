// Archivo express
// Levantar servidor HTTP (express)
//ESModules package.json -> type: module
'use strict' // No es tan necesario

// Importaciones
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routers.js'
import animalRoutes from '../src/animal/animal.routers.js'

// Configuraciones  
const app = express()   
config()
const port = process.env.PORT || 3056 


// Configuracion del servidor
app.use(express.urlencoded({extended: false}))
app.use(express.json()) // Convierte archivo .express a .json
app.use(cors()) // Aceptar o denegar solicitudes de diferentes origenes (local, remota)
app.use(helmet()) // Aplica capa de seguridad basica al servidor
app.use(morgan('dev')) // Logs de solicitudes al servidor HTTP

// Declaracion de rutas
app.use(userRoutes)
app.use(animalRoutes)

// Levantar el servidor
export const initServer = () =>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}