var roles = require("roles");
var Globals = require('globals');
var methods = require('methods')
var spawn = require('spawn')
var reports = require('reports')

module.exports.loop = function () {

	//move stuff
	methods.moveCreeps();
	methods.defendRoom('E19N7');
//spawn stuff

    if(_(Game.creeps).filter({ memory: { role: 'harvester' }}).size() < Globals.gharvesterCap){
    spawn.spawnCreep('harvester');

    }else {
        if (_(Game.creeps).filter({ memory: { role: 'carrier' }}).size() < Globals.gcarrierCap){
        spawn.spawnCreep('carrier');
        }else {
        if (_(Game.creeps).filter({ memory: { role: 'upgrader' }}).size() < Globals.gupgraderCap){
        spawn.spawnCreep('upgrader');
        }else {
            if(_(Game.creeps).filter({ memory: { role: 'builder' }}).size() < Globals.gbuilderCap){
            spawn.spawnCreep('builder');
            }else{
                if(_(Game.creeps).filter({ memory: { role: 'repairer' }}).size() < Globals.grepairerCap){
                spawn.spawnCreep('repairer');
                }else{
                    if(_(Game.creeps).filter({ memory: { role: 'attacker' }}).size() < Globals.gattackerCap){
                    spawn.spawnCreep('attacker');
                    }else{
                        if(_(Game.creeps).filter({ memory: { role: 'explorer' }}).size() < Globals.gexplorerCap){
                        spawn.spawnCreep('explorer');
                        } else {
                            if(_(Game.creeps).filter({ memory: { role: 'reserver' }}).size() < Globals.greserverCap){
                            spawn.spawnCreep('reserver');
                            }else{
                            	if(_(Game.creeps).filter({ memory: { role: 'claimer' }}).size() < Globals.gclaimerCap){
                            	spawn.spawnCreep('claimer');
                            }
                        }
                        }

                    }
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
