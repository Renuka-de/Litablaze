const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwf04wXUqYDF05q6OFZME8Mrui5qa5MlixQLQ5vMoeuSFA792iFc7Av5k9-j46-cjH1/exec";

let currentLevel = 0;

const eventData = {
    // FLAGGED EVENTS
    'jam': {
        name: 'JAM',
        category: 'Flagged',
        explanation: 'JAM (Just A Minute) is a rapid-fire speaking event where participants must speak continuously on a given topic for one minute without hesitation, repetition, or deviation. This tests your quick thinking, fluency, and ability to stay composed under pressure.',
        rules: 'Participants will speak for exactly one minute on a surprise topic. No hesitation, repetition of ideas, or deviation from the topic is allowed. Judges will interrupt and deduct points for violations. The speaker with the highest score after two rounds wins.',
        criteria: 'Fluency (30%), Relevance to topic (30%), Creativity (20%), Confidence (20%). Time management is critical—going over or under time results in penalties.'
    },
    'block-and-tackle': {
        name: 'Block and Tackle',
        category: 'Flagged',
        explanation: 'Block and Tackle is a high-energy debate event where participants must defend or oppose a controversial statement. The twist? You won\'t know your stance until moments before you speak. This tests your argumentative skills and adaptability.',
        rules: 'Two rounds: Round 1 is prepared arguments (3 minutes prep time), Round 2 is impromptu rebuttals (1 minute prep). Participants are randomly assigned "For" or "Against" positions. Interruptions and personal attacks are strictly prohibited.',
        criteria: 'Argument strength (35%), Logical reasoning (25%), Delivery and confidence (20%), Rebuttal quality (20%). Judges favor well-structured arguments with real-world examples.'
    },
    'aiyoo-kekadha': {
        name: 'Aiyoo Kekadha',
        category: 'Flagged',
        explanation: 'Aiyoo Kekadha is a Tamil/Tanglish storytelling and improvisation event where participants must narrate a story mixing Tamil and English. Expect humor, drama, and plenty of cultural references. This event celebrates linguistic creativity and storytelling.',
        rules: 'Participants will receive a random story prompt in Tamil or Tanglish. They have 5 minutes to perform their story, mixing both languages naturally. Stories should be entertaining and culturally relevant. Obscenity or offensive content leads to disqualification.',
        criteria: 'Language mix quality (30%), Entertainment value (30%), Creativity (20%), Cultural relevance (20%). Bonus points for audience engagement and humor.'
    },
    'channel-surfing': {
        name: 'Channel Surfing',
        category: 'Flagged',
        explanation: 'Channel Surfing is an acting and improvisation event where participants must seamlessly switch between different TV show genres on cue. One moment you\'re a news anchor, the next a soap opera character. Pure chaos and entertainment!',
        rules: 'Participants will perform in teams of 2-3. The moderator will call out random TV genres (news, horror, comedy, drama, etc.) every 30 seconds. Teams must instantly adapt their acting style. Each team performs for 4 minutes total across two rounds.',
        criteria: 'Improvisation skills (35%), Genre accuracy (25%), Teamwork (20%), Entertainment value (20%). Smooth transitions between genres earn bonus points.'
    },

    // UNFLAGGED EVENTS
    'tamil-movie-auction': {
        name: 'Tamil Movie Auction',
        category: 'Unflagged',
        explanation: 'Tamil Movie Auction is a strategic bidding game where teams compete to build the best movie crew using a limited budget. You\'ll bid on actors, directors, and music composers. The team with the highest-rated crew wins!',
        rules: 'Teams start with a virtual budget. Items (actors, directors, composers) go up for auction one by one. Teams bid strategically. After all items are sold, teams present their dream movie concept. Only one evaluation round to pitch your assembled crew and concept.',
        criteria: 'Budget management (30%), Crew synergy (25%), Movie concept creativity (25%), Presentation (20%). Judges evaluate both bidding strategy and final pitch quality.'
    },
    'quiz': {
        name: 'Quiz',
        category: 'Unflagged',
        explanation: 'A classic quiz competition testing your knowledge across literature, current affairs, entertainment, history, and pop culture. Two rounds of increasingly difficult questions will separate the trivia masters from the rest!',
        rules: 'Round 1: Written preliminary round (20 questions, mixed topics). Top teams advance to Round 2: Rapid-fire buzzer round (15 questions). Negative marking applies in Round 2. Teams of 2-3 members. No electronic devices allowed.',
        criteria: 'Accuracy (40%), Speed (30%), Breadth of knowledge (20%), Teamwork (10%). Tie-breakers will use fastest answer time.'
    },
    'spell-bee': {
        name: 'Spell Bee',
        category: 'Unflagged',
        explanation: 'The classic Spell Bee competition where participants spell increasingly complex words. This single-elimination round will test your vocabulary, pronunciation understanding, and composure under pressure.',
        rules: 'Single elimination round. Participants are called randomly to spell words aloud. You may ask for definition, language of origin, and usage in a sentence (once each). Three-strike rule: three mistakes and you\'re out. Last person standing wins.',
        criteria: 'Spelling accuracy (60%), Pronunciation (20%), Composure (20%). Difficult words from multiple languages (English, Latin, French, etc.) will be used.'
    },
    'plot-twist': {
        name: 'Plot Twist',
        category: 'Unflagged',
        explanation: 'Plot Twist is a creative writing event where you\'ll craft an engaging short story with an unexpected twist ending. This tests your narrative skills, creativity, and ability to surprise readers with a memorable conclusion.',
        rules: 'Participants receive a story prompt and have 60 minutes to write a short story (500-800 words). The story must include a clear plot twist in the final paragraph. Handwritten or typed submissions accepted. Plagiarism leads to immediate disqualification.',
        criteria: 'Plot twist effectiveness (35%), Story structure (25%), Writing quality (20%), Creativity (20%). Judges favor twists that are surprising yet logically consistent with the story.'
    },

    // CARNIVAL EVENTS
    'board-games': {
        name: 'Board Games',
        category: 'Carnival',
        explanation: 'Kick back and enjoy classic and modern board games in a relaxed carnival atmosphere. From strategy games to party games, this is all about fun, friendship, and friendly competition. No pressure, just good vibes!',
        rules: 'Open participation throughout the carnival. Multiple game stations available: Carrom, Song association, Uno, Lemon on the Spoon and more. Sign up at any station, play a game, and move on. Winners of each game earn points for small prizes.',
        criteria: 'This is a casual, fun event with no formal judging. Winners are determined by game outcomes.'
    },
    'traditional-board-games': {
        name: 'Traditional Board Games',
        category: 'Carnival',
        explanation: 'Rediscover classic games like Pallanguzhi, Dhayakattai, Aadu Puli Aatam, Chakram Uruttu, and Paramapadham. Simple, nostalgic, and fun for everyone.',
        rules: 'Open participation throughout the carnival. Multiple game stations available: Palanguzhi, Dhayakattai (Ludo), Aadu Puli Aatam, Chakram Uruttu, Paramapadham(Snake and Ladder) and more. Sign up at any station, play a game, and move on. Winners of each game earn points for small prizes.',
        criteria: 'This is a casual, fun event with no formal judging. Winners are determined by game outcomes.'
    }
};

