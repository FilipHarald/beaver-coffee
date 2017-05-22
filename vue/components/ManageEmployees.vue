<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title space-between">
        <div>Manage Employees</div>
        <div class="field is-pulled-right">
          <div class="control">
            <span class="select is-fullwidth">
              <select v-model="selectedEmployee">
                <option v-for="employee in employees" :key="employee" :value="employee">{{ employee.name }}</option>
              </select>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="card-content">
      <form action="">
        <div class="field">
          <label for="" class="label">ID (SSN/Personnummer)</label>
          <div class="control">
            <input v-model="selectedEmployee.personId" type="text" id="customer_id" class="input" autofocus>
          </div>
        </div>

        <div class="field">
          <label for="" class="label">Name</label>
          <div class="control">
            <input v-model="selectedEmployee.name" type="text" id="customer_name" class="input">
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label for="" class="label">Address</label>
              <div class="control">
                <input v-model="selectedEmployee.location.address" type="text" id="address" class="input">
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label for="" class="label">Zip code</label>
              <div class="control">
                <input v-model="selectedEmployee.location.zip" type="text" id="address_zip" class="input">
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label for="" class="label">Country</label>
              <div class="control">
                <input v-model="selectedEmployee.location.country.name" type="text" id="address_country" class="input">
              </div>
            </div>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button @click="reset" href="#" type="submit" class="button is-default is-fullwidth">Register new employee</button>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button href="#" type="submit" class="button is-success is-fullwidth" @click.stop="save">Save employee</button>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <div v-if="errors" class="notification is-danger">{{ errors }}</div>
          </div>
        </div>
      </form>

      <hr>

      <h2 class="title">Comments</h2>
      <div v-for="comment in comments" :key="comment">
        {{ author(comment).name }} - {{ comment.date }} - {{ comment.text }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        store: null,
        employees: [],
        selectedEmployee: null,
        errors: ''
      }
    },

    methods: {
      reset () {
        this.employees.push(this.newEmployee())
        this.selectedEmployee = this.newEmployee()
      },

      save () {
        const id = this.selectedEmployee._id ? `/${this.selectedEmployee._id}` : ''
        fetch(`/api/stores/${this.$store.id}/employees${id}`,
          {
            method: 'post',
            body: this.selectedEmployee
          })
          .then(result => result.json())
          .then(json => {
            this.employees = json
          })
      },

      newEmployee () {
        return {
          personId: '',
          name: '',
          location: {
            country: {
              name: ''
            }
          }
        }
      },

      author (comment) {
        return this.store.employees.find(employee => comment.author === employee._id)
      }
    },

    computed: {
      comments () {
        return this.selectedEmployee.comments || []
      }
    },

    created () {
      this.selectedEmployee = this.newEmployee()

      this.$router.stores
        .then(stores => {
          this.store = stores[0]
          this.employees = this.store.employees
          this.selectedEmployee = this.employees[0]
        })
    }
  }
</script>

<style>

</style>
