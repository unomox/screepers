var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
	
	if(creep.carry.energy == 0 && creep.memory.inventoryLevel == "Full") {
		creep.memory.inventoryLevel = "Empty";
	}
		
	if(creep.carry.energy < creep.carryCapacity && creep.memory.inventoryLevel == "Empty") {
		var sources = creep.room.find(FIND_SOURCES);
        //var spwn = creep.pos.findClosest(FIND_MY_SPAWNS);
		if(creep.harvest(sources[creep.memory.resourceGroup]) == ERR_NOT_IN_RANGE) {
			creep.moveTo(sources[creep.memory.resourceGroup], {visualizePathStyle: {stroke: '#ffff00'}});
        }
	} else{
		creep.memory.inventoryLevel = "Full";
		var SR = creep.room.find(FIND_STRUCTURES, {
		//var SR = creep.pos.findClosestbyPath(FIND_STRUCTURES, {
		//var SR = creep.pos.findClosest(FIND_STRUCTURES, {
			filter: function(object){
				//if(object.structureType != STRUCTURE_ROAD ) {
				//	return false;
				//}
				//if(object.hits > object.hitsMax / 3) {
				if(object.hits < object.hitsMax) {
                    return true;
				}
                
			} 
		});
		//if(SR.hits < SR.hitsMax) {
		if(SR.length) {
			if(creep.repair(SR[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(SR[0], {visualizePathStyle: {stroke: '#ffff00'}});
				creep.repair(SR);
				if (creep.carry.energy == 0) {
					creep.memory.inventoryLevel = "Empty";
				}
			}
		} else {
			var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#66ff66'}});
					if (creep.carry.energy == 0) {
					creep.memory.inventoryLevel = "Empty";
					}
                }
            }
		}
		
	} 
    }
};

module.exports = roleRepairer;

