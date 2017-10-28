var roleHarvester = {
		

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);

                if(creep.harvest(sources[creep.memory.resourceGroup]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[creep.memory.resourceGroup], {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }

		else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#66ff66'}});
                }
            }
			else {
				creep.moveTo(targets[0]);
			}
        }
    }
};

module.exports = roleHarvester;