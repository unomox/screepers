var roleHarvester = {
		

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity && creep.memory.inventoryLevel == "Empty") {
            var sources = creep.room.find(FIND_SOURCES);
			//var sources = creep.room.find(FIND_SOURCES);

                if(creep.harvest(sources[creep.memory.resourceGroup]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[creep.memory.resourceGroup], {maxRooms: 1}, {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }

		else {
			creep.memory.inventoryLevel = "Full";
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {maxRooms: 1}, {visualizePathStyle: {stroke: '#66ff66'}});
				}
				if (creep.carry.energy == 0) {
						creep.memory.inventoryLevel = "Empty";
					}
            } else {
				//secondaryTargets = creep.pos.findNearest(FIND_STRUCTURES, {
				secondaryTargets = creep.room.find(FIND_STRUCTURES, {
				
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
					}
				});
				if(creep.transfer(secondaryTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(secondaryTargets[0], {maxRooms: 1}, {visualizePathStyle: {stroke: '#66ff66'}});
				}
				if (creep.carry.energy == 0) {
						creep.memory.inventoryLevel = "Empty";
					}
			}
        }
    }
};

module.exports = roleHarvester;