<template>
  <div class="posts">
    <h1>Add Location</h1>
      <div class="form">
        <div>
          <input type="text" name="title" placeholder="TITLE" v-model="title">
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
        </div>
        <div>
          <input rows="15" cols="15" placeholder="STREET" v-model="street">
        </div>
        <div>
          <input rows="15" cols="15" placeholder="CITY" v-model="city">
        </div>
        <div>
          <input rows="15" cols="15" placeholder="STATE" v-model="state">
        </div>
        <div>
          <input rows="15" cols="15" placeholder="ZIP" v-model="zip">
        </div>

        <div>
          <button class="app_post_btn" @click="addLocation">Add</button>
        </div>
      </div>
  </div>
</template>

<script>
import LocationsService from '@/services/LocationsService'
export default {
  name: 'addlocation',
  data () {
    return {
      title: '',
      description: '',
      street: '',
      city: '',
      state: '',
      zip: ''
    }
  },
  methods: {
    async addLocation () {
      await LocationsService.addLocation({
        title: this.title,
        description: this.description,
        street: this.street,
        city: this.city,
        state: this.state,
        zip: this.zip
      })
      this.$swal(
        'Great!',
        `Your location has been added!`,
        'success'
      )
      this.$router.push({ name: 'Locations' })
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>

