<template>
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
            <button href="#" type="submit" class="button is-success is-fullwidth" @click.stop="save">Save customer</button>
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
</template>

<script>
  export default {
    data() {
      return {
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
        }
      }
    },

    methods: {
      save() {
        fetch('/api/customers', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newCustomer)
        })
        .then(result => {
          if (!result.ok) {
            result.json().then(x => {
              this.errors = result.status < 500 ? x.message : x.errmsg
            })
          } else {
            this.reset()
          }
        })
        .catch(err => {
          console.log(err)
        })
      },

      reset() {
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
