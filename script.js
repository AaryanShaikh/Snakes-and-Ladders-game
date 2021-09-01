class Players {
  constructor(name, img) {
    this.name = name;
    this.img = img;
  }
}

let name1, name2, img1, img2, player1, player2;

function getNsetDetails() {
  name1 = prompt("Enter the name of Player 1");
  name1 = typeof name1 == "undefined" || name1 == "" ? "Player 1" : name1;
  img1 = prompt(`Enter 1 for boy or 2 for girl avatar for ${name1}`);
  img1 = img1 == "1" ? "./imgs/player1.png" : "./imgs/player2.png";
  name2 = prompt("Enter the name of Player 2");
  name2 = typeof name2 == "undefined" || name2 == "" ? "Player 2" : name2;
  img2 = prompt(`Enter 1 for boy or 2 for girl avatar for ${name2}`);
  img2 = img2 == "1" ? "./imgs/player1.png" : "./imgs/player2.png";
  player1 = new Players(name1, img1);
  player2 = new Players(name2, img2);

  makeContainer();
  makeMain();
  makeLoading();
  makeBoxes();
  makeSnakes();
  makeLadders();
  makeControls();
  makeRes();
  makeAlert();
  makeRules();
  setPlayers();
}

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
    calcScore(player, dice);
    turn = player == 1 ? 2 : 1;
    _(`bgu${turn}`).style.background = "darkorange";
  }
}

let p1score = 1,
  p2score = 1;
let ladderspos = [4, 28, 45, 54];
let incpos = [36, 49, 64, 92];
let snakespos = [34, 40, 66, 83, 95, 99];
let decpos = [8, 2, 35, 59, 56, 21];

function calcScore(player, dice) {
  if (player == 1) {
    if (p1score + dice < 100) {
      _(`p1${p1score}`).style.opacity = 0;
      p1score += dice;
      p1score = isLadder(p1score, player);
      p1score = isSnake(p1score, player);
      _("text1").setAttribute("score", p1score);
      _(`p1${p1score}`).style.opacity = 1;
    }
    if (p1score + dice == 100) {
      _(`p1${p1score}`).style.opacity = 0;
      p1score += dice;
      _("text1").setAttribute("score", p1score);
      _(`p1${p1score}`).style.opacity = 1;
      isWinner(player);
    }
  } else {
    if (p2score + dice < 100) {
      _(`p2${p2score}`).style.opacity = 0;
      p2score += dice;
      p2score = isLadder(p2score, player);
      p2score = isSnake(p2score, player);
      _("text2").setAttribute("score", p2score);
      _(`p2${p2score}`).style.opacity = 1;
    }
    if (p2score + dice == 100) {
      _(`p2${p2score}`).style.opacity = 0;
      p2score += dice;
      _("text2").setAttribute("score", p2score);
      _(`p2${p2score}`).style.opacity = 1;
      isWinner(player);
    }
  }
}

function isWinner(player) {
  _("res").style.display = "flex";
  if (player == 1) {
    _("resimg").src = player1.img;
    _("restext").textContent = `${player1.name} wins!!`;
  } else {
    _("resimg").src = player2.img;
    _("restext").textContent = `${player2.name} wins!!`;
  }
}

function isLadder(score, player) {
  if (ladderspos.includes(score)) {
    gotLadder(score, incpos[ladderspos.indexOf(score)], player);
  }
  return ladderspos.includes(score) ? incpos[ladderspos.indexOf(score)] : score;
}

function isSnake(score, player) {
  if (snakespos.includes(score)) {
    gotSnake(score, decpos[snakespos.indexOf(score)], player);
  }
  return snakespos.includes(score) ? decpos[snakespos.indexOf(score)] : score;
}

function setPlayers() {
  _("u1name").textContent = player1.name;
  _("u1").src = player1.img;
  _("u2name").textContent = player2.name;
  _("u2").src = player2.img;
}

function gotLadder(prevscore, currscore, player) {
  _("albox").style.background = "lawngreen";
  if (player == 1) {
    _("alert").style.display = "flex";
    _(
      "altext"
    ).textContent = `${player1.name} climbed the ladder from ${prevscore} to ${currscore}`;
  } else {
    _("alert").style.display = "flex";
    _(
      "altext"
    ).textContent = `${player2.name} climbed the ladder from ${prevscore} to ${currscore}`;
  }
}

function gotSnake(prevscore, currscore, player) {
  _("albox").style.background = "indianred";
  if (player == 1) {
    _("alert").style.display = "flex";
    _(
      "altext"
    ).textContent = `${player1.name} got eaten by the snake at ${prevscore} and got down to ${currscore}`;
  } else {
    _("alert").style.display = "flex";
    _(
      "altext"
    ).textContent = `${player2.name} got eaten by the snake at ${prevscore} and got down to ${currscore}`;
  }
}

