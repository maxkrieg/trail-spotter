class GoogleMarker {
  constructor() {
    this.map = null
    this.marker = null
  }

  setMap(map) {
    this.map = map
  }

  setPosition(position) {
    console.log('set marker position', this)
    if (this.marker) {
      this.marker.setMap(null)
    }

    const marker = new google.maps.Marker({
      map: this.map,
      position,
      draggable: true,
      clickable: true,
    })

    google.maps.event.addListener(marker, 'dragend', (event) => {
      this.setPosition(event)
    })

    this.marker = marker
  }


}

export default GoogleMarker
