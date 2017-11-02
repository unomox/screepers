var roles = require("roles");
var Globals = require('globals');
var methods = require('methods')
var spawn = require('spawn')
var reports = require('reports')

module.exports.loop = function () {

	//move stuff
	methods.moveCreeps();

	//spawn stuff
	if(_(Game.creeps).filter({ memory: { role: 'harvester' }}).size() < Globals.gHarvesterCap){
	spawn.spawnCreep('harvester');
	}else {
		if (_(Game.creeps).filter({ memory: { role: 'upgrader' }}).size() < Globals.gUpgraderCap){
		spawn.spawnCreep('upgrader');
		}else {
			if(_(Game.creeps).filter({ memory: { role: 'builder' }}).size() < Globals.gBuilderCap){
			spawn.spawnCreep('builder');
			}else{
				if(_(Game.creeps).filter({ memory: { role: 'repairer' }}).size() < Globals.gRepairerCap){
				spawn.spawnCreep('repairer');	
				}else{
					if(_(Game.creeps).filter({ memory: { role: 'attacker' }}).size() < Globals.gAttackerCap){
					spawn.spawnCreep('attacker');	
					}
				}
			}
		}
	}
	
	
	//if (_(Game.creeps).filter({ memory: { role: 'builder' }}).size() == Globals.gBuilderCap){
	//	spawn.spawnCreep('repairer');
	//}
	//if (_(Game.creeps).filter({ memory: { role: 'builder' }}).size() == Globals.gBuilderCap){
	//	spawn.spawnCreep('attacker');
	//}
	//clean stuff
	methods.clearCreeps();
	//report
	//reports.primaryReport();
}
