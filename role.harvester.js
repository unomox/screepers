var Globals = require('globals');
var roleHarvester = {
		

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            var x = Globals.sourceTicker;
            for (var i=0; i < sources.length; i++ ) {
                

                if ( i > 3 ){
                    x++;
                    Globals.sourceTicker++;
                }


                if(creep.harvest(sources[x]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[x]);
                }
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