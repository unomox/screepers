var roleAttacker = {
		
    /** @param {Creep} creep **/
    run: function(creep) {
    	var enemies = creep.room.find(Game.HOSTILE_CREEPS);
        if(enemies.length < 0) {
        	if(enemies[0] == ERR_NOT_IN_RANGE) {
                    creep.moveTo(enemies[0], {visualizePathStyle: {stroke: '#FF0000'}});
                }
            }

		else {
			creep.attack(enemies[0]);
        }
    }
};

module.exports = roleAttacker;
