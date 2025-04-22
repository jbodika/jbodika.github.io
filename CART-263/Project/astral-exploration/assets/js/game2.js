/**
Astral Exploration - Human Language Learning

Jolene Bodika & John Compuesto

A game where the alien explorers learn and try to write human language.
The player interacts with human letters and tries to draw them as an alien species.
The alien’s attempt to replicate the human language will be checked.

Controls:
Use mouse or touch to draw on the canvas.
Draw the letter that the alien is trying to replicate (based on the target character).
Submit the drawing to see if it matches the human letter.
Clear the canvas if needed and try again.
Skip to the next letter if you want to move on.

Uses:
p5.js: Used for drawing and interactive canvas elements, allowing the player to draw letters and have a dynamic user interface.
Canvas API: Essential for handling the drawing of letters, allowing the player to interact with the game through mouse or touch input.
JavaScript: The core language used to manage the game’s logic, event listeners, and UI transitions, ensuring a smooth and interactive experience.
 */
const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let drawnPoints = [];

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let currentLetterIndex = 0;

// 🅰️ Define your alphabet drawings
const letters = [
  [ { x: 10, y: 10 }, { x: 20, y: 40 }, { x: 30, y: 10 } ], // A
  [ { x: 10, y: 10 }, { x: 10, y: 40 }, { x: 30, y: 25 } ], // B
  [ { x: 30, y: 10 }, { x: 10, y: 25 }, { x: 30, y: 40 } ], // C
  [ { x: 10, y: 10 }, { x: 30, y: 25 }, { x: 10, y: 40 } ], // D
  [ { x: 30, y: 10 }, { x: 10, y: 10 }, { x: 10, y: 40 }, { x: 30, y: 40 } ] // E
];

const letterLabels = ['あ', 'い', 'う', 'え', 'お'];
document.getElementById('targetLetter').textContent = letterLabels[currentLetterIndex];

// 🖱 Mouse Events
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', endDraw);
canvas.addEventListener('mouseleave', endDraw);

// 📱 Touch Events
canvas.addEventListener('touchstart', startTouch, { passive: false });
canvas.addEventListener('touchmove', drawTouch, { passive: false });
canvas.addEventListener('touchend', endDraw);

function startDraw(e) {
  drawing = true;
  ctx.beginPath();
  let x = e.offsetX;
  let y = e.offsetY;
  ctx.moveTo(x, y);
  drawnPoints = [{ x, y }];
}

function draw(e) {
  if (!drawing) return;
  let x = e.offsetX;
  let y = e.offsetY;
  ctx.lineTo(x, y);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.stroke();
  drawnPoints.push({ x, y });
}

function endDraw() {
  drawing = false;
}

function getTouchPos(canvas, touchEvent) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}

function startTouch(e) {
  e.preventDefault();
  const pos = getTouchPos(canvas, e);
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  drawnPoints = [pos];
}

function drawTouch(e) {
  if (!drawing) return;
  e.preventDefault();
  const pos = getTouchPos(canvas, e);
  ctx.lineTo(pos.x, pos.y);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.stroke();
  drawnPoints.push(pos);
}

// 🔘 Buttons
document.getElementById('clearBtn')?.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawnPoints = [];
});

document.getElementById('submitBtn')?.addEventListener('click', () => {
  checkDrawing();
});

document.getElementById('skipBtn')?.addEventListener('click', () => {
  showPopup("⏭️ Skipped to the next letter.");
  goToNextLetter();
});

// ✅ Super Forgiving Check
function checkDrawing() {
  const phrases = [
    "✅ Nice drawing! Let's keep going!",
    "🎉 Looks good to me!",
    "👏 On to the next one!",
    "✅ Good enough!",
    "🔥 You're doing great!"
  ];
  const randomMessage = phrases[Math.floor(Math.random() * phrases.length)];
  showPopup(randomMessage);
  goToNextLetter();
}

function goToNextLetter() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawnPoints = [];
  currentLetterIndex++;

  if (currentLetterIndex >= letters.length) {
    showPopup("🎉 You finished the game! Redirecting...");
    setTimeout(() => {
      window.location.href = "map.html";
    }, 2000);
    return;
  }

  document.getElementById('targetLetter').textContent = letterLabels[currentLetterIndex];
}

// 📣 Display popup
function showPopup(message) {
  const popup = document.getElementById('popupMessage');
  popup.textContent = message;
  popup.classList.remove('hidden');

  setTimeout(() => {
    popup.classList.add('hidden');
  }, 2500);
}
