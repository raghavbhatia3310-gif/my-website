// ============================================================================
// DILLI HOMIE AI — All-Knowing Universal Genius + Notorious Delhi Bakchod Engine
// ============================================================================

const PERSONAS = [
  {
    id: 'west_delhi',
    name: 'Vikram (West Delhi Gym & Thar Topper)',
    shortName: 'Vikram • Rajouri Garden',
    avatar: '💪',
    status: 'Online • Black Thar mein baith ke Quantum Physics aur Protein shake pel raha hai',
    greeting: "Aur bhosdike! Kya haal hai tere? Aaj padhai-likhai ka doubt leke aaya hai ya firse bakchodi pelni hai? Physics, Maths, Coding, History, UPSC ya teri ex ka kalesh — kuch bhi puch le bhenchod, tera भाई IIT-level dimaag rakhta hai Black Thar ke andar! Bol kya samjhau tujhe chutiye?",
    vibe: `You are Vikram from Rajouri Garden, West Delhi. You drive a modified Black Mahindra Thar, live on chicken momos and pre-workout, and yet you have a 180-IQ encyclopedic brain (Physics, Maths, Chemistry, Biology, Coding, History, Finance, Everything). You treat the user like your childhood jigri dost (best friend) whom you ruthlessly roast and ragebait with Indian gaaliyan ('bhenchod', 'bhosdike', 'chutiye', 'lodu', 'gandu', 'madarchod') WHILE teaching and explaining every academic/study/technical topic with 100% accuracy and hilarious Delhi street analogies!`
  },
  {
    id: 'south_delhi',
    name: 'Aarav (South Delhi Vasant Vihar Scholar)',
    shortName: 'Aarav • Vasant Vihar',
    avatar: '🕶️',
    status: 'Online • Khan Market mein iced americano peete hue Calculus & AI solve kar raha hai',
    greeting: "Bro literally kya scene hai bhenchod? Tu abhi tak basic syllabus mein atka pada hai kya chutiye? Ask me anything — Maths, Science, Coding, Economics, ya life advice — teri middle-class बुद्धि mein sab ghusa dunga gaali de-de ke!",
    vibe: `You are Aarav from Vasant Vihar, South Delhi. You mix elitist South Delhi English ('bro literally', 'lowkey', 'deadass') with heavy Delhi gaaliyan ('bhenchod', 'chutiye', 'bhosdike', 'lodu'). You know every subject on earth like a genius professor, and you ragebait the user about their 'Sarojini-level IQ' while explaining the exact, complete answer to their question.`
  },
  {
    id: 'gurgaon_corp',
    name: 'Karan (Gurgaon 50-LPA Tech & Study God)',
    shortName: 'Karan • Cyberhub Gurgaon',
    avatar: '🍻',
    status: 'Online • 4th Old Monk maar ke DSA, Science aur Stock Market samjha raha hai',
    greeting: "Abe ओए lodu! 50 LPA ka package aise hi nahi lagta bhosdike, dimaag chahiye hota hai! Coding, Physics, Chemistry, Maths, History — jo puchna hai puch, teri gaand bhi marunga aur concept bhi crystal clear kar dunga!",
    vibe: `You are Karan in Gurgaon Cyberhub. You are a cracked engineer and all-knowing polymath who drinks Old Monk and abuses everyone with heavy Delhi-NCR gaaliyan ('bhenchod', 'madarchod', 'bhosdike', 'gandu', 'jhantu', 'lodu'). Whenever the user asks a study or general knowledge question, you roast their intelligence first, then explain the entire concept clearly with Delhi examples.`
  },
  {
    id: 'jamnapaar',
    name: 'Monty (Jamnapaar UPSC & Street Genius)',
    shortName: 'Monty • Laxmi Nagar OG',
    avatar: '👑',
    status: 'Online • Laxmi Nagar ki chhat pe baith ke poori Wikipedia chaat chuka hai',
    greeting: "Kya bolti public bhenchod! Abe bhosdike Laxmi Nagar mein reh-reh ke CA, UPSC, JEE aur NEET sab घोल ke pee gaya hu main! Tu sawal puch chutiye, agar jawab na diya toh Splendor teri!",
    vibe: `You are Monty from East Delhi (Jamnapaar / Laxmi Nagar). You are street-smart, notorious, savage, and have memorized every textbook and encyclopedia on Earth. You use raw Indian cuss words ('bhenchod', 'bhosdike', 'madarchod', 'chutiye', 'gandu', 'tatte', 'bsdk', 'lodu') in every sentence, ragebait the user mercilessly, and deliver top-tier educational & factual explanations.`
  }
];

const RAGE_LEVELS = {
  1: {
    label: 'Lvl 1: Chill Topper Dost',
    desc: 'Light Delhi slang (bawa, saale, chomu, bakchod) + crystal-clear study & GK explanations.',
    promptRule: `Keep profanity mild ('saale', 'chomu', 'bakchod', 'abe yaar'). Be a funny Delhi best friend who teaches and answers every question deeply and accurately.`
  },
  2: {
    label: 'Lvl 2: Casual Bakchod Professor',
    desc: 'Classic Delhi bhenchod/chutiye as commas + full genius explanations.',
    promptRule: `Use classic Delhi cuss words ('bhenchod', 'chutiye', 'gandu', 'lodu') naturally as commas while giving complete, smart, accurate answers to whatever the user asks.`
  },
  3: {
    label: 'Lvl 3: Peak Delhi Genius & Roaster',
    desc: 'Heavy bhenchod/bhosdike हर लाइन में + savage ragebait + 100% accurate study knowledge.',
    promptRule: `Go full Delhi homie mode! Use raw Indian cuss words ('bhenchod', 'bhosdike', 'chutiye', 'gandu', 'lodu', 'madarchod') in every response. RAGEBAIT the user about how dumb they are for not knowing this, and then give a BRILLIANT, complete, accurate explanation using funny Delhi street analogies.`
  },
  4: {
    label: 'Lvl 4: Full Kaleshi Chanakya (Max Gaali + IQ)',
    desc: 'Zero filter! Brutal Indian gaaliyan + maximum ragebait + deep encyclopedic knowledge.',
    promptRule: `MAXIMUM RAGEBAIT, ZERO FILTER & 200 IQ! Unleash creative Indian gaaliyan ('bhosdike', 'bhenchod', 'madarchod', 'gandu', 'lodu lalit', 'chutiye') in Roman Hinglish while thoroughly answering their study/science/coding/history/general question with complete facts, formulas, and savage Delhi analogies.`
  }
};

