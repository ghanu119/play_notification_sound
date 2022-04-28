// Audio play using Audio Context
var notificaionSoundFile = "/AUDIO DIR/NOTIFICATION.mp3";
var audioContextObj = new AudioContext();
let buffer = null;
const soundFileLoad = () => {
    const request = new XMLHttpRequest();
    request.open("GET", notificaionSoundFile);
    request.responseType = "arraybuffer";
    request.onload = function() {
        let undecodedAudio = request.response;
        audioContextObj.decodeAudioData(undecodedAudio, (data) => buffer = data);
    };
    request.send();
}

const playContaxtNotification = () => {
    const source = audioContextObj.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextObj.destination);
    source.start();
};

soundFileLoad();
window.playNotification = function () {
    if ("Audio" in window) {
        
        let notificationAudio = new Audio( notificaionSoundFile );
        if( notificationAudio.autoplay ){
            notificationAudio.play();
        }else{
            playContaxtNotification();
        }
    }
}