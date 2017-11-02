function primaryReport(){
	if (Memory.consoleTimer == undefined){
		Memory.consoleTimer = 0;
	}else{
		Memory.consoleTimer++;
	}
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
	//       Set this number \   /  below to change the interval of messaging
	if(Memory.consoleTimer >= 30) {
		console.log("[===============================================================================================================]");
		console.log("[ Current Energy: " + energyAvailable + " | Current Resource Cap: " + energyCapacity + " | Global Resource Cap: " + Globals.gResourceCap + " 					]");
		console.log("[ Current Harvester Cap:   " + harvesterCap + " | Current Upgrader Cap:   " + upgraderCap + " | Current Builder Cap:   " + builderCap + " | Current Repairer Cap:   " + repairerCap + " ]");
		console.log("[ Current Harvester Count: " + harvesterCount + " | Current Upgrader Count: " + upgraderCount + " | Current Builder Count: " + builderCount + " | Current Repairer Count: " + repairerCount + " ]");
		console.log("[===============================================================================================================]");
		Memory.consoleTimer = 0;
	}
}

module.exports = {
primaryReport
};