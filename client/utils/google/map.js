class GoogleMap {
  constructor(element, setMarker) {
    this.element = element
    this.setMarker = setMarker
    this.map = null
    this.initMap(element)
  }

  initMap(element) {
    const everest = { lat: 27.9878, lng: 86.9250 };
    const map = new google.maps.Map(element, {
      center: everest,
      zoom: 10,
      mapTypeId: 'terrain',
    })

    this.setMap(map)
  }

  addListener(event, callback) {
    google.maps.event.addListener(this.map, event, callback)
  }

  getMap() {
    return this.map
  }

  setMap(map) {
    this.map = map
  }
}

export default GoogleMap
