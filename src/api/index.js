import { version } from '../../package.json'
import { Router } from 'express'
import mongoose from 'mongoose'
import genericHandler from './resource-CRUD-handler'

import kittySchema from '../models/kitty'
import productSchema from '../models/product'
import storeSchema from '../models/store'
import employeeSchema from '../models/employee'
import customerSchema from '../models/customer'

export default ({ config, db }) => {
  let api = Router();

  api.use('/kitties', genericHandler({ config, db,
    MongooseModel: mongoose.model('Kitty', productSchema),
    modelName: 'Kitty'
  }));
  api.use('/products', genericHandler({ config, db,
    MongooseModel: mongoose.model('Product', productSchema),
    modelName: 'Product'
  }));
  api.use('/stores', genericHandler({ config, db,
    MongooseModel: mongoose.model('Store', storeSchema),
    modelName: 'Store'
  }));
  api.use('/employees', genericHandler({ config, db,
    MongooseModel: mongoose.model('Employee', employeeSchema),
    modelName: 'Employee'
  }));
  api.use('/customers', genericHandler({ config, db,
    MongooseModel: mongoose.model('Customer', customerSchema),
    modelName: 'Customer'
  }));

  api.get('/', (req, res) => {
    res.json({ version });
  });

  return api;
}
