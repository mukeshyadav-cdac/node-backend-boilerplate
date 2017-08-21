import express from 'express';
import bodyParser from 'body-parser';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});

var postSchema = mongoose.Schema({
    name: String
});

var Post = mongoose.model('Post', postSchema);

const app =  express();

app.get('/', (req, res) => res.send('Hello World'));
app.use(bodyParser.json());
// create post localhost:3000/api/v1/posts parmas{text: "this is first test", token: "ererrwerwer "}
app.post('/api/v1/posts', function(req, res) {

  var post = new Post({ name: req.body.name });

  post.save(function (err, post) {
    if (err) return console.error(err);
    console.log("post created with id" + post.id)
  });
  res.send("Post created with post Id" + post.name)
});

// get ppost localhost:3000/api/v1/posts/:id
app.get('/api/v1/posts/:id', function(req, res) {
  var post = Post.findOne({ _id: req.params["id"] }, function(error, post){
    console.log("post found with name" + post);
    console.log("post found with name" + error)
    res.send("Post find with name"+ post.name)
  });

});

// put post  localts:3000/api/v1/posts/:id
app.put('/api/v1/posts/:id', function(req, res) {
  console.log(req.body.name);
  var post = Post.findOneAndUpdate({ _id: req.params["id"] }, {$set:{name: req.body.name}}, {new: true}, function(error, post){
    console.log("post updated with name" + post.name);
    console.log("Error " + error)
    res.send("Post find with name"+ post.name)
  });

});

// delete post  localhost:3000/api/v1/posts/:id
app.delete('/api/v1/posts/:id', function(req, res) {
  console.log(req.body.name);
  var post = Post.findOneAndRemove({ _id: req.params["id"] }, function(error, post){
    console.log("post updated with name" + post.name);
    console.log("Error " + error)
    res.send("Post find with name"+ post.name)
  });

});

app.listen(3000, () => console.log('Example app runningon 3000 port'));

// create post localhost:3000/api/v1/posts parmas{text: "this is first test", token: "ererrwerwer "}
// get ppost localhost:3000/api/v1/posts/:id
// delete post  localhost:3000/api/v1/posts/:id
// put post  localts:3000/api/v1/posts/:id
//teset caeses
