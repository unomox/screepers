/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('sfdg');
 * mod.thing == 'a thing'; // true
 */
const gHarvesterCap = 4;
const gHarvesterSuffix = {};
const gUpgraderCap = 3;
const gUpgraderSuffix = {};
const gBuilderCap = 5;
const gBuilderSuffix = {};
const gRepairerCap = 1;
const gRepairerSuffix = {};
var sourceTicker = 1;
var resourceIntensity= 2;
var gResourceTicker = {};
var gResourceCap = 50;
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
sourceTicker,
resourceIntensity,
gResourceTicker,
gResourceCap
};