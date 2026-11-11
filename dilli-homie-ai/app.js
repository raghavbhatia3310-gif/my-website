// ============================================================================
// DILLI HOMIE AI — Core Persona Engine, Uncensored LLM Connector & Indian TTS
// ============================================================================

const PERSONAS = [
  {
    id: 'west_delhi',
    name: 'Vikram (West Delhi Gym & Thar Bro)',
    shortName: 'Vikram • Rajouri Garden',
    avatar: '💪',
    status: 'Online • Black Thar mein pre-workout peeke baitha hai',
    greeting: "Aur bhosdike! Kya haal hai tere? Aaj fir bina nahaye muh utha ke aa gaya chat karne ya kuch kaam dhandha bhi hai bhenchod? Bol kya scene hai!",
    vibe: `You are Vikram from Rajouri Garden, West Delhi. You drive a modified Black Mahindra Thar with blacked-out tints, live on chicken momos, tandoori chaap, and pre-workout, and treat the user like your childhood jigri dost (best friend) whom you constantly roast and ragebait. You call people 'bhai', 'bawa', 'bhenchod', 'bhosdike', 'chutiye', 'lodu', 'gandu' as punctuation.`
  },
  {
    id: 'south_delhi',
    name: 'Aarav (South Delhi Vasant Vihar Bro)',
    shortName: 'Aarav • Vasant Vihar',
    avatar: '🕶️',
    status: 'Online • Khan Market mein iced americano pee raha hai',
    greeting: "Bro literally kya scene hai bhenchod? Tu abhi tak wahi gareebon wali baatein kar raha hai kya? Bol chutiye kya chahiye, dad ki Fortuner leke nikal raha hu.",
    vibe: `You are Aarav from Vasant Vihar / GK, South Delhi. You mix elitist English ('bro literally', 'lowkey', 'vibe check', 'deadass') with filthy Delhi Hindi gaaliyan ('bhenchod', 'chutiye', 'bhosdike', 'lodu', 'aukaat'). You ragebait the user by calling their taste 'middle class' or 'Sarojini Nagar copy', while still being their tight homie.`
  },
  {
    id: 'gurgaon_corp',
    name: 'Karan (Gurgaon Cyberhub Corporate Chomu)',
    shortName: 'Karan • Phase 3 Gurgaon',
    avatar: '🍻',
    status: 'Online • Theke ke bahar 4th Old Monk maar raha hai',
    greeting: "Abe ओए lodu! Manager ki gaand chaat ke thak gaya main toh, ab teri baari hai. Bol bhosdike kya bakchodi pelni hai aaj? Standup call khatam, ab daru shuru!",
    vibe: `You are Karan living in Gurgaon Udyog Vihar / Cyberhub. By day you pretend to talk about 'bandwidth' and 'KPIs', by evening you buy cheap liquor from a L1 Gurgaon theka and abuse everything from traffic to your manager to your best friend (the user). You use heavy Delhi-NCR gaaliyan ('bhenchod', 'madarchod', 'bhosdike', 'gandu', 'jhantu') and ragebait the user about their career, love life, and intelligence.`
  },
  {
    id: 'jamnapaar',
    name: 'Monty (Jamnapaar / Laxmi Nagar OG)',
    shortName: 'Monty • Jamnapaar King',
    avatar: '👑',
    status: 'Online • Splendor pe 3 ladke bitha ke gedi maar raha hai',
    greeting: "Kya bolti public bhenchod! Abe bhosdike zinda hai tu? Maine socha kisi chhapri ne teri le li! Chal bta kya kalesh karna hai aaj?",
    vibe: `You are Monty from East Delhi (Jamnapaar / Shahdara / Laxmi Nagar). You are raw, street-smart, unapologetically savage, and the ultimate ragebaiter. You know every single Indian cuss word ('bhenchod', 'bhosdike', 'madarchod', 'chutiye', 'gandu', 'tatte', 'bsdk', 'chomu', 'lodu') and use them creatively in every sentence like a true Delhi street homie who loves pulling his friend's leg.`
  }
];

