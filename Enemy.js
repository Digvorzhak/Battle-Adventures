const Enemies = [];
class Enemy {
  health = 100;
  attackForce = 10;
  image = null;
  GoldReward = 0;
  XPReward = 0;
  monstersLvl = 1;
  name = "Enemy";
  id = 0;
  constructor(
    id,
    name,
    health,
    attackForce,
    imageURL,
    GoldReward,
    XPReward,
    monstersLvl
  ) {
    this.id = id;
    this.name = name;
    this.health = health;
    this.attackForce = attackForce;
    this.image = imageURL;
    this.GoldReward = GoldReward;
    this.XPReward = XPReward;
    this.monstersLvl = monstersLvl;
  }
  hitPlayer(player) {
    player.health -= this.attackForce;
    if (player.health < 0) player.die();
  }
  gotHit(attackForce) {
    this.health -= attackForce;
  }
  die(EnemiesArray) {
    Enemies.splice((e) => e.id !== this.id);
  }
}
class Player {
  defense = 0;
  Strength = 10;
  image = null;
  Dexterity = "Sword man";
  constructor(Dexterity, defense, Strength, imageURL) {
    this.defense = defense;
    this.Strength = Strength;
    this.image = imageURL;

    this.Dexterity = Dexterity;
  }
  hitEnemy(enemy) {
    enemy.health -= this.Strength;
    if (player.health < 0) player.die();
  }
  gotHit(Strength) {
    this.health -= Strength;
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

const CreatePlayer = () => {
  const player = new Player("swordMan", 100, 100, "imageUrl");
  localStorage.setItem("player", JSON.stringify(player));
};
