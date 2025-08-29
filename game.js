const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

const background = new Image();
background.src = "assets/background.jpg";

const vampire = new Image();
vampire.src = "assets/vampire.png";

const werewolf = new Image();
werewolf.src = "assets/werewolf.png";

// Character positions
let vampireX = 100, vampireY = 400;
let werewolfX = 600, werewolfY = 400;
const speed = 5;

// Keyboard controls
const keys = {};
window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

// Gamepad controls
let gamepad = null;
window.addEventListener("gamepadconnected", (e) => {
  console.log("Gamepad connected:", e.gamepad);
  gamepad = e.gamepad;
});
window.addEventListener("gamepaddisconnected", () => {
  console.log("Gamepad disconnected");
  gamepad = null;
});

function updateGamepad() {
  if (!gamepad) return;
  const gp = navigator.getGamepads()[gamepad.index];
  if (!gp) return;

  // Left stick controls vampire
  if (gp.axes[0] < -0.3) vampireX -= speed;
  if (gp.axes[0] > 0.3) vampireX += speed;
  if (gp.axes[1] < -0.3) vampireY -= speed;
  if (gp.axes[1] > 0.3) vampireY += speed;

  // Buttons (e.g., X for attack)
  if (gp.buttons[0].pressed) {
    console.log("Vampire Attack!");
  }
}

// Main update
function update() {
  // Keyboard controls for vampire (WASD)
  if (keys["a"]) vampireX -= speed;
  if (keys["d"]) vampireX += speed;
  if (keys["w"]) vampireY -= speed;
  if (keys["s"]) vampireY += speed;

  // Keyboard controls for werewolf (Arrows)
  if (keys["ArrowLeft"]) werewolfX -= speed;
  if (keys["ArrowRight"]) werewolfX += speed;
  if (keys["ArrowUp"]) werewolfY -= speed;
  if (keys["ArrowDown"]) werewolfY += speed;

  updateGamepad();
}

// Main draw
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(vampire, vampireX, vampireY, 100, 100);
  ctx.drawImage(werewolf, werewolfX, werewolfY, 100, 100);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
