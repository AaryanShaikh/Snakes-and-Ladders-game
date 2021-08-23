function makeBoxes() {
  let tiles = [
    100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 81, 82, 83, 84, 85, 86, 87, 88, 89,
    90, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 61, 62, 63, 64, 65, 66, 67, 68,
    69, 70, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 41, 42, 43, 44, 45, 46, 47,
    48, 49, 50, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 1, 2, 3, 4, 5, 6, 7,
    8, 9, 10,
  ];
  let main = _("main");
  for (let i = 0; i < 100; i++) {
    let box = document.createElement("div");
    box.classList.add("box");
    box.textContent = tiles[i];
    box.style.background = `${randColor()}`;
    let players = document.createElement("div");
    players.classList.add("players");
    let player1 = document.createElement("img");
    let player2 = document.createElement("img");
    player1.src = "./imgs/p1.png";
    player2.src = "./imgs/p2.png";
    player1.setAttribute("id", `p1${tiles[i]}`);
    player2.setAttribute("id", `p2${tiles[i]}`);
    player1.style.opacity = tiles[i] == 1 ? 1 : 0;
    player2.style.opacity = tiles[i] == 1 ? 1 : 0;
    players.appendChild(player1);
    players.appendChild(player2);
    box.appendChild(players);
    main.appendChild(box);
  }
}

function _(id) {
  return document.getElementById(id);
}

function randColor() {
  let colors = ["#2aabe3", "#ee6625", "#3db54c", "#804da0", "#ffde05"];
  return colors[Math.floor(Math.random() * 5)];
}

function makeSnakes() {
  let snakes = _("snakes");
  for (let i = 1; i <= 6; i++) {
    let snake = document.createElement("img");
    snake.setAttribute("id", `s${i}`);
    snake.src = `./imgs/snake${i}.png`;
    snakes.appendChild(snake);
  }
}

function makeLadders() {
  let ladders = _("ladders");
  for (let i = 1; i <= 4; i++) {
    let ladder = document.createElement("img");
    ladder.setAttribute("id", `l${i}`);
    ladder.src = `./imgs/ladder${i}.png`;
    ladders.appendChild(ladder);
  }
}
let turn = 1;
function rollDice(player) {
  if (turn == player) {
    let dice = Math.floor(Math.random() * 6) + 1;
    _(`du${player}`).src = `./imgs/${dice}.png`;
    _(`bgu${turn}`).style.background = "gainsboro";
    calcScore(player);
    turn = player == 1 ? 2 : 1;
    _(`bgu${turn}`).style.background = "darkorange";
  }
}

function calcScore(player) {}

makeBoxes();
makeSnakes();
makeLadders();
