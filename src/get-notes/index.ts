export type Scale = {
  name: string;
  sequence: number[];
};
export type Scales = { [scaleName in MusicScaleName]: Scale };

const scales: Scales = {
  minor: {
    name: "Minor",
    sequence: [0, 2, 3, 5, 7, 8, 10]
  },
  aeolian: {
    name: "Minor",
    sequence: [0, 2, 3, 5, 7, 8, 10]
  },
  major: {
    name: "Major",
    sequence: [0, 2, 4, 5, 7, 9, 11]
  },
  ionian: {
    name: "Major",
    sequence: [0, 2, 4, 5, 7, 9, 11]
  },
  dorian: {
    name: "Dorian",
    sequence: [0, 2, 3, 5, 7, 9, 10]
  },
  phrygian: {
    name: "Phrygian",
    sequence: [0, 1, 3, 5, 7, 8, 10]
  },
  lydian: {
    name: "Lydian",
    sequence: [0, 2, 4, 6, 7, 9, 11]
  },
  mixolydian: {
    name: "Mixolydian",
    sequence: [0, 2, 4, 5, 7, 9, 10]
  },
  locrian: {
    name: "Locrian",
    sequence: [0, 1, 3, 5, 6, 8, 10]
  },
  chromatic: {
    name: "Chromatic",
    sequence: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  },
  acoustic: {
    name: "Acoustic",
    sequence: [0, 2, 4, 6, 7, 9, 10]
  },
  algerian: {
    name: "Algerian",
    sequence: [0, 2, 3, 5, 6, 7, 9, 10]
  },
  altered: {
    name: "Altered",
    sequence: [0, 1, 3, 4, 6, 8, 10]
  },
  pentatonic: {
    name: "Minoric",
    sequence: [0, 2, 4, 7, 9]
  },
  wholetone: {
    name: "Wholetone",
    sequence: [0, 2, 4, 6, 8, 10]
  },
  blues: {
    name: "Blues",
    sequence: [0, 3, 5, 6, 7, 10]
  },
  minorBlues: {
    name: "Minor Blues",
    sequence: [0, 2, 3, 5, 6, 7, 8, 10]
  },
  majorBlues: {
    name: "Major Blues",
    sequence: [0, 2, 3, 4, 5, 6, 7, 9, 10]
  },
  harmonicMinor: {
    name: "Harmonic Minor",
    sequence: [0, 2, 3, 5, 7, 8, 11]
  },
  melodicMinorAsc: {
    name: "Melodic Minor Asc",
    sequence: [0, 2, 3, 5, 7, 9, 11]
  },
  melodicMinorDesc: {
    name: "Melodic Minor Desc",
    sequence: [0, 2, 3, 5, 7, 8, 10]
  },
  enigmatic: {
    name: "Enigmatic",
    sequence: [0, 1, 4, 6, 8, 10, 11]
  },
  doubleHarmonic: {
    name: "Double Harmonic",
    sequence: [0, 1, 4, 5, 7, 8, 11]
  },
  persian: {
    name: "Persian",
    sequence: [0, 1, 4, 5, 6, 8, 11]
  },
  arabian: {
    name: "Arabian",
    sequence: [0, 2, 4, 5, 6, 8, 10]
  },
  japanese: {
    name: "Japanese",
    sequence: [0, 1, 5, 7, 8]
  },
  egyptian: {
    name: "Egyptian",
    sequence: [0, 2, 5, 7, 10]
  },
  hirajoshi: {
    name: "Hirajoshi",
    sequence: [0, 2, 3, 7, 8]
  },
  minorPentatonic: {
    name: "Minor Pentatonic",
    sequence: [0, 3, 5, 7, 10]
  },
  majorPentatonic: {
    name: "Major Pentatonic",
    sequence: [0, 2, 4, 7, 9]
  }
};

export type NoteName =
  | "A"
  | "A#"
  | "B"
  | "C"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#";

export enum NoteNameEnum {
  A = "A",
  "A#" = "A#",
  Bb = "A#",
  B = "B",
  "B#" = "B#",
  Cb = "B#",
  C = "C",
  "C#" = "C#",
  Db = "C#",
  D = "D",
  "D#" = "D#",
  Eb = "Eb",
  E = "E",
  F = "F",
  "F#" = "F#",
  Gb = "F#",
  G = "G",
  "G#" = "G#",
  Ab = "G#"
}

export type NoteOctave = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Note = {
  name: NoteName;
  octave: NoteOctave;
};

export type MusicScaleName =
  | "chromatic"
  | "aeolian"
  | "mixolydian"
  | "ionian"
  | "dorian"
  | "phrygian"
  | "lydian"
  | "pentatonic"
  | "minor"
  | "major"
  | "locrian"
  | "acoustic"
  | "algerian"
  | "altered"
  | "wholetone"
  | "blues"
  | "minorBlues"
  | "majorBlues"
  | "harmonicMinor"
  | "melodicMinorAsc"
  | "melodicMinorDesc"
  | "enigmatic"
  | "doubleHarmonic"
  | "persian"
  | "arabian"
  | "japanese"
  | "egyptian"
  | "hirajoshi"
  | "minorPentatonic"
  | "majorPentatonic";

