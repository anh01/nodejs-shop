var MongoClient = require('mongodb').MongoClient;    

  MongoClient.connect('mongodb://'+process.env.IP+'/shop', function(err, db) {
    if(err) throw err;
      console.log("here");

    db.collectionNames(function(err, colls){
      if(err) throw err;
      console.log("here");
      if(colls) {
      console.log("here " + colls.length);
        for(var i = 0; i < colls.length; i++) {
          console.log(colls[i]);
        }
      }
      db.close();
      process.exit();
    });
  })
  
