import mongoose from 'mongoose'
import seed from './seeder'

export default callback => {
	mongoose.connect('mongodb://localhost/beaver-coffee')
	mongoose.Promise = global.Promise
	const db = mongoose.connection
	db.on('error', console.error.bind(console, 'connection error:'))
	db.once('open', () => {
    console.log('DB successfully connected!')
    db.dropDatabase()
    .then((result) => {
      console.log('Database dropped: ' + result);
      return seed()
    })
    .then(() => {
      console.log('Seeding done!');
    })
	})
	// connect to a database if needed, then pass it to `callback`:
	callback(db)
}
