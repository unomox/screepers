var Globals = require('globals');
var roles = require('roles')

function moveCreeps(){
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roles.roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
        	roles.roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
        	roles.roleBuilder.run(creep);
        }		
		if(creep.memory.role == 'repairer') {
        	roles.roleRepairer.run(creep);
        }
		if(creep.memory.role == 'attacker') {
        	roles.roleAttacker.run(creep);
        }	
		if(creep.memory.role == 'explorer') {
        	roles.roleExplorer.run(creep);
        }
		if(creep.memory.role == 'reserver') {
        	roles.roleReserver.run(creep);
        }
		if(creep.memory.role == 'carrier') {
        	roles.roleCarrier.run(creep);
        }		
    }	
}

function groupTracker(){
	if (Memory.resourceGroupTracker == undefined){
	Memory.resourceGroupTracker = 0;
	}else{
	Memory.resourceGroupTracker++;
	if (Memory.resourceGroupTracker == Globals.resourceIntensity){
		Memory.resourceGroupTracker = 0;
	}
	}
}

function creepTracker(creepType){
	var creepType = "Memory." + creepType + 'Tracker';
	//console.log(creepType);
	if (eval(creepType) == undefined){
		creeptype = 0;
	}else{
		var creepType = creepType + '++';
		eval(creepType)
	}
}

function defendRoom(roomName) {
    var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);/*, {
                    filter: (creeps) => {
                        return creeps.owner != 'Shadostorm' || creeps.owner != 'm0x';
                    }
            });*/
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
		//if ($username != 'm0x' || $username != 'Shadostorm'){
			Game.notify('User ${username} spotted in room ${roomName}');
			var towers = Game.rooms[roomName].find(
				FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
			towers.forEach(tower => tower.attack(hostiles[0]));
		//}
	}
}

function repairRoom(roomName) {
	
		var hpCap = 50000;
		var towers = Game.rooms[roomName].find(
				FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
		var SR = Game.rooms[roomName].find(FIND_STRUCTURES, {
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
		var woundedCreeps = Game.rooms[roomName].find( FIND_MY_CREEPS, { filter: (creep) => {return ( creep.hits < creep.hitsMax ); } } );
		
		towers.forEach(tower => tower.repair(SR[0]));
		towers.forEach(tower => tower.heal(woundedCreeps[0]));
		//if(SR.hits < SR.hitsMax) {
}

/*function transferEnergy(energyTarget) {
	
	if(creep.transfer(energyTarget[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
		creep.moveTo(energyTarget[0], {maxRooms: 3}, {visualizePathStyle: {stroke: '#66ff66'}});
	}
	if (creep.carry.energy == 0) {
		creep.memory.inventoryLevel = "Empty";
	}
}*/

function determineSpawn(currentRole, currentNum) {
	var currentRole = currentRole;
	var currentNum = currentNum;
	var creepName = currentRole + currentNum;
	//console.log(currentRole.replace(/[^a-zA-Z]+/g, ''));
	if(currentRole == 'attacker'){
		switch(Globals.gResourceCap) {
			case 350:
				Game.spawns['Spawn1'].spawnCreep( [TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE], creepName);
			break;
			case 400:
				Game.spawns['Spawn1'].spawnCreep( [TOUGH, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK], creepName);
			break;
			case 450:
				Game.spawns['Spawn1'].spawnCreep( [ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE], creepName);
			break;
			case 550:
				Game.spawns['Spawn1'].spawnCreep( [ATTACK, ATTACK, MOVE, MOVE], creepName);
			break;
			case 800:
				Game.spawns['Spawn1'].spawnCreep( [ATTACK, ATTACK, MOVE, MOVE], creepName);
			break;
			case 1100:
                Game.spawns['Spawn1'].spawnCreep( [RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE], creepName);
            break;
			default:
				Game.spawns['Spawn1'].spawnCreep( [ATTACK, ATTACK, MOVE, MOVE], creepName);
		}
	}else{
		switch(Globals.gResourceCap) {
			case 350:
				Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, CARRY, CARRY, CARRY, MOVE], creepName);
			break;
			case 400:
				Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], creepName);
			break;
			case 450:
				Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, CARRY, CARRY, MOVE, MOVE], creepName);
			break;
			case 550:
				Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], creepName);
			break;
			case 800:
				if (currentRole == 'explorer') {
                	Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], creepName);
				} else {
					if (currentRole == 'reserver') {
						Game.spawns['Spawn1'].spawnCreep( [CLAIM, MOVE, MOVE, MOVE, MOVE], creepName);
					} else {
						if (currentRole == 'carrier') {
							Game.spawns['Spawn1'].spawnCreep( [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], creepName);
						} else {
							Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], creepName);
							}
						}
				}
            break;
			case 1000:
				if (currentRole == 'explorer') {
                	Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], creepName);
				} else {
					if (currentRole == 'reserver') {
                	Game.spawns['Spawn1'].spawnCreep( [CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], creepName);
					} else {
						Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], creepName);
					}
				}
            break;
			case 1100:
				if (currentRole == 'explorer') {
                	Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], creepName);
				} else {
					if (currentRole == 'reserver') {
                	Game.spawns['Spawn1'].spawnCreep( [CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], creepName);
					} else {
						Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], creepName);
					}
				}
            break;
			default:
				Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], creepName);
		}
	}
}

function capTracker(){

	
}


//clear dead creeps from memory
function clearCreeps(){
	for(var i in Memory.creeps) {
		if(!Game.creeps[i]) {
			delete Memory.creeps[i];
		}
	}
}
module.exports = {
moveCreeps,
groupTracker,
creepTracker,
defendRoom,
repairRoom,
//transferEnergy,
determineSpawn,
clearCreeps
};