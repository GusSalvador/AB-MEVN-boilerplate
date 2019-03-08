<template>
  <div class="posts uk-animation-fade">
    <h1>Locations</h1>
    <div v-if="locations.length > 0" class="table-wrap uk-animation-slide-bottom-medium">
      <div>
        <router-link v-bind:to="{ name: 'addlocation' }" class="">Add Location</router-link> | 
        <select @change="onStateChange($event)" v-model="region">
            <option value='All'>All</option>
            <template v-for="state in states">
                <option>{{ state }}</option>
            </template>
        </select>
        <button v-on:click='showDeleted = !showDeleted'><span v-if="showDeleted">Hide</span><span v-else>Show</span> Deleted</button>
      </div>
      <table>
        <tr>
          <td>Title</td>
          <td width="400">Description</td>
          <td width="150">Address</td>
          <td width="100" align="center">Status</td>
          <td width="100" align="center">Action</td>
          
        </tr>
        <tr v-for="location in activeLocations">
          <td>{{ location.title }}</td>
          <td>{{ location.description }}</td>
          <td>
            {{ location.street }}<br/>
            {{ location.city }} {{ location.state }} {{ location.zip }}
          </td>
          <td>
              <span v-if="location.active === true">Active</span>
          </td>
          <td align="center">
            <router-link v-bind:to="{ name: 'editlocation', params: { id: location._id } }">Edit</router-link> |
            <a href="#" @click="deleteLocation(location._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else class="uk-animation-slide-bottom-medium">
        There are no locations.. Lets add one now <br /><br />
        <router-link v-bind:to="{ name: 'addlocation' }" class="add_post_link">Add Location</router-link>
    </div>
  </div>
</template>

<script>
import LocationsService from '@/services/LocationsService'
export default {
  name: 'locations',
  data () {
    return {
      locations: [],
      states: [],
      showDeleted: false,
      region: 'All'
    }
  },
  mounted () {
    this.getLocations()
    this.getStates()
  },
  methods: {
    async getLocations () {
      console.log(this.region)
      const response = await LocationsService.fetchLocations(this.region)
      this.locations = response.data.locations
    },
    async getStates () {
      const response = await LocationsService.getStates()
      this.states = response.data.locations
    },
    async deleteLocation (id) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function (result) {
        if (result.value === true) {
          LocationsService.deleteLocation(id)
          $this.$router.go({
            path: '/'
          })
        }
      })
    },
    onStateChange (event) {
      // this.region = event.target.value
      if (event.target.value !== 'All') {
        this.$router.push({ path: '/locations/' + event.target.value })
        this.getLocations()
      } else {
        this.$router.push({path: '/locations'})
        this.getLocations()
      }
    }
  },
  computed: {
    activeLocations: function () {
     // `this` points to the vm instance
      if (!this.showDeleted) {
        return this.locations.filter(function (location) {
          return location.active
        })
      } else {
        return this.locations
      }
    }
  }
}
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
