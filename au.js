const socketURL = "wss://fly-py.fly.dev/";
const audio = new Audio();
let socket;
let reconnectAttempts = 0;
let reconnectTimer;
const maxReconnectDelay = 30000; // Max delay 30s

function connectWebSocket() {
  if (socket && socket.readyState === WebSocket.OPEN) return;

  socket = new WebSocket(socketURL);

  socket.addEventListener("open", () => {
    reconnectAttempts = 0;
    socket.send("Connected!");
  });

  socket.addEventListener("message", (event) => {
    playAudio(event.data);
  });

  socket.addEventListener("close", () => {
    scheduleReconnect();
  });

  socket.addEventListener("error", (event) => {
    socket.close();
  });
}

function scheduleReconnect() {
  if (reconnectTimer) return;

  const delay = Math.min(2000 * Math.pow(2, reconnectAttempts), maxReconnectDelay);
  
  reconnectTimer = setTimeout(() => {
    reconnectAttempts++;
    reconnectTimer = null;
    connectWebSocket();
  }, delay);
}

function playAudio(audioUrl) {
  if (audioUrl.includes("#")) {
    audio.pause();
    audio.currentTime = 0;
    return;
  }

  audio.src = audioUrl + "?raw=true";
  audio.play().catch(err => console.warn("Playback prevented by browser:", err));
}

document.addEventListener("click", () => {
  audio.play();
}, { once: true });

connectWebSocket();
