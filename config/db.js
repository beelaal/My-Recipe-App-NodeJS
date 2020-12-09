const cls = require('continuation-local-storage');
const namespaceAggregator = cls.createNamespace('ns-aggregator');
const Sequelize = require('sequelize');
Sequelize.useCLS(namespaceAggregator);
const {
  Op
} = Sequelize;
const config = require('./configJs');
const fs = require('fs');
const dbConfig = config.database;

const db = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  port: dbConfig.port,
  pool: { max: 150, min: 0, acquire: 300000000, idle: 10000 },
  logging: false //(config.isDev ? console.log : null)
});
db.dialect.supports.schemas = true;
process.env.dbSequelize = db;
global.db = db;
const start = async () => {
  var path = require('path');
  path = path.join(__dirname, '..', 'app');
  const models = {}
  const myModelFiles = getFiles(path + '/models');
  await asyncForEach(myModelFiles, async (modelPath) => {
    let model = require(modelPath);
    model = db.import(modelPath, model);
    models[model.name] = model;
  })
  // const myRelationFiles = getFiles(path + '/relations');
  // await asyncForEach(myRelationFiles, async (modelPath) => {
  //   let model = require(modelPath);
  //   model = db.import(modelPath, model);
  // })
  global.models = models;
  Object.values(models).filter(m => m.associate).forEach(m => m.associate(models));
}

start();

module.exports = {
  Sequelize,
  Op,
  db
}

function getFiles(dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}