import * as React from "react";
import { instruments } from "../constants/";
import { getNotes, Note, MusicScaleName } from "../get-notes/";
import { RenderInstrument } from "../render-instrument/";
export type RenderNotesRenderProp = ({ notes }: { notes: Note[] }) => any;

export type RenderNotesProps = {
  startAt?: Note;
  count?: number;
  scale?: MusicScaleName;
  render?: RenderNotesRenderProp;
  children?: RenderNotesRenderProp;
};

export const RenderNotes: React.StatelessComponent<any> = ({
  startAt,
  scale,
  count,
  instrumentName = null,
  children,
  render
}) => {
  const notes = getNotes({
    startAt,
    scale,
    count
  });

  const renderNotes = children
    ? typeof children === "function" ? children : () => children
    : render ? render : () => null;

  return instrumentName === null ? (
    renderNotes({ notes })
  ) : (
    <RenderInstrument
      instrumentName={instrumentName}
      render={instrument => renderNotes({ notes, instrument })}
    />
  );
};

RenderNotes.defaultProps = {
  startAt: {
    name: "C",
    octave: 3
  },
  count: 12,
  scale: "chromatic"
};
