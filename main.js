var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repair');
var Globals = require('globals');
 
// initialize global trackers
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

// creep tracking function
function creepTracker(creepType) {
	var creepType = creepType;
	
	switch(creepType) {
		case 'harvester':
			if (Memory.harvesterTracker == undefined){
				Memory.harvesterTracker = 0;
			}else{
				Memory.harvesterTracker++;
			}
        break;
		case 'upgrader':
				if (Memory.upgraderTracker == undefined){
					Memory.upgraderTracker = 0;
				}else{
					Memory.upgraderTracker++;
				}
		break;
		case 'builder':
				if (Memory.builderTracker == undefined){
					Memory.builderTracker = 0;
				}else{
					Memory.builderTracker++;
				}
		break;
		case 'repairer':
				if (Memory.repairerTracker == undefined){
					Memory.repairerTracker = 0;
				}else{
					Memory.repairerTracker++;
				}
		break;
		default:
			
	} 
	
}

// controls the spawn command based on the energy available and the current gResourceCap
function determineSpawn(currentRole) {
	var currentRole = currentRole;
	switch(Globals.gResourceCap) {
		case 350:
			Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, CARRY, MOVE], currentRole);
        break;
		case 400:
			Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, CARRY, MOVE, MOVE], currentRole);
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

//export roles
module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
        	roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
        	roleBuilder.run(creep);
        }		
		if(creep.memory.role == 'repairer') {
        	roleRepairer.run(creep);
        }		
    }

    //initialize energy level tracking variables
const resourceCap = Globals.gResourceCap;
var energyAvailable = 0;
var energyCapacity = 0;

energyCapacity += Game.spawns.Spawn1.energyCapacity;
	_.filter(Game.structures, function(structure){
		if (structure.structureType == STRUCTURE_EXTENSION){
			energyCapacity += structure.energyCapacity;
		}
	});

energyAvailable += Game.spawns.Spawn1.energy;
	_.filter(Game.structures, function(structure){
		if (structure.structureType == STRUCTURE_EXTENSION){
			energyAvailable += structure.energy;
		}
	});

//Check to see if something is spawning
const spawning = Game.spawns['Spawn1'].spawning;

//create harvester
var harvesterCount = _(Game.creeps).filter({ memory: { role: 'harvester' }}).size();
const harvesterCap = Globals.gHarvesterCap;
var currentHarvester = {};

if (harvesterCount < harvesterCap && energyAvailable >= resourceCap && spawning == null) {
	groupTracker();
	creepTracker('harvester');
	currentHarvester = 'Harvester' + Memory.harvesterTracker;
	determineSpawn(currentHarvester);
	Game.creeps[currentHarvester].memory.role = 'harvester';
	Game.creeps[currentHarvester].memory.resourceGroup = Memory.resourceGroupTracker;
	Game.creeps[currentHarvester].memory.inventoryLevel = "Empty";
	Game.creeps[currentHarvester].memory.originRoom = "E19N8";
	console.log('Current Harvester Number: ' + currentHarvester);
}

//create upgrader
const upgraderCount = _(Game.creeps).filter( { memory: { role: 'upgrader' } } ).size();
const upgraderCap = Globals.gUpgraderCap;
var currentUpgrader = {};

if (upgraderCount < upgraderCap && energyAvailable >= resourceCap && harvesterCount == Globals.gHarvesterCap && spawning == null) {
	groupTracker();
	creepTracker('upgrader');
	currentUpgrader = 'Upgrader' + Memory.upgraderTracker;
	determineSpawn(currentUpgrader);
	Game.creeps[currentUpgrader].memory.role = 'upgrader';
	Game.creeps[currentUpgrader].memory.resourceGroup = Memory.resourceGroupTracker;
	Game.creeps[currentUpgrader].memory.inventoryLevel = "Empty";
	Game.creeps[currentUpgrader].memory.originRoom = "First";
	console.log('Current Upgrader Number: ' + currentUpgrader);
}

//create builder
const builderCount = _(Game.creeps).filter( { memory: { role: 'builder' } } ).size();
const builderCap = Globals.gBuilderCap;
var currentBuilder = {};

if (builderCount < builderCap && energyAvailable >= resourceCap && harvesterCount == Globals.gHarvesterCap && upgraderCount == Globals.gUpgraderCap && spawning == null) {
	groupTracker();
	creepTracker('builder');
	currentBuilder = 'builder' + Memory.builderTracker;
	determineSpawn(currentBuilder);
	Game.creeps[currentBuilder].memory.role = 'builder';
	Game.creeps[currentBuilder].memory.resourceGroup = Memory.resourceGroupTracker;
	Game.creeps[currentBuilder].memory.inventoryLevel = "Empty";
	Game.creeps[currentBuilder].memory.originRoom = "First";
	console.log('Current builder Number: ' + currentBuilder);
}

// create repairer
const repairerCount = _(Game.creeps).filter( { memory: { role: 'repairer' } } ).size();
const repairerCap = Globals.gRepairerCap;
var currentRepairer = {};

if (repairerCount < repairerCap && energyAvailable >= resourceCap && harvesterCount == Globals.gHarvesterCap && upgraderCount == Globals.gUpgraderCap && builderCount == Globals.gBuilderCap && spawning == null) {
	groupTracker();
	creepTracker('repairer');
	currentRepairer = 'repairer' + Memory.repairerTracker;
	determineSpawn(currentRepairer);
	Game.creeps[currentRepairer].memory.role = 'repairer';
	Game.creeps[currentRepairer].memory.resourceGroup = Memory.resourceGroupTracker;
	Game.creeps[currentRepairer].memory.inventoryLevel = "Empty";
	Game.creeps[currentRepairer].memory.originRoom = "First";
	console.log('Current Repairer Number: ' + currentRepairer);
}

//clear dead creeps from memory
for(var i in Memory.creeps) {
    if(!Game.creeps[i]) {
        delete Memory.creeps[i];
    }
}

/* Console Messages area */
if (Memory.consoleTimer == undefined){
	Memory.consoleTimer = 0;
}else{
	Memory.consoleTimer++;
}
//       Set this number \   /  below to change the interval of messaging
if(Memory.consoleTimer >= 5) {
	console.log("[===============================================================================================================]");
console.log("[ Current Energy: " + energyAvailable + " | Current Resource Cap: " + energyCapacity + " | Global Resource Cap: " + Globals.gResourceCap + " 					]");
	console.log("[ Current Harvester Cap:   " + harvesterCap + " | Current Upgrader Cap:   " + upgraderCap + " | Current Builder Cap:   " + builderCap + " | Current Repairer Cap:   " + repairerCap + " ]");
	console.log("[ Current Harvester Count: " + harvesterCount + " | Current Upgrader Count: " + upgraderCount + " | Current Builder Count: " + builderCount + " | Current Repairer Count: " + repairerCount + " ]");
	console.log("[===============================================================================================================]");
	Memory.consoleTimer = 0;
}
	
}