function closeal(id) {
  _(id).style.display = "none";
}

function startGame() {
  _("load").style.display = "none";
  _("rules").style.display = "flex";
}

function makeRules() {
  let rulearr = [
    "Left side is the board and the right side is the controls.",
    "When your name and avatar is highlighted(orange) it means it's that player's turn.",
    "To roll the dice just click on the dice below your player.",
    "The dice will roll and the pieces will move automatically on the board!",
    "After Player one has rolled the dice the turn will switch automatically to the other player.",
    "If you encounter a ladder or a snake you will get a pop up telling you where you've landed on the board!",
    "The Game is Over when either one of the players reaches 100!",
  ];
  let rules = document.createElement("div");
  rules.setAttribute("id", "rules");
  rules.classList.add("rules");
  let ins = document.createElement("div");
  ins.classList.add("ins");
  let inshead = document.createElement("h1");
  inshead.textContent = "Instructions to play the game!";
  ins.appendChild(inshead);
  let ruleslist = document.createElement("ol");
  for (let i = 0; i < 7; i++) {
    let rule = document.createElement("li");
    rule.textContent = rulearr[i];
    ruleslist.appendChild(rule);
  }
  ins.appendChild(ruleslist);
  let rulesbtn = document.createElement("button");
  rulesbtn.textContent = "Let's Play!!";
  rulesbtn.setAttribute("onclick", "closeal('rules')");
  ins.appendChild(rulesbtn);
  rules.appendChild(ins);
  let container = _("container");
  container.appendChild(rules);
}

function makeLoading() {
  let load = document.createElement("div");
  load.classList.add("load");
  load.setAttribute("id", "load");
  let img = document.createElement("img");
  img.src = "./imgs/load.gif";
  load.appendChild(img);
  let container = _("container");
  container.appendChild(load);
}

function makeAlert() {
  let alert = document.createElement("div");
  alert.classList.add("alert");
  alert.setAttribute("id", "alert");
  let albox = document.createElement("div");
  albox.classList.add("albox");
  albox.setAttribute("id", "albox");
  let altext = document.createElement("p");
  altext.setAttribute("id", "altext");
  albox.appendChild(altext);
  let albtn = document.createElement("button");
  albtn.setAttribute("onclick", "closeal('alert')");
  albtn.textContent = "OK";
  albox.appendChild(albtn);
  alert.appendChild(albox);
  let container = _("container");
  container.appendChild(alert);
}

function makeRes() {
  let res = document.createElement("div");
  res.classList.add("res");
  res.setAttribute("id", "res");
  let wincard = document.createElement("div");
  wincard.classList.add("wincard");
  let img = document.createElement("img");
  img.setAttribute("id", "resimg");
  wincard.appendChild(img);
  let restext = document.createElement("p");
  restext.setAttribute("id", "restext");
  wincard.appendChild(restext);
  res.appendChild(wincard);
  let container = _("container");
  container.appendChild(res);
}

function makeControls() {
  let controls = document.createElement("div");
  controls.classList.add("controls");
  controls.setAttribute("id", "controls");
  for (let i = 1; i <= 2; i++) {
    let users = document.createElement("div");
    users.classList.add("users");
    users.setAttribute("id", `bgu${i}`);
    let uname = document.createElement("h1");
    uname.setAttribute("id", `u${i}name`);
    users.appendChild(uname);
    let uimg = document.createElement("img");
    uimg.setAttribute("id", `u${i}`);
    users.appendChild(uimg);
    let udice = document.createElement("img");
    udice.src = "./imgs/1.png";
    udice.setAttribute("id", `du${i}`);
    udice.setAttribute("onclick", `rollDice(${i})`);
    users.appendChild(udice);
    let utext = document.createElement("p");
    utext.setAttribute("id", `text${i}`);
    utext.textContent = "You are at tile ";
    users.appendChild(utext);
    controls.appendChild(users);
  }
  let container = _("container");
  container.appendChild(controls);
}

function makeMain() {
  let main = document.createElement("div");
  main.classList.add("main");
  main.setAttribute("id", "main");
  let snakes = document.createElement("div");
  snakes.classList.add("snakes");
  snakes.setAttribute("id", "snakes");
  main.appendChild(snakes);
  let ladders = document.createElement("div");
  ladders.classList.add("ladders");
  ladders.setAttribute("id", "ladders");
  main.appendChild(ladders);
  let container = _("container");
  container.appendChild(main);
}

function makeContainer() {
  let container = document.createElement("div");
  container.classList.add("container");
  container.setAttribute("id", "container");
  document.body.appendChild(container);
}

getNsetDetails();
