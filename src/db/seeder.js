import seeders from './seeders/all'
import mongoose from 'mongoose'

export default async () => {
  console.log('Now seeding...');

  for (let seeder of seeders) {
    try {
      await seeder.seed(mongoose)
    } catch (err) {
      console.log(err)
    }
  }

  return true
}
