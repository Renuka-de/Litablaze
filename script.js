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
        criteria: 'This is a casual, fun event with no formal judging. Winners are determined by game outcomes. Focus is on participation and enjoyment rather than competition.'
    },
    'traditional-board-games': {
        name: 'Traditional Board Games',
        category: 'Carnival',
        explanation: 'Rediscover classic games like Pallanguzhi, Dhayakattai, Aadu Puli Aatam, Chakram Uruttu, and Paramapadham. Simple, nostalgic, and fun for everyone.',
        rules: 'Open participation throughout the carnival. Multiple game stations available: Palanguzhi, Dhayakattai (Ludo), Aadu Puli Aatam, Chakram Uruttu, Paramapadham(Snake and Ladder) and more. Sign up at any station, play a game, and move on. Winners of each game earn points for small prizes.',
        criteria: 'This is a casual, fun event with no formal judging. Winners are determined by game outcomes. Focus is on participation and enjoyment rather than competition.'
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

  const formData = new URLSearchParams({
    event: document.getElementById("selectedEvent").value,
    name: document.getElementById("name").value,
    college: document.getElementById("college").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value
  });

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxXYNrBH-uZiy5eSwN2rf6-xZz4uL5VwxKn4QNCwJbiTDIDpf2plZkaB4SPGqPxFAwV/exec",
      {
        method: "POST",
        body: formData
      }
    );

    const text = await response.text();
    console.log("RAW RESPONSE:", text);

    const result = JSON.parse(text);

    if (result.success) {
      registrationForm.style.display = "none";
      document.getElementById("litidValue").textContent = result.litid;
      registrationSuccess.style.display = "block";
    } else {
      alert("Registration failed");
    }

  } catch (err) {
    console.error(err);
    alert("Registration failed due to server error");
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
