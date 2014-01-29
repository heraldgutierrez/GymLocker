/*******************************
 * GymLocker
 *******************************/
var glModel = require('./GymLocker/models');
var generateGLModels = glModel.generate();

var glPopulate = require('./GymLocker/populate');
var tryPopulateGL = glPopulate.tryPopulate();