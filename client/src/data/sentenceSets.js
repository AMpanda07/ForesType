export const sentenceSets = [
  "Deep within the mossy grove, soft bioluminescent spores drift through twilight mist.",
  "Root systems stretch across the dark damp earth, whispering ancient forest secrets.",
  "Quiet luminescence illuminates the subterranean cavern where green ferns unfurl.",
  "Speed and precision intertwine like overgrown vines ascending an ancient stone pillar.",
  "Every accurate keystroke strikes like a pulse of vital energy through the forest canopy.",
  "The quiet solitude of the verdant sanctuary breeds absolute focus and sharp reflexes.",
  "Through thickets of thorn and dark green foliage, the path to mastery becomes clear.",
  "Breathe steadily as glowing petals fall softly onto the carpet of emerald moss.",
  "Rhythm and consistency transform raw speed into pure graceful execution under pressure.",
  "Ancient trees stand watch over the tranquil glade as green shadows dance in moonlight."
];

export const getRandomSentence = () => {
  const index = Math.floor(Math.random() * sentenceSets.length);
  return sentenceSets[index];
};
