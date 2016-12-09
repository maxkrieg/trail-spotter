class GoogleMarker {
  constructor(map) {
    this.map = map
    this.marker = null
  }

  setMap(map) {
    this.map = map
  }

  setPosition = (event) => {
    console.log('set position', this)
    const position = event.latLng

    if (this.marker) {
      this.marker.setMap(null)
    }

    const marker = new google.maps.Marker({
      map: this.map,
      position,
      draggable: true,
      clickable: true,
    })

    google.maps.event.addListener(marker, 'dragend', (e) => {
      this.setPosition(e)
    })

    this.marker = marker
  }


}

export default GoogleMarker
