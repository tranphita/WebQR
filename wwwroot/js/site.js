/*const qrcode = window.qrcode;*/

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = false;

qrcode.callback = res => {
    if (res) {
        outputData.innerText = res;
        scanning = false;

        video.srcObject.getTracks().forEach(track => {
            track.stop();
        });

        qrResult.hidden = false;
        canvasElement.hidden = true;
        btnScanQR.hidden = false;

        var url = '/Home/About';    

        if (res == "http://admin") {
            window.location.href = url;
        }
        else if (res == "http://phita") {
            url = '/Home/Temp/' + 1;
            window.location.href = url;
        }
        else if (res == "http://phita2") {
            url = '/Home/Temp/' + 2;
            window.location.href = url;
        }
        else if (res == "http://phita3") {
            url = '/Home/Temp/' + 3;
            window.location.href = url;
        }
    }
};

btnScanQR.onclick = () => {
    navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then(function (stream) {
            scanning = true;
            qrResult.hidden = true;
            btnScanQR.hidden = true;
            canvasElement.hidden = false;
            video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
            video.srcObject = stream;
            video.play();
            tick();
            scan();
        })
        .catch(function (err) {
            alert("Requested device not found"); // Không tìm thấy thiết bị được yêu cầu (thiết bị không có camera)
            console.log(err);
        });;
};

function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

    scanning && requestAnimationFrame(tick);
}

function scan() {
    try {
        qrcode.decode();
    } catch (e) {
        setTimeout(scan, 300);
    }
}
