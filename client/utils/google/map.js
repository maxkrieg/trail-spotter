class GoogleMap {
  constructor(element, setMarker) {
    this.element = element
    this.setMarker = setMarker
    this.map = null
  }

  initMap() {
    const everest = { lat: 27.9878, lng: 86.9250 };
    const map = new google.maps.Map(this.element, {
      center: everest,
      zoom: 10,
      mapTypeId: 'terrain',
    })

    google.maps.event.addListener(map, 'click', (event) => {
      console.log('handle map click')
      this.setMarker(event.latLng)
    })

    this.setMap(map)
  }

  addListeners(listeners) {
    listeners.forEach(({ event, callback }) => {
      google.maps.event.addListener(this.map, event, callback)
    })
  }

  getMap() {
    return this.map
  }

  setMap(map) {
    this.map = map
  }
}

export default GoogleMap
