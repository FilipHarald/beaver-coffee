<template>
  <div>
    <div class="card">
      <div class="card-header">
        <div class="card-header-title">Add customer to CoffeeBeaver club</div>
      </div>
      <div class="card-content">
        <form action="">
          <div class="field">
            <label for="" class="label">ID (SSN/Personnummer)</label>
            <div class="control">
              <input ref="personId" v-model="newCustomer.personId" type="text" id="customer_id" class="input" autofocus>
            </div>
          </div>

          <div class="field">
            <label for="" class="label">Name</label>
            <div class="control">
              <input v-model="newCustomer.name" type="text" id="customer_name" class="input">
            </div>
          </div>

          <div class="field">
            <label for="" class="label">Occupation</label>
            <div class="control">
              <input v-model="newCustomer.occupation" type="text" id="customer_occupation" class="input">
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label for="" class="label">Address</label>
                <div class="control">
                  <input v-model="newCustomer.location.address" type="text" id="address" class="input">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label for="" class="label">Zip code</label>
                <div class="control">
                  <input v-model="newCustomer.location.zip" type="text" id="address_zip" class="input">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label for="" class="label">Country</label>
                <div class="control">
                  <input v-model="newCustomer.location.country.name" type="text" id="address_country" class="input">
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button @click="reset" href="#" type="submit" class="button is-default is-fullwidth">Clear fields</button>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button href="#" type="submit" class="button is-success is-fullwidth" @click.stop="save" :disabled="!valid">Save customer</button>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <pre v-if="errors" class="notification is-danger">{{ errors }}</pre>
            </div>
          </div>
        </form>
      </div>
    </div>

    <modal v-model="showModal">
      <span slot="title">Good job!</span>
      <span slot="body">{{ newCustomer.name }} saved!</span>
      <button slot="footer" class="button is-info" @click="reset">close</button>
    </modal>
  </div>
</template>

<script>
  import Validation from '../mixins/validation'
  import Api from '../mixins/api'
  import Modal from './Modal'

  export default {
    mixins: [Validation, Api],

    components: {
      Modal,
    },

    data() {
      return {
        valid: false,
        showModal: false,
        errors: '',
        newCustomer: {
          personId: '',
          name: '',
          occupation: '',
          location: {
            address: '',
            zip: '',
            country: {
              name: '',
            },
          },
          clubCard: {
          }
        }
      }
    },

    watch: {
      newCustomer: {
        handler() {
          this.valid = Object.keys(this.newCustomer).every(key => this.checkValidity(this.newCustomer, key))
        },
        deep: true
      }
    },

    methods: {
      randomCardNumber () {
        return Math.floor((Math.random() * 10000) + 50000)
      },
      save() {
        this.errors = ''
        if (!this.newCustomer.clubCard.number) {
          this.newCustomer.clubCard.number = this.randomCardNumber()
          this.newCustomer.clubCard.orders = 0
          this.newCustomer.clubCard.country = this.newCustomer.location.country.name
        }

        this.api('post', '/api/customers', this.newCustomer)
          .then(result => Promise.all([result, result.json()]))
          .then(promises => {
            const [result, json] = promises

            if (!result.ok) {
              this.errors = JSON.stringify(json, null, 2)
            } else {
              console.log('asd')
              this.showModal = true
            }
          })
          .catch(err => {
            this.errors = JSON.stringify(err, null, 2)
          })
      },

      reset() {
        this.showModal = false
        this.newCustomer = {
          personId: '',
          name: '',
          occupation: '',
          location: {
            address: '',
            zip: '',
            country: {
              name: '',
            },
          },
        }

        this.$refs.personId.focus()
      }
    }
  }
</script>
