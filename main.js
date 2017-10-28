var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repair');
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

function builderTracker(){
	if (Memory.builderTracker == undefined){
	Memory.builderTracker = 0;
	}else{
	Memory.builderTracker++;
	}
}

function repairerTracker(){
	if (Memory.repairerTracker == undefined){
	Memory.repairerTracker = 0;
	}else{
	Memory.repairerTracker++;
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
        if(creep.memory.role == 'builder') {
        	roleBuilder.run(creep);
        }		
		if(creep.memory.role == 'repairer') {
        	roleRepairer.run(creep);
        }		
    }


const harvesterCount = _(Game.creeps).filter( { memory: { role: 'harvester' } } ).size();
const harvesterCap = Globals.gHarvesterCap;
//const harvesterSuffix = Math.floor(Math.random() * 999);
var currentHarvester = {};

if (harvesterCount < harvesterCap && (Game.spawns['Spawn1'].energy) >= 250) {
	groupTracker();
	harvesterTracker();
	currentHarvester = 'Harvester' + Memory.harvesterTracker;
	Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE, MOVE], currentHarvester);
	Game.creeps[currentHarvester].memory.role = 'harvester';
	Game.creeps[currentHarvester].memory.resourceGroup = Memory.resourceGroupTracker;
	console.log('Current Harvester Number: ' + currentHarvester);
}

const upgraderCount = _(Game.creeps).filter( { memory: { role: 'upgrader' } } ).size();
const upgraderCap = Globals.gUpgraderCap;
//const upgraderSuffix = Math.floor(Math.random() * 999);
var currentUpgrader = {};

if (upgraderCount < upgraderCap && (Game.spawns['Spawn1'].energy) >= 250 && harvesterCount == Globals.gHarvesterCap) {
	groupTracker();
	upgraderTracker();
	currentUpgrader = 'Upgrader' + Memory.upgraderTracker;
	Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE, MOVE], currentUpgrader);
	Game.creeps[currentUpgrader].memory.role = 'upgrader';
	Game.creeps[currentUpgrader].memory.resourceGroup = Memory.resourceGroupTracker;
	Game.creeps[currentUpgrader].memory.inventoryLevel = "Empty";
	console.log('Current Upgrader Number: ' + currentUpgrader);
}

const builderCount = _(Game.creeps).filter( { memory: { role: 'builder' } } ).size();
const builderCap = Globals.gBuilderCap;
//const builderSuffix = Math.floor(Math.random() * 999);
var currentBuilder = {};

//console.log("builderCount: " + builderCount + ", Globals.gBuilderCap: " + Globals.gBuilderCap);
//console.log("harvesterCount: " + harvesterCount + ", Globals.gHarvesterCap: " + Globals.gHarvesterCap);
//console.log("upgraderCount: " + upgraderCount + ", Globals.gUpgraderCap: " + Globals.gUpgraderCap);

if (builderCount < builderCap && (Game.spawns['Spawn1'].energy) >= 250 && harvesterCount == Globals.gHarvesterCap && upgraderCount == Globals.gUpgraderCap) {
	groupTracker();
	builderTracker();
	currentBuilder = 'builder' + Memory.builderTracker;
	Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE, MOVE], currentBuilder);
	Game.creeps[currentBuilder].memory.role = 'builder';
	Game.creeps[currentBuilder].memory.resourceGroup = Memory.resourceGroupTracker;
	Game.creeps[currentBuilder].memory.inventoryLevel = "Empty";
	console.log('Current builder Number: ' + currentBuilder);
}

const repairerCount = _(Game.creeps).filter( { memory: { role: 'repairer' } } ).size();
const repairerCap = Globals.gRepairerCap;
//const repairerSuffix = Math.floor(Math.random() * 999);
var currentRepairer = {};

//console.log("repairerCount: " + repairerCount + ", Globals.gRepairerCap: " + Globals.gRepairerCap);
//console.log("harvesterCount: " + harvesterCount + ", Globals.gHarvesterCap: " + Globals.gHarvesterCap);
//console.log("upgraderCount: " + upgraderCount + ", Globals.gUpgraderCap: " + Globals.gUpgraderCap);

if (repairerCount < repairerCap && (Game.spawns['Spawn1'].energy) >= 250 && harvesterCount == Globals.gHarvesterCap && upgraderCount == Globals.gUpgraderCap && builderCount == Globals.gBuilderCap) {
	groupTracker();
	repairerTracker();
	currentRepairer = 'repairer' + Memory.repairerTracker;
	Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE, MOVE], currentRepairer);
	Game.creeps[currentRepairer].memory.role = 'repairer';
	Game.creeps[currentRepairer].memory.resourceGroup = Memory.resourceGroupTracker;
	Game.creeps[currentRepairer].memory.inventoryLevel = "Empty";
	console.log('Current Repairer Number: ' + currentRepairer);
}

}