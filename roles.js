//var methods = require('methods');
var allies = require('allies');

//Harvester

var roleHarvester = {
    
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity && creep.memory.inventoryLevel == "Empty") {
            var sources = creep.room.find(FIND_SOURCES);
			//var sources = creep.pos.findClosestByRange(FIND_SOURCES);

                if(creep.harvest(sources[creep.memory.resourceGroup]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[creep.memory.resourceGroup], {maxRooms: 3}, {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }

		else {
			creep.memory.inventoryLevel = "Full";
			/*
			// search for Spawn or extensions to dump energy
            var targets = creep.room.find(FIND_STRUCTURES, {
				//var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
					return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
				}});
				
            if(targets.length > 0) {
                //methods.transferEnergy(targets[0]);
				if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {maxRooms: 3}, {visualizePathStyle: {stroke: '#66ff66'}});
				}
				if (creep.carry.energy == 0) {
						creep.memory.inventoryLevel = "Empty";
					}
            } else {
				// search for towers and containers/storage to dump energy
				var towers = Game.rooms["E19N8"].find(FIND_MY_STRUCTURES, {
					filter: (tower) => {
						return (tower.structureType == STRUCTURE_TOWER) && tower.energy < tower.energyCapacity;
						}});
				if(towers.length > 0) {
					if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(towers[0], {maxRooms: 3}, {visualizePathStyle: {stroke: '#66ff66'}});
					}
					if (creep.carry.energy == 0) {
							creep.memory.inventoryLevel = "Empty";
					}
				} else {
					*/
					//secondaryTargets = creep.room.find(FIND_STRUCTURES, {
					var secondaryTargets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
					}});
					if(creep.transfer(secondaryTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(secondaryTargets[0], {maxRooms: 3}, {visualizePathStyle: {stroke: '#66ff66'}});
					}
					if (creep.carry.energy == 0) {
							creep.memory.inventoryLevel = "Empty";
					}
				}
				//if(creep.transfer(secondaryTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //    creep.moveTo(secondaryTargets[0], {maxRooms: 3}, {visualizePathStyle: {stroke: '#66ff66'}});
				//}
			}
        //}
    //}
};



/*
var roleHarvester = {
	run: function(creep) {
		let room = creep.room;
		let mineableSources = [];
		for(let source of room.find(FIND_SOURCES)) {
			let creepCount = 0;
				for(let creep of room.find(FIND_MY_CREEPS)) {
					if(creep.memory.harvestTarget === source.id) {
						creepCount++;
					}
				}
			if(creepCount < 2) {
			mineableSources.push(source);
			}
		}
		if(mineableSources.length > 0) {
			creep.memory.harvestTarget = creep.pos.findClosestByPath(mineableSources).id;
		}  
	}
};
*/

