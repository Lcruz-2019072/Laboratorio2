import mongoose, { mongo } from "mongoose";

const animalShema = mongoose.Schema({

    keeper:{
        type: moongose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    nameAnimal: {
        type: String,
        required: true
    },

    typeOfAnimal: {
        type: String,
        required: true
    },

    color: {
        type: String,
        required: true
    },

    paws: {
        type: String,
        required: true
    },

    characteristics: {
        type: String,
        require: true
    }

    


})

export default mongoose.model('animal', animalShema)