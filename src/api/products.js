import resource from 'resource-router-middleware';
import mongoose from 'mongoose'
import productSchema from '../models/products'
let modelString = 'Product'

let Product = mongoose.model(modelString, productSchema);

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'product',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		Product.findOne( {_id: id} )
    .then((product) => {
      if (!product) {
        callback(modelString + ' not found', null)
      } else {
        callback(null, product)
      }
    }, (err) => {
      callback(err, null)
    })
	},

	/** GET / - List all entities */
	index({ params }, res) {
		Product.find({})
    .then((products) => {
      res.json(products)
    })
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		new Product(body).save()
    .then((response) => {
      console.log('DB response:' + response)
      res.json(response)
    }).catch((err) => {
      console.error('DB error' + err)
      res.json(err)
    })
	},

	/** GET /:id - Return a given entity */
	read({ product }, res) {
		res.json(product);
	},

	/** PUT /:id - Update a given entity */
	update({ product, body }, res) {
		product.update(body)
    .then((response) => {
      res.json(response)
    })
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ product }, res) {
		Product.delete({product})
    .then((response) => {
      console.log('DB response from delete: ' + response)
      res.sendStatus(204)
    }).catch((err) => {
      res.json(err)
      res.sendStatus(500)
    })
	}
});
