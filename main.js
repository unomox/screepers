var roles = require("roles");
var Globals = require('globals');
var methods = require('methods')
var spawn = require('spawn')
var reports = require('reports')

module.exports.loop = function () {

	//move stuff
	methods.moveCreeps();
	
	//spawn stuff
	spawn.spawnCreep('harvester');
	spawn.spawnCreep('upgrader');
	spawn.spawnCreep('builder');
	spawn.spawnCreep('repairer');
	spawn.spawnCreep('attacker');
	
	//clean stuff
	methods.clearCreeps();
	//report
	//reports.primaryReport();

	
}