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
const harvesterCount = Object.keys(Game.creeps).length;
const harvesterCap = Globals.gHarvesterCap;
const harvesterSuffix = Math.floor(Math.random() * 999);
//console.log(harvesterCount);
//console.log(harvesterCap);
if (harvesterCount < harvesterCap) {
	Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], "Harvester" + harvesterSuffix);	
}

const upgraderCount = Object.keys(Game.creeps).length;
const upgraderCap = Globals.gUpgraderCap;
const upgraderSuffix = Math.floor(Math.random() * 999);

if (harvesterCount < harvesterCap) {
	Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], "Upgrader" + upgraderSuffix);	
}