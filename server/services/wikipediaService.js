// server/services/wikipediaService.js
import https from 'https';

// Simple in-memory cache
const cache = {
  paragraphs: [],
  lastFetch: 0,
  maxItems: 50,
};

const LOCAL_FALLBACKS = [
  "The dark forest stretches infinitely before you, its ancient trees whispering secrets of forgotten times. Glowing fungi illuminate the path ahead, casting long, twisting shadows. Every step is an echo in the deep silence, a reminder that you are not the first to walk this path, nor will you be the last.",
  "Deep within the cavern, crystals pulse with a rhythmic, ethereal light. The air is cool and thick with the scent of damp earth and ozone. Ancient runes carved into the stone walls hint at a magic that has long since faded from the world above, waiting for someone to awaken it once more.",
  "Bioluminescent moss clings to the jagged rocks, painting the subterranean world in shades of vivid cyan and emerald. A subterranean river rushes past, its dark waters hiding creatures that have never seen the light of the sun. This is a realm untouched by time, preserved in eternal twilight."
];

// Fallback to a random local paragraph
const getLocalFallback = () => {
  const text = LOCAL_FALLBACKS[Math.floor(Math.random() * LOCAL_FALLBACKS.length)];
  return {
    title: "The Deep Woods (Local)",
    text,
    source: "Local"
  };
};

const fetchRandomWikipediaSummary = () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'en.wikipedia.org',
      path: '/api/rest_v1/page/random/summary',
      method: 'GET',
      headers: {
        'User-Agent': 'ForestType/1.0 (Phase 1)',
        'Accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error(`Wikipedia API error: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.end();
  });
};

export const getParagraph = async () => {
  // If we have cached items, we can pop one to serve it quickly
  if (cache.paragraphs.length > 0) {
    // Optionally fetch more in the background to keep the cache full
    if (cache.paragraphs.length < 5) {
      fillCacheBackground();
    }
    return cache.paragraphs.pop();
  }

  // If cache is empty, fetch one directly
  try {
    const data = await fetchRandomWikipediaSummary();
    
    // We only want paragraphs that have enough text to type
    if (data.extract && data.extract.length > 100) {
      return {
        title: data.title,
        text: data.extract.replace(/\n/g, ' ').trim(), // Clean basic newlines
        source: "Wikipedia"
      };
    } else {
      // If it's too short, just use a fallback to guarantee a good experience
      return getLocalFallback();
    }
  } catch (error) {
    console.error("Wikipedia fetch failed, using fallback:", error.message);
    return getLocalFallback();
  }
};

const fillCacheBackground = async () => {
  try {
    const data = await fetchRandomWikipediaSummary();
    if (data.extract && data.extract.length > 100) {
      if (cache.paragraphs.length < cache.maxItems) {
        cache.paragraphs.push({
          title: data.title,
          text: data.extract.replace(/\n/g, ' ').trim(),
          source: "Wikipedia"
        });
      }
    }
  } catch (e) {
    // Silently fail background fetching
  }
};
