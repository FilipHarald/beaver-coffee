<template>
  <div>
    <div class="card">
      <div class="card-header">
        <div class="card-header-title space-between">
          <div>Manage stock</div>
          <div class="field">
            <div class="control">
              <span class="select is-fullwidth">
                <select v-model="selectedProduct">
                  <option v-for="item in items" :key="item._id" :value="item">{{ item.name }}</option>
                </select>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label for="" class="label">Name</label>
              <input type="text" class="input control" v-model="selectedProduct.name" disabled>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label for="" class="label">ID</label>
              <input type="text" class="input control" v-model="selectedProduct._id" disabled>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label for="" class="label">Amount</label>
              <input type="number" class="input control" v-model="selectedProduct.amount">
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label for="" class="label">Unit</label>
              <input type="text" class="input control" v-model="selectedProduct.unit" disabled>
            </div>
          </div>
        </div>

        <hr>

        <div class="columns">
          <div class="column">
            <button class="button is-info is-fullwidth" @click="show">Add new item</button>
          </div>
          <div class="column">
            <button class="button is-danger is-fullwidth" @click="del" :disabled="selectedProduct._id == null">Delete item</button>
          </div>
          <div class="column">
            <button class="button is-success is-fullwidth" @click="save" :disabled="selectedProduct._id == null">Save</button>
          </div>
        </div>

      </div>
    </div>

    <div class="modal" ref="modal">
      <div class="modal-background" @click="hide"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <div class="modal-card-title">Add new item</div>
        </header>
        <div class="modal-card-body">
          <div class="field">
            <label for="" class="label">Item</label>
            <span class="select is-fullwidth">
              <select v-model="newItem">
                <option v-for="item in availableItems" :key="item._id" :value="item">{{ item.name }}</option>
              </select>
            </span>
          </div>
          <div class="columns">
            <div class="column">
              <div class="field">
                <label for="" class="label">Amount</label>
                <input type="text" class="input" v-model="newItem.amount">
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label for="" class="label">Unit</label>
                <input type="text" v-model="newItem.unit" class="input" disabled>
              </div>
            </div>
          </div>


        </div>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="add">Add</button>
        </footer>
      </div>
      <button class="modal-close" @click="hide"></button>
    </div>
  </div>
</template>

<script>
  import Store from '../mixins/store'
  import Api from '../mixins/api'

  export default {
    mixins: [Store, Api],

    data () {
      return {
        selectedProduct: {},
        newItem: {},
        availableItems: []
      }
    },

    computed: {
      items () {
        return this.store && this.store.stock
      }
    },

    watch: {
      items () {
        this.selectedProduct = this.items[0]
      }
    },

    methods: {
      save () {
        this.api('put', `/api/stores/${this.store._id}/stock/${this.selectedProduct._id}`, this.selectedProduct)
          .then(result => {
            if (!result.ok) {
              result.json().then(x => {
                this.errors = result.status < 500 ? x.message : x.errmsg
              })
            } else {
              result.json().then(x => this.store.stock = x)
            }
          })
          .catch(err => console.log(err))
      },

      show () {
        this.$refs.modal.classList.add('is-active')
        this.api('get', '/api/products')
          .then(res => res.json())
          .then(json => {
            this.availableItems = json.filter(i => i.productType === 'Ingredient')
          })
          .catch(err => console.log(err))
      },

      hide () {
        this.$refs.modal.classList.remove('is-active')
      },

      add () {
        this.api('post', `/api/stores/${this.store._id}/stock`, this.newItem)
          .then(res => res.json())
          .then(json => this.store.stock = json)
          .catch(err => console.log(err))
          .then(() => this.hide())
      },

      del () {
        this.api('delete', `/api/stores/${this.store._id}/stock/${this.selectedProduct._id}`)
          .then(result => {
            if (!result.ok) {
              result.json().then(x => {
                this.errors = result.status < 500 ? x.message : x.errmsg
              })
            } else {
              result.json().then(x => this.store.stock = x)
            }
          })
          .catch(err => console.log(err))
      },

      emptyItem () {
        return {
          name: '',
          unit: '',
          amount: '',
          productType: ''
        }
      }
    },

    created () {
      this.newItem = this.emptyItem()
    }
  }
</script>
