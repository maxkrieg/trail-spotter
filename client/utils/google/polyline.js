const defaultConfig = {
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2,
  path: [
    {lat: 37.772, lng: -122.214},
    {lat: 21.291, lng: -157.821},
    {lat: -18.142, lng: 178.431},
    {lat: -27.467, lng: 153.027},
  ],
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
    const path = this._googlePolyine.getPath()
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
