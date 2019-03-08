import Api from '@/services/Api'

export default {
  fetchLocations (params) {
    console.log(params)
    return Api().get('locations/' + params)
  },
  getStates () {
    return Api().get('location_states')
  },

  addLocation (params) {
    return Api().post('add_location', params)
  },

  updateLocation (params) {
    return Api().put('locations/' + params.id, params)
  },

  getLocation (params) {
    return Api().get('location/' + params.id)
  },

  deleteLocation (id) {
    return Api().delete('locations/' + id)
  }
}
