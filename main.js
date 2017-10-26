var roleHarvester = require('role.harvester');
var gHarvesterCap = require('globals');
var gHarvesterSuffix = require('globals');
module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        roleHarvester.run(creep);
    }
}
const harvesterCount = Object.keys(Game.creeps).length;
const harvesterCap = gHarvesterCap;
const harvesterSuffix = gHarvesterSuffix;
console.log(harvesterCount);
console.log(harvesterCap);
if (harvesterCount < harvesterCap) {
	gHarvesterSuffix += 1;
	Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], ("Harvester" + gHarvesterSuffix));	
	//console.log(harvesterCount);
	//console.log(harvesterCap);
}