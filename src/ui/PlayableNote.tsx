import * as React from "react";
import { RTouchable } from "../react-utils/";

export const PlayableNote = ({
  note,
  instrument,
  playingNotes,
  render = ({ note }) => <div>{JSON.stringify(note)}</div>
}) => {
  return (
    <RTouchable
      onPress={() => null}
      key={`${note.name}${note.octave}`}
      onPressDown={() => {
        const noteAndOctave = `${note.name}${note.octave}`;
        if (noteAndOctave in playingNotes) {
          playingNotes[noteAndOctave].count += 1;
        } else {
          playingNotes[noteAndOctave] = {
            note: instrument.play(noteAndOctave),
            count: 1
          };
        }
      }}
      onPressUp={() => {
        const noteAndOctave = `${String(note.name)}${String(note.octave)}`;
        if (!(noteAndOctave in playingNotes)) return;
        const { note: playingNote, count } = playingNotes[noteAndOctave];
        playingNote.stop();
        if (count === 1) {
          delete playingNotes[noteAndOctave];
        } else {
          playingNotes[noteAndOctave].count -= 1;
        }
        // return;
      }}
    >
      {render({ note })}
    </RTouchable>
  );
};
