import mongoose from 'mongoose'
import helper from './helper-functions'

let schema = mongoose.Schema({
    name: String
})

helper.makeFieldsRequired(schema)

export default schema