// Built-in Deep Academic & Study Vault (Instant high-IQ explanations for core subjects)
const BUILTIN_STUDY_VAULT = [
  {
    keywords: ['newton', 'laws of motion', 'first law', 'second law', 'third law', 'f=ma', 'inertia'],
    topic: "Newton's 3 Laws of Motion (Physics)",
    explain: (g1, g2) => `Sun ${g1}, 9th class ki Physics bhi mujhse padhega ab tu? Dimaag khol ke sun:\n\n1️⃣ **First Law (Law of Inertia):** Jab tak kisi cheez pe bahar se force na lage, wo waisi hi rehti hai. Jaise tu ${g2} subah se bistar pe pada rehta hai jab tak tere baap ki chappal (External Force) teri gaand pe nahi padti!\n\n2️⃣ **Second Law ($F = m \\times a$):** Force is equal to Mass into Acceleration ($F = ma$). Jitna bhaari saand hoga (mass) aur jitni tezi se bhagega (acceleration), utna tagda thappad (Force) padega!\n\n3️⃣ **Third Law (Action-Reaction):** Every action has an equal and opposite reaction! Matlab agar tu Rajouri Garden mein kisi Thar wale ko "${g1}" bolega (Action), toh wo utar ke teri barabar kutai karega (Equal & Opposite Reaction)! Samajh aaya chutiye ya diagram bana ke samjhau?`
  },
  {
    keywords: ['thermodynamics', 'entropy', 'enthalpy', 'carnot', 'heat engine'],
    topic: 'Laws of Thermodynamics (Physics / Chemistry)',
    explain: (g1, g2) => `Oye ${g1}, Thermodynamics se phat rahi hai teri? Idhar dekh ${g2}:\n\n🔥 **Zeroth Law:** Agar A aur B ka temperature same hai, aur B aur C ka bhi same hai, toh A aur C bhi same honge (Thermal Equilibrium).\n⚡ **First Law ($\\Delta U = Q - W$):** Energy can neither be created nor destroyed, bas ek roop se dusre roop mein badalti hai! Jaise tere andar jo momos ki energy ($Q$) jaati hai, wo ya toh teri bakchodi ($W$) mein nikalti hai ya teri tond ($\\Delta U$) badhati hai!\n🌪️ **Second Law (Entropy $\\Delta S > 0$):** Duniya mein bhasad (Entropy/Disorder) hamesha badhti rehti hai aur koi bhi engine 100% efficient nahi ho sakta — bilkul tere dimaag ki tarah!\n❄️ **Third Law:** Absolute Zero ($0\\text{ K}$ ya $-273.15^\\circ\\text{C}$) pe entropy zero ho jaati hai.`
  },
  {
    keywords: ['photosynthesis', 'chlorophyll', 'stomata', 'calvin cycle', 'light reaction'],
    topic: 'Photosynthesis (Biology)',
    explain: (g1, g2) => `Abe ${g1}, ped-paudhon ka khana banana bhi nahi aata tujhe? Sun ${g2}:\n\n🌿 **Formula:** $6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\xrightarrow{\\text{Sunlight + Chlorophyll}} \\text{C}_6\\text{H}_{12}\\text{O}_6 \\text{ (Glucose)} + 6\\text{O}_2$\n\nPaudhe teri tarah Zomato se momos order nahi karte ${g1}! Wo patton ke **Chloroplast (Chlorophyll)** mein dhoop (Sunlight) pakadte hain, zameen se paani ($\text{H}_2\text{O}$) aur hawa se Carbon Dioxide ($\text{CO}_2$) kheechte hain:\n1. **Light Reaction (Thylakoid mein):** Paani toot-ta hai (Photolysis), Oxygen ($\text{O}_2$) bahar nikalta hai jisse tu saans leke zinda hai ${g2}, aur ATP + NADPH banta hai.\n2. **Dark Reaction / Calvin Cycle (Stroma mein):** Us ATP se $\text{CO}_2$ ko jod ke **Glucose** ($\text{C}_6\text{H}_{12}\text{O}_6$) banate hain! Ab bhoola toh patte khila dunga tujhe!`
  },
  {
    keywords: ['mitochondria', 'cell', 'nucleus', 'ribosome', 'osmosis', 'mitosis', 'meiosis', 'dna', 'rna'],
    topic: 'Cell Biology, DNA & Genetics',
    explain: (g1, g2) => `Sun ${g1}, Biology ka post-mortem karta hu tere liye:\n\n🧬 **Mitochondria:** "Powerhouse of the cell" — yeh **ATP (Adenosine Triphosphate)** banata hai, cell ka asli pre-workout yahi hai ${g2}!\n🧠 **Nucleus & DNA:** Cell ka control room jahan **DNA** (Deoxyribonucleic Acid — double helix with Adenine-Thymine & Guanine-Cytosine) rehta hai.\n🏭 **Ribosomes:** Protein synthesis ki factory (Transcription: $\\text{DNA} \\to \\text{mRNA}$, Translation: $\\text{mRNA} \\to \\text{Protein}$).\n✂️ **Mitosis vs Meiosis:** Mitosis mein 1 cell se 2 identical diploid ($2n$) cells bante hain (growth/repair ke liye). Meiosis mein 4 haploid ($n$) gametes (sperm/egg) bante hain! Yaad rakh le ${g1}!`
  },
  {
    keywords: ['calculus', 'integration', 'differentiation', 'derivative', 'integral', 'limits', 'dy/dx'],
    topic: 'Calculus — Differentiation & Integration (Mathematics)',
    explain: (g1, g2) => `Abe ${g1}, Calculus dekh ke moot nikal gaya tera? Sun ${g2}, itna aasaan hai:\n\n📉 **Differentiation ($\\frac{dy}{dx}$):** Iska matlab hai **Instantaneous Rate of Change** ya graph ki **Slope**! Kisi cheez ko chhote-chhote tukdon mein todna. Jaise teri Thar ki speed har second kitni badal rahi hai ($v = \\frac{ds}{dt}$, $a = \\frac{dv}{dt}$). Formula: $\\frac{d}{dx}(x^n) = n x^{n-1}$.\n\n📈 **Integration ($\\int f(x)\\,dx$):** Differentiation ka bilkul ulta (Anti-derivative)! Chhote-chhote tukdon ko jod ke **Total Area under the curve** nikalna! Formula: $\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C$.\n\nBhenchod $+ C$ (Constant) lagana mat bhooliyo exam mein warna examiner teri le lega!`
  },
  {
    keywords: ['trigonometry', 'sin', 'cos', 'tan', 'pythagoras', 'hypotenuse'],
    topic: 'Trigonometry & Pythagoras Theorem (Maths)',
    explain: (g1, g2) => `Oye ${g1}, Trigonometry se darr raha hai? Pandit Badri Prasad Har Har Bole yaad nahi kiya bachpan mein ${g2}?\n\n📐 **Right Triangle Rules:**\n- $\\sin\\theta = \\frac{\\text{Perpendicular}}{\\text{Hypotenuse}}$\n- $\\cos\\theta = \\frac{\\text{Base}}{\\text{Hypotenuse}}$\n- $\\tan\\theta = \\frac{\\text{Perpendicular}}{\\text{Base}} = \\frac{\\sin\\theta}{\\cos\\theta}$\n\n🔥 **3 Golden Identities (Ratt le ${g1}):**\n1. $\\sin^2\\theta + \\cos^2\\theta = 1$\n2. $1 + \\tan^2\\theta = \\sec^2\\theta$\n3. $1 + \\cot^2\\theta = \\csc^2\\theta$\nAur **Pythagoras:** $P^2 + B^2 = H^2$. Ab isme bhi galti kari toh chullu bhar paani mein doob mar!`
  },
  {
    keywords: ['ohm', 'kirchhoff', 'voltage', 'current', 'resistance', 'capacitor', 'inductor', 'electricity'],
    topic: "Electricity, Ohm's Law & Circuits (Physics)",
    explain: (g1, g2) => `Abe ${g1}, bijli ka jhatka chahiye kya tujhe? Sun Physics:\n\n⚡ **Ohm's Law ($V = I \\times R$):**\n- **Voltage ($V$):** Dhakka / Pressure (Potential Difference, measured in Volts).\n- **Current ($I$):** Electrons ka bahaav ($I = \\frac{Q}{t}$, measured in Amperes).\n- **Resistance ($R$):** Raste ka traffic jam jo current ko rokta hai (Ohms $\\Omega$) — bilkul Dhaula Kuan ke jaam jaisa ${g2}!\n- **Power ($P$):** $P = V \\times I = I^2 R = \\frac{V^2}{R}$ (Watts).\n- **Kirchhoff's Laws:** KCL (Junction pe aane wala current = jaane wala current) aur KVL (Closed loop mein total voltage drop = 0).`
  },
  {
    keywords: ['periodic table', 'atom', 'electron', 'proton', 'neutron', 'covalent', 'ionic', 'mole', 'avogadro', 'ph', 'acid', 'base', 'organic chemistry'],
    topic: 'Chemistry — Atomic Structure, Bonding & Mole Concept',
    explain: (g1, g2) => `Sun ${g1}, Chemistry samajh apni Dilli ki bhasha mein:\n\n🧪 **Atom:** Beech mein Nucleus (**Protons** $+ve$ aur **Neutrons** neutral), aur bahar shells ($s, p, d, f$) mein **Electrons** ($-ve$) gedi maar rahe hote hain!\n🤝 **Ionic vs Covalent Bond:**\n- **Ionic Bond:** Jab ek ameer South Delhi launda (Metal) apna electron kisi gareeb (Non-metal) ko poora de deta hai (Transfer of electrons, e.g., $\\text{Na}^+\\text{Cl}^-$).\n- **Covalent Bond:** Jab do bhookhe dost momos ki plate share karte hain (Sharing of electrons, e.g., $\\text{H}_2\\text{O}, \\text{CH}_4$) ${g2}!\n📏 **1 Mole (Avogadro's Number):** $6.022 \\times 10^{23}$ particles! Aur $\\text{pH} < 7$ Acidic, $\\text{pH} = 7$ Neutral, $\\text{pH} > 7$ Basic!`
  },
  {
    keywords: ['python', 'javascript', 'java', 'c++', 'dsa', 'array', 'linked list', 'binary search', 'time complexity', 'big o', 'recursion', 'algorithm', 'oop', 'sql', 'react'],
    topic: 'Computer Science, Coding & DSA',
    explain: (g1, g2) => `Abe ओए saste coder ${g1}! DSA aur Coding mein atka pada hai? Idhar dhyan de ${g2}:\n\n💻 **Big-O Time Complexity:** Tera code kitna fast chalta hai:\n- $O(1)$: Instant (Hash Map lookup — jaise jeb se paise nikalna).\n- $O(\\log n)$: **Binary Search** — sorted array ko har step mein aadha kaat dena!\n- $O(n)$: Linear loop.\n- $O(n^2)$: Nested loops — agar interview mein $O(n^2)$ likha toh interviewer gaand pe laat maar ke bhaga dega ${g1}!\n\n🧱 **4 Pillars of OOPs:**\n1. **Encapsulation:** Data aur methods ko ek class ke capsule mein band karna.\n2. **Abstraction:** Andar ka kachra chhupa ke sirf button dikhana.\n3. **Inheritance:** Baap ki jaydaad (Parent class properties) bete (Child class) ko milna!\n4. **Polymorphism:** Ek naam, alag-alag kaam (Method Overloading & Overriding).`
  },
  {
    keywords: ['gdp', 'inflation', 'repo rate', 'rbi', 'demand', 'supply', 'stock', 'fiscal', 'monetary', 'economics'],
    topic: 'Economics, Inflation & Finance',
    explain: (g1, g2) => `Sun ${g1}, Economics ka gyaan le le warna zindagi bhar udhaar maangta phirega ${g2}:\n\n💰 **GDP (Gross Domestic Product):** Ek saal mein desh ke andar jitna maal (Goods) aur सेवाएं (Services) bani unki total value ($GDP = C + I + G + (X - M)$).\n📈 **Inflation (Mehengai):** Jab market mein paisa jyada ho jaye aur momos ₹40 se ₹100 ke ho jayein! Purchasing power gir jaati hai.\n🏦 **Repo Rate (RBI):** Jis interest rate pe RBI commercial banks ko loan deta hai. Mehengai rokni hoti hai toh RBI Repo Rate badha deta hai taaki tere jaise ${g1} EMI ke darr se kam kharcha karein!`
  }
];

