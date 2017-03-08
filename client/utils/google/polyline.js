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
  constructor(map, config = {}) {
    this._googleMap = map
    this._googlePolyline = null
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
    google.maps.event.addListener(this._googlePolyline, event, callback)
  }

  addPathPoint(latLng) {
    const mvcArray = this._googlePolyline.getPath()
    mvcArray.push(latLng)
  }

  clearPath() {
    const mvcArray = this._googlePolyline.getPath()
    if (mvcArray) {
      mvcArray.clear()
    }
  }

  undo() {
    const mvcArray = this._googlePolyline.getPath()
    if (mvcArray.getLength() > 0) {
      mvcArray.pop()
    }
  }

  get path() {
    const mvcArray = this._googlePolyline.getPath()
    let pathArray = []
    if (mvcArray && mvcArray.getLength() > 0) {
      const mvcActualArray = mvcArray.getArray()
      pathArray = mvcActualArray.map((latLng) => (
        latLng.toJSON()
      ))
    }
    return pathArray
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
