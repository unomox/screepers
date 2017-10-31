var roles = require("roles");
var Globals = require('globals');
var methods = require('methods')

function spawnCreep(role){
	var role = role;
	var Role = role.charAt(0).toUpperCase() + role.slice(1);
	
	const spawning = Game.spawns['Spawn1'].spawning;
	eval("var count = _(Game.creeps).filter({ memory: { role: \'" + role + "\' }}).size();");
	eval("var cap = Globals.g" + Role + "Cap;");
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

	if (count < cap && energyAvailable >= resourceCap && spawning == null) {
		methods.groupTracker();
		//methods.creepTracker('harvester');
		eval("methods.creepTracker(\'" + role + "\');");
		//current = Role + Memory.harvesterTracker;
		numb = eval("Memory." + role + "Tracker;")
		current = Role + numb;
		methods.determineSpawn(current);
		//Game.creeps[current].memory.role = 'harvester';
		eval("Game.creeps[current].memory.role = \'" + role + "\';")
		Game.creeps[current].memory.resourceGroup = Memory.resourceGroupTracker;
		Game.creeps[current].memory.inventoryLevel = "Empty";
		Game.creeps[current].memory.originRoom = "E19N8";
		//console.log('Current Harvester Number: ' + current);
	}
	
}
module.exports = {
spawnCreep
};
