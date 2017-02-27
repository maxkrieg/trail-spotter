const arrowSymbol = {
  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
  strokeOpacity: 1,
  scale: 1.5,
}

const defaultConfig = {
  geodesic: true,
  strokeOpacity: 0,
  editable: true,
  icons: [{
    icon: arrowSymbol,
    offset: '0',
    repeat: '10px',
  }],
}


class GooglePolyline {
  constructor(map, config) {
    this._googleMap = map
    this._googlePolyline = null
    this._listeners = []
    this.init(config)
  }

  init(config) {
    const options = {
      ...defaultConfig,
      ...config,
    }
    this._googlePolyline = new google.maps.Polyline({
      map: this._googleMap,
      ...options,
    })
  }

  addListener(event, callback) {
    this._listeners.push(event)
    google.maps.event.addListener(this._googlePolyline, event, callback)
  }

  addPathPoint(latLng) {
    const path = this._googlePolyline.getPath()
    path.push(latLng)
  }

  get path() {
    return this._googlePolyline.getPath()
  }

  set path(latLngList) {
    this._googlePolyline.setPath(latLngList)
  }

  set map(map) {
    this._googleMap = map
  }

  get map() {
    return this._googleMap
  }
}

export default GooglePolyline