function goToLevel(level) {
  currentLevel = level;
  document.getElementById("container").style.transform =
    `translateY(-${level * 100}vh)`;
}
const modal = document.getElementById('registrationModal');
const closeBtn = document.querySelector('.close-btn');
const eventCards = document.querySelectorAll('.event-card');
const backBtn = document.querySelector('.back-btn');
const registrationForm = document.getElementById('registrationForm');

// Open modal when clicking on event card
eventCards.forEach(card => {
    card.addEventListener('click', () => {
        const eventKey = card.getAttribute('data-event');
        const event = eventData[eventKey];

        if (event) {
            // Populate modal with event data
            document.getElementById('eventName').textContent = event.name;
            document.getElementById('eventExplanation').textContent = event.explanation;
            document.getElementById('eventRules').textContent = event.rules;
            document.getElementById('eventCriteria').textContent = event.criteria;
            document.getElementById('selectedEvent').value = event.name;

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    });
});

// Close modal when clicking X button
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Back to Homepage button
if (backBtn) {
    backBtn.addEventListener('click', () => {
        closeModal();
        // Scroll to home section
        document.getElementById('home').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Close modal function
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// ============= FORM SUBMISSION =============
const registrationSuccess = document.getElementById("registrationSuccess");
registrationForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = document.getElementById("registrationForm");
  const payload = new FormData();
  payload.append("event", document.getElementById("selectedEvent").value);
  payload.append("name", document.getElementById("name").value.trim());
  payload.append("college", document.getElementById("college").value.trim());
  payload.append("department", document.getElementById("department").value.trim());
  payload.append("email", document.getElementById("email").value.trim());
  payload.append("phone", document.getElementById("phone").value.trim());

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwf04wXUqYDF05q6OFZME8Mrui5qa5MlixQLQ5vMoeuSFA792iFc7Av5k9-j46-cjH1/exec",
      {
        method: "POST",
        body: payload
      }
    );

    const result = await response.json();

    if (result.success) {
  document.getElementById("litidValue").textContent = result.litid;
  registrationForm.style.display = "none";
  registrationSuccess.style.display = "block";

  const email = document.getElementById("email").value;

  // 🔁 RE-FETCH FROM GOOGLE SHEETS
  try {
    const data = await fetchFromGoogleScript(email);
    const regs = extractRegistrationsByEmail(data, email);
    const normalized = Object.keys(regs).length ? regs : normalizeRegistrations(data);
    localStorage.setItem("litablaze_sheet_regs", JSON.stringify(normalized));
    updateEventButtons();
  } catch (err) {
    console.error("Refresh failed", err);
  }
}



    else {
      alert("Registration failed");
    }

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
});



function toggleCategory(id, headerEl) {
      const list = document.getElementById(id);
      if (!list) return;

      const isOpen = list.classList.contains("active");

      // Close all lists
      document.querySelectorAll(".event-list").forEach(l => l.classList.remove("active"));
      document.querySelectorAll(".event-category").forEach(h => h.classList.remove("open"));

  // Toggle only clicked one
  if (!isOpen) {
    list.classList.add("active");
    headerEl.classList.add("open");
  }
}

  // Optional: keyboard support so header toggles when pressing Enter/Space
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement && document.activeElement.classList.contains('event-category')) {
      e.preventDefault();
      const id = document.activeElement.getAttribute('aria-controls') || document.activeElement.dataset.target;
      toggleCategory(id, document.activeElement);
    }
  });

  // Make event-category focusable for keyboard users
  document.querySelectorAll('.event-category').forEach(h => {
    h.tabIndex = 0;
  });
 function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
  document.querySelector(".hamburger").classList.toggle("active");
  document.body.classList.toggle("menu-open");
}


