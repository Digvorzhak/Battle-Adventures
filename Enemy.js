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
  monstersLvl = 1;
  name = "Enemy";
  id = 0;
  dexterity = 0;
  constructor(id, name, health, strength, imageURL, GoldReward, XPReward, monstersLvl, dexterity) {
    this.id = id;
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.image = imageURL;
    this.GoldReward = GoldReward;
    this.XPReward = XPReward;
    this.monstersLvl = monstersLvl;
    this.dexterity = dexterity;
  }
  dmgCalc(player) {
    let attackPower = 0;
    attackDice = Math.trunc(Math.random() * 20) + 1;
    attackPower = (this.strength + attackDice) * this.monstersLvl - player.defense;
    if (attackPower <= 0) return startDecider(player, this);
    player.health -= attackPower;
    if (player.health > 0) return startDecider(this, player);
    if (player.health > 0) return startDecider(player, this);
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
}
class Player {
  name = "Player 1";
  defense = 0;
  Strength = 10;
  image = null;
  dexterity = 0;
  health = 100;
  constructor(name, dexterity, defense, strength, health, imageURL) {
    this.name = name;
    this.defense = defense;
    this.strength = strength;
    this.image = imageURL;
    this.dexterity = dexterity;
    this.health = health;
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
}
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

const createPlayer = (e) => {
  console.log(e);
  const player = new Player(playerName.value, +playerDex.value, +playerDef.value, +playerStr.value, 1000);
  localStorage.setItem("player", JSON.stringify(player));
  window.location.href = "./combat.html";
};

const initEnemies = () => {
  const monster1 = new Enemy(1, "Alien", 100);
};

// function startDecider(player, monster) {
//   dices[0] = Math.trunc(Math.random() * 20) + 1;
//   dices[1] = Math.trunc(Math.random() * 20) + 1;
//   player.dex += dices[0];
//   monster.dex += dices[1];
//   if (player.dex > monster.dex) return player.dmgCalc(player, monster, true);
//   if (player.dex < monster.dex) return monster.dmgCalc(monster, player, false);
//   // console.log("draw");
//   return startDecider(player, monster);
// }

function startDecider({ player, monster }) {
  dices[0] = Math.trunc(Math.random() * 20) + 1;
  dices[1] = Math.trunc(Math.random() * 20) + 1;
  player.dex += dices[0];
  monster.dex += dices[1];
  if (player.dex > monster.dex) return fightCalc({ attacker: player, defender: monster });
  if (player.dex < monster.dex) return fightCalc({ attacker: monster, defender: player });
  return startDecider(player, monster);
}

startDecider({ player: mihile, monster: gromp });
console.log(dices);
console.log(mihile);
console.log(gromp);

function fightCalc({ attacker, defender }) {
  let attackPower = 0;
  attackDice = Math.trunc(Math.random() * 20) + 1;
  attackPower = (attacker.str + attackDice) * attacker.lvl - defender.def;
  if (attackPower < 0) return console.log("");
  defender.hp -= attackPower;
  if (defender.hp > 0) return startDecider({ player: attacker, defender: monster });
}
