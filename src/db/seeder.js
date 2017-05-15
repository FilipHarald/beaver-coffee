import seeders from './seeders/all'
import mongoose from 'mongoose'

export default () => {
  console.log('Now seeding...');
  return Promise.all(seeders.map(async (seeder) => {
    return await seeder.seed(mongoose)
    .catch((errs) => {
      errs.forEach((err) => {
        console.error(err);
      })
    })
  }))
}
