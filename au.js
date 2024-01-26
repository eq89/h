const socketURL = 'wss://fly-py.fly.dev/';
const audio = new Audio();
let socket;

function connectWebSocket() {
  socket = new WebSocket(socketURL);

  socket.addEventListener("open", (event) => {
    socket.send("Connected!");
  });

  socket.addEventListener("message", (event) => {
    playAudio(event.data);
  });

  socket.addEventListener("close", (event) => {
    setTimeout(connectWebSocket, 2000);
  });

  socket.addEventListener("error", (event) => {
    setTimeout(connectWebSocket, 2000);
  });
}

function playAudio(audioUrl) {
  if (audioUrl.includes("#")) {
    audio.pause();
    audio.currentTime = 0;
    return;
  }

  audio.src = audioUrl + "?raw=true";
  audio.play();
}

connectWebSocket();
