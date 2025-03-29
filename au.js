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
    console.log("WebSocket connected.");
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
    console.error("WebSocket error:", event);
    socket.close();
  });
}

function scheduleReconnect() {
  if (reconnectTimer) return; // Prevent duplicate timers

  const delay = Math.min(2000 * Math.pow(2, reconnectAttempts), maxReconnectDelay);
  console.warn(`WebSocket disconnected. Reconnecting in ${delay / 1000} seconds...`);

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
  audio.play().then(() => {
    console.log("Audio unlocked for autoplay.");
  }).catch(err => console.warn("Autoplay still restricted:", err));
}, { once: true });

connectWebSocket();
