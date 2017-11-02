/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('sfdg');
 * mod.thing == 'a thing'; // true
 */
const gHarvesterCap = 2;
const gHarvesterSuffix = {};
const gUpgraderCap = 2;
const gUpgraderSuffix = {};
const gBuilderCap = 2;
const gBuilderSuffix = {};
const gRepairerCap = 1;
const gRepairerSuffix = {};
const gAttackerCap = 0;
const gAttackerSuffix = {};
var sourceTicker = 1;
var resourceIntensity= 1;
var gResourceTicker = {};

// sets the maximum energy that can be spent on spawns
var gResourceCap = 350;
//commits the maximum energy for spawns to memory.gResourcecap
Game.spawns['Spawn1'].memory.gResourceCap = gResourceCap;


module.exports = {
gHarvesterCap,
gHarvesterSuffix,
gUpgraderCap,
gUpgraderSuffix,
gBuilderCap,
gBuilderSuffix,
gRepairerCap,
gRepairerSuffix,
gAttackerCap,
gAttackerSuffix,
sourceTicker,
resourceIntensity,
gResourceTicker,
gResourceCap
};
