<template>
  <div class="posts">
    <h1>Edit Location</h1>
      <div class="form">
        <div>
          <input type="text" name="title" placeholder="TITLE" v-model="title">
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="STREET" v-model="street"></textarea>
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="CITY" v-model="city"></textarea>
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="STATE" v-model="state"></textarea>
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="ZIP" v-model="zip"></textarea>
        </div>
        <div>
          <button class="app_post_btn" @click="updateLocation">Update</button>
        </div>
      </div>
  </div>
</template>

<script>
import LocationsService from '@/services/LocationsService'
export default {
  name: 'editlocation',
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
  mounted () {
    this.getLocation()
  },
  methods: {
    async getLocation () {
      const response = await LocationsService.getLocation({
        id: this.$route.params.id
      })
      this.title = response.data.title
      this.description = response.data.description
      this.street = response.data.street
      this.city = response.data.city
      this.state = response.data.state
      this.zip = response.data.zip
      // this.$router.push({ name: 'Locations' })
    },
    async updateLocation () {
      await LocationsService.updateLocation({
        id: this.$route.params.id,
        title: this.title,
        description: this.description,
        street: this.street,
        city: this.city,
        state: this.state,
        zip: this.zip
      })
      this.$swal(
        'Great!',
        `Your location has been updated!`,
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