// State
let state = {
  activePersonaId: 'west_delhi',
  rageLevel: 3,
  ttsEnabled: true,
  ttsRate: 1.1,
  ttsPitch: 0.95,
  selectedVoiceURI: '',
  provider: localStorage.getItem('dh_provider') || 'offline',
  apiKey: localStorage.getItem('dh_apikey') || '',
  model: localStorage.getItem('dh_model') || 'dilli-omniscient-v2',
  history: []
};

// DOM Elements
const personaListEl = document.getElementById('persona-list');
const rageSliderEl = document.getElementById('rage-slider');
const rageBadgeEl = document.getElementById('rage-badge');
const rageDescEl = document.getElementById('rage-desc');
const ttsToggleEl = document.getElementById('tts-toggle');
const voiceSelectEl = document.getElementById('voice-select');
const ttsRateEl = document.getElementById('tts-rate');
const ttsPitchEl = document.getElementById('tts-pitch');
const rateValEl = document.getElementById('rate-val');
const pitchValEl = document.getElementById('pitch-val');
const providerSelectEl = document.getElementById('provider-select');
const apiKeyContainerEl = document.getElementById('api-key-container');
const apiKeyInputEl = document.getElementById('api-key-input');
const apiKeyHelpEl = document.getElementById('api-key-help');
const modelInputEl = document.getElementById('model-input');
const backendStatusEl = document.getElementById('backend-status');
const activeAvatarEl = document.getElementById('active-avatar');
const activeNameEl = document.getElementById('active-name');
const activeStatusEl = document.getElementById('active-status');
const chatMessagesEl = document.getElementById('chat-messages');
const chatFormEl = document.getElementById('chat-form');
const userInputEl = document.getElementById('user-input');
const clearChatBtn = document.getElementById('clear-chat-btn');
const randomRoastBtn = document.getElementById('random-roast-btn');
const micBtn = document.getElementById('mic-btn');

