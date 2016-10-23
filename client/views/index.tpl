<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css" />
    <title><%= htmlWebpackPlugin.options.title || 'trail spotter' %></title>

  </head>
  <body>
    <div class="root" id="root"></div>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhwQzoWIXgTNmjrSLmfyZDl_m7KbqeLgU&libraries=geometry,places,drawing"
  async defer></script>
  </body>
</html>
