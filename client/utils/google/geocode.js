const geocoder = new google.maps.Geocoder()

function reverseGeocode(latLng, handleSuccess) {
  let address = null
  geocoder.geocode({ location: latLng }, (results, status) => {
    if (status === 'OK' && results && results[0]) {
      address = results[0].formatted_address
      handleSuccess(address)
    } else {
      console.error(results, status)
    }
  })
}

export { reverseGeocode }
