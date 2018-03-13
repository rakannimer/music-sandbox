export type NoteAndOctaveOrMidiNote = string | number;

export type PlayNoteOptions = {
  gain?: number; // float between 0 to 1
  attack?: number; //the attack time of the amplitude envelope
  decay?: number; //the decay time of the amplitude envelope
  sustain?: number; // the sustain gain value of the amplitude envelope
  release?: number; // the release time of the amplitude envelope
  adsr?: [number, number, number, number]; //an array of [attack, decay, sustain, release]. Overrides other parameters.
  duration: number; // set the playing duration in seconds of the buffer(s)
  loop: boolean; // set to true to loop the audio buffer
};

export type LoadInstrumentOptions = {
  format?: "mp3" | "ogg"; // can be 'mp3' or 'ogg'
  soundfont?: "FluidR3_GM" | "MusyngKite"; // can be 'FluidR3_GM' or 'MusyngKite'
  nameToUrl?: (
    name: InstrumentName,
    soundfont: "FluidR3_GM" | "MusyngKite",
    format: "mp3" | "ogg"
  ) => string; // a function to convert from instrument names to URL
  destination?: any; // by default Soundfont uses the audioContext.destination but you can override it.
  gain?: number; // the gain (volume) of the player (1 by default)
  attack?: number; // the attack time of the amplitude envelope
  decay?: number; // the decay time of the amplitude envelope
  sustain?: number; // the sustain gain value of the amplitude envelope
  release?: number; // the release time of the amplitude envelope
  adsr?: number[]; // the amplitude envelope as array of [attack, decay, sustain, release]. It overrides other options.
  loop?: number; // set to true to loop audio buffers
  notes?: NoteAndOctaveOrMidiNote[]; // an array of the notes to decode. It can be an array of strings with note names or an array of numbers with midi note numbers. This is a performance option: since decoding mp3 is a cpu intensive process, you can limit limit the number of notes you want and reduce the time to load the instrument.
};

export type Instrument = {
  play: (
    noteAndOctaveOrMidiNote: NoteAndOctaveOrMidiNote,
    startTime?: number,
    duration?: number,
    playNoteOptions?: PlayNoteOptions
  ) => AudioNode;
  stop: (when?: number, nodes?: AudioNode[]) => any;
};

export type AudioNode = {
  stop: (when: number) => any;
};

export type SoundFontPlayer = {
  instrument: (
    ac: AudioContext,
    instrumentName: InstrumentName,
    instrumentOptions?: LoadInstrumentOptions
  ) => Promise<Instrument>;
};

export type InstrumentName =
  | "accordion"
  | "acoustic_bass"
  | "acoustic_grand_piano"
  | "acoustic_guitar_nylon"
  | "acoustic_guitar_steel"
  | "agogo"
  | "alto_sax"
  | "applause"
  | "bagpipe"
  | "banjo"
  | "baritone_sax"
  | "bassoon"
  | "bird_tweet"
  | "blown_bottle"
  | "brass_section"
  | "breath_noise"
  | "bright_acoustic_piano"
  | "celesta"
  | "cello"
  | "choir_aahs"
  | "church_organ"
  | "clarinet"
  | "clavinet"
  | "contrabass"
  | "distortion_guitar"
  | "drawbar_organ"
  | "dulcimer"
  | "electric_bass_finger"
  | "electric_bass_pick"
  | "electric_grand_piano"
  | "electric_guitar_clean"
  | "electric_guitar_jazz"
  | "electric_guitar_muted"
  | "electric_piano_1"
  | "electric_piano_2"
  | "english_horn"
  | "fiddle"
  | "flute"
  | "french_horn"
  | "fretless_bass"
  | "fx_1_rain"
  | "fx_2_soundtrack"
  | "fx_3_crystal"
  | "fx_4_atmosphere"
  | "fx_5_brightness"
  | "fx_6_goblins"
  | "fx_7_echoes"
  | "fx_8_scifi"
  | "glockenspiel"
  | "guitar_fret_noise"
  | "guitar_harmonics"
  | "gunshot"
  | "harmonica"
  | "harpsichord"
  | "helicopter"
  | "honkytonk_piano"
  | "kalimba"
  | "koto"
  | "lead_1_square"
  | "lead_2_sawtooth"
  | "lead_3_calliope"
  | "lead_4_chiff"
  | "lead_5_charang"
  | "lead_6_voice"
  | "lead_7_fifths"
  | "lead_8_bass__lead"
  | "marimba"
  | "melodic_tom"
  | "music_box"
  | "muted_trumpet"
  | "oboe"
  | "ocarina"
  | "orchestra_hit"
  | "orchestral_harp"
  | "overdriven_guitar"
  | "pad_1_new_age"
  | "pad_2_warm"
  | "pad_3_polysynth"
  | "pad_4_choir"
  | "pad_5_bowed"
  | "pad_6_metallic"
  | "pad_7_halo"
  | "pad_8_sweep"
  | "pan_flute"
  | "percussive_organ"
  | "piccolo"
  | "pizzicato_strings"
  | "recorder"
  | "reed_organ"
  | "reverse_cymbal"
  | "rock_organ"
  | "seashore"
  | "shakuhachi"
  | "shamisen"
  | "shanai"
  | "sitar"
  | "slap_bass_1"
  | "slap_bass_2"
  | "soprano_sax"
  | "steel_drums"
  | "string_ensemble_1"
  | "string_ensemble_2"
  | "synth_bass_1"
  | "synth_bass_2"
  | "synth_brass_1"
  | "synth_brass_2"
  | "synth_choir"
  | "synth_drum"
  | "synth_strings_1"
  | "synth_strings_2"
  | "taiko_drum"
  | "tango_accordion"
  | "telephone_ring"
  | "tenor_sax"
  | "timpani"
  | "tinkle_bell"
  | "tremolo_strings"
  | "trombone"
  | "trumpet"
  | "tuba"
  | "tubular_bells"
  | "vibraphone"
  | "viola"
  | "violin"
  | "voice_oohs"
  | "whistle"
  | "woodblock"
  | "xylophone";
