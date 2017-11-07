/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('sfdg');
 * mod.thing == 'a thing'; // true
 */
const gharvesterCap = 4;
const gharvesterSuffix = {};
const gupgraderCap = 2;
const gupgraderSuffix = {};
const gbuilderCap = 0;
const gbuilderSuffix = {};
const grepairerCap = 0;
const grepairerSuffix = {};
const gattackerCap = 0;
const gattackerSuffix = {};
const gexplorerCap = 6;
const gexplorerSuffix = {};
const greserverCap = 2;
const greserverSuffix = {};
const gcarrierCap = 1;
const gcarrierSuffix = {};
var sourceTicker = 1;
var resourceIntensity= 2;
var gResourceTicker = {};

// sets the maximum energy that can be spent on spawns
var gResourceCap = 800;
//commits the maximum energy for spawns to memory.gResourcecap
Game.spawns['Spawn1'].memory.gResourceCap = gResourceCap;


module.exports = {
gharvesterCap,
gharvesterSuffix,
gupgraderCap,
gupgraderSuffix,
gbuilderCap,
gbuilderSuffix,
grepairerCap,
grepairerSuffix,
gattackerCap,
gattackerSuffix,
gexplorerCap,
gexplorerSuffix,
greserverCap,
greserverSuffix,
gcarrierCap,
gcarrierSuffix,
sourceTicker,
resourceIntensity,
gResourceTicker,
gResourceCap
};
