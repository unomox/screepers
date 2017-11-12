/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('sfdg');
 * mod.thing == 'a thing'; // true
 */
const tier = 2;
const gharvesterCap = 4;
const gharvesterSuffix = {};
const gupgraderCap = 3;
const gupgraderSuffix = {};
const gbuilderCap = 0;
const gbuilderSuffix = {};
const grepairerCap = 1;
const grepairerSuffix = {};
const gattackerCap = 2;
const gattackerSuffix = {};
const gexplorerCap = 6;
const gexplorerSuffix = {};
const greserverCap = 1;
const greserverSuffix = {};
const gcarrierCap = 3;
const gcarrierSuffix = {};
const gclaimerCap = 0;
const gclaimerSuffix = {};
var sourceTicker = 1;
var resourceIntensity= 1;
var gResourceTicker = {};

// sets the maximum energy that can be spent on spawns
var gResourceCap = 800;
//commits the maximum energy for spawns to memory.gResourcecap
Game.spawns['Spawn1'].memory.gResourceCap = gResourceCap;


module.exports = {
tier,
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
gclaimerCap,
gclaimerSuffix,
sourceTicker,
resourceIntensity,
gResourceTicker,
gResourceCap
};
