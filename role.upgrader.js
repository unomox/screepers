var roleUpgrader = {

	
	    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity && creep.memory.inventoryLevel == "Empty") {
            var sources = creep.room.find(FIND_SOURCES);
			
            if(creep.harvest(sources[creep.memory.resourceGroup]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.resourceGroup], {maxRooms: 1}, {visualizePathStyle: {stroke: '#ffff00'}});
            }
        }
        else {
			creep.memory.inventoryLevel = "Full";
			if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller, {maxRooms: 1}, {visualizePathStyle: {stroke: '#66ff66'}});
			}
			else {
				creep.upgradeController(creep.room.controller);
				if (creep.carry.energy == 0) {
					creep.memory.inventoryLevel = "Empty";
				}
			}
        }
    }
};

module.exports = roleUpgrader;