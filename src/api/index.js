import { version } from '../../package.json';
import { Router } from 'express';
import kitties from './kitties';
import products from './products';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/kitties', kitties({ config, db }));
	api.use('/products', products({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
