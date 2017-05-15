import resource from 'resource-router-middleware'

import locationSchema from '../db/models/location'


export default ({ config, db }) => resource({
  Location: db.model('Location', locationSchema),

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

  async create({ body }, res, next) {
   if (body.location) {
     try {
       body.location = (await new Location(body.location).save())._id
     } catch (err) {
       return handleError(err, res)
     }
   }
   next()
 }
})