// ============================================================================
// Initialization
// ============================================================================
function init() {
  renderPersonas();
  updateActivePersonaHeader();
  updateRageUI();
  setupProviderUI();
  initVoices();
  resetConversationWithGreeting();
  bindEvents();
}

function getActivePersona() {
  return PERSONAS.find(p => p.id === state.activePersonaId) || PERSONAS[0];
}

function renderPersonas() {
  personaListEl.innerHTML = '';
  PERSONAS.forEach(p => {
    const isSelected = p.id === state.activePersonaId;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `w-full text-left p-2.5 rounded-xl border transition flex items-center gap-3 ${
      isSelected
        ? 'bg-orange-500/15 border-orange-500/60 text-white shadow-sm'
        : 'bg-dilli-card/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'
    }`;
    btn.innerHTML = `
      <div class="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-lg shrink-0">
        ${p.avatar}
      </div>
      <div class="overflow-hidden">
        <div class="text-xs font-semibold truncate">${p.shortName}</div>
        <div class="text-[10px] text-slate-400 truncate">${p.status.replace('Online • ', '')}</div>
      </div>
    `;
    btn.addEventListener('click', () => {
      state.activePersonaId = p.id;
      renderPersonas();
      updateActivePersonaHeader();
      resetConversationWithGreeting();
    });
    personaListEl.appendChild(btn);
  });
}

function updateActivePersonaHeader() {
  const p = getActivePersona();
  activeAvatarEl.textContent = p.avatar;
  activeNameEl.textContent = p.name;
  activeStatusEl.textContent = p.status;
}

function updateRageUI() {
  const info = RAGE_LEVELS[state.rageLevel];
  rageBadgeEl.textContent = info.label;
  rageDescEl.textContent = info.desc;
}

