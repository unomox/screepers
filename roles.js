var allies = require('allies');
//Harvester
var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity && creep.memory.inventoryLevel == "Empty") {
            var sources = creep.room.find(FIND_SOURCES);
			//var sources = creep.room.find(FIND_SOURCES);

                if(creep.harvest(sources[creep.memory.resourceGroup]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[creep.memory.resourceGroup], {maxRooms: 3}, {visualizePathStyle: {stroke: '#ffff00'}});
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
                    creep.moveTo(targets[0], {maxRooms: 3}, {visualizePathStyle: {stroke: '#66ff66'}});
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
                    creep.moveTo(secondaryTargets[0], {maxRooms: 3}, {visualizePathStyle: {stroke: '#66ff66'}});
				}
				if (creep.carry.energy == 0) {
						creep.memory.inventoryLevel = "Empty";
					}
			}
        }
    }
};
//Upgrader
var roleUpgrader = {


	    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity && creep.memory.inventoryLevel == "Empty") {
            var sources = creep.room.find(FIND_SOURCES);

            if(creep.harvest(sources[creep.memory.resourceGroup]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.resourceGroup], {maxRooms: 3}, {visualizePathStyle: {stroke: '#ffff00'}});
            }
        }
        else {
			creep.memory.inventoryLevel = "Full";
			if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller, {maxRooms: 3}, {visualizePathStyle: {stroke: '#66ff66'}});
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
//Builder
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
            //console.log(currentRoom);
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.resourceGroup]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.resourceGroup], {maxRooms: 3}, {visualizePathStyle: {stroke: '#ffff00'}});
            }
            
	    }
	}
};
//Repair
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
		var hpCap = 50000;
		var SR = creep.room.find(FIND_STRUCTURES, {
		//var SR = creep.pos.findClosestbyPath(FIND_STRUCTURES, {
		//var SR = creep.pos.findClosest(FIND_STRUCTURES, {
			filter: function(object){
				//if(object.structureType != STRUCTURE_ROAD ) {
				//	return false;
				//}
				//if(object.hits > object.hitsMax / 3) {
				if(object.hits < hpCap && object.hitsMax < hpCap) {
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
//Attacker
var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {
    var posInAnotherRoom = new RoomPosition(35, 45, 'E19N7');
    creep.moveTo(posInAnotherRoom);
	var targets = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                    filter: (creeps) => {
                        return creeps.owner != 'Shadostorm' || creeps.owner != 'm0x';
                    }
            });

	if(target) {
		if(creep.attack(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
		}
	}
    }
};

var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
    var posInAnotherRoom = new RoomPosition(35, 45, 'E18N7');
    creep.moveTo(posInAnotherRoom);
    const target = creep.room.controller;
    if(target) {
        if(creep.claim(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
        }
    }
    }
};
module.exports = {
roleHarvester,
roleUpgrader,
roleBuilder,
roleRepairer,
roleAttacker,
roleClaimer
};

