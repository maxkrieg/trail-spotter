class GoogleSearchBox {
  constructor(element) {
    this._element = element
    this._googleSearchBox = null
    this.init()
  }

  init() {
    const bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(44.913693, -67.579621),
      new google.maps.LatLng(32.655332, -117.549211),
      new google.maps.LatLng(47.985760, -124.842826),
      new google.maps.LatLng(25.506170, -80.518336),
    );

    this._googleSearchBox = new google.maps.places.SearchBox(this._element, { bounds })
  }

  addListener(event, callback) {
    this._googleSearchBox.addListener(event, callback)
  }

  get position() {
    const places = this._googleSearchBox.getPlaces()
    if (places.length === 0) return null
    return places[0].geometry.location
  }


}

export default GoogleSearchBox
