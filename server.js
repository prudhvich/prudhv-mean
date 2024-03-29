var express = require('express');
var app = express();
var mongojs =require('mongojs');

var db = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.get('/contactList',function(req,res) {

console.log("server respond to /contactList");
db.contactlist.find(function(err,docs){
//console.log(docs);
res.json(docs);
});

});

app.post('/contactList',function(req,res) {
console.log(req.body);
db.contactlist.insert(req.body,function(err,docs){
	res.json(docs);
})

});

app.delete('/contactList/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	
	db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,docs){
		res.json(docs);
	})
});





app.get('/contactList/:id',function(req,res) {

	var id = req.params.id;
	console.log(id);


db.contactlist.findOne({_id: mongojs.ObjectId(id)},function(err,docs){
//console.log(docs);
res.json(docs);
});

});



app.put('/contactList/:id',function(req,res){
	var id = req.params.id;
	console.log(id);

	db.contactlist.findAndModify({query: {_id:mongojs.ObjectId(id)},
		update: {$set : {name:req.body.name , email:req.body.email , number : req.body.number}},
		new:true},function(err,docs){
			res.json(docs);
		}

)


	});






app.listen(3000);
console.log("App Started on localhost:3000");