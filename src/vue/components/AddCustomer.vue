<template>
  <div class="section">
    <a href="index.html" class="button is-default title is-5">Back to start</a>
    <div class="card">
      <div class="card-header">
        <div class="card-header-title">Add customer to CoffeeBeaver club</div>
      </div>
      <div class="card-content">
        <form action="">
          <div class="field">
            <div class="control">
              <p><strong>ID (SSN/Personnummer)</strong></p>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input type="text" id="customer_id" class="input">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <p><strong>Name</strong></p>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input type="text" id="customer_name" class="input">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <p><strong>Occupation</strong></p>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input type="text" id="customer_occupation" class="input">
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <div class="control">
                  <p><strong>Address</strong></p>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input type="text" id="address" class="input">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <div class="control">
                  <p><strong>Zip code</strong></p>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input type="text" id="address_zip" class="input">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <div class="control">
                  <p><strong>Country</strong></p>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input type="text" id="address_country" class="input">
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button href="#" type="submit" class="button is-default is-fullwidth">Clear fields</button>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button href="#" type="submit" class="button is-success is-fullwidth">Save customer</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
