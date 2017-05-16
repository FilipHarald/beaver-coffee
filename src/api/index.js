import { version } from '../../package.json'
import { Router } from 'express'
import genericHandler from './resource-CRUD-handler'

export default ({ config, db }) => {
  let api = Router();

  api.use('/products', genericHandler({ config, db,
    MongooseModel: db.model('Product'),
    modelName: 'Product'
  }));

  api.use('/stores', genericHandler({ config, db,
    MongooseModel: db.model('Store'),
    modelName: 'Store'
  }));

  api.use('/employees', genericHandler({ config, db,
    MongooseModel: db.model('Employee'),
    modelName: 'Employee'
  }));

  api.use('/customers', genericHandler({ config, db,
    MongooseModel: db.model('Customer'),
    modelName: 'Customer'
  }));

  api.get('/', (req, res) => {
    res.json({ version });
  });

  return api;
}
