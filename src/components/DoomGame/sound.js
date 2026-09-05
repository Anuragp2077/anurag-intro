let audioContext = null;
let masterGain = null;

function getAudioContext() {
  if (!audioContext) {
    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContext) {
      return null;
    }

    audioContext =
      new AudioContext();

    masterGain =
      audioContext.createGain();

    masterGain.gain.value = 0.35;

    masterGain.connect(
      audioContext.destination
    );
  }

  if (
    audioContext.state === "suspended"
  ) {
    audioContext.resume();
  }

  return audioContext;
}

function playTone({
  frequency,
  endFrequency = frequency,
  duration = 0.1,
  type = "square",
  volume = 0.2,
  delay = 0,
}) {
  const context =
    getAudioContext();

  if (!context || !masterGain) {
    return;
  }

  const oscillator =
    context.createOscillator();

  const gain =
    context.createGain();

  const startTime =
    context.currentTime +
    delay;

  oscillator.type = type;

  oscillator.frequency.setValueAtTime(
    frequency,
    startTime
  );

  oscillator.frequency.exponentialRampToValueAtTime(
    Math.max(20, endFrequency),
    startTime + duration
  );

  gain.gain.setValueAtTime(
    0.0001,
    startTime
  );

  gain.gain.exponentialRampToValueAtTime(
    volume,
    startTime + 0.008
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    startTime + duration
  );

  oscillator.connect(gain);
  gain.connect(masterGain);

  oscillator.start(startTime);
  oscillator.stop(
    startTime + duration + 0.02
  );
}

function playNoise({
  duration = 0.1,
  volume = 0.15,
  frequency = 1000,
}) {
  const context =
    getAudioContext();

  if (!context || !masterGain) {
    return;
  }

  const buffer =
    context.createBuffer(
      1,
      context.sampleRate *
        duration,
      context.sampleRate
    );

  const data =
    buffer.getChannelData(0);

  for (
    let i = 0;
    i < data.length;
    i++
  ) {
    data[i] =
      Math.random() * 2 - 1;
  }

  const source =
    context.createBufferSource();

  const filter =
    context.createBiquadFilter();

  const gain =
    context.createGain();

  filter.type =
    "bandpass";

  filter.frequency.value =
    frequency;

  filter.Q.value = 0.8;

  const startTime =
    context.currentTime;

  gain.gain.setValueAtTime(
    0.0001,
    startTime
  );

  gain.gain.exponentialRampToValueAtTime(
    volume,
    startTime + 0.005
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    startTime + duration
  );

  source.buffer = buffer;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);

  source.start(startTime);
  source.stop(
    startTime + duration + 0.02
  );
}

/*
 * Gunshot
 */
export function playGunshot() {
  playNoise({
    duration: 0.09,
    volume: 0.32,
    frequency: 1800,
  });

  playTone({
    frequency: 110,
    endFrequency: 45,
    duration: 0.12,
    type: "sawtooth",
    volume: 0.22,
  });
}

/*
 * Enemy hit
 */
export function playEnemyHit() {
  playTone({
    frequency: 260,
    endFrequency: 110,
    duration: 0.09,
    type: "square",
    volume: 0.16,
  });
}

/*
 * Enemy death
 */
export function playEnemyDeath() {
  playTone({
    frequency: 180,
    endFrequency: 45,
    duration: 0.28,
    type: "sawtooth",
    volume: 0.2,
  });

  playNoise({
    duration: 0.18,
    volume: 0.12,
    frequency: 500,
  });
}

/*
 * Player takes damage
 */
export function playPlayerDamage() {
  playTone({
    frequency: 120,
    endFrequency: 55,
    duration: 0.2,
    type: "sawtooth",
    volume: 0.18,
  });
}

/*
 * Victory melody
 */
export function playVictory() {
  playTone({
    frequency: 392,
    endFrequency: 392,
    duration: 0.12,
    type: "square",
    volume: 0.16,
  });

  playTone({
    frequency: 523,
    endFrequency: 523,
    duration: 0.12,
    type: "square",
    volume: 0.16,
    delay: 0.13,
  });

  playTone({
    frequency: 659,
    endFrequency: 659,
    duration: 0.18,
    type: "square",
    volume: 0.18,
    delay: 0.26,
  });

  playTone({
    frequency: 784,
    endFrequency: 784,
    duration: 0.3,
    type: "square",
    volume: 0.18,
    delay: 0.45,
  });
}

/*
 * Game over
 */
export function playGameOver() {
  playTone({
    frequency: 220,
    endFrequency: 130,
    duration: 0.25,
    type: "sawtooth",
    volume: 0.18,
  });

  playTone({
    frequency: 130,
    endFrequency: 55,
    duration: 0.45,
    type: "sawtooth",
    volume: 0.2,
    delay: 0.25,
  });
}

/*
 * Reload / empty weapon feedback.
 */
export function playEmptyWeapon() {
  playTone({
    frequency: 180,
    endFrequency: 120,
    duration: 0.06,
    type: "square",
    volume: 0.1,
  });
}

/*
 * Allow the UI to control overall
 * DOOM sound volume.
 */
export function setSoundVolume(
  volume
) {
  getAudioContext();

  if (!masterGain) {
    return;
  }

  masterGain.gain.value =
    Math.max(
      0,
      Math.min(1, volume)
    );
}