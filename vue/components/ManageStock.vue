<template>
  <div class="section">
    <a href="index.html" class="button is-default title is-5">< Back to start</a>
    <div class="card">
      <div class="card-header">
        <div class="card-header-title">Manage stock</div>
      </div>
      <div class="card-content">
        <div class="field">
          <div class="control">Select a product</div>
        </div>
        <div class="field">
          <div class="control">
            <span class="select is-fullwidth">
              <select name="products" id="products">
                <option value="3">Lite längre namn</option>
                <option value="4">Lite längre namn</option>
                <option value="5">Lite längre namn</option>
              </select>
            </span>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field control">
              <p class="title is-5">ID</p>
            </div>
            <input type="text" class="input" name="product_id">
          </div>
          <div class="column">
            <div class="field control">
              <p class="title is-5">Name</p>
            </div>
            <input type="text" class="input" name="product_name">
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field control">
              <p class="title is-5">Type</p>
            </div>
            <input type="text" class="input" name="product_type">
          </div>
          <div class="column">
            <div class="field control">
              <p class="title is-5">Price</p>
            </div>
            <input type="text" class="input" name="product_price">
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field control">
              <p class="title is-5">Amount</p>
            </div>
            <input type="text" class="input" name="product_amount">
          </div>
          <div class="column"></div>
        </div>

        <hr>

        <div class="columns">
          <div class="column">
            <button class="button is-danger is-fullwidth">Delete product</button>
          </div>
          <div class="column">
            <button class="button is-success is-fullwidth" id="btn_save">Save</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
