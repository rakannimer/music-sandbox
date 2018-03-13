import * as React from "react";
import { RenderNotes } from "../render-notes/";

export const InstrumentNotes = ({
  state: { startNoteName, startNoteOctave, scale, count, instrument },
  renderNote = ({ note, instrument, i }) => null
}) => {
  return (
    <div>
      <h5>Notes</h5>
      <RenderNotes
        startAt={{
          name: startNoteName,
          octave: startNoteOctave
        }}
        scale={scale}
        count={count}
        instrumentName={instrument}
      >
        {({ notes, instrument }) =>
          notes.map((note, i) => renderNote({ note, instrument, i }))
        }
      </RenderNotes>
    </div>
  );
};
