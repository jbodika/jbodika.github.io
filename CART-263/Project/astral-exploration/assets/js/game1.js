const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let drawnPoints = [];

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let attemptCount = 0;
const MAX_ATTEMPTS = 3;
const BASE_TOLERANCE = 10;
let currentLetterIndex = 0;

// 🅰️ Define your alphabet drawings (abstracted points, simplified!)
const letters = [
  [ { x: 10, y: 10 }, { x: 20, y: 40 }, { x: 30, y: 10 } ], // A
  [ { x: 10, y: 10 }, { x: 10, y: 40 }, { x: 30, y: 25 } ], // B
  [ { x: 30, y: 10 }, { x: 10, y: 25 }, { x: 30, y: 40 } ], // C
  [ { x: 10, y: 10 }, { x: 30, y: 25 }, { x: 10, y: 40 } ], // D
  [ { x: 30, y: 10 }, { x: 10, y: 10 }, { x: 10, y: 40 }, { x: 30, y: 40 } ] // E
];

// 👁 Labels to show on screen (you can use Japanese, Roman, etc.)
const letterLabels = ['あ', 'い', 'う', 'え', 'お'];

// Set first character on load
document.getElementById('targetLetter').textContent = letterLabels[currentLetterIndex];

// Mouse Events
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', endDraw);
canvas.addEventListener('mouseleave', endDraw);

// Touch Events
canvas.addEventListener('touchstart', startTouch, { passive: false });
canvas.addEventListener('touchmove', drawTouch, { passive: false });
canvas.addEventListener('touchend', endDraw);

function startDraw(e) {
  drawing = true;
  ctx.beginPath();
  let x = e.offsetX * (canvas.width / canvas.offsetWidth);
  let y = e.offsetY * (canvas.height / canvas.offsetHeight);
  ctx.moveTo(x, y);
  drawnPoints = [{ x, y }];
}

function draw(e) {
  if (!drawing) return;
  let x = e.offsetX * (canvas.width / canvas.offsetWidth);
  let y = e.offsetY * (canvas.height / canvas.offsetHeight);
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
    x: (touchEvent.touches[0].clientX - rect.left) * (canvas.width / canvas.offsetWidth),
    y: (touchEvent.touches[0].clientY - rect.top) * (canvas.height / canvas.offsetHeight)
  };
}

function startTouch(e) {
  e.preventDefault();
  const pos = getTouchPos(canvas, e);
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  drawnPoints = [{ x: pos.x, y: pos.y }];
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

// Buttons
document.getElementById('clearBtn')?.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawnPoints = [];
});

document.getElementById('submitBtn')?.addEventListener('click', () => {
  checkDrawing();
});

document.getElementById('skipBtn')?.addEventListener('click', () => {
  alert("⏭️ Skipped to the next letter.");
  attemptCount = 0;
  goToNextLetter();
});

// 🎯 Check current letter
function checkDrawing() {
  const targetLetter = letters[currentLetterIndex];
  const userPathLength = drawnPoints.length;
  const targetPathLength = targetLetter.length;
  const lengthRatio = userPathLength / targetPathLength;

  const BASE_TOLERANCE = 10;
  let tolerance = BASE_TOLERANCE;

  // ✨ Boost tolerance on FIRST attempt of levels 2 and 3 (index 1 and 2)
  if ((currentLetterIndex === 1 || currentLetterIndex === 2) && attemptCount === 0) {
    tolerance += 10; // make the first try easier
  }

  if (lengthRatio < 0.8) tolerance += 5;
  else if (lengthRatio > 1.2) tolerance -= 3;

  tolerance += attemptCount * 5;

  let totalDistance = 0;
  for (let i = 0; i < Math.min(userPathLength, targetPathLength); i++) {
    const dx = drawnPoints[i].x - targetLetter[i].x;
    const dy = drawnPoints[i].y - targetLetter[i].y;
    totalDistance += Math.sqrt(dx * dx + dy * dy);
  }

  const avgDistance = totalDistance / Math.min(userPathLength, targetPathLength);
  attemptCount++;

  if (avgDistance < tolerance) {
    alert(`✅ Correct! Moving to next letter.`);
    attemptCount = 0;
    goToNextLetter();
  } else if (attemptCount >= MAX_ATTEMPTS) {
    alert(`💡 Out of attempts. Moving to next letter.`);
    attemptCount = 0;
    goToNextLetter();
  } else {
    alert(`❌ Not quite. Try again!`);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawnPoints = [];
  }
}


// ⏩ Load next letter or finish game
function goToNextLetter() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawnPoints = [];

  currentLetterIndex++;
  if (currentLetterIndex >= letters.length) {
    alert("🎉 You finished the game! Great work!");
    window.location.href = "map.html"; // ✅ Redirects to map.html after clicking OK
    return;
  }

  // ✅ Update displayed character
  document.getElementById('targetLetter').textContent = letterLabels[currentLetterIndex];
}
