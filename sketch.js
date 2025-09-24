let fallingLetters = [];
let currentWord = "";
let boards = []; // store all boards with positions
let treeImg;

function preload() {
  // Load your tree image (put it in assets folder or adjust path)
  treeImg = loadImage("assets/blossomwboard.png");
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('pointer-events','none');
  clear();
  textSize(32);
  textAlign(CENTER, CENTER);

  document.getElementById("submitBtn").addEventListener("click", () => {
    let input = document.getElementById("textInput").value;
    if (input.trim() !== "") {
      triggerRain(input);
    }
  });
}

function draw() {
  clear();

  // Draw tree image as background
  imageMode(CENTER);
  function draw() {
  clear();

  // Calculate scale factor to fit screen
  let scaleFactor = min(width / treeImg.width, height / treeImg.height);
  let newW = treeImg.width * scaleFactor;
  let newH = treeImg.height * scaleFactor;

  // Draw tree image scaled to fit
  imageMode(CENTER);
  image(treeImg, width/2, height/2, newW, newH);

  // Falling letters
  if (fallingLetters.length > 0) {
    fill(0);
    for (let l of fallingLetters) {
      text(l.char, l.x, l.y);
      l.y += l.speed;
    }

    if (fallingLetters.every(l => l.y > height)) {
      fallingLetters = [];
      boards.push({
        word: currentWord,
        // Random position within the scaled tree area
        x: random(width/2 - newW/3, width/2 + newW/3),
        y: random(height/2 - newH/3, height/2 + newH/3)
      });
    }
  }

  // Draw all boards
  for (let b of boards) {
    drawBoard(b.word, b.x, b.y);
  }
}


  // Draw falling letters
  if (fallingLetters.length > 0) {
    fill(0);
    for (let l of fallingLetters) {
      text(l.char, l.x, l.y);
      l.y += l.speed;
    }

    // Check if all letters have fallen past bottom
    if (fallingLetters.every(l => l.y > height)) {
      fallingLetters = [];
      // Add a new board with random position
      boards.push({
        word: currentWord,
        x: random(width/2 - 150, width/2 + 150), // adjust spread to match tree canopy
        y: random(height/2 - 150, height/2 + 50)
      });
    }
  }

  // Draw all boards
  for (let b of boards) {
    drawBoard(b.word, b.x, b.y);
  }
}

function triggerRain(word) {
  fallingLetters = [];
  currentWord = word;

  let startX = width/2 - (word.length * 20)/2;
  for (let i = 0; i < word.length; i++) {
    fallingLetters.push({
      char: word[i],
      x: startX + i*20,
      y: 0,
      speed: random(2, 5)
    });
  }
}

function drawBoard(word, x, y) {
  textSize(20);
  let padding = 20; // space around the text
  let w = textWidth(word) + padding;
  let h = 50; // keep height fixed, or adjust if you want multiline

  // White board with a subtle gray border
  fill(255);              // white fill
  stroke(255);            // light gray outline
  strokeWeight(2);
  rect(x - w/2, y - h/2, w, h, 8);

  // Text
  noStroke();
  fill(0);                // black text
  text(word, x, y);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

