
const video = document.getElementById('qr-video');
const canvas = document.getElementById('qr-canvas');
const result = document.getElementById('qr-result');
const scanButton = document.getElementById('scan-qr-button');

let scanning = false;

// Add a click event listener to the "Scan QR Code" button
scanButton.addEventListener('click', function () {
    if (!scanning) {
        startScanning();
    } else {
        stopScanning();
    }
});

function startScanning() {
    scanning = true;
    scanButton.innerText = 'Stop Scanning';

    // Use the getUserMedia API to access the camera
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function (error) {
            console.error('Error accessing the camera:', error);
            stopScanning();
        });

    video.style.display = 'block';
    canvas.style.display = 'none';
    result.style.display = 'none';
}

function stopScanning() {
    scanning = false;
    scanButton.innerText = 'Scan QR Code';

    // Stop the camera and hide the video feed
    if (video.srcObject) {
        video.srcObject.getTracks().forEach(function (track) {
            track.stop();
        });
    }

    video.style.display = 'none';
    canvas.style.display = 'none';
    result.style.display = 'block';
    result.innerHTML = 'Scan a QR code';
}
