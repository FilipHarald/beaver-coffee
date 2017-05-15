import resource from 'resource-router-middleware';
import mongoose from 'mongoose'
import kittySchema from '../models/kitty'
let modelString = 'Kitten'

let Kitten = mongoose.model(modelString, kittySchema);

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'kitty',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		Kitten.findOne( {_id: id} )
    .then((kitty) => {
      if (!kitty) {
        callback(modelString + ' not found', null)
      } else {
        callback(null, kitty)
      }
    }, (err) => {
      callback(err, null)
    })
	},

	/** GET / - List all entities */
	index({ params }, res) {
		Kitten.find({})
    .then((kitties) => {
      res.json(kitties)
    })
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		new Kitten(body).save()
    .then((response) => {
      console.log('DB response:' + response)
      res.json(response)
    }).catch((err) => {
      console.error('DB error' + err)
      res.json(err)
    })
	},

	/** GET /:id - Return a given entity */
	read({ kitty }, res) {
		res.json(kitty);
	},

	/** PUT /:id - Update a given entity */
	update({ kitty, body }, res) {
		kitty.update(body)
    .then((response) => {
      res.json(response)
    })
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ kitty }, res) {
		Kitten.delete({kitty})
    .then((response) => {
      console.log('DB response from delete: ' + response)
      res.sendStatus(204)
    }).catch((err) => {
      res.json(err)
      res.sendStatus(500)
    })
	}
});
