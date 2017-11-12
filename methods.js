var Globals = require('globals');
var roles = require('roles');
var profiles = require('profiles');

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
        if(creep.memory.role == 'claimer') {
            roles.roleClaimer.run(creep);
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
	if (eval(creepType) == undefined){
		creeptype = 0;
	}else{
		var creepType = creepType + '++';
		eval(creepType)
	}
}

function defendRoom(roomName) {
    var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
			Game.notify('User ${username} spotted in room ${roomName}');
			var towers = Game.rooms[roomName].find(
				FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
			towers.forEach(tower => tower.attack(hostiles[0]));
	}
}

function repairRoom(roomName) {
		var hpCap = 50000;
		var towers = Game.rooms[roomName].find(
				FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
		var SR = Game.rooms[roomName].find(FIND_STRUCTURES, {
			filter: function(object){
				if(object.hits < hpCap && object.hits != object.hitsMax) {
                    return true;
				}

			}
		});
		var woundedCreeps = Game.rooms[roomName].find( FIND_MY_CREEPS, { filter: (creep) => {return ( creep.hits < creep.hitsMax ); } } );

		towers.forEach(tower => tower.repair(SR[0]));
		towers.forEach(tower => tower.heal(woundedCreeps[0]));
}

function determineSpawn(currentRole, currentNum) {
	
	var currentRole = currentRole;
	var currentNum = currentNum;
	var creepName = currentRole + currentNum;
	var profile = eval("profiles.tier" + Globals.tier + "Profiles");
	
	var arrayLength = profile.length;
	for (var i = 0; i < arrayLength; i++) {;
		var num = profile[i][0];
		if (num == currentRole){
			var prof = profile[i][1];
			eval("Game.spawns['Spawn1'].spawnCreep( " + prof + "\, '" + creepName + "');");
		}
	}
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
