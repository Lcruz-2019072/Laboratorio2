'use strict'

import User from './user.model.js'
import { checkPassword, checkUpdate, encrypt } from '../utils/validator.js' 

export const test = (req, res) => {
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const register = async(req, res)=>{
    try{
        // Siguimento que hace Google (gmail)
        // Capturar el formulario (body)
        let data = req.body
        console.log(data)
        // Encriptar la contrasena
        data.password = await encrypt(data.password)
        // Asignar el rol por defecto
        data.role = 'CLIENT'
        // Guardar la informacion en la BD
        let user = new User(data)
        await user.save()
        // Responder al usuario
        return res.send({message: `Registered successfully, can be logged with ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user', err: err})
    }
}

export const  login = async(req, res)=>{
    try {
       //Capturar los datos (body)
       let { username, password } = req.body
       //validar que el usuario exista
       let user = await User.findOne({username})//buscar un solo registro username: 'jprime'
       //verifico que la contrase;a conincida
       if(user && checkPassword(password, user.password)){
        let loggedUser = {
            user: user.username,
            role: user.role
        }
        return res.send({message: `Welcome ${user.name}`, loggedUser}) 
       }
        return res.status(404).send({message: 'Invalid Credentials'})
       //Responde al usuario
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error to login'})        
    }
}

export const update = async (req, res)=>{
    try{        
    //obtener el ide del usuario a actualizar
    let { id } = req.params
    //Obtener datos que vamos a actualizar
    let data = req.body
    //Validar si trae datos a actualizar
    let update = checkUpdate(data, id)
    if(!update) return res.status(400).send ({message: 'Have submitted some data that cannot be updated or missing data'})
    //Validar si tiene permisos (tokenizacion) X hoy no lo vemos X
    //Actualizamos en la BD
    let updateUser = await User.findOneAndUpdate(
        {_id: id}, //ObjetcId <- hexadecimal (Hora sys, version mongo, llave privada)
        data,   //Datos a actualizar
        {new: true}
    )   
    //Validar si se actualizo
    if(!updateUser) return res.status(400).send ({message: 'User not found and not update'})
    //Responder con el dato actualizo
    return res.send({message: 'Update user', updateUser})
    }catch(err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating account'})
    }
}

    export const deleteU = async(req, res)=>{
        try {
            //Obtener el Id
            let { id } = req.params
            //Validar si esta logeando y es el mismo X nolo vremos hoy x
            //eliminar (deleteOne / indOneand delete)
                let deleteUser = await User.findOneAndDelete({_id: id})
            //verificar que se elimino
            if(!deleteUser) return res.satatus(404).send({message: 'Account not found and not deleted'})
            //responder
            return res.send({message: `Account with username ${deleteUser.username} deleted successfully`})
        } catch (err) {
            console.error(err)
            return res.status(500).send({message: 'Error deleting account'})
        }

    }