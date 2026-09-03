export const wordSets = {
  beginner: [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
    'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
    'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
    'tree', 'leaf', 'moss', 'root', 'stem', 'spore', 'fern', 'bark', 'wood', 'seed'
  ],

  intermediate: [
    'ancient', 'bioluminescent', 'canopy', 'breeze', 'shadow', 'ecosystem',
    'silence', 'whisper', 'forest', 'thorns', 'hollow', 'sprout', 'groves',
    'stream', 'cavern', 'emerald', 'glowing', 'decay', 'luminescence',
    'twilight', 'foliage', 'glade', 'overgrowth', 'petals', 'radiance',
    'pathway', 'mossy', 'subterranean', 'verdant', 'canopy', 'wildwood',
    'solitude', 'tranquil', 'misty', 'damp', 'lichen', 'moist', 'fungi'
  ],

  advanced: [
    'photosynthesis', 'chlorophyll', 'biodiversity', 'symbiosis', 'fungal',
    'mycelium', 'understory', 'luminescent', 'spores', 'rhizome', 'entangled',
    'subterranean', 'phosphorescent', 'microorganism', 'perpetual', 'equilibrium',
    'crystallize', 'labyrinth', 'fluorescent', 'fluctuation', 'sanctuary',
    'translucent', 'abyssal', 'metamorphosis', 'ephemeral', 'resilience'
  ],

  expert: [
    'endolithic-mycelium', 'bioluminescence_index', 'dendrochronology(100)',
    'sporocarp.decay()', 'chloroplast[#07120E]', 'synergistic+ecosystem',
    'cryptogamic-crust', 'phytoplankton#9CAF9E', 'xylem/phloem.transfer',
    'subterranean::sanctuary', 'auto-photosynthesis', 'luminescence_threshold'
  ],

  natureForestTheme: [
    'moss', 'spore', 'fern', 'thorns', 'root', 'fungus', 'glow', 'vine',
    'bark', 'hollow', 'sprout', 'shadow', 'groves', 'cavern', 'verdant',
    'canopy', 'emerald', 'foliage', 'glade', 'overgrowth', 'lichen', 'wildwood',
    'solitude', 'subterranean', 'luminescent', 'radiance', 'breeze', 'shimmer'
  ],

  numbers: [
    '1024', '4096', '8192', '128', '256', '512', '3.14159', '2026', '60',
    '100', '98.5', '360', '720', '1080', '1440', '430', '390', '375', '86400'
  ],

  punctuation: [
    'nature,', 'forest.', 'spore;', 'moss:', 'leaf?', '"glow"', 'root!',
    'tree (green)', 'moss-covered', 'wood&bark', 'fern/spore', 'sprout...'
  ]
};

export const getRandomWords = (count = 30, category = 'intermediate') => {
  const pool = wordSets[category] || wordSets.intermediate;
  const result = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    result.push(pool[randomIndex]);
  }
  return result;
};
