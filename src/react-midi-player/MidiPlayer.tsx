import * as React from "react";
import Component from '@reactions/component'

import { getMidiPlayer } from "../get-midi-player/";
import { RTouchable } from "../react-utils/";

import { MidiTicker } from './MidiTicker'
import { MidiEventTicker } from './MidiEventTicker'
import { createMidiControlFunctions, loadInstruments, getTrackNotes } from './midi-player-utils'
import {NotePlayer} from './NotePlayer';

const createCacheKey = JSON.stringify;

const getNoteKey = ({ noteName, track, channel }) => `${noteName}_${track}_${channel}`

export const renderDefaultMidiPlayerControls = ({ pause, play, restart, stop }) => (
  <React.Fragment>
    <RTouchable onPress={play}>Play</RTouchable>
    <RTouchable onPress={pause}>Pause</RTouchable>
    <RTouchable onPress={stop}>Stop</RTouchable>
    <RTouchable onPress={restart}>Restart</RTouchable>
  </React.Fragment>)
}


const { playNote, stopPlayingNote} = NotePlayer()

export const MidiPlayer: React.StatelessComponent<any> = ({
  url,
  onTick,
  children,
  render,
  instruments,
  // onNoteOff,
  // onNoteOn,
  renderControls,
  renderTicker
}) => {
  const cacheKey = createCacheKey({ url });
  const onNoteOn = playNote
  const onNoteOff = stopPlayingNote
  return (
    <Component initialState={{
      tick: 0,
      status: 'loading',
      instruments: {},
      midiPlayer: {}
    }}
      didMount={async ({ setState }) => {
        const midiPlayer = await getMidiPlayer(
          url
        )
        const trackNotes = getTrackNotes(midiPlayer);
        console.log({trackNotes})
        const instruments = await loadInstruments(midiPlayer);
        setState({ status: 'loaded', instruments, midiPlayer })
      }}
      render={({ state, setState }) => {
        const { pause, play, restart, stop } = createMidiControlFunctions(
          state.midiPlayer
        );

        return state.status === 'loading' ?
          'Loading' :
          state.status === 'loaded' ?
            (<React.Fragment>
              {renderControls({ play, stop, restart, pause })}
              <MidiEventTicker
                midiPlayer={state.midiPlayer}
                renderTicker={renderTicker}
                onNoteOn={onNoteOn}
                onNoteOff={onNoteOff}
                instruments={state.instruments}
              />
              <MidiTicker setState={setState} state={state} midiPlayer={state.midiPlayer} renderTicker={renderTicker} />
            </React.Fragment>) :
            null
      }}
    />
  );
};



MidiPlayer.defaultProps = {
  url: "https://raw.githubusercontent.com/grimmdude/MidiPlayerJS/master/demo/midi/zelda.mid",
  onTick: (tick) => null,
  onMidiEvent: (midiEvent) => null,
  onNoteOff: ({ noteKey, noteName, instrumentName, instrument }) => null,
  onNoteOn: ({ noteKey, noteName, instrumentName, instrument }) => null,
  renderControls: renderDefaultMidiPlayerControls,
  renderTicker: ({ tick }) => (<div>{tick}</div>)
}