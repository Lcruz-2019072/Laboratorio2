'use strict'

import Animal from './animal.model.js'
import { checkUpdate } from '../utils/validator.js' 
// Test
export const testAnimal = (req, res) => {
    console.log('test is running')
    return res.send({message: 'Test is running'})
}
// Agregar 
export const registerAnimal = async(req, res)=>{
    try{
        let data = req.body
        console.log(data)
        let animal = new Animal(data)
        await animal.save()
        return res.send({message: `Registered Animal successfully, can be logged with ${animal.nameAnimal}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user', err: err})
    }
}

// Guardar

export const updateAnimal = async(req, res) =>{ 
    try {
        //Obtener el id del Animal actualizar
        let { id } = req.params
        //Obtener los datos a actualizar
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have sumitted data that update'})
        //Actualizar (DB)
        let updateAnimal = await Animal.findOneAndUpdate(
            {_id: id}, 
            data, 
            { new: true }
            )
        if(!updateAnimal) return res.status(401).send({message: 'Animal not found'})
            return res.send({message: 'Update Animal', updateAnimal})
    } catch (err) {
        console.error(err)
        if(err.keyValue.nameAnimal) return res.status(400).send({message: `nameAnimal ${err.keyValue.nameAnimal} is already taken`})
            return res.status(500).send({message: 'Error upting Animal'})
    }
}

//Delete 

export const deleteA = async(req, res)=>{
    try {
       
        let { id } = req.params

         let deleteAnimal = await Animal.findOneAndDelete({_id: id})
      
        if(!deleteAnimal) return res.status(404).send({message: 'Animal not found and not deleted'})
 
        return res.send({message: `${deleteAnimal.nameAnimal} deleted successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting Animal'})
    }

}

// Busqueda por nombre

export const searchA = async(req, res)=>{
    try{
    
        let { nameAnimal } = req.body

        let searchA = await Animal.find({nameAnimal})

        return res.send(searchA)

    }catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error to found the animal'})
        
    }
}

// Schema Keeper

