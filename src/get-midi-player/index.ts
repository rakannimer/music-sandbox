import * as MidiPlayer from "midi-player-js";
import axios from "axios";
import { getInstrumentNameFromChannelNumber } from "./get-instrument-name-from-channel-number";
import {
  getInstrument,
  InstrumentName
} from "../get-instrument-web";

export {
  getInstrumentNameFromChannelNumber
};

export const getMidiPlayer = (
  midiURL = ""
) => {
  return axios
    .get(midiURL, {
      responseType: "arraybuffer",
      maxRedirects: 5
    })
    .then(response => {
      const Player = new MidiPlayer.Player();
      const {
        data: midiArrayBuffer
      } = response;
      Player.loadArrayBuffer(
        midiArrayBuffer
      );
      return Player;
    });
};
