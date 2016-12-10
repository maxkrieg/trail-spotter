class GoogleMarker {
  constructor(googleMap) {
    this._googleMap = googleMap
    this._googleMarker = null
    this._listeners = []
    this.init()
  }

  init() {
    this._googleMarker = new google.maps.Marker({
      map: this._googleMap,
      draggable: true,
      clickable: true,
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
