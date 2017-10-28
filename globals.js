/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('sfdg');
 * mod.thing == 'a thing'; // true
 */
const gHarvesterCap = 3;
const gHarvesterSuffix = {};
const gUpgraderCap = 3;
const gUpgraderSuffix = {};
const gBuilderCap = 3;
const gBuilderSuffix = {};
var sourceTicker = 1;
var resourceIntensity= 2;
var gResourceTicker = {};

module.exports = {
gHarvesterCap,
gHarvesterSuffix,
gUpgraderCap,
gUpgraderSuffix,
gBuilderCap,
gBuilderSuffix,
sourceTicker,
resourceIntensity,
gResourceTicker
};