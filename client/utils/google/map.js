class GoogleMap {
  constructor(element) {
    this._element = element
    this._googleMap = null
    this._listeners = []
    this.init()
  }

  init() {
    const everest = { lat: 27.9878, lng: 86.9250 };
    const googleMap = new google.maps.Map(this._element, {
      center: everest,
      zoom: 10,
      mapTypeId: 'terrain',
    })

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
