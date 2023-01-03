const AudioContextPlayer = (filepath) => {
  const audioContext = new AudioContext();
  return fetch(filepath)
    .then((response) => response.arrayBuffer())
    .then(
      (data) =>
        new Promise((resolve, reject) =>
          audioContext.decodeAudioData(data, resolve, reject)
        )
    )
    .then((decodedAudioData) => ({
      play: () => {
        const player = audioContext.createBufferSource();
        player.buffer = decodedAudioData;
        player.connect(audioContext.destination);
        player.start();
      },
    }));
};

const AudioTagPlayer = (filepath) => {
  const tag = document.createElement("audio");
  return Promise.resolve((resolve) => {
    tag.onloadeddata = resolve({ play: () => tag.play() });
    tag.src = filepath;
  });
};

const container = document.querySelector("main");

const AudioPlayer = !window.AudioContext ? AudioTagPlayer : AudioContextPlayer;

const main = async () => {
  for (let sound of ["airhorn", "fog-horn", "wow", "haha"]) {
    const button = document.createElement("button");
    button.innerText = sound;
    const audioPlayer = await AudioPlayer(`./public/sounds/${sound}.mp3`);
    button.addEventListener("click", () => {
      audioPlayer.play();
    });

    container.appendChild(button);
  }
};

main();
