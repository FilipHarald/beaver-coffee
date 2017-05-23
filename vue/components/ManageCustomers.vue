<template>
  <div>
    <div class="card">
      <div class="card-header">
        <div class="card-header-title space-between">
          <div>Manage Customers</div>
          <div class="field">
            <div class="control">
              <span class="select is-fullwidth">
                <select v-model="selectedCustomer" ref="select_customer">
                  <option v-for="customer in customers" :key="customer" :value="customer">{{ customer.name }}</option>
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
              <input v-model="selectedCustomer.personId" type="text" class="input" disabled>
            </div>
          </div>

          <div class="field">
            <label for="" class="label">Name</label>
            <div class="control">
              <input v-model="selectedCustomer.name" type="text" class="input">
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label for="" class="label">Address</label>
                <div class="control">
                  <input v-model="selectedCustomer.location.address" type="text" class="input">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label for="" class="label">Zip code</label>
                <div class="control">
                  <input v-model="selectedCustomer.location.zip" type="text" class="input">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label for="" class="label">Country</label>
                <div class="control">
                  <input v-model="selectedCustomer.location.country.name" type="text" class="input">
                </div>
              </div>
            </div>
          </div>

          <hr />

          <h1 class="title is-4">Club card</h1>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label for="" class="label">Card number</label>
                <div class="control">
                  <input v-model="selectedCustomer.clubCard.number" type="text" class="input">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label for="" class="label">Country</label>
                <div class="control">
                  <input v-model="selectedCustomer.clubCard.country" type="text" class="input">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label for="" class="label">Number of orders</label>
                <div class="control">
                  <input v-model="selectedCustomer.clubCard.orders" type="number" class="input">
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button href="#" type="submit" class="button is-success is-fullwidth" @click.stop="save" :disabled="selectedCustomer._id == null">Save employee</button>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <div v-if="errors" class="notification is-danger">{{ errors }}</div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <modal v-model="showModal">
      <span slot="title">Good job!</span>
      <span slot="body">Customer saved!</span>
      <button slot="footer" class="button is-info" @click="showModal = false">close</button>
    </modal>
  </div>
</template>

<script>
  import Modal from './Modal'
  import Api from '../mixins/api'
  import Store from '../mixins/store'

  export default {
    mixins: [Store, Api],

    components: {
      Modal,
    },

    data () {
      return {
        showModal: false,
        store: null,
        customers: [],
        selectedCustomer: {
          location: {
            country: {}
          },
          clubCard: {}
        },
        errors: ''
      }
    },

    watch: {
      customers() {
        this.selectedCustomer = this.customers[0]
      }
    },

    methods: {
      getCustomers() {
        fetch(`/api/customers`,
        {
          method: 'get'
        })
        .then(result => result.json())
        .then(json => this.customers = json)
      },

      clear () {
        this.newOrder = {
          customerId: '',
          items: [],
        }
        this.$refs.select_customer.focus()

        this.employees.push(this.newEmployee())
        this.selectedCustomer = this.newEmployee()
      },

      save () {
        this.api('put', `/api/customers/${this.selectedCustomer._id}`, this.selectedCustomer)
          .then(result => Promise.all([result, result.json()]))
          .then(promises => {
            const [result, json] = promises

            if (!result.ok) {
              this.errors = JSON.stringify(json, null, 2)
            } else {
              this.employees = json
              this.showModal = true
            }
          })
          .catch(err => {
            this.errors = JSON.stringify(err, null, 2)
          })
      },
    },

    computed: {

    },

    created () {
      this.getCustomers()
    }
  }
</script>

<style lang="stylus">
</style>