document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    const menu = document.querySelector(".nav-links");
    const burger = document.querySelector(".hamburger");

    menu.classList.remove("active");
    burger.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});

 /* ================= MODAL LOGIC ================= */
function openRegister(eventKey) {
  const data = eventData[eventKey];
  if (!data) return;

  const modal = document.getElementById("registrationModal");
  modal.classList.remove("upside"); // RED MODE

  fillModal(data);
}

function openUpsideRegister(eventKey) {
  const data = eventData[eventKey];
  if (!data) return;

  const modal = document.getElementById("registrationModal");
  modal.classList.add("upside"); // BLUE MODE

  fillModal(data);
}
function fillModal(data) {
  document.getElementById("eventName").textContent = data.name;
  document.getElementById("selectedEvent").value = data.name;

  document.getElementById("eventExplanation").textContent = data.explanation;
  document.getElementById("eventRules").textContent = data.rules;
  document.getElementById("eventCriteria").textContent = data.criteria;

  document.getElementById("registrationModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeRegister() {
  const modal = document.getElementById("registrationModal");

  modal.classList.remove("active");
  document.body.style.overflow = "";

  setTimeout(() => {
    modal.classList.remove("upside");

    // reset view
    document.getElementById("registrationForm").style.display = "block";
    document.getElementById("registrationSuccess").style.display = "none";
    document.getElementById("registrationForm").reset();
  }, 350);
}




/* ESC KEY CLOSE */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeRegister();
});


/* ================= UPSIDE NAVBAR THEME ================= */

const navbar = document.querySelector(".navbar");
const upsideSection = document.querySelector("#upside");

if (navbar && upsideSection) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        navbar.classList.toggle("upside-theme", entry.isIntersecting);
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(upsideSection);
}

