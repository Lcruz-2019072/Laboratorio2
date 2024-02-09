import  express  from 'express'
import { registerAnimal, testAnimal, updateAnimal, deleteA, searchA } from './animal.controller.js'


const api = express.Router()

api.get('/testAnimal', testAnimal)
api.post('/registerAnimal', registerAnimal)
api.put('/updateAnimal/:id', updateAnimal)
api.delete('/deleteA/:id', deleteA)
api.get('/searchA/:nameAnimal', searchA)
export default api