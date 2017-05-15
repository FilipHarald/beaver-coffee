import { version } from '../../package.json'
import { Router } from 'express'
import genericHandler from './resource-CRUD-handler'

import productSchema from '../db/models/product'
import storeSchema from '../db/models/store'
import employeeSchema from '../db/models/employee'
import customerSchema from '../db/models/customer'

export default ({ config, db }) => {
  let api = Router();

  api.use('/products', genericHandler({ config, db,
    MongooseModel: db.model('Product', productSchema),
    modelName: 'Product'
  }));

  api.use('/stores', genericHandler({ config, db,
    MongooseModel: db.model('Store', storeSchema),
    modelName: 'Store'
  }));

  api.use('/employees', genericHandler({ config, db,
    MongooseModel: db.model('Employee', employeeSchema),
    modelName: 'Employee'
  }));

  api.use('/customers', genericHandler({ config, db,
    MongooseModel: db.model('Customer', customerSchema),
    modelName: 'Customer'
  }));

  api.get('/', (req, res) => {
    res.json({ version });
  });

  return api;
}
