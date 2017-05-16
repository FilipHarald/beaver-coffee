import mongoose from 'mongoose'
import seed from './seeder'
const green = '\x1b[32m'
const cyan = '\x1b[36m'
const yellow = '\x1b[33m'
const reset = '\x1b[0m'

export default callback => {
	mongoose.connect('mongodb://localhost/beaver-coffee')
	mongoose.Promise = global.Promise
	const db = mongoose.connection
	db.on('error', console.error.bind(console, 'connection error:'))
	db.once('open', () => {
    console.log(green + 'DB successfully connected!')
    db.dropDatabase()
    .then((result) => {
      console.log(yellow + 'Old database dropped...' + cyan);
      return seed()
    })
    .then(() => {
      console.log(green + 'Seeding done!' + reset);
    })
    .catch((err) => {
      console.error('ERROR in DB init: ' + err);
    })
	})
	callback(db)
}