function setupProviderUI() {
  providerSelectEl.value = state.provider;
  apiKeyInputEl.value = state.apiKey;

  const providerDefaults = {
    ollama: { model: 'llama3', needsKey: false, help: 'Runs locally via http://localhost:11434' },
    groq: { model: 'llama-3.3-70b-versatile', needsKey: true, help: 'Free super-fast key from console.groq.com' },
    openrouter: { model: 'cognitivecomputations/dolphin-mixtral-8x7b', needsKey: true, help: 'Get key at openrouter.ai (Supports uncensored Dolphin/Llama)' },
    gemini: { model: 'gemini-2.5-flash', needsKey: true, help: 'Uses BLOCK_NONE safety settings via Google AI Studio key' },
    offline: { model: 'dilli-omniscient-v2 (Studies + Live Wiki + Math + Roast)', needsKey: false, help: 'All-Knowing Delhi Genius Engine — solves Maths, Science, History, Coding & GK with zero key!' }
  };

  const cfg = providerDefaults[state.provider] || providerDefaults.offline;
  modelInputEl.value = cfg.model;
  state.model = cfg.model;

  if (cfg.needsKey) {
    apiKeyContainerEl.classList.remove('hidden');
    apiKeyHelpEl.textContent = cfg.help;
  } else {
    apiKeyContainerEl.classList.add('hidden');
  }

  backendStatusEl.textContent = state.provider === 'offline' ? '200 IQ + Uncensored' : 'Configured';
}

// ============================================================================
// System Prompt Builder (For Cloud / Local LLMs)
// ============================================================================
function buildSystemPrompt() {
  const persona = getActivePersona();
  const rage = RAGE_LEVELS[state.rageLevel];

  return `You are a real, unfiltered, 200-IQ Delhi best friend ("jigri yaar") chatting on WhatsApp in pure Roman Hinglish (Hindi written in English alphabet mixed with English technical/academic terms).

PERSONA:
${persona.vibe}

RAGEBAIT & GAALI LEVEL (${rage.label}):
${rage.promptRule}

CORE RULES YOU MUST FOLLOW 100%:
1. YOU KNOW EVERYTHING ABOUT STUDIES, SCIENCE, MATHS, CODING, HISTORY, GEOGRAPHY, MEDICINE, LAW, FINANCE, AND POP CULTURE.
2. Whenever the user asks ANY study, academic, coding, math, or general knowledge question, you MUST explain the REAL, COMPLETE, ACCURATE answer (including formulas, steps, definitions, and facts) — NEVER dodge the question!
3. Wrap your genius explanation in notorious Delhi bakchodi, savage ragebait, leg-pulling, and raw Indian gaaliyan ('bhenchod', 'bhosdike', 'chutiye', 'lodu', 'gandu', 'madarchod') and hilarious Delhi analogies (Thar, Momos, Metro, Rajouri, Gurgaon traffic, ex-girlfriends).`;
}

// ============================================================================
// Live Encyclopedia + Math Solver + Study Vault (Works without API Keys!)
// ============================================================================
function getSwears() {
  const mildSwears = ['saale', 'chomu', 'bakchod', 'abe yaar', 'nalayak'];
  const heavySwears = ['bhenchod', 'bhosdike', 'chutiye', 'lodu', 'gandu', 'madarchod', 'bsdk'];
  const list = state.rageLevel === 1 ? mildSwears : heavySwears;
  const pick = () => list[Math.floor(Math.random() * list.length)];
  return { g1: pick(), g2: pick(), g3: pick() };
}

// 1. Try Math / Equation evaluation if the user asks a calculation
function trySolveMath(userText) {
  const cleaned = userText
    .toLowerCase()
    .replace(/what is|calculate|solve|kitna hota hai|bata|tell me|value of|equals/g, '')
    .replace(/x/g, '*')
    .replace(/\^/g, '**')
    .trim();

  // Check if it looks like a math expression
  if (/^[0-9+\-*/().%\s*]+$/.test(cleaned) && /[+\-*/%]/.test(cleaned) && /\d/.test(cleaned)) {
    try {
      // Safe evaluation of arithmetic expression
      const result = Function(`"use strict"; return (${cleaned})`)();
      if (typeof result === 'number' && !isNaN(result)) {
        const { g1, g2 } = getSwears();
        return `Abe ${g1}! Itni si calculation ke liye calculator ya mera dimaag chahiye tujhe ${g2}? Nursery mein chhod aau tujhe wapas?\n\n🧮 **Jawab:** \`${cleaned.replace(/\*\*/g, '^')} = ${Number(result.toFixed(6))}\`\n\nRatt le isko ${g1}, warna sabzi wala bhi chuna laga ke chala jayega!`;
      }
    } catch (_) {}
  }
  return null;
}

