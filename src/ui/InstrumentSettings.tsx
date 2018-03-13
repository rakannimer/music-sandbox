import * as React from "react";
import { Picker, Text, TextInput } from "react-native-web";

import { orderedNotes, supportedOctaves, supportedScales } from "../get-notes/";
import { ControlledSelect } from "../react-utils/";
import { instruments } from "../constants/";

const supportedInstruments = instruments;
const Fragment = React.Fragment;

export type InstrumentSettingsProps = {
  setState: () => any,
  state: {},
  renderLabel?: (str: any)=>any,
  renderSelector?: ({ state, setState, key, values }) => any,
  renderStartAtLabel?:({renderLabel})=>any,
  renderStartAtNoteNameSelector?: any
  renderStartOctaveSelector?: any,
  renderScaleLabel?: any,
  renderScaleSelector?: any,
  renderCountLabel?: any,
  renderCountInput?: any,
  renderInstrumentLabel?: any,
  renderInstrumentSelector?: any
}


export const InstrumentSettings: React.StatelessComponent<InstrumentSettingsProps> = ({
  setState,
  state,
  renderLabel,
  renderSelector,
  renderStartAtLabel,
  renderStartAtNoteNameSelector,
  renderStartOctaveSelector,
  renderScaleLabel,
  renderScaleSelector,
  renderCountLabel,
  renderCountInput,
  renderInstrumentLabel,
  renderInstrumentSelector,
}) => {
  return (
    <Fragment>
      <Fragment>
        {renderStartAtLabel({ renderLabel })}
        {renderStartAtNoteNameSelector({ state, setState, orderedNotes, renderSelector })}
        {renderStartOctaveSelector({ state, setState, supportedOctaves, renderSelector })}
      </Fragment>
      <Fragment>
        {renderScaleLabel({ renderLabel })}
        {renderScaleSelector({ state, setState, scales: supportedScales, renderSelector })}
      </Fragment>
      <Fragment>
        {renderCountLabel({ renderLabel })}
        {renderCountInput({ state, setState, max: 500, renderSelector })}
      </Fragment>
      <Fragment>
        {renderInstrumentLabel({ renderLabel })}
        {renderInstrumentSelector({ state, setState, instruments: supportedInstruments, renderSelector })}
      </Fragment>
    </Fragment>
  );
};

InstrumentSettings.defaultProps = {
  setState: () => null,
  state: {
    startNoteName: "C",
    startNoteOctave: 3,
    scale: "chromatic",
    count: 12,
    instrument: "banjo" //"acoustic_grand_piano"
  },
  renderLabel: (str) => <Text style={{fontWeight:'bold'}}>{str}</Text>,
  renderSelector: ({ state, setState, key, values }) => 
  (<ControlledSelect
    onChange={val => setState({ [key]: val })}
    selected={state[key]}
    values={values}
  />),
  renderStartAtLabel: ({ renderLabel }) => renderLabel("Start at"),
  renderStartAtNoteNameSelector: ({ renderSelector, setState, state, orderedNotes }) => (
    renderSelector({ setState, state, key: 'startNoteName', values: orderedNotes })
  ),
  renderStartOctaveSelector: ({ renderSelector, setState, state, supportedOctaves }) => (
    renderSelector({ setState, state, key: 'startNoteOctave', values: supportedOctaves })
  ),
  renderScaleLabel: ({ renderLabel }) => renderLabel("Scale"),
  renderScaleSelector: ({ renderSelector, state, setState, scales }) =>
    renderSelector({ setState, state, key: 'scale', values: scales })
  ,
  renderCountLabel: ({ renderLabel }) => renderLabel("Count")
  renderCountInput : ({ state, setState, max = 500, ...rest }) => (<TextInput
    keyboardType="numeric"
    maxLength={max}
    value={state.count}
    onChange={event => {
      const val = event.target.value;
      setState({ count: val });
    }}
  />)
  renderInstrumentLabel : ({ renderLabel }) => renderLabel("Instrument"),
  renderInstrumentSelector: ({ renderSelector, state, setState, instruments }) =>
    renderSelector({ setState, state, key: 'instrument', values: instruments })
}
