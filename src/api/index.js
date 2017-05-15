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
		mongooseModel: mongoose.model('Kitty', productSchema),
		modelName: 'Kitty'
	}));
 	api.use('/products', genericHandler({ config, db,
		mongooseModel: mongoose.model('Product', productSchema),
		modelName: 'Product'
	}));
	api.use('/stores', genericHandler({ config, db,
		mongooseModel: mongoose.model('Store', productSchema),
		modelName: 'Store'
	}));
	api.use('/employees', genericHandler({ config, db,
		mongooseModel: mongoose.model('Store', productSchema),
		modelName: 'Store'
	}));
	api.use('/customers', genericHandler({ config, db,
		mongooseModel: mongoose.model('Store', productSchema),
		modelName: 'Store'
	}));

	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
