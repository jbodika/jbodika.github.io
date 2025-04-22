let knowledgeLevel = 0;

const progressBar = document.getElementById("progress-bar");
const alienGlyphs = document.getElementById("alien-glyphs");
const alienSubtitle = document.getElementById("alien-subtitle");
const animalImg = document.getElementById("animal-img");
const animalInfo = document.getElementById("animal-info");
const learnBtn = document.getElementById("learn-btn");

const alienGlyphChars = ["⨀", "⊗", "⧫", "◉", "⋇", "⋉", "⩨", "⧊", "✦", "⌬", "☍", "⟁"];
const typeSpeed = 40;

const animalAPIs = [
  {
    name: "dog",
    url: "https://random.dog/woof.json",
    key: "url",
    isValid: (url) => !url.endsWith(".mp4") && !url.endsWith(".webm"),
  },
  {
    name: "cat",
    url: "https://aws.random.cat/meow",
    key: "file",
    isValid: (url) => url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".jpeg"),
  },
  {
    name: "fox",
    url: "https://randomfox.ca/floof/",
    key: "image",
    isValid: (url) => true,
  },
];

const alienFacts = {
  dog: [
    'Subject "DOG": Loud bork beast. Worshipped by small humans.',
    'Specimen "DOG": Four-legged loyalty agent. Tail wagger.',
    'Analyzing DOG: Likely to drool. Potential pack leader.'
  ],
  cat: [
    'Entity "CAT": Soft but sharp. Might be royalty.',
    'Subject "CAT": Ignored commands. Suspected of world domination.',
    'Analyzing CAT: Mood unstable. Purring detected.'
  ],
  fox: [
    'Creature "FOX": Orange sneak. Makes strange noises.',
    'Observed FOX: Quick mover. Potential trickster intelligence.',
    'FOX specimen: Earth camouflage excellent. Tail is 80% body.'
  ]
};

function getRandomAnimalAPI() {
  return animalAPIs[Math.floor(Math.random() * animalAPIs.length)];
}

function getRandomAlienFact(animal) {
  const facts = alienFacts[animal];
  return facts[Math.floor(Math.random() * facts.length)];
}

function playAlienGibberish() {
  const gibberish = "Blorp zigg wooo kazaaa drrrp blrrr zorg-a-bork.";
  const utterance = new SpeechSynthesisUtterance(gibberish);
  utterance.pitch = 2;
  utterance.rate = 1.5;
  utterance.volume = 0.7;
  speechSynthesis.speak(utterance);
}

function generateAlienReaction(animal) {
  const reactions = [
    `👽 Observing Earthling "${animal}"...`,
    `🔬 Scanning "${animal}" from orbit...`,
    `📡 Receiving signals from "${animal}"...`,
    `🤖 Logging behavioral patterns of "${animal}"...`,
  ];
  return reactions[Math.floor(Math.random() * reactions.length)];
}

function speakAlienReaction(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-GB';
  utterance.pitch = 1.2;
  utterance.rate = 0.9;
  utterance.volume = 0.8;
  speechSynthesis.speak(utterance);
}

async function typeAlienGlyphs(text, subtitleText) {
  alienGlyphs.textContent = "";
  alienSubtitle.textContent = "";
  playAlienGibberish();

  for (let i = 0; i < text.length; i++) {
    const randomGlyph = alienGlyphChars[Math.floor(Math.random() * alienGlyphChars.length)];
    alienGlyphs.textContent += randomGlyph;
    await new Promise(res => setTimeout(res, typeSpeed));
  }

  alienSubtitle.textContent = subtitleText;
  speakAlienReaction(subtitleText);
}

async function fetchAnimalData() {
  try {
    const animalAPI = getRandomAnimalAPI();

    let data, imageUrl;
    let attempts = 0;

    do {
      const response = await fetch(animalAPI.url);
      data = await response.json();
      imageUrl = data[animalAPI.key];
      attempts++;
    } while (!animalAPI.isValid(imageUrl) && attempts < 3);

    if (!animalAPI.isValid(imageUrl)) throw new Error("No valid image after 3 attempts");

    animalImg.src = imageUrl;
    animalImg.alt = animalAPI.name;
    animalInfo.textContent = getRandomAlienFact(animalAPI.name);

    const subtitle = generateAlienReaction(animalAPI.name);
    await typeAlienGlyphs("alien_language_placeholder", subtitle);

  } catch (err) {
    console.error("API error:", err);
    alienGlyphs.textContent = "☄⨀☠✦✶⨕⧫";
    alienSubtitle.textContent = "🚨 Earth signal distorted. Transmission failed.";
  }
}

function updateKnowledge() {
  if (knowledgeLevel >= 100) return;

  knowledgeLevel += 20;
  progressBar.style.width = `${knowledgeLevel}%`;

  if (knowledgeLevel >= 100) {
    alienGlyphs.textContent = "⚛⨀ZORGON⩨✶✓";
    alienSubtitle.textContent = "✅ FULL EARTH KNOWLEDGE ACQUIRED. RETURNING TO ZORGON.";
    learnBtn.disabled = true;
    learnBtn.textContent = "Mission Complete ✅";

    // Redirect to map.html after 3 seconds
    setTimeout(() => {
      window.location.href = "map.html";
    }, 3000);
  }
}

learnBtn.addEventListener("click", async () => {
  await fetchAnimalData();
  updateKnowledge();
});