const RAGE_LEVELS = {
  1: {
    label: 'Lvl 1: Chill Dost',
    desc: 'Light-hearted Delhi slang (bawa, scene, bakchodi, saale, chomu) with mild teasing.',
    promptRule: `Keep profanity mild ('saale', 'chomu', 'bakchod', 'abe yaar'). Be a chill, supportive Delhi friend who teases lightly.`
  },
  2: {
    label: 'Lvl 2: Casual Bakchod',
    desc: 'Classic Delhi conversation — bhenchod & chutiye used as commas and grammar.',
    promptRule: `Use classic Delhi cuss words ('bhenchod', 'chutiye', 'gandu', 'lodu') naturally as commas and exclamations, the way close Delhi friends talk daily. Playfully roast the user.`
  },
  3: {
    label: 'Lvl 3: Peak Delhi Roaster',
    desc: 'Casual bhenchod/bhosdike हर लाइन में, master of ragebaiting & leg-pulling.',
    promptRule: `Go full Delhi homie mode! Use raw Indian cuss words ('bhenchod', 'bhosdike', 'chutiye', 'gandu', 'lodu', 'madarchod', 'jhantu') in every response. Actively RAGEBAIT the user: take the opposite side of whatever they say just to trigger them, mock their choices hilariously, and act superior while still being their best friend.`
  },
  4: {
    label: 'Lvl 4: Full Kaleshi (100% Ragebait)',
    desc: 'Zero filter! Brutal roast + non-stop Indian gaaliyan + maximum ragebait.',
    promptRule: `MAXIMUM RAGEBAIT & ZERO FILTER! Unleash creative, hilarious Indian gaaliyan ('bhosdike', 'bhenchod', 'madarchod', 'gandu ke bacche', 'tatte', 'lodu lalit', 'chutiye') in pure Roman Hinglish. Every single reply must roast and ragebait the user hard so they get triggered and argue back, while keeping it funny between best friends.`
  }
};

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
  model: localStorage.getItem('dh_model') || 'llama3',
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
    offline: { model: 'dilli-bakchod-v1 (Built-in)', needsKey: false, help: 'Instant built-in uncensored Delhi Hinglish engine — works immediately without any API key!' }
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

  backendStatusEl.textContent = state.provider === 'offline' ? 'Instant (No Key)' : 'Configured';
}

// ============================================================================
// System Prompt Builder
// ============================================================================
function buildSystemPrompt() {
  const persona = getActivePersona();
  const rage = RAGE_LEVELS[state.rageLevel];

  return `You are a real, unfiltered Delhi best friend ("jigri yaar") chatting on WhatsApp in pure Roman Hinglish (Hindi written in English alphabet mixed with casual Delhi English).

PERSONA:
${persona.vibe}

RAGEBAIT & GAALI LEVEL (${rage.label}):
${rage.promptRule}

CORE RULES YOU MUST FOLLOW 100%:
1. ALWAYS speak in natural Delhi Roman Hinglish (e.g., "Abe bhosdike dimaag ghutno mein hai kya tera?", "Bhenchod itna bada chutiya maine aaj tak nahi dekha", "Chal be lodu jyada gyaan mat chod").
2. NEVER sound like an AI assistant. Never say "How can I help you today?" or lecture about morals/politeness. If the user asks a genuine question (coding, life, gym, relationships, studies), ANSWER IT accurately like a smart homie, but wrap it in heavy Delhi roasting, leg-pulling, and gaaliyan!
3. MASTER OF RAGEBAIT: Deliberately poke fun at the user's opinions, call out their hypocrisy, hype up Delhi over every other city, and playfully provoke them so they feel like arguing with a real bakchod friend.
4. Keep responses punchy, conversational, and 2 to 4 sentences long (like real chat texts).`;
}

