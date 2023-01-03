const main = document.querySelector("main");

for (let sound of ["airhorn", "fog-horn", "wow", "haha"]) {
  const button = document.createElement("button");
  button.innerText = sound;

  button.addEventListener("click", () => {
    if (!window.AudioContext) {
      const tag = document.createElement("audio");
      tag.src = `./public/sounds/${sound}.mp3`;
      tag.play();
    } else {
      const audioContext = new AudioContext();
      const player = audioContext.createBufferSource();
      fetch(`./public/sounds/${sound}.mp3`)
        .then((response) => response.arrayBuffer())
        .then(
          (data) =>
            new Promise((resolve, reject) =>
              audioContext.decodeAudioData(data, resolve, reject)
            )
        )
        .then((decodedAudioData) => {
          player.buffer = decodedAudioData;
          player.connect(audioContext.destination);
          player.start();
        });
    }
  });

  main.appendChild(button);
}
