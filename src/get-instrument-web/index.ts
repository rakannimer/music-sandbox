//@ts-ignore
import * as sFPlayer from "soundfont-player";

import {
  InstrumentName,
  SoundFontPlayer,
  AudioNode,
  Instrument,
  LoadInstrumentOptions
} from "./types";

export * from "./types";

const soundFontPlayer = sFPlayer as SoundFontPlayer;

let audioContext: null | {} = null;

export const isAudioContextSupported = () => {
  return "AudioContext" in window || "webkitAudioContext" in window;
};

export const getAudioContext = (): AudioContext => {
  const isSupported = isAudioContextSupported();
  if (!isSupported) {
    console.error("AudioContext not supported in your environment");
    throw new Error("AudioContext not supported in your environment");
  }
  if (audioContext !== null) return audioContext as AudioContext;
  audioContext = new AudioContext();
  return audioContext as AudioContext;
};

export type InstrumentsMap = {
  [instrumentName in InstrumentName]?: Promise<Instrument>
};

export const instrumentsMap: InstrumentsMap = {};

export const isInstrumentLoaded = (instrumentName: InstrumentName) => {
  return instrumentName in instrumentsMap;
};

export const getInstrument = (instrumentName: InstrumentName) => {
  if (!isInstrumentLoaded(instrumentName)) {
    instrumentsMap[instrumentName] = soundFontPlayer.instrument(
      getAudioContext(),
      instrumentName
    );
  }
  return instrumentsMap[instrumentName] as Promise<Instrument>;
};
