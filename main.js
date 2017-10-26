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
const harvesterSuffix = Math.floor(Math.random() * 999);
//console.log(harvesterCount);
//console.log(harvesterCap);
if (harvesterCount < harvesterCap) {
	Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], "Harvester" + harvesterSuffix);	
	console.log(harvesterCount);
	console.log(harvesterCap);
	console.log(harvesterSuffix)
}