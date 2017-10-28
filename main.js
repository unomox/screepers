var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var Globals = require('globals');

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

function harvesterTracker(){
	if (Memory.harvesterTracker == undefined){
	Memory.harvesterTracker = 0;
	}else{
	Memory.harvesterTracker++;
	}
}

function upgraderTracker(){
	if (Memory.upgraderTracker == undefined){
	Memory.upgraderTracker = 0;
	}else{
	Memory.upgraderTracker++;
	}
}

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
        	roleUpgrader.run(creep);
        }
    }
}

const harvesterCount = _(Game.creeps).filter( { memory: { role: 'harvester' } } ).size();
const harvesterCap = Globals.gHarvesterCap;
//const harvesterSuffix = Math.floor(Math.random() * 999);
var currentHarvester = {};

if (harvesterCount < harvesterCap && (Game.spawns['Spawn1'].energy) >= 200) {
	groupTracker();
	harvesterTracker();
	currentHarvester = 'Harvester' + Memory.harvesterTracker;
	Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], currentHarvester);
	Game.creeps[currentHarvester].memory.role = 'harvester';
	Game.creeps[currentHarvester].memory.resourceGroup = Memory.resourceGroupTracker;
	console.log('Current Harvester Number: ' + currentHarvester);
}

const upgraderCount = _(Game.creeps).filter( { memory: { role: 'upgrader' } } ).size();
const upgraderCap = Globals.gUpgraderCap;
//const upgraderSuffix = Math.floor(Math.random() * 999);
var currentUpgrader = {};

if (upgraderCount < upgraderCap && (Game.spawns['Spawn1'].energy) >= 200 && harvesterCount == Globals.gHarvesterCap) {
	groupTracker();
	upgraderTracker();
	currentUpgrader = 'Upgrader' + Memory.upgraderTracker;
	Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], currentUpgrader);
	Game.creeps[currentUpgrader].memory.role = 'upgrader';
	Game.creeps[currentUpgrader].memory.resourceGroup = Memory.resourceGroupTracker;
	console.log('Current Upgrader Number: ' + currentUpgrader);
}