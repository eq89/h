const socket = new WebSocket('wss://fly-py.fly.dev/');
const audio = new Audio();

socket.addEventListener('open', (event) => {
  socket.send('Connected!');
});

socket.addEventListener('message', (event) => {
  handleAudio(event.data);
});

function handleAudio(audioUrl) {
  if (audioUrl.includes('#')) {
    audio.pause();
		audio.currentTime = 0;
  	return;
  }

  audio.src = audioUrl + '?raw=true';
  audio.play();
}
