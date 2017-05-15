import resource from 'resource-router-middleware';

export default ({ config, db , mongooseModel, modelName}) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : modelName,

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		mongooseModel.findOne( {_id: id} )
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
		mongooseModel.find({})
    .then((objs) => {
      res.json(objs)
    })
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
    console.log(body)
		new mongooseModel(body).save()
    .then((result) => {
      console.log('DB result:' + result)
      res.status(201).send()
    }).catch((err) => {
      console.error('DB error' + err)
			res.status(400).json(err)
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
      res.status(204).json(result)
    })
	},

	/** DELETE /:id - Delete a given entity */
	delete({ obj }, res) {
		mongooseModel.delete({obj})
    .then((result) => {
      console.log('DB response from delete: ' + result)
      res.status(204).send(result)
    }).catch((err) => {
			res.status(500).json(err)
    })
	}
});
