var roles = require("roles");
var Globals = require('globals');
var methods = require('methods')

function spawnCreep(role){
	var role = role;

	//var Role = role.charAt(0).toUpperCase() + role.slice(1);

	const spawning = Game.spawns['Spawn1'].spawning;
	var count = 0;

	var count = eval("_(Game.creeps).filter({ memory: { role: \'"+ role + "\' }}).size();")
	//console.log(count);
	var cap = eval("Globals.g" + role + "Cap;");

	var current = {};
	const resourceCap = Globals.gResourceCap;
	var energyAvailable = 0;
	var energyCapacity = 0;

	energyCapacity += Game.spawns.Spawn1.energyCapacity;
	_.filter(Game.structures, function(structure){
		if (structure.structureType == STRUCTURE_EXTENSION){
			energyCapacity += structure.energyCapacity;
		}
	});

	energyAvailable += Game.spawns.Spawn1.energy;
	_.filter(Game.structures, function(structure){
		if (structure.structureType == STRUCTURE_EXTENSION){
			energyAvailable += structure.energy;
		}
	});

	//console.log("[ Current Energy: " + energyAvailable + " | Current Resource Cap: " + energyCapacity + " | Global Resource Cap: " + Globals.gResourceCap + " 					]");

	if (count < cap && energyAvailable >= resourceCap && spawning == null) {
		methods.groupTracker();
		//methods.creepTracker('harvester');
		methods.creepTracker(role);
		
		//current = Role + Memory.harvesterTracker;
		numb = eval("Memory." + role + "Tracker;")
		
		current = role + numb;
		methods.determineSpawn(role, numb);
		//Game.creeps[current].memory.role = 'carrier';
		Game.creeps[current].memory.role = role;
		
		Game.creeps[current].memory.resourceGroup = Memory.resourceGroupTracker;
		Game.creeps[current].memory.inventoryLevel = "Empty";
		Game.creeps[current].memory.originRoom = "E19N7";
		//console.log('Current Harvester Number: ' + current);
	}

}
module.exports = {
spawnCreep
};
