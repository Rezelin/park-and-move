/* ==========================================
   PITSTOP FITNESS — script.js
   Dynamic routine generator — no fixed routines,
   every workout is unique.
   ========================================== */

// =====================
// STATE
// =====================
let currentMode = 'outOfCar';

// =====================
// EXERCISE LIBRARY
// All durations in seconds.
// Out-of-car = standard calisthenics/yoga/aerobics
// In-car     = seated movement, safe for driver's seat
// =====================
const exercises = {

  // ── OUT OF CAR ───────────────────────────────────────────────────────────
  // Rules: standing only, small space (next to car), no equipment,
  // beginner-friendly, low embarrassment factor, nothing on the ground.
  outOfCar: [
    { name: "Jumping Jacks",         reps: "20 reps",                   duration: 20, emoji: "⭐" },
    { name: "Bodyweight Squats",     reps: "10 reps, slow & steady",    duration: 15, emoji: "🦵" },
    { name: "Calf Raises",           reps: "15 reps",                   duration: 15, emoji: "📈" },
    { name: "Arm Circles",           reps: "10 each direction",         duration: 15, emoji: "💪" },
    { name: "Shoulder Rolls",        reps: "10 reps, slow",             duration: 15, emoji: "🔃" },
    { name: "Torso Twists",          reps: "10 each direction",         duration: 15, emoji: "🔄" },
    { name: "High Knees",            reps: "20 reps, light pace",       duration: 20, emoji: "🏃" },
    { name: "March In Place",        reps: "30 seconds",                duration: 30, emoji: "🥁" },
    { name: "Standing Toe Touches",  reps: "10 reps, slow & controlled", duration: 20, emoji: "🙌" },
    { name: "Overhead Reach",        reps: "Reach up, hold 10 sec × 3", duration: 30, emoji: "🙋" },
    { name: "Standing Side Stretch", reps: "10 seconds each side",      duration: 20, emoji: "↔️" },
    { name: "Neck Rolls",            reps: "5 slow rolls each way",     duration: 15, emoji: "😌" },
    { name: "Hip Circles",           reps: "10 each direction",         duration: 20, emoji: "🌀" },
    { name: "Forward Fold Hold",     reps: "Hold 15 seconds, breathe",  duration: 15, emoji: "🧘" },
    { name: "Chest Opener Stretch",  reps: "Clasp hands behind back, hold 15 sec", duration: 15, emoji: "🌟" },
    { name: "Shoulder Cross Stretch", reps: "10 seconds each arm",      duration: 20, emoji: "🤸" },
    { name: "Ankle Circles",         reps: "10 each foot",              duration: 15, emoji: "🦶" },
    { name: "Wrist Circles",         reps: "10 each direction",         duration: 15, emoji: "✋" },
    { name: "Standing Cat-Cow",      reps: "8 reps — arch & round your back", duration: 20, emoji: "🐄" },
    { name: "Quad Stretch",          reps: "Hold car for balance — 15 sec each leg", duration: 30, emoji: "🦵" },
  ],

  inCar: [
    { name: "Seated Spinal Twist",      reps: "10 seconds each side",      duration: 20, emoji: "🔄" },
    { name: "Shoulder Rolls",           reps: "10 reps, slow",             duration: 15, emoji: "🔃" },
    { name: "Neck Rolls",               reps: "5 slow rolls each way",     duration: 20, emoji: "😌" },
    { name: "Seated Leg Raises",        reps: "10 each leg",               duration: 20, emoji: "🦵" },
    { name: "Wrist Circles",            reps: "10 each direction, each wrist", duration: 20, emoji: "✋" },
    { name: "Deep Belly Breathing",     reps: "5 slow, full breaths",      duration: 25, emoji: "🌬️" },
    { name: "Seated Ab Contractions",   reps: "10 reps — squeeze & hold 3 sec", duration: 30, emoji: "💪" },
    { name: "Shoulder Blade Squeezes",  reps: "10 reps — squeeze & hold 2 sec", duration: 20, emoji: "🤜" },
    { name: "Isometric Chest Press",    reps: "Push wheel, hold 10 sec × 3",   duration: 30, emoji: "🚗" },
    { name: "Ankle Circles",            reps: "10 each foot",               duration: 15, emoji: "🦶" },
    { name: "Seated Calf Raises",       reps: "15 reps",                    duration: 15, emoji: "📈" },
    { name: "Seated Forward Fold",      reps: "Hold 15 seconds",            duration: 15, emoji: "🧘" },
    { name: "Box Breathing",            reps: "4 cycles: in-4, hold-4, out-4, hold-4", duration: 40, emoji: "📦" },
    { name: "Jaw & Face Stretch",       reps: "Open wide — hold 5 sec × 3", duration: 15, emoji: "😬" },
    { name: "Seated Side Stretch",      reps: "10 seconds each side",       duration: 20, emoji: "↔️" },
    { name: "Finger Stretches",         reps: "Spread wide — hold 5 sec × 3", duration: 15, emoji: "🖐️" },
    { name: "Eye Rolls",                reps: "5 slow circles each direction", duration: 15, emoji: "👀" },
    { name: "Seated Hip Circles",       reps: "8 each direction",           duration: 20, emoji: "🌀" },
    { name: "Neck Side Stretch",        reps: "10 seconds each side",       duration: 20, emoji: "🌟" },
    { name: "Hand & Forearm Stretch",   reps: "Extend arm, bend wrist — 10 sec each side", duration: 20, emoji: "🤚" },
    { name: "Seated Trunk Twist",       reps: "10 reps, slow",              duration: 15, emoji: "🌀" },
    { name: "Pursed Lip Breathing",     reps: "Inhale 2 sec, exhale 4 sec × 5", duration: 30, emoji: "💨" },
  ]
};

