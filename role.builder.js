var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#66ff66'}});
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.resourceGroup]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.resourceGroup], {visualizePathStyle: {stroke: '#ffff00'}});
            }
	    }
	}
};

module.exports = roleBuilder;