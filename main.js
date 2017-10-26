var roleHarvester = require('role.harvester');
var Globals = require('globals');

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        roleHarvester.run(creep);
    }
}
const harvesterCount = Object.keys(Game.creeps).length;
const harvesterCap = Globals.gHarvesterCap;
const harvesterSuffix = Globals.gHarvesterSuffix;
console.log(harvesterCount);
console.log(harvesterCap);
if (harvesterCount < harvesterCap) {
	Globals.gHarvesterSuffix += 1;
	Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], ("Harvester" + Globals.gHarvesterSuffix));	
	//console.log(harvesterCount);
	//console.log(harvesterCap);
}