function generateLITID(eventKey) {
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LIT26-${eventKey.toUpperCase().slice(0,6)}-${rand}`;
}



function goToProfile() {
  const profile = localStorage.getItem("litablaze_profile");

  if (!profile) {
    window.location.href = "login.html";
  } else {
    window.location.href = "profile.html";
  }
}
// Normalize various shapes returned from the Google Script into a
// { "Event Name": "LITID" } mapping that the UI expects.
function normalizeRegistrations(raw) {
  if (!raw) return {};

  // Already an object mapping
  if (typeof raw === 'object' && !Array.isArray(raw)) {
    return raw;
  }

  // Array of entries -> try to convert
  if (Array.isArray(raw)) {
    const map = {};

    raw.forEach(item => {
      if (!item) return;

      // If item is [event, litid] style
      if (Array.isArray(item) && item.length >= 2) {
        const name = String(item[0]).trim();
        const id = String(item[1]).trim();
        if (name) map[name] = id;
        return;
      }

      // If item is object, attempt common key names
      if (typeof item === 'object') {
        const keys = Object.keys(item).map(k => k.toLowerCase());

        // common variations
        const eventKey = keys.find(k => /event|eventname|event_name|event title|eventtitle/.test(k));
        const idKey = keys.find(k => /lit|id|litid|registration|registrationid|registration_id/.test(k));

        const name = eventKey ? String(item[eventKey]).trim() : null;
        const id = idKey ? String(item[idKey]).trim() : null;

        if (name && id) {
          map[name] = id;
          return;
        }

        // fallback: try first two string-y fields
        const stringFields = Object.values(item).filter(v => typeof v === 'string' && v.trim());
        if (stringFields.length >= 2) {
          map[String(stringFields[0]).trim()] = String(stringFields[1]).trim();
        }
      }
    });

    return map;
  }

  // Unknown shape -> empty
  return {};
}

// Attempt to pull event registrations out of many possible response shapes.
// Returns a simple mapping: { "Event Name": "LITID" }
function extractRegistrationsByEmail(raw, email) {
  if (!raw) return {};

  const regs = {};
  const lowerEmail = (email || '').toLowerCase();

  function processRow(row) {
    if (!row) return;
    // If row is an array, try to interpret first 3 columns as [event, litid, email]
    if (Array.isArray(row)) {
      const [a, b, c] = row.map(v => (v || '').toString().trim());
      if (c && lowerEmail && c.toLowerCase().includes(lowerEmail)) {
        if (a && b) regs[a] = b;
      }
      return;
    }

    if (typeof row === 'object') {
      const keys = Object.keys(row);
      const lowerKeys = keys.map(k => k.toLowerCase());

      // find likely fields
      const emailKey = keys[lowerKeys.findIndex(k => /email|e-mail/.test(k))];
      const eventKey = keys[lowerKeys.findIndex(k => /event|eventname|event_name|event title|eventtitle/.test(k))];
      const idKey = keys[lowerKeys.findIndex(k => /lit|id|litid|registration|registrationid|registration_id/.test(k))];

      const rowEmail = emailKey ? String(row[emailKey]).trim().toLowerCase() : null;
      const eventName = eventKey ? String(row[eventKey]).trim() : null;
      const litid = idKey ? String(row[idKey]).trim() : null;

      if (rowEmail && lowerEmail && rowEmail.includes(lowerEmail) && eventName && litid) {
        regs[eventName] = litid;
        return;
      }

      // fallback: if object contains both an event-like and id-like string values and email appears anywhere
      const allValues = Object.values(row).map(v => (v || '').toString());
      const anyEmailMatch = allValues.some(v => lowerEmail && v.toLowerCase().includes(lowerEmail));
      if (anyEmailMatch) {
        const ev = allValues.find(v => /[A-Za-z0-9\s\-()]{3,}/.test(v) && !/@/.test(v));
        const id = allValues.find(v => /LIT|LIT\d|[A-Z0-9\-]{4,}/.test(v));
        if (ev && id) regs[ev.trim()] = id.trim();
      }
    }
  }

  // If raw is an object with sheet names -> flatten
  if (typeof raw === 'object' && !Array.isArray(raw)) {
    for (const k in raw) {
      const v = raw[k];
      if (Array.isArray(v)) {
        v.forEach(processRow);
      } else if (typeof v === 'object') {
        // maybe it's a single row or mapping
        processRow(v);
      }
    }
    // also try direct object form
    if (Object.keys(raw).length && Object.values(raw).every(v => typeof v === 'string')) {
      // maybe mapping event->litid where keys are events
      for (const [k, val] of Object.entries(raw)) {
        regs[k] = String(val);
      }
    }
  }

  // If it's an array of rows
  if (Array.isArray(raw)) {
    raw.forEach(processRow);
  }

  return regs;
}

async function fetchRegistrationsForProfile() {
  const profile = JSON.parse(localStorage.getItem('litablaze_profile') || 'null');
  if (!profile || !profile.email) return;

  try {
    const raw = await fetchFromGoogleScript(profile.email);
    // prefer extracting rows by matching email if possible
    const regs = extractRegistrationsByEmail(raw, profile.email);
    const normalized = Object.keys(regs).length ? regs : normalizeRegistrations(raw);
    localStorage.setItem('litablaze_sheet_regs', JSON.stringify(normalized));
  } catch (err) {
    console.warn('Could not fetch registrations for profile:', err);
  }
}

// Try to fetch JSON from the Google Script endpoint; if blocked by CORS or fails,
// attempt JSONP by injecting a <script> tag with a callback parameter.
function fetchFromGoogleScript(email) {
  const url = `${SCRIPT_URL}?email=${encodeURIComponent(email)}`;

  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('non-200');
      const data = await res.json();
      return resolve(data);
    } catch (err) {
      // Fetch failed (likely CORS). Try JSONP fallback.
      const cbName = `gs_cb_${Date.now()}_${Math.floor(Math.random()*1000)}`;
      (window)[cbName] = (data) => {
        try {
          resolve(data);
        } finally {
          delete (window)[cbName];
        }
      };

      const script = document.createElement('script');
      script.src = `${url}&callback=${cbName}`;
      script.onerror = (e) => {
        delete (window)[cbName];
        reject(new Error('JSONP failed'));
      };

      // Timeout in 8s
      const t = setTimeout(() => {
        if ((window)[cbName]) {
          delete (window)[cbName];
          reject(new Error('JSONP timeout'));
        }
      }, 8000);

      script.onload = () => clearTimeout(t);
      document.head.appendChild(script);
    }
  });
}

// On DOM ready: ensure profile button visibility and refresh registrations
document.addEventListener('DOMContentLoaded', async () => {
  const btn = document.querySelector('.profile-btn');
  if (btn) {
    if (!localStorage.getItem('litablaze_profile')) {
      btn.style.display = 'none';
    } else {
      btn.style.display = '';
    }
  }

  // If user is logged in, try to fetch latest registrations and then update buttons
  await fetchRegistrationsForProfile();
  updateEventButtons();
});

function viewRegistration(eventName, litid) {

  // Find matching event from eventData
  const event = Object.values(eventData).find(
    e => e.name === eventName
  );

  // Fill modal content
  document.getElementById("eventName").textContent = eventName;

  document.getElementById("eventExplanation").textContent =
    event ? event.explanation : "";

  document.getElementById("eventRules").textContent =
    event ? event.rules : "";

  document.getElementById("eventCriteria").textContent =
    event ? event.criteria : "";

  // Hide form, show success block
  document.getElementById("registrationForm").style.display = "none";
  document.getElementById("litidValue").textContent = litid;
  document.getElementById("registrationSuccess").style.display = "block";

  // Open modal
  document.getElementById("registrationModal").classList.add("active");
  document.body.style.overflow = "hidden";
}




function getSheetRegistrations() {
  return JSON.parse(localStorage.getItem("litablaze_sheet_regs")) || {};
}

function updateEventButtons() {
  const regs = getSheetRegistrations();

  document.querySelectorAll(".event-card").forEach(card => {
    const eventName = card.querySelector(".event-title").textContent.trim();
    const btn = card.querySelector(".register-btn");

    if (regs[eventName]) {
      btn.textContent = "View Registration";
      btn.onclick = () =>
        viewRegistration(eventName, regs[eventName]);
    } else {
      btn.textContent = "Register";
    }
  });
}

// updateEventButtons already called in the DOMContentLoaded async handler above
