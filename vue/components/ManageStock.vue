<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title space-between">
        <div>Manage stock</div>
        <div class="field is-pulled-right">
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
            <input type="text" class="input control" v-model="selectedProduct.name">
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label for="" class="label">ID</label>
            <input type="text" class="input control" v-model="selectedProduct._id">
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <div class="field">
            <label for="" class="label">Unit</label>
            <input type="text" class="input control" v-model="selectedProduct.unit">
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label for="" class="label">Amount</label>
            <input type="number" class="input control" v-model="selectedProduct.amount">
          </div>
        </div>
      </div>

      <hr>

      <div class="columns">
        <div class="column">
          <button class="button is-danger is-fullwidth" @click="del" :disabled="selectedProduct._id == null">Delete item</button>
        </div>
        <div class="column">
          <button class="button is-success is-fullwidth" @click="save" :disabled="selectedProduct._id == null">Save</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Store from '../mixins/store'

  export default {
    mixins: [Store],

    data() {
      return {
        selectedProduct: {},
      }
    },

    computed: {
      items() {
        return this.store && this.store.stock
      }
    },

    watch: {
      items() {
        this.selectedProduct = this.items[0]
      }
    },

    methods: {
     save() {
      fetch(`/api/stores/${this.store._id}/products/${this.selectedProduct._id}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.selectedProduct)
      })
      .then(result => {
        if (!result.ok) {
          result.json().then(x => {
            this.errors = result.status < 500 ? x.message : x.errmsg
          })
        } else { this.reset() }
      })
      .catch(err => console.log(err))
    },

    del() {
      fetch(`/api/stores/${this.store._id}/products/${this.selectedProduct._id}`, {
        method: 'delete',
      })
      .then(result => {
        if (!result.ok) {
          result.json().then(x => {
            this.errors = result.status < 500 ? x.message : x.errmsg
          })
        } else { this.reset() }
      })
      .catch(err => console.log(err))
    },
  }
}
</script>
