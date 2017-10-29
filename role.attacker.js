var roleAttacker = {
		

    /** @param {Creep} creep **/
    run: function(creep) {
    	
        if(enemies.length < 0) {
        	var attacker = Game.creeps.Attacker1;
        	var enemies = attacker.room.find(Game.HOSTILE_CREEPS);
        	
        	if(enemies[0] == ERR_NOT_IN_RANGE) {
                    creep.moveTo(enemies[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }

		else {
			attacker.attack(enemies[0]);
        }
    }
};

module.exports = roleAttacker;
