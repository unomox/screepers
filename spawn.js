var roles = require("roles");
var Globals = require('globals');
var methods = require('methods')

function spawnCreep(role){
	var role = role;
	
	//var Role = role.charAt(0).toUpperCase() + role.slice(1);
	
	const spawning = Game.spawns['Spawn1'].spawning;
	var count = 0;
	
	switch(role) {
			case 'harvester':
				count = _(Game.creeps).filter({ memory: { role: 'harvester' }}).size();
			break;
			case 'upgrader':
				count = _(Game.creeps).filter({ memory: { role: 'upgrader' }}).size();
			break;
			case 'builder':
				count = _(Game.creeps).filter({ memory: { role: 'builder' }}).size();
			break;
			case 'repairer':
				count = _(Game.creeps).filter({ memory: { role: 'repairer' }}).size();
			break;
			case 'attacker':
				count = _(Game.creeps).filter({ memory: { role: 'attacker' }}).size();
			break;
			case 'explorer':
                count = _(Game.creeps).filter({ memory: { role: 'explorer' }}).size();
            break;
			case 'reserver':
                count = _(Game.creeps).filter({ memory: { role: 'reserver' }}).size();
            break;
			default:
				count = (_(Game.creeps).filter({ memory: { role: '' }}).size());
		}
	

	
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
		//Game.creeps[current].memory.role = 'harvester';
		eval("Game.creeps[current].memory.role = \'" + role + "\';")
		if (Game.creeps[current].memory.role == 'explorer') {
			Game.creeps[current].memory.resourceGroup = 0;
		} else {
			Game.creeps[current].memory.resourceGroup = Memory.resourceGroupTracker;
		}
		Game.creeps[current].memory.inventoryLevel = "Empty";
		Game.creeps[current].memory.originRoom = "E19N8";
		//console.log('Current Harvester Number: ' + current);
	}
	
}
module.exports = {
spawnCreep
};