// =====================
// FEEDBACK MESSAGES
// =====================
const feedbackMessages = [
  "NICE! 🔥",
  "LET'S GO! 💪",
  "CRUSHED IT! ⭐",
  "BEAST MODE! 🦁",
  "PITSTOP COMPLETE! 🏁",
  "FEELING IT! ⚡",
  "YES! 🎉",
  "KEEP MOVING! 🚗",
];

// =====================
// ROUTINE TITLES
// =====================
const routineTitles = {
  30:  ["30 SEC BURN", "QUICK BLAST", "TURBO ROUND"],
  60:  ["1 MIN RESET", "MINUTE MOVER", "THE WARMUP"],
  120: ["2 MIN BLAST", "PITSTOP PRO", "FULL RESET"],
};

// =====================
// MODE SELECTION
// =====================
function selectMode(mode) {
  currentMode = mode;
  document.getElementById('btn-outcar').classList.toggle('active', mode === 'outOfCar');
  document.getElementById('btn-incar').classList.toggle('active', mode === 'inCar');
}

// =====================
// SHUFFLE UTILITY
// Fisher-Yates shuffle — returns a new shuffled array
// =====================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// =====================
// ROUTINE GENERATOR
// Fills the time slot as tightly as possible
// from a shuffled pool — every routine is unique.
// =====================
function generateRoutine(mode, targetSeconds) {
  const pool = shuffle(exercises[mode]);
  const routine = [];
  let totalTime = 0;
  const tolerance = 10; // allow up to 10 sec over target

  for (const ex of pool) {
    if (totalTime >= targetSeconds) break;
    if (totalTime + ex.duration <= targetSeconds + tolerance) {
      routine.push(ex);
      totalTime += ex.duration;
    }
  }

  return { routine, totalTime };
}

// =====================
// START ROUTINE
// =====================
function startRoutine(seconds) {
  const { routine, totalTime } = generateRoutine(currentMode, seconds);

  // Pick a random title for this time slot
  const titles = routineTitles[seconds];
  const title = titles[Math.floor(Math.random() * titles.length)];
  document.getElementById('routine-title').textContent = title;

  // Build exercise list
  const list = document.getElementById('exercise-list');
  list.innerHTML = '';

  routine.forEach((ex, i) => {
    const item = document.createElement('div');
    item.className = 'exercise-item';
    item.style.animationDelay = `${i * 0.07}s`;

    item.innerHTML = `
      <span class="exercise-emoji">${ex.emoji}</span>
      <div class="exercise-info">
        <div class="exercise-name">${ex.name}</div>
        <div class="exercise-reps">${ex.reps}</div>
      </div>
    `;
    list.appendChild(item);
  });

  // Add total time indicator
  const totalEl = document.createElement('p');
  totalEl.className = 'total-time';
  totalEl.textContent = `~${totalTime} SECONDS TOTAL`;
  list.appendChild(totalEl);

  // Scroll to top of routine
  document.querySelector('.routine-scroll').scrollTop = 0;

  showScreen('screen-routine');
}

// =====================
// FINISH ROUTINE
// =====================
function finishRoutine() {
  fireConfetti();
  showFeedback();
  setTimeout(() => showScreen('screen-main'), 2200);
}

// =====================
// SCREEN SWITCHER
// =====================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// =====================
// CONFETTI BURST
// =====================
function fireConfetti() {
  const overlay = document.getElementById('confetti-overlay');
  overlay.innerHTML = '';

  const colors = [
    '#ff2d78', // neon pink
    '#00d4ff', // neon blue
    '#fff200', // neon yellow
    '#39ff14', // neon green
    '#bf00ff', // neon purple
    '#ff6b00', // neon orange
    '#ffffff', // white
  ];

  const count = 70;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';

    const size = 6 + Math.random() * 9;
    const isCircle = Math.random() > 0.5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const leftPos = Math.random() * 100;
    const duration = 0.9 + Math.random() * 1.6;
    const delay = Math.random() * 0.4;

    piece.style.cssText = `
      left: ${leftPos}%;
      top: -20px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${isCircle ? '50%' : '2px'};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    overlay.appendChild(piece);
  }

  // Clean up after animation
  setTimeout(() => {
    overlay.innerHTML = '';
  }, 3500);
}

// =====================
// FEEDBACK MESSAGE
// =====================
function showFeedback() {
  // Remove any existing feedback
  const existing = document.getElementById('feedback-msg');
  if (existing) existing.remove();

  const msg = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
  const el = document.createElement('div');
  el.id = 'feedback-msg';
  el.textContent = msg;
  document.body.appendChild(el);

  setTimeout(() => {
    el.style.transition = 'opacity 0.3s ease';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 350);
  }, 1600);
}
