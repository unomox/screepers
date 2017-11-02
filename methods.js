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
    }	
}

function groupTracker(){
	if (Memory.resourceGroupTracker == undefined){
	Memory.resourceGroupTracker = 0;
	}else{
	Memory.resourceGroupTracker++;
	}
	if (Memory.resourceGroupTracker == Globals.resourceIntensity){
		Memory.resourceGroupTracker = 0;
	}
}

function creepTracker(creepType){
	var creepType = "Memory." + creepType + 'Tracker';
	if (eval(creepType) == undefined){
		creeptype = creeptype + "=0;";
		eval(creeptype);
	}else{
		var creepType = creepType + '++';
		eval(creepType)
	}
}

function determineSpawn(currentRole) {
	var currentRole = currentRole;
	console.log(currentRole.replace(/[^a-zA-Z]+/g, ''));
	if(currentRole.replace(/[^a-zA-Z]+/g, '') == 'Attacker'){
		switch(Globals.gResourceCap) {
			case 350:
				Game.spawns['Spawn1'].spawnCreep( [TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE], currentRole);
			break;
			case 400:
				Game.spawns['Spawn1'].spawnCreep( [TOUGH, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK], currentRole);
			break;
			case 450:
				Game.spawns['Spawn1'].spawnCreep( [ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE], currentRole);
			break;
			case 550:
				Game.spawns['Spawn1'].spawnCreep( [ATTACK, ATTACK, MOVE, MOVE], currentRole);
			break;
			default:
				Game.spawns['Spawn1'].spawnCreep( [ATTACK, ATTACK, MOVE, MOVE], currentRole);
		}
	}else{
		switch(Globals.gResourceCap) {
			case 350:
				Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, CARRY, CARRY, CARRY, MOVE], currentRole);
			break;
			case 400:
				Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], currentRole);
			break;
			case 450:
			Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, CARRY, CARRY, MOVE, MOVE], currentRole);
			break;
			case 550:
				Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], currentRole);
			break;
			default:
				Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], currentRole);
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
determineSpawn,
clearCreeps,
};