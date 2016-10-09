module.exports = function(app, List){

	app.get('/contactlist', function (req, res) {
	  console.log('I received a GET request');

	  List.find(function (err, docs) {
	    console.log(docs);
	    res.json(docs);
	  });
	});

	app.post('/contactlist', function (req, res) {
		var list = new List();
		list.name = req.body.name;
		list.email = req.body.email;
		list.number = req.body.number;
		list.date = req.body.date;
		console.log(req.body);

		list.save(function(err,doc){
			if(err){
					console.error(err);
					res.json({result: 0});
					return;
			}
				res.json(doc);
			});


	});

	app.delete('/contactlist/:id', function (req, res) {
	  var id = req.params.id;
	  console.log(id);
	  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
	    res.json(doc);
	  });
	});

	app.get('/contactlist/:id', function (req, res) {
	  var id = req.params.id;

	  console.log(id);
	  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
	    res.json(doc);
	  });
	});


	//업데이트. put
	app.put('/contactlist/:id', function (req, res) {
	  var id = req.params.id;
	  console.log(req.body.name);
	  db.contactlist.findAndModify({
	    query: {_id: mongojs.ObjectId(id)},
	    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
	    new: true}, function (err, doc) {
	      res.json(doc);
	    }
	  );
	});

};
