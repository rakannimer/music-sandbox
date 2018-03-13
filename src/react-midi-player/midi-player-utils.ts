
import { getInstrument } from '../get-instrument-web/'
import { getInstrumentNameFromChannelNumber } from '../get-midi-player/'
import { NoteNameEnum } from '../get-notes/'


// TEMPORARY HACK : Waiting for a fix on this : https://github.com/grimmdude/MidiPlayerJS/issues/20
// to be able to use Player.instruments : number[]
export const getMidiInstruments = (midiPlayer) => {
  const { tracks } = midiPlayer;
  const trackChannels = midiPlayer.tracks.map(track => track.events[0].channel);
  const instrumentsMidiNumber = trackChannels.reduce((acc, cur) => ({ ...acc, [cur]: true }), {}))
  return Object.keys(instrumentsMidiNumber).map(instrumentNumber => ({ name: getInstrumentNameFromChannelNumber(instrumentNumber), channel: instrumentNumber })
  // return [midiPlayer.tracks[0].events[0].channel]
}


export const loadInstruments = (midiPlayer) => {
  const midiInstruments = getMidiInstruments(midiPlayer)
  const instrumentNames = [];
  const instrumentPromises = [];
  for (let instrument of midiInstruments) {
    instrumentNames.push(instrument.name)
    instrumentPromises.push(getInstrument(instrument.name))
  }
  return Promise.all(instrumentPromises)
    .then(instruments =>
      //instruments
      instruments.reduce((acc, cur, i) => {
        return {
          ...acc,
          [instrumentNames[i]]: cur
        }
      }, {})
    ).catch(console.warn)
}

export const createMidiControlFunctions = midiPlayer => {
  const restart = () => {
    if (midiPlayer.isPlaying()) midiPlayer.stop();
    midiPlayer.play();
  };
  const play = () => {
    if (!midiPlayer.isPlaying()) midiPlayer.play();
  };
  const stop = () => {
    midiPlayer.stop();
  };
  const pause = () => {
    if (midiPlayer.isPlaying()) midiPlayer.pause();
  };
  return { restart, play, stop, pause };
};


export const getTrackNotes = (midiPlayer) => {
  const getTrackNotes = track => track.events.filter(event => event.name === "Note on").reduce((acc, cur) => {
    const noteOctave = cur.noteName.slice(cur.noteName.length - 1);
    const noteName = cur.noteName.slice(0, cur.noteName.length - 1)
    return {
      ...acc,
      [`${NoteNameEnum[noteName]}${noteOctave}`]: {
        name: NoteNameEnum[noteName],
        octave: noteOctave
    }
    }
  }, {})
  return midiPlayer.tracks.map(getTrackNotes).map(Object.keys)
}