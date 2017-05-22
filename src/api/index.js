import { version } from '../../package.json'
import { Router } from 'express'
import genericHandler from './handlers/generic'
import storeHandler from './handlers/stores'
const genericCollections = ['Product', 'Store', 'Customer']

export default ({ config, db }) => {
  let api = Router()

  api.use('/stores/:id', storeHandler({ config, db }));

  genericCollections.forEach((modelName) => {
    api.use(
      '/' + modelName.toLowerCase() + 's',
      genericHandler({ config, db, modelName,
        MongooseModel: db.model(modelName)
      })
    );
  })

  api.get('/', (req, res) => {
    res.json({ version });
  });

  return api;
}
