const seed = async (mongoose) => {
  console.log('=== EMPLOYEES ===')
  const Employee = mongoose.model('Employee')
  console.log('-' + manager.name)
  return await new Employee(manager).save()
  .then(async (manager) => {
    return await Promise.all(employees.map(async (employee) => {
      console.log('-' + employee.name)
      employee.comments.push({ // All employees get the same comment
        author: manager._id,
        text: 'He is lazy...'
      })
      return await new Employee(employee).save()
    }))
  })
  .catch((err) => {
    console.error('ERROR in employees: ' + err)
  })
}

const manager = {
    personId: '19991212-3939',
    name: 'Bruce Wayne',
    location: {
      address: 'Waynes Mannor',
      zip: '22233',
      country: {
        name: 'USA'
      }
    },
    position: {
      name: 'Manager',
      workPrecentage: 100
    },
    comments: []
  }

const employees = [
  {
    personId: '19861212-3939',
    name: 'Albert Einstein',
    location: {
      address: 'Das Straße 3',
      zip: '1234',
      country: {
        name: 'Germany'
      }
    },
    position: {
      name: 'Cashier',
      workPrecentage: 100
    },
    comments: []
  },
  {
    personId: '1337-7331',
    name: 'Winston Churchill',
    location: {
      address: 'Nottingham street 4',
      zip: '9001',
      country: {
        name: 'United Kingdom'
      }
    },
    position: {
      name: 'Cashier',
      workPrecentage: 50
    },
    comments: []
  }
]

export default {
  seed
}
