function Player(name, str, dex, def, lvl, hp) {
  this.name = name;
  this.str = str;
  this.dex = dex;
  this.def = def;
  this.lvl = lvl;
  this.hp = hp;
}

function Monster(name, str, dex, def, lvl, hp) {
  this.name = name;
  this.str = str;
  this.dex = dex;
  this.def = def;
  this.lvl = lvl;
  this.hp = hp;
}

const mihile = new Player("Mihile", 1, 1, 1, 1, 50);
const gromp = new Monster("Gromp", 1, 1, 1, 1, 50);
console.log(mihile);
console.log(gromp);

let dices = [0, 0];
let attackDice = 0;

function startDecider(player, monster) {
  dices[0] = Math.trunc(Math.random() * 20) + 1;
  dices[1] = Math.trunc(Math.random() * 20) + 1;
  player.dex += dices[0];
  monster.dex += dices[1];
  if (player.dex > monster.dex) return fightCalc(player, monster, true);
  if (player.dex < monster.dex) return fightCalc(monster, player, false);
  // console.log("draw");
  return startDecider(player, monster);
}

startDecider(mihile, gromp);
console.log(dices);
console.log(mihile);
console.log(gromp);

function fightCalc(attacker, defender, boolean) {
  let attackPower = 0;
  attackDice = Math.trunc(Math.random() * 20) + 1;
  attackPower = (attacker.str + attackDice) * attacker.lvl - defender.def;
  if (attackPower < 0) return console.log("");
  defender.hp -= attackPower;
  if (defender.hp > 0 && boolean === true) return startDecider(attacker, defender);
  if (defender.hp > 0 && boolean === false) return startDecider(defender, attacker);
}
