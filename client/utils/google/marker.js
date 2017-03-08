const defaultConfig = {
  draggable: false,
  clickable: false,
}

class GoogleMarker {
  constructor(map, config = {}) {
    this._googleMap = map
    this._googleMarker = null
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
    google.maps.event.addListener(this._googleMarker, event, callback)
  }

  clear() {
    this._googleMarker.setMap(null)
  }

  hide() {
    this._googleMarker.setVisible(false)
  }

  show() {
    this._googleMarker.setVisible(true)
  }

  get position() {
    const pos = this._googleMarker.getPosition()
    if (!pos) return null
    return pos.toJSON()
  }

  set position(latLng) {
    this._googleMarker.setPosition(latLng)
  }

  set map(map) {
    this._googleMarker.setMap(map)
  }

  get map() {
    return this._googleMarker.getMap()
  }


}

export default GoogleMarker
