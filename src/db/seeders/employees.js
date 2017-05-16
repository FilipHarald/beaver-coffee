const seed = async (mongoose) => {
  const Employee = mongoose.model('Employee')

  console.log('=== EMPLOYEES ===')
  let manager = null
  try {
    console.log('-' + managerData.name)
    manager = await new Employee(managerData).save()
  } catch (err) {
    console.log('ERROR MANAGER: ' + err)
  }

  if (manager) {
    for (let employee of employees) {
      employee.comments.push({ // All employees get the same comment
        author: manager._id,
        text: 'He is lazy...'
      })

      try {
        await new Employee(employee).save()
        console.log(`Employee ${employee.name} saved`)
      } catch (err) {
        console.log('ERROR CUSTOMERS: ' + err)
      }
    }
  }
}

const managerData = {
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
