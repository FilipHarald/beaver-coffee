import seeders from './seeders/all'
import mongoose from 'mongoose'

export default () => {
  return Promise.all(seeders.map(async (seeder) => {
    return await seeder.seed(mongoose)
  }))
}
