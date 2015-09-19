var ObjectID = require('mongodb').ObjectID;

MongoDb = function(db){
	this.db = db;
};

MongoDb.prototype.getCollection = function(name, callback) {
	this.db.collection(name, function(error, the_collection) {
    if( error ) 
	callback(error);
    else 
	callback(null, the_collection);
  });
}

MongoDb.prototype.findAll = function(collectionName, callback) {
    this.getCollection(collectionName, function(error, the_collection) { //A
      if( error ) callback(error);
      else {
        the_collection.find().toArray(function(error, results) { //B
          if( error ) callback(error);
          else callback(null, results);
        });
      }
    });
};

MongoDb.prototype.get = function(collectionName, id, callback) { //A
    this.getCollection(collectionName, function(error, the_collection) {
        if (error) callback(error);
        else {
            var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$"); //B
            if (!checkForHexRegExp.test(id)) callback({error: "invalid id"});
            else the_collection.findOne({'_id':ObjectID(id)}, function(error,doc) { //C
                if (error) callback(error);
                else callback(null, doc);
            });
        }
    });
};

exports.MongoDb = MongoDb;