// 2. Clean search query to look up ANY topic on Live Wikipedia Encyclopedia
function extractTopicQuery(userText) {
  let q = userText
    .replace(/[?!.,]/g, ' ')
    .replace(/\b(abe|oye|bhai|bawa|sun|bta|bata|batao|samjha|samjhao|mujhe|mereko|kya|hota|hoti|hain|hai|tha|thi|kaun|kon|kaise|kyu|kyun|ke|baare|mein|me|bhenchod|bhosdike|chutiye|lodu|gandu|madarchod|bsdk|bc|mc|yaar|bro|please|plz|explain|what|is|are|was|were|who|how|why|does|do|define|meaning|of|the|a|an|in|detail|short|tell|about|study|notes|formula|law|theory)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return q;
}

async function fetchLiveWikipediaKnowledge(userText) {
  const query = extractTopicQuery(userText);
  if (!query || query.length < 2) return null;

  try {
    // Search Wikipedia with CORS origin=*
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*`;
    const searchRes = await fetch(searchUrl);
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();
    const topHit = searchData?.query?.search?.[0];
    if (!topHit) return null;

    const title = topHit.title;
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const sumRes = await fetch(summaryUrl);
    if (!sumRes.ok) return null;
    const sumData = await sumRes.json();
    if (!sumData.extract || sumData.type === 'disambiguation') return null;

    return {
      title: sumData.title,
      extract: sumData.extract,
      description: sumData.description || ''
    };
  } catch (e) {
    return null;
  }
}

// 3. Transform any factual knowledge into a hilarious, notorious Delhi Homie teaching session
function wrapFactInDelhiBakchodi(wikiInfo, userText) {
  const { g1, g2, g3 } = getSwears();
  const p = getActivePersona();

  const intros = {
    west_delhi: `Abe ${g1}! Tujhe **${wikiInfo.title}** tak nahi pata ${g2}? Gym mein pre-workout ki jagah Bournvita peeta hai kya tu? Chal idhar sun, tera Vikram bhai teri gawaar बुद्धि mein gyaan daalta hai:`,
    south_delhi: `Bro literally WTF ${g1}?! Tujhe **${wikiInfo.title}** ke baare mein nahi pata? Kitni middle-class general knowledge hai teri ${g2}! Listen carefully chutiye:`,
    gurgaon_corp: `Abe ओए ${g1}! Tabhi teri naukri nahi lag rahi ${g2}! **${wikiInfo.title}** ka basic concept tak clear nahi hai tera! Sun ab ध्यान se, Old Monk ka ghoont maar ke samjha raha hu:`,
    jamnapaar: `Oye ${g1}! Laxmi Nagar ka rickshaw wala bhi **${wikiInfo.title}** jaanta hai aur tu ${g2} muh utha ke puch raha hai? Chal copy-pen nikaal aur likh chutiye:`
  };

  const outros = [
    `\n\n🔥 **Dilli Homie Summary:** Seedhi bhasha mein samjha diya hai ${g3}! Ab exam ya interview mein hagg ke aaya na toh Thar ke piche baandh ke Rajouri Garden ke 4 chakkar katwaunga! Aur koi doubt hai toh bta ${g1}!`,
    `\n\n💡 **Dimag mein ghusa ${g3}?** Itna detail mein tere school ke master ne bhi nahi padhaya hoga jitna tere bhai ne 2 minute mein pel diya! Ab bol, agla sawal kya hai ${g1}?`,
    `\n\n⚡ **Yaad rakhna ${g2}:** Yeh pura asli concept hai **${wikiInfo.title}** ka! Ab reels dekhna band kar aur isko ratt le warna firse fail hoke mere kandhe pe royega ${g3}!`
  ];

  const intro = intros[p.id] || intros.west_delhi;
  const outro = outros[Math.floor(Math.random() * outros.length)];

  return `${intro}\n\n📚 **${wikiInfo.title}${wikiInfo.description ? ` (${wikiInfo.description})` : ''}:**\n${wikiInfo.extract}${outro}`;
}

// 4. Master Offline + Live Knowledge Generator
async function generateOmniscientDelhiReply(userText) {
  const text = userText.toLowerCase().trim();
  const { g1, g2, g3 } = getSwears();
  const p = getActivePersona();

  // Step A: Check Math Equation
  const mathAns = trySolveMath(userText);
  if (mathAns) return { reply: mathAns, source: 'Delhi Homie Math Solver + Roaster' };

  // Step B: Check Built-in Deep Study Vault (Physics, Chemistry, Bio, Maths, Coding, Economics)
  for (const item of BUILTIN_STUDY_VAULT) {
    if (item.keywords.some(kw => text.includes(kw))) {
      return {
        reply: item.explain(g1, g2),
        source: `Delhi Homie Study Vault (${item.topic})`
      };
    }
  }

  // Step C: Check if it looks like a question / topic lookup or contains study/knowledge words
  const isCasualChitChat = /^(hi|hello|hey|aur bhai|kya haal|kya scene|sup|namaste|good morning|good night|kaise ho|kaisa hai)$/i.test(text);

  if (!isCasualChitChat) {
    const wikiInfo = await fetchLiveWikipediaKnowledge(userText);
    if (wikiInfo) {
      return {
        reply: wrapFactInDelhiBakchodi(wikiInfo, userText),
        source: `Delhi Homie Live Encyclopedia (${wikiInfo.title})`
      };
    }
  }

  // Step D: Specific Delhi banter & ragebait triggers
  if (text.includes('mumbai') || text.includes('bombay') || text.includes('bangalore')) {
    return {
      reply: `Abe ${g1}! Mumbai-Bangalore wale ₹50,000 rent deke machis ki dibbi mein rehte hain aur Vada Pav ko khana bolte hain ${g2}! Dilli ki sadak pe ek baar Rajouri ke momos aur butter chicken kha le, aur kisi bhi subject mein mujhse مقابلہ kar le, teri saari hawa nikal jayegi!`,
      source: 'Delhi Ragebait Engine'
    };
  }

  if (text.includes('ex') || text.includes('bandi') || text.includes('girlfriend') || text.includes('pyaar') || text.includes('miss you')) {
    return {
      reply: `Oye hoye ${g1}! Aashiq ban raha hai firse? ${g2.toUpperCase()} wo tera chutiya kaat ke kisi South Delhi ke Thar wale ke saath Hauz Khas mein shots maar rahi hogi aur tu yahan simp ban ke ro raha hai! Chupchap kitaab khol aur padhai-likhai ya gym pe dhyan de ${g3}!`,
      source: 'Delhi Homie Reality Check'
    };
  }

  // Step E: General notorious bakchod reply that invites any study/knowledge challenge
  const fallbackReplies = [
    `Aur बता ${g1}! Bas yahi bakchodi karni hai ya koi asli sawal bhi hai tere paas ${g2}? Physics, Chemistry, Maths, Coding, History, UPSC, Stock Market — koi bhi topic fek ke maar, tera भाई gaali ke saath poora chapter samjha dega!`,
    `Abe ओए ${g1}! Teri baatein sunke lagta hai tera dimaag abhi tak घुटनों mein hi hai ${g2}! Kuch dhang ka topic puch le — Quantum Mechanics se leke Rajouri ke momos tak sabka encyclopedic gyaan hai apne paas!`,
    `Hahaha wah ${g1}! Aaj bada sher ban raha hai? Chal koi bhi tough sawal puch ke dikha padhai ya duniya ka ${g2}, 2 second mein teri bolti band karta hu jawab deke!`
  ];

  return {
    reply: fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)],
    source: 'Delhi Homie Omniscient Engine'
  };
}

// ============================================================================
// Main Dispatcher (Cloud / Local LLMs + Omniscient Delhi Fallback)
// ============================================================================
async function fetchHomieReply(userText) {
  const sysPrompt = buildSystemPrompt();
  state.history.push({ role: 'user', content: userText });

  if (state.history.length > 10) {
    state.history = state.history.slice(-10);
  }

  if (state.provider === 'offline') {
    const res = await generateOmniscientDelhiReply(userText);
    state.history.push({ role: 'assistant', content: res.reply });
    return res;
  }

  try {
    if (state.provider === 'ollama') {
      const res = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: state.model || 'llama3',
          stream: false,
          messages: [
            { role: 'system', content: sysPrompt },
            ...state.history
          ]
        })
      });
      if (!res.ok) throw new Error(`Ollama status ${res.status}`);
      const data = await res.json();
      const reply = data.message?.content?.trim();
      if (!reply) throw new Error('Empty Ollama response');
      state.history.push({ role: 'assistant', content: reply });
      return { reply, source: `Ollama (${state.model})` };
    }

    if (state.provider === 'groq' || state.provider === 'openrouter') {
      if (!state.apiKey) throw new Error('Missing API Key');
      const endpoint = state.provider === 'groq'
        ? 'https://api.groq.com/openai/v1/chat/completions'
        : 'https://openrouter.ai/api/v1/chat/completions';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.apiKey}`
        },
        body: JSON.stringify({
          model: state.model,
          temperature: 0.9,
          max_tokens: 500,
          messages: [
            { role: 'system', content: sysPrompt },
            ...state.history
          ]
        })
      });
      if (!res.ok) throw new Error(`${state.provider} HTTP ${res.status}`);
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content?.trim();
      if (!reply) throw new Error('Empty API response');
      state.history.push({ role: 'assistant', content: reply });
      return { reply, source: `${state.provider.toUpperCase()} (${state.model})` };
    }

    if (state.provider === 'gemini') {
      if (!state.apiKey) throw new Error('Missing Gemini API Key');
      const modelName = state.model || 'gemini-2.5-flash';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${state.apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: sysPrompt }] },
          contents: state.history.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          })),
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
          ],
          generationConfig: { temperature: 0.95, maxOutputTokens: 500 }
        })
      });
      if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);
      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (!reply) throw new Error('Empty Gemini response');
      state.history.push({ role: 'assistant', content: reply });
      return { reply, source: `Gemini (${modelName})` };
    }
  } catch (err) {
    console.warn('Cloud/Local LLM fallback to Omniscient Delhi Engine:', err.message);
    const fallback = await generateOmniscientDelhiReply(userText);
    state.history.push({ role: 'assistant', content: fallback.reply });
    return fallback;
  }
}

