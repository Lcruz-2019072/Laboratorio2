// Conexion a la base de datos
// Servidor de express

// Ejecutar servicios

import { initServer } from "./configs/app.js";
// import { config } from "dotenv"; 
import { connect } from "./configs/mongo.js"

initServer()
connect()
