import * as React from "react";
import { Button } from "react-native-web";
import Component from '@reactions/component'

import { getMidiPlayer } from "../get-midi-player/";
import { RTouchable, Separator } from "../react-utils/";

import { MidiTicker } from './MidiTicker'
import { MidiEventTicker } from './MidiEventTicker'
import { createMidiControlFunctions, loadInstruments, getTrackNotes } from './midi-player-utils'
import {NotePlayer} from './NotePlayer';

const createCacheKey = JSON.stringify;

const getNoteKey = ({ noteName, track, channel }) => `${noteName}_${track}_${channel}`

export const renderDefaultMidiPlayerControls = ({ pause, play, restart, stop }) => (
  <React.Fragment>
    <Separator vertical={10} />
    <Button color="#17BF63" onPress={play} title={"Play"}/>
    <Separator vertical={10}/>
    <Button color="#17BF63" onPress={pause} title={"Pause"}/>
    <Separator vertical={10} />
    <Button color="#17BF63" onPress={stop} title={"Stop"}/>
    <Separator vertical={10} />
    <Button color="#17BF63" onPress={restart} title={"Restart"}/>
    <Separator vertical={10} />
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