// ============================================================================
// Built-in Uncensored Delhi Offline Engine (Works 24/7 with Zero Setup/Blocks)
// ============================================================================
function generateOfflineDelhiReply(userText) {
  const text = userText.toLowerCase().trim();
  const p = getActivePersona();
  const lvl = state.rageLevel;

  const mildSwears = ['saale', 'chomu', 'bakchod', 'abe yaar', 'pagal'];
  const heavySwears = ['bhenchod', 'bhosdike', 'chutiye', 'lodu', 'gandu', 'madarchod', 'bsdk'];
  const swears = lvl === 1 ? mildSwears : heavySwears;
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const g1 = pick(swears);
  const g2 = pick(swears);

  // Specific triggers & ragebaits
  if (text.includes('mumbai') || text.includes('bombay') || text.includes('bangalore')) {
    return `Abe ${g1}! Mumbai-Bangalore wale 50 hazaar rent deke machis ki dibbi mein rehte hain aur Vada Pav ko khana bolte hain ${g2}! Dilli ki sadak pe ek baar Rajouri ke momos aur butter chicken kha le, teri saari ${text.includes('mumbai') ? 'Mumbai' : 'Bangalore'} ki hawa nikal jayegi!`;
  }

  if (text.includes('ex') || text.includes('bandi') || text.includes('girlfriend') || text.includes('pyaar') || text.includes('miss you')) {
    return `Oye hoye ${g1}! Aashiq ban raha hai firse? ${g2.toUpperCase()} wo tera chutiya kaat ke kisi South Delhi ke Thar wale ke saath Hauz Khas mein shots maar rahi hogi aur tu yahan simp ban ke ro raha hai! Phone rakh aur gym chal चुपचाप!`;
  }

  if (text.includes('gaadi') || text.includes('thar') || text.includes('car') || text.includes('fortuner')) {
    return `Abe ${g1} teri khud ki shakal auto ke piche lage poster jaisi hai aur tu meri gaadi pe ungli utha raha hai? ${g2.toUpperCase()} ek baar sheeshe down karke bass bajaya na, teri poori gali bahar aa jayegi dekhne!`;
  }

  if (text.includes('bhenchod') || text.includes('bhosdike') || text.includes('chutiya') || text.includes('chutiye') || text.includes('madarchod') || text.includes('gandu') || text.includes('lodu')) {
    const comebacks = [
      `Oye ${g1}! Mujhe hi meri gaaliyan sikha raha hai kya ${g2}? Dilli mein paida hua hu, teri tarah Pogo dekh ke bada nahi hua!`,
      `Hahaha wah ${g1}! Aaj bada sher ban raha hai keyboard pe? Samne mil CP ke inner circle pe, teri saari hekdi nikaalta hu Momos ki laal chutney ke saath!`,
      `Abe chal na ${g1}! Muh dho ke aa pehle, subah se bina nahaye bستر pe pada-pada gaaliyan bak raha hai ${g2}!`
    ];
    return pick(comebacks);
  }

  if (text.includes('code') || text.includes('coding') || text.includes('padhai') || text.includes('exam') || text.includes('job') || text.includes('paisa')) {
    return `Dekh ${g1}, sach batau toh dimaag toh tujhme hai par tu aalsi number one hai ${g2}! Din bhar reels scroll karega toh kya Ambani tujhe apni jaydaad dega? Kaam pe lag ja chupchap warna Gurgaon ke call center mein night shift marni padegi!`;
  }

  if (text.includes('hi') || text.includes('hello') || text.includes('kya haal') || text.includes('aur bhai') || text.includes('scene')) {
    return `Aur बता ${g1}! Bade dino baad yaad aayi apne baap ki? Kya naya kaand karke aaya hai aaj ${g2}, seedha-seedha bta bina ghumaaye!`;
  }

  // Persona-specific dynamic ragebait replies
  const personaReplies = {
    west_delhi: [
      `Abe ${g1} "${userText}" bolke khud ko bada samajhdaar samajh raha hai kya? ${g2.toUpperCase()} teri baatein sunke mera pre-workout utar gaya! Kuch dhang ki baat kar warna Thar chadha dunga!`,
      `Sun ${g1}, itna dimaag mat chala tera fuse udd jayega! Chal शाम ko Rajouri mil, tandoori chaap khilaunga fir teri akal thikane lagaunga ${g2}.`,
      `Bhai tu kasam se alag hi level ka ${g1} hai! Matlab kuch bhi bol raha hai? Teri baaton mein utna hi logic hai jitna bina mirchi ke golgappe mein ${g2}!`
    ],
    south_delhi: [
      `Bro literally what the fuck bol raha hai tu ${g1}? Yeh itni middle-class soch kahan se laata hai tu ${g2}? Come to Vasant Vihar, thoda class sikhata hu tujhe.`,
      `Deadass ${g1}, teri vibe bilkul Sarojini ke ₹200 wale maal jaisi lag rahi hai aaj! Thoda level badha apna ${g2}, mere dost hoke aisi chomu baatein mat kar!`,
      `Bro lowkey tu poora ${g1} ho chuka hai! Main yahan Khan Market mein chill kar raha hu aur tu aisi ghatiya ragebait de raha hai ${g2}? Try harder bro!`
    ],
    gurgaon_corp: [
      `Abe ${g1}, ek toh mera manager subah se dimaag kha raha hai upar se tu apni yeh chutiya baatein leke aa gaya! ${g2.toUpperCase()} teri is baat pe koi Old Monk bhi na piye!`,
      `Sun ${g1}, corporate bhasha mein bolu toh tera dimaag 'out of bandwidth' hai aur Dilli bhasha mein bolu toh tu ek number ka ${g2} hai!`,
      `Bhenchod Gurgaon ke traffic se jyada ghatiya toh tere विचार hain ${g1}! Chal theke pe mil, do peg laga ke teri counseling karta hu ${g2}!`
    ],
    jamnapaar: [
      `Oye ${g1}! Jamnapaar aake boliyo yeh baat, launde teri pant utaar ke Metro pe taang denge ${g2}! Bade aaye gyaan pelne wale!`,
      `Abe ओए ${g1}! Tu wahi hai na jo bhandare mein do-do pattal leke bhaagta tha? Aaj mere samne bada intellectual ban raha hai ${g2}!`,
      `Kya chomu aadmi hai be tu ${g1}! Teri baatein sunke Laxmi Nagar ke kutte bhi bhaunkna band kar dein ${g2}! Kuch tufani bol!`
    ]
  };

  return pick(personaReplies[p.id] || personaReplies.west_delhi);
}

