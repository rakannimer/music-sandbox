import * as React from "react";
import Component from "@reactions/component";

export const MidiTicker: React.StatelessComponent<{
  midiPlayer: any;
  renderTicker: (any) => any;
  state: { tick: number };
  setState: (any) => any;
}> = ({ midiPlayer, renderTicker, state, setState }) => {
  return (
    <Component
      didMount={() => {
        midiPlayer.on("playing", ({ tick }) => {
          setState({ tick });
        });
      }}>
      {renderTicker({ tick: state.tick })}
    </Component>
  );
};