export type GetNotesOptions = {
  startAt?: Note | null;
  count?: number | null;
  scale?: MusicScaleName | null;
};

export interface RenderNotesOptions extends GetNotesOptions {
  render: () => any;
}

export type GetNotesBetween = (
  startAt: Note,
  endAt: Note,
  scale: MusicScaleName
) => Note[];

export type GetNotesAfter = (
  startAt: Note,
  count: number,
  scale: MusicScaleName
) => Note[];

export const orderedNotes = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B"
];

export const supportedOctaves = [1, 2, 3, 4, 5, 6, 7, 8];

export const supportedScales = Object.keys(scales);

export const higherNote = (first, second) => {
  const indexOfFirst = orderedNotes.indexOf(first);
  const indexOfSecond = orderedNotes.indexOf(second);
  return indexOfSecond >= indexOfFirst ? second : first;
};

export const getNotesBetween: GetNotesBetween = (startAt, endAt, scale) => {
  const startNoteName = startAt.name;
  const startNoteOctave = startAt.octave;
  const lastNoteName = endAt.name;
  const lastNoteOctave = endAt.octave;
  const notes = getOrderedNotes(startNoteName, scale);
  const lastNoteIndex = orderedNotes.indexOf(lastNoteName);
  const resultNotes: Note[] = [];
  let previousNoteIndex = 0;
  let octave = startNoteOctave;
  let isDone = false; // currentNote === lastNoteName && octave === lastNoteOctave;
  let i = 0;
  do {
    const currentNoteIndex = i % notes.length;
    const currentNote = notes[currentNoteIndex];
    const previousNote = notes[previousNoteIndex];
    if (
      higherNote(previousNote, currentNote) === previousNote &&
      currentNote !== previousNote
    ) {
      octave++;
    }
    if (currentNote === lastNoteName && octave >= lastNoteOctave) {
      isDone = true;
    }
    if (octave === lastNoteOctave && currentNoteIndex >= lastNoteIndex) {
      isDone = true;
    }
    if (!isDone) {
      resultNotes.push({
        name: currentNote,
        octave
      } as Note);
    }
    previousNoteIndex = currentNoteIndex;
    i++;
  } while (!isDone);
  return resultNotes;
};

export const getNotesAfter: GetNotesAfter = (startAt, count, scale) => {
  const startNoteName = startAt.name;

  const startNoteOctave = startAt.octave;
  const notes = getOrderedNotes(startNoteName, scale);
  const resultNotes: Note[] = [];
  let previousNoteIndex = 0;
  let octave = startNoteOctave;
  for (let i = 0; i < count; i += 1) {
    const currentNoteIndex = i % notes.length;
    const currentNote = notes[currentNoteIndex];
    const previousNote = notes[previousNoteIndex];
    if (
      higherNote(previousNote, currentNote) === previousNote &&
      currentNote !== previousNote
    ) {
      octave++;
    }
    resultNotes.push({
      name: currentNote,
      octave
    } as Note);
    previousNoteIndex = currentNoteIndex;
  }
  return resultNotes;
};

export const getOrderedNotes = (
  rootNoteName: NoteName,
  scale: MusicScaleName
) => {
  const resultNotes = [];
  if (!(scale in scales)) {
    return [];
  }
  const { sequence, name } = scales[scale];
  const scaleLength = sequence.length;

  let startNoteIndex = orderedNotes.indexOf(rootNoteName);
  const rootNoteNameIndex = orderedNotes.indexOf(rootNoteName);
  for (let i = 0; i < scaleLength; i += 1) {
    const currentNoteNameIndex =
      (rootNoteNameIndex + sequence[i]) % orderedNotes.length;
    const currentNoteName = orderedNotes[currentNoteNameIndex];
    resultNotes.push(currentNoteName);
  }
  return resultNotes;
};

const isEmpty = (val: any) => val === null || val === undefined;

export const getNotes = (options: GetNotesOptions = {}) => {
  const startAtNote = isEmpty(options.startAt)
    ? { name: "C" as NoteName, octave: 3 as NoteOctave }
    : (options.startAt as Note);

  // const endAtNote = isEmpty(options.endAt) ? null : (options.endAt as Note);
  const count = isEmpty(options.count) ? 12 : (options.count as number);
  const scale = isEmpty(options.scale)
    ? "chromatic"
    : (options.scale as MusicScaleName);

  // if (endAtNote === null) {
  return getNotesAfter(startAtNote, count, scale);
  // }
  // return getNotesBetween(startAtNote, endAtNote, scale);
};

export default getNotes;