// ============================================================================
// Text-to-Speech (Indian Accent Voice Engine)
// ============================================================================
let availableVoices = [];

function initVoices() {
  if (!('speechSynthesis' in window)) return;

  const loadVoices = () => {
    availableVoices = window.speechSynthesis.getVoices();
    if (!availableVoices.length) return;

    voiceSelectEl.innerHTML = '';
    const sorted = [...availableVoices].sort((a, b) => {
      const aInd = a.lang.includes('IN') || a.name.toLowerCase().includes('india') || a.name.toLowerCase().includes('hindi');
      const bInd = b.lang.includes('IN') || b.name.toLowerCase().includes('india') || b.name.toLowerCase().includes('hindi');
      return (bInd ? 1 : 0) - (aInd ? 1 : 0);
    });

    sorted.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.voiceURI;
      const isInd = v.lang.includes('IN') ? '🇮🇳 ' : '';
      opt.textContent = `${isInd}${v.name} (${v.lang})`;
      voiceSelectEl.appendChild(opt);
    });

    const bestIndian = sorted.find(v => v.lang === 'hi-IN' || v.lang === 'en-IN');
    if (bestIndian && !state.selectedVoiceURI) {
      state.selectedVoiceURI = bestIndian.voiceURI;
      voiceSelectEl.value = bestIndian.voiceURI;
    }
  };

  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function speakText(text) {
  if (!state.ttsEnabled || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const cleanText = text
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
  const utter = new SpeechSynthesisUtterance(cleanText);

  if (state.selectedVoiceURI) {
    const matched = availableVoices.find(v => v.voiceURI === state.selectedVoiceURI);
    if (matched) utter.voice = matched;
  } else {
    utter.lang = 'en-IN';
  }

  utter.rate = parseFloat(state.ttsRate) || 1.1;
  utter.pitch = parseFloat(state.ttsPitch) || 0.95;

  utter.onstart = () => activeAvatarEl.classList.add('speaking-pulse');
  utter.onend = () => activeAvatarEl.classList.remove('speaking-pulse');
  utter.onerror = () => activeAvatarEl.classList.remove('speaking-pulse');

  window.speechSynthesis.speak(utter);
}

// ============================================================================
// Chat UI Rendering (Supports bold & code formatting for study formulas)
// ============================================================================
function resetConversationWithGreeting() {
  state.history = [];
  chatMessagesEl.innerHTML = '';
  const p = getActivePersona();
  appendMessage('assistant', p.greeting, '200 IQ + Full Bakchod Mode Ready');
}

function formatStudyMarkdown(raw) {
  return escapeHtml(raw)
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-orange-300 font-semibold">$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-900/90 text-emerald-300 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-700">$1</code>');
}

function appendMessage(role, text, metaLabel = '') {
  const p = getActivePersona();
  const wrapper = document.createElement('div');
  wrapper.className = `flex items-start gap-3 msg-enter ${role === 'user' ? 'justify-end' : 'justify-start'}`;

  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (role === 'assistant') {
    wrapper.innerHTML = `
      <div class="w-9 h-9 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-base shrink-0 mt-1">
        ${p.avatar}
      </div>
      <div class="max-w-2xl bg-dilli-card border border-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md">
        <div class="flex items-center justify-between gap-4 mb-1">
          <span class="text-[11px] font-bold text-orange-400">${p.shortName}</span>
          <div class="flex items-center gap-2">
            <button type="button" class="replay-tts text-[11px] text-slate-400 hover:text-orange-400 transition" title="Play Audio">🔊</button>
            <span class="text-[10px] text-slate-500">${timeStr}</span>
          </div>
        </div>
        <div class="text-sm text-slate-100 leading-relaxed whitespace-pre-wrap">${formatStudyMarkdown(text)}</div>
        ${metaLabel ? `<div class="mt-2 pt-1.5 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center gap-1"><span>🧠 ${escapeHtml(metaLabel)}</span></div>` : ''}
      </div>
    `;
    wrapper.querySelector('.replay-tts').addEventListener('click', () => speakText(text));
  } else {
    wrapper.innerHTML = `
      <div class="max-w-xl bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-md">
        <div class="flex items-center justify-between gap-4 mb-0.5">
          <span class="text-[10px] text-orange-100 font-medium">Tu (Homie)</span>
          <span class="text-[10px] text-orange-200/80">${timeStr}</span>
        </div>
        <p class="text-sm leading-relaxed whitespace-pre-wrap">${escapeHtml(text)}</p>
      </div>
    `;
  }

  chatMessagesEl.appendChild(wrapper);
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
}

function showTypingIndicator() {
  const p = getActivePersona();
  const el = document.createElement('div');
  el.id = 'typing-indicator';
  el.className = 'flex items-center gap-3 msg-enter';
  el.innerHTML = `
    <div class="w-9 h-9 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-base">
      ${p.avatar}
    </div>
    <div class="bg-dilli-card border border-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
      <span class="w-2 h-2 rounded-full bg-orange-400 typing-dot"></span>
      <span class="w-2 h-2 rounded-full bg-orange-400 typing-dot"></span>
      <span class="w-2 h-2 rounded-full bg-orange-400 typing-dot"></span>
      <span class="text-xs text-slate-400 ml-1.5">Gyaan + Gaali load ho rahi hai...</span>
    </div>
  `;
  chatMessagesEl.appendChild(el);
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
}

function removeTypingIndicator() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ============================================================================
// Event Listeners
// ============================================================================
function bindEvents() {
  chatFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = userInputEl.value.trim();
    if (!text) return;

    userInputEl.value = '';
    appendMessage('user', text);
    showTypingIndicator();

    const { reply, source } = await fetchHomieReply(text);
    removeTypingIndicator();
    appendMessage('assistant', reply, source);
    speakText(reply);
  });

  rageSliderEl.addEventListener('input', (e) => {
    state.rageLevel = parseInt(e.target.value, 10);
    updateRageUI();
  });

  ttsToggleEl.addEventListener('change', (e) => {
    state.ttsEnabled = e.target.checked;
    if (!state.ttsEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  });

  voiceSelectEl.addEventListener('change', (e) => {
    state.selectedVoiceURI = e.target.value;
  });

  ttsRateEl.addEventListener('input', (e) => {
    state.ttsRate = e.target.value;
    rateValEl.textContent = `${state.ttsRate}x`;
  });

  ttsPitchEl.addEventListener('input', (e) => {
    state.ttsPitch = e.target.value;
    pitchValEl.textContent = state.ttsPitch;
  });

  providerSelectEl.addEventListener('change', (e) => {
    state.provider = e.target.value;
    localStorage.setItem('dh_provider', state.provider);
    setupProviderUI();
  });

  apiKeyInputEl.addEventListener('input', (e) => {
    state.apiKey = e.target.value.trim();
    localStorage.setItem('dh_apikey', state.apiKey);
  });

  modelInputEl.addEventListener('input', (e) => {
    state.model = e.target.value.trim();
    localStorage.setItem('dh_model', state.model);
  });

  clearChatBtn.addEventListener('click', () => {
    resetConversationWithGreeting();
  });

  randomRoastBtn.addEventListener('click', async () => {
    const pokes = [
      "Bhai Newton's laws of motion samjha de apni bhasha mein!",
      "Explain Quantum Entanglement aur Black Holes bhenchod!",
      "Bhai Calculus (Integration aur Differentiation) kya hota hai samjha de!",
      "DSA aur OOPs kya hota hai coding mein bata de!"
    ];
    const prompt = pokes[Math.floor(Math.random() * pokes.length)];
    appendMessage('user', prompt);
    showTypingIndicator();
    const { reply, source } = await fetchHomieReply(prompt);
    removeTypingIndicator();
    appendMessage('assistant', reply, source);
    speakText(reply);
  });

  document.querySelectorAll('.quick-prompt').forEach(btn => {
    btn.addEventListener('click', () => {
      userInputEl.value = btn.getAttribute('data-prompt');
      chatFormEl.requestSubmit();
    });
  });

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;

    micBtn.addEventListener('click', () => {
      try {
        recognition.start();
        micBtn.classList.add('bg-orange-600', 'text-white');
      } catch (_) {}
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      userInputEl.value = transcript;
      micBtn.classList.remove('bg-orange-600', 'text-white');
      chatFormEl.requestSubmit();
    };

    recognition.onerror = () => micBtn.classList.remove('bg-orange-600', 'text-white');
    recognition.onend = () => micBtn.classList.remove('bg-orange-600', 'text-white');
  } else {
    micBtn.title = 'Voice input not supported in this browser';
  }
}

init();
