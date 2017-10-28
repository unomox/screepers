var Globals = require('globals');
var roleHarvester = {
		

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);

                if(creep.harvest(sources[creep.memory.resourceGroup]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[creep.memory.resourceGroup]);
                }
            }

		else if(Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
    }
};

module.exports = roleHarvester;