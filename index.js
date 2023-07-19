document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    // Draw the character in the center of the canvas
    var char = 'A';
    var fontSize = 16;
    var fontFamily = 'Arial';
    var fontColor = 'red';
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    // Give style to the canvas
    context.fillStyle = fontColor;
    context.font = fontSize + 'px ' + fontFamily;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(char, canvasWidth / 2, canvasHeight / 2);

    // Create a download link
    var downloadLink = document.createElement('a');
    downloadLink.innerHTML = 'Download Pixel Data';
    downloadLink.href = '#';
    downloadLink.classList.add("download");
  

    console.log(downloadLink)
    downloadLink.addEventListener('click', function() {
      var pixelData = context.getImageData(0, 0, canvasWidth, canvasHeight).data;
      var hexData = [];

      for (var i = 0; i < pixelData.length; i += 4) {
        var red = pixelData[i].toString(16).padStart(2, '0');
        var green = pixelData[i + 1].toString(16).padStart(2, '0');
        var blue = pixelData[i + 2].toString(16).padStart(2, '0');
        var hex = '#' + red + green + blue;
        hexData.push(hex);
      }

      var dataBlob = new Blob([hexData.join(',')], { type: 'text/plain' });
      downloadLink.href = URL.createObjectURL(dataBlob);
      downloadLink.download = 'pixel_data.txt';
    });

    document.body.appendChild(downloadLink);
  });