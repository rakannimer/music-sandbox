export const NotePlayer = () => {
  const playingNotes = {};

  const playNote = ({ instrument, noteName, noteKey }) => {
    if (!(noteKey in playingNotes)) {
      playingNotes[noteKey] = [];
    }
    playingNotes[noteKey].push(instrument.play(noteName));
  };

  const stopPlayingNote = ({ noteKey }) => {
    if (!(noteKey in playingNotes)) return;
    playingNotes[noteKey].pop().stop();
  };

  return {
    playNote,
    stopPlayingNote
  };
};
