var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var Globals = require('globals');

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
        	roleUpgrader.run(creep);
        }
    }
}

const harvesterCount = _(Game.creeps).filter( { memory: { role: 'harvester' } } ).size();
const harvesterCap = Globals.gHarvesterCap;
const harvesterSuffix = Math.floor(Math.random() * 999);
var currentHarvester = {};

if (harvesterCount < harvesterCap && (Game.spawns['Spawn1'].energy) >= 200) {
	currentHarvester = 'Harvester' + harvesterSuffix;
	console.log(currentHarvester);
	Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], currentHarvester);
	Game.creeps[currentHarvester].memory.role = 'harvester';
}

const upgraderCount = _(Game.creeps).filter( { memory: { role: 'upgrader' } } ).size();
const upgraderCap = Globals.gUpgraderCap;
const upgraderSuffix = Math.floor(Math.random() * 999);
var currentUpgrader = {};

if (upgraderCount < upgraderCap && (Game.spawns['Spawn1'].energy) >= 200) {
	currentUpgrader = 'Upgrader' + upgraderSuffix;
	Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], currentUpgrader);
	Game.creeps[currentUpgrader].memory.role = 'upgrader';
}else{
	console.log("cannot create upgrader")
	console.log("Upgrader Cap: " + upgraderCap)
	console.log("Upgrader Count: " + upgraderCount)
}