const defaultConfig = {
  center: { lat: 37.772, lng: -122.214 },
  zoom: 10,
  mapTypeId: 'terrain',
}

class GoogleMap {
  constructor(element, config) {
    this._googleMap = null
    this._listeners = []
    this.init(element, config)
  }

  init(element, config) {
    const options = {
      ...defaultConfig,
      ...config,
    }
    const googleMap = new google.maps.Map(element, options)
    this._googleMap = googleMap
  }

  addListener(event, callback) {
    this._listeners.push(event)
    google.maps.event.addListener(this._googleMap, event, callback)
  }

  set map(map) {
    this._googleMap = map
  }

  get map() {
    return this._googleMap
  }

  set center(position) {
    this._googleMap.setCenter(position)
  }

  get center() {
    return this._googleMap.getCenter()
  }

  set zoom(zoomLevel) {
    this._googleMap.setZoom(zoomLevel)
  }

  get zoom() {
    return this._googleMap.getZoom()
  }

}

export default GoogleMap
