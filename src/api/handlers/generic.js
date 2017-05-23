import resource from 'resource-router-middleware'
import utils from '../utils'

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
     res.json(objs)
   }).catch((err) => {
     utils.handleError(err, res)
   })
  },

   /** POST / - Create a new entity */
  async create({ body }, res) {
    new MongooseModel(body).save()
      .then((result) => {
        res.status(201).send(result)
      }).catch((err) => {
       utils.handleError(err, res)
     })
  },

  /** GET /:id - Return a given entity */
  read(req, res) {
    const model = req[modelName]
    //MongooseModel.find({ _id: body})
    res.json(model);
  },

  /** PUT /:id - Update a given entity */
  update(req, res) {
    const model = req[modelName]
    const body = req.body
    model.update(body)
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        utils.handleError(err, res)
      })
  },

  /** DELETE /:id - Delete a given entity */
  delete({ obj }, res) {
    obj.delete()
    .then((result) => {
      res.status(204).send(result)
    }).catch((err) => {
     utils.handleError(err, res)
   })
  }
});
