const playerName = document.getElementById("player-name");
const playerDex = document.getElementById("dexterity");
const playerDef = document.getElementById("defense");
const playerStr = document.getElementById("strength");

const Enemies = [];
let dices = [0, 0];
let attackDice = 0;
class Enemy {
  health = 100;
  strength = 10;
  image = null;
  GoldReward = 0;
  XPReward = 0;
  lvl = 1;
  name = "Enemy";
  id = 0;
  dex = 0;

  constructor(id, name, health, str, imageURL, GoldReward, XPReward, lvl, dex) {
    this.id = id;
    this.name = name;
    this.health = health;
    this.str = str;
    this.image = imageURL;
    this.GoldReward = GoldReward;
    this.XPReward = XPReward;
    this.lvl = lvl;
    this.dex = dex;
  }

  hitPlayer(player) {
    player.health -= this.strength;
    if (player.health < 0) player.die();
  }
  gotHit(strength) {
    this.health -= strength;
  }
  die(EnemiesArray) {
    EnemiesArray.splice((e) => e.id !== this.id);
  }
} //class Enemy

class Player {
  name = "Player 1";
  defense = 0;
  str = 10;
  image = null;
  dex = 0;
  health = 100;

  constructor(name, dexterity, defense, str, health, imageURL, lvl, def) {
    this.name = name;
    this.defense = defense;
    this.str = str;
    this.image = imageURL;
    this.dexterity = dexterity;
    this.health = health;
    this.lvl = lvl; //
    this.def = def; //
  }

  hitEnemy(enemy) {
    enemy.health -= this.Strength;
    if (player.health < 0) player.die();
  }
  gotHit(strength) {
    this.health -= strength;
    if (this.health < 0) this.loseGame();
  }
  loseGame() {
    mainMenu();
  }
} //class player

const mainMenu = () => {
  window.location.href = "./mainMenu.html";
};
const runAway = () => {
  window.history.back();
};

const playerImages = [];
let currentPlayerImage = 0;

const changeToNextImage = () => {
  document.getElementById("prevImageButton").disabled = false;
  const button = document.getElementById("nextImageButton");
  button.url = playerImages[currentPlayerImage++];
  if (currentPlayerImage >= playerImages.length) button.disabled = true;
};

const changeToPrevImage = () => {
  document.getElementById("nextImageButton").disabled = false;
  const button = document.getElementById("prevImageButton");
  button.url = playerImages[currentPlayerImage--];
  if (currentPlayerImage == 0) button.disabled = true;
};

const createPlayer = () => {
  const player = new Player(playerName.value, +playerDex.value, +playerDef.value, +playerStr.value, 1000);
  localStorage.setItem("player", JSON.stringify(player));
  window.location.href = "./combat.html";
};

const initEnemies = () => {
  const monster = new Enemy(1, "Alien", 100);
};

let player = new Player(playerName.value, +playerDex.value, +playerDef.value, +playerStr.value, 1000);
let monster = new Enemy(1, "Alien", 100);

startDecider(player, monster);

function startDecider(player, monster) {
  while (player.health !== 0 || monster.health !== 0) {
    do {
      dices[0] = Math.trunc(Math.random() * 20) + 1;
      dices[1] = Math.trunc(Math.random() * 20) + 1;
    } while (player.dex + dices[0] === monster.dex + dices[1]);

    player.dex += dices[0];
    monster.dex += dices[1];

    if (player.dex > monster.dex) fightCalc(player, monster);
    if (player.dex < monster.dex) fightCalc(monster, player);
  }
}

function fightCalc(attacker, defender) {
  let attackPower = 0;
  let attackDice = Math.trunc(Math.random() * 20) + 1;

  attackPower = (attacker.str + attackDice) * attacker.lvl - defender.def;
  defender.health -= attackPower;
}
