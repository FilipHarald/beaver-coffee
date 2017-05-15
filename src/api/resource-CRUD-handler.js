import resource from 'resource-router-middleware'
import mongoose from 'mongoose'
import locationSchema from '../models/location'

const Location = mongoose.model('Location', locationSchema)

const handleError = (err, res) => {
	console.error('DB error' + err)
	if (err.name == 'ValidationError'){
		res.status(400).send(err)
	} else {
		res.status(500).send(err)
	}
}

export default ({ config, db , MongooseModel, modelName}) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : modelName,

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
  load(req, id, callback) {
    MongooseModel.findOne( {_id: id} )
    .then((obj) => {
      if (!obj) {
        callback(modelName + ' not found', null)
      } else {
        callback(null, obj)
      }
    }, (err) => {
      callback(err, null)
    })
  },

  /** GET / - List all entities */
  index({ params }, res) {
    MongooseModel.find({})
    .then((objs) => {
     console.log('DB result:' + objs)
     res.json(objs)
   }).catch((err) => {
     handleError(err, res)
   })
 },

 /** POST / - Create a new entity */
 async create({ body }, res) {
  if (body.location) {
    try {
      body.location = (await new Location(body.location).save())._id
    } catch (err) {
      return handleError(err, res)
    }
  }
  new MongooseModel(body).save()
  .then((result) => {
    console.log('DB result:' + result)
    res.status(201).send(result)
  }).catch((err) => {
   handleError(err, res)
 })
},

/** GET /:id - Return a given entity */
read({ obj }, res) {
  res.json(obj);
},

/** PUT /:id - Update a given entity */
update({ obj, body }, res) {
  obj.update(body)
  .then((result) => {
   console.log('DB result:' + result)
   res.status(204).json(result)
 }).catch((err) => {
   handleError(err, res)
 })
},

/** DELETE /:id - Delete a given entity */
delete({ obj }, res) {
  obj.delete()
  .then((result) => {
    console.log('DB result: ' + result)
    res.status(204).send(result)
  }).catch((err) => {
   handleError(err, res)
 })
}
});
