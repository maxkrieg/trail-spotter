const defaultConfig = {
  draggable: false,
  clickable: false,
}

class GoogleMarker {
  constructor(map, config) {
    this._googleMap = map
    this._googleMarker = null
    this._listeners = []
    this.init(config)
  }

  init(config) {
    const options = {
      ...defaultConfig,
      ...config,
    }
    this._googleMarker = new google.maps.Marker({
      map: this._googleMap,
      ...options,
    })
  }

  addListener(event, callback) {
    this._listeners.push(event)
    google.maps.event.addListener(this._googleMarker, event, callback)
  }

  get position() {
    const pos = this._googleMarker.getPosition()
    if (!pos) return null
    return pos.toJSON()
  }

  set position(latLng) {
    console.log(latLng)
    this._googleMarker.setPosition(latLng)
  }

  set map(map) {
    this._googleMap = map
  }

  get map() {
    return this._googleMap
  }


}

export default GoogleMarker
