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
const gUpgraderCap = 2;
const gUpgraderSuffix = {};
var sourceTicker = 1;
var resourceIntensity= 2;
var gResourceTicker = {};

module.exports = {
gHarvesterCap,
gHarvesterSuffix,
gUpgraderCap,
gUpgraderSuffix,
sourceTicker,
resourceIntensity,
gResourceTicker
};