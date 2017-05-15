import mongoose from 'mongoose'

export default callback => {
	mongoose.connect('mongodb://localhost/beaver-coffee')
	mongoose.Promise = global.Promise;
	const db = mongoose.connection
	db.on('error', console.error.bind(console, 'connection error:'))
	db.once('open', () => {
	  console.log('DB successfully connected!')
	})
	// connect to a database if needed, then pass it to `callback`:
	callback(db)
}