var roleExplorer = {
    /** @param {Creep} creep **/
    run: function(creep) {
		var room = creep.room['E19N9'];
		var posInAnotherRoom = new RoomPosition(35, 48, 'E19N9');
		var posInOriginRoom = new RoomPosition(35, 15, 'E19N8');
		var originRoom = '[room E19N8]';
		
        if(creep.carry.energy < creep.carryCapacity && creep.memory.inventoryLevel == "Empty") {
            if (creep.room == originRoom) {
				creep.moveTo(posInAnotherRoom, {maxRooms: 3}, {visualizePathStyle: {stroke: '#ffff00'}});
			} else {
				var sources = creep.room.find(FIND_SOURCES);
			    if(creep.harvest(sources[creep.memory.resourceGroup]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[creep.memory.resourceGroup], {maxRooms: 3}, {visualizePathStyle: {stroke: '#ffff00'}});
                }
			}
        } else {
			creep.memory.inventoryLevel = "Full";
			if (creep.room != originRoom) {
				creep.moveTo(posInOriginRoom, {maxRooms: 3}, {visualizePathStyle: {stroke: '#ffff00'}});
			} else {
					// search for towers and containers/storage to dump energy
				var secondaryTargets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
				}});
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

var roleReserver = {
    /** @param {Creep} creep **/
    run: function(creep) {
		var room = creep.room['E19N9'];
		var posInAnotherRoom = new RoomPosition(35, 48, 'E19N9');
		var posInLeftRoom = new RoomPosition(35, 48, 'E18N8');
		var posInOriginRoom = new RoomPosition(35, 15, 'E19N8');
		var originRoom = '[room E19N8]';
		
		var controllerTwo = Game.rooms['E19N9'].controller;
			
		//if (creep.memory.resourceGroup == 0) {
			if(creep.reserveController(controllerTwo) == ERR_NOT_IN_RANGE) {	
				creep.moveTo(controllerTwo, {maxRooms: 3}, {visualizePathStyle: {stroke: '#66ff66'}});
			}
		//} else {
		//	var controllerThree = Game.rooms['E18N8'].controller;
				
		//		creep.moveTo(controllerThree, {maxRooms: 3}, {visualizePathStyle: {stroke: '#66ff66'}});
			//}
		//}
		
/*        if (creep.room == originRoom) {
			creep.moveTo(posInAnotherRoom, {maxRooms: 3}, {visualizePathStyle: {stroke: '#ffff00'}});
		} else {
			if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller, {maxRooms: 3}, {visualizePathStyle: {stroke: '#66ff66'}});
			}
	}
		//if (creep.room != originRoom) {
		//	creep.moveTo(posInOriginRoom, {maxRooms: 3}, {visualizePathStyle: {stroke: '#ffff00'}});
*/		//}
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
		//var sources = creep.room.find(FIND_SOURCES);
		var sources = creep.room.find(FIND_STRUCTURES, {
							filter: (structure) => {
							return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] > structure.storeCapacity;
							}});
						if(creep.transfer(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
							creep.moveTo(sources[0], {maxRooms: 3}, {visualizePathStyle: {stroke: '#66ff66'}});
						}
        //var spwn = creep.pos.findClosest(FIND_MY_SPAWNS);
		//if(creep.harvest(sources[creep.memory.resourceGroup]) == ERR_NOT_IN_RANGE) {
		//	creep.moveTo(sources[creep.memory.resourceGroup], {visualizePathStyle: {stroke: '#ffff00'}});
        //}
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
				if(object.hits < hpCap && object.hits != object.hitsMax) {
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

var roleCarrier = {
	    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity && creep.memory.inventoryLevel == "Empty") {
            //var sources = creep.room.find(FIND_SOURCES);
			
            var sources = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] > 0;
						//return (structure.structureType == STRUCTURE_STORAGE) && structure.energy != 0;
				}
				});
				//console.log('Carrier Sources: ' + sources.length);
				if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {maxRooms: 1}, {visualizePathStyle: {stroke: '#66ff66'}});
				}
		}
		else {
			creep.memory.inventoryLevel = "Full";
			
			//var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
				var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
			
			var sortedTargets = _.sortBy(targets, s => creep.pos.getRangeTo(s))
			
            if(targets.length) {
				//console.log('finding main targets');
                if(creep.transfer(sortedTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sortedTargets[0], {maxRooms: 1}, {visualizePathStyle: {stroke: '#66ff66'}});
				}
				if (creep.carry.energy == 0) {
						creep.memory.inventoryLevel = "Empty";
					}
            } else {
				//secondaryTargets = creep.pos.findNearest(FIND_STRUCTURES, {
				
				secondaryTargets = creep.room.find(FIND_STRUCTURES, {
				
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
					}
				});
				//console.log('towers: ' + secondaryTargets.length);
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

//Attacker
var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {
    var posInAnotherRoom = new RoomPosition(35, 17, 'E19N8');
	var posInLeftRoom = new RoomPosition(48, 35, 'E18N8');
	
	
    //creep.moveTo(posInLeftRoom);
	var targets = creep.room.find(FIND_HOSTILE_SPAWNS);
	//var targets = creep.pos.find(FIND_HOSTILE_SPAWNS);
	
	if(targets.length > 0) {
	if(creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0]);
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
roleExplorer,
roleUpgrader,
roleBuilder,
roleRepairer,
roleAttacker,
roleClaimer,
roleReserver,
roleCarrier
};

