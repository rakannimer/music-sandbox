import * as React from "react";
import Component from "@reactions/component";
import { RenderPromise } from "../react-utils/";
import { getInstrumentNameFromChannelNumber } from "../get-midi-player/";

const getNoteKey = ({ noteName, track, channel }) =>
  `${noteName}_${track}_${channel}`;

export const MidiEventTicker = ({
  midiPlayer,
  renderTicker,
  onNoteOn = any => any,
  onNoteOff = any => any,
  instruments
}) => {
  return (
    <Component
      initialState={{ playingNotes: {} }}
      didMount={({ state, setState }) => {
        midiPlayer.on("midiEvent", midiEvent => {
          const { channel, noteName, track, name: midiEventType } = midiEvent;
          const noteKey = getNoteKey({ noteName, track, channel });
          const instrumentName = getInstrumentNameFromChannelNumber(channel);
          const reducedMidiEvent = {
            ...midiEvent,
            instrumentName,
            midiEventType
          };
          const instrument = instruments[instrumentName];
          if (midiEventType === "Note on") {
            onNoteOn({ noteKey, instrumentName, noteName, instrument });
            if (noteKey in state.playingNotes) {
              setState(state => ({
                playingNotes: {
                  ...state.playingNotes,
                  [noteKey]: {
                    count: state.playingNotes[noteKey].count + 1
                  }
                }
              }));
              return;
            } else {
              setState(state => ({
                playingNotes: {
                  ...state.playingNotes,
                  [noteKey]: {
                    count: 1
                  }
                }
              }));
            }
            // setState({ midiEvent: { a: "NOTEON", noteKey} })
          } else if (midiEventType === "Note off") {
            onNoteOff({ noteKey, instrumentName, noteName, instrument });
            if (
              noteKey in state.playingNotes &&
              state.playingNotes[noteKey] > 1
            ) {
              setState(state => ({
                playingNotes: {
                  ...state.playingNotes,
                  [noteKey]: {
                    count: state.playingNotes[noteKey].count - 1
                  }
                }
              }));
            } else {
              setState(state => ({
                playingNotes: {
                  ...state.playingNotes,
                  [noteKey]: undefined
                }
              }));
            }
          }
        });
      }}>
      {({ state }) => JSON.stringify(state.playingNotes)}
    </Component>
  );
};