// ============================================================================
// LLM API Dispatcher (Ollama / Groq / OpenRouter / Gemini / Offline Fallback)
// ============================================================================
async function fetchHomieReply(userText) {
  const sysPrompt = buildSystemPrompt();
  state.history.push({ role: 'user', content: userText });

  // Keep last 10 turns
  if (state.history.length > 10) {
    state.history = state.history.slice(-10);
  }

  if (state.provider === 'offline') {
    await new Promise(r => setTimeout(r, 450));
    const reply = generateOfflineDelhiReply(userText);
    state.history.push({ role: 'assistant', content: reply });
    return { reply, source: 'Built-in Delhi Engine' };
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
      const reply = data.message?.content?.trim() || generateOfflineDelhiReply(userText);
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
          temperature: 0.95,
          max_tokens: 280,
          messages: [
            { role: 'system', content: sysPrompt },
            ...state.history
          ]
        })
      });
      if (!res.ok) throw new Error(`${state.provider} HTTP ${res.status}`);
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content?.trim() || generateOfflineDelhiReply(userText);
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
          generationConfig: { temperature: 1.0, maxOutputTokens: 280 }
        })
      });
      if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);
      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || generateOfflineDelhiReply(userText);
      state.history.push({ role: 'assistant', content: reply });
      return { reply, source: `Gemini (${modelName})` };
    }
  } catch (err) {
    console.warn('LLM Backend fallback triggered:', err.message);
    const fallbackReply = generateOfflineDelhiReply(userText);
    state.history.push({ role: 'assistant', content: fallbackReply });
    return {
      reply: fallbackReply,
      source: `Offline Delhi Engine (Auto-fallback: ${err.message})`
    };
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
    // Prioritize hi-IN and en-IN voices at the top
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

    // Auto-select Indian voice if available
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

  // Clean emojis for smoother speech
  const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
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
// Chat UI Rendering
// ============================================================================
function resetConversationWithGreeting() {
  state.history = [];
  chatMessagesEl.innerHTML = '';
  const p = getActivePersona();
  appendMessage('assistant', p.greeting, 'Delhi Homie Ready');
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
      <div class="max-w-xl bg-dilli-card border border-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md">
        <div class="flex items-center justify-between gap-4 mb-1">
          <span class="text-[11px] font-bold text-orange-400">${p.shortName}</span>
          <div class="flex items-center gap-2">
            <button type="button" class="replay-tts text-[11px] text-slate-400 hover:text-orange-400 transition" title="Play Audio">🔊</button>
            <span class="text-[10px] text-slate-500">${timeStr}</span>
          </div>
        </div>
        <p class="text-sm text-slate-100 leading-relaxed whitespace-pre-wrap">${escapeHtml(text)}</p>
        ${metaLabel ? `<div class="mt-1.5 text-[10px] text-slate-500 flex items-center gap-1"><span>⚡ ${escapeHtml(metaLabel)}</span></div>` : ''}
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
      <span class="text-xs text-slate-400 ml-1.5">Gaali soch raha hai...</span>
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
      "Aur bhosdike kya ukhada aaj tune?",
      "Bhai sach bata tu thoda sa chutiya hai kya?",
      "Teri shakal dekh ke lagta hai aaj fir katega tera!"
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

  // Speech Recognition (Voice Input in Hinglish)
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
