var model = require('./models/');
var User = model.User;
var Tweet = model.Tweet;


module.exports = {
  add: function(name, text) {
    return User.findOne({where: {name: name}}).then(function(user){
      //check if user is present
      return user || module.exports.addUser(name)
    })
    .then(function(user){
      return Tweet.create({tweet:text, UserId:user.dataValues.id})})
    .catch(function(err){
      if(err) throw err;
    })
  },

  addUser:function(name){
    return User.create({name:name})
  },

  // eg tweetbank.find({ text: '#fml' })

  find: function(properties) {
    console.log("properties is ",properties)
    return Tweet.findAll({include: [User], where: {'User.dataValues.name': properties.name}})
    .then(function(tweets){
      console.log(tweets[0]);
      var result = [];
      tweets.forEach(function(tweet){
        result.push(tweet.dataValues)
      })
      return result
    }).catch(function(err) {
      if (err) throw err;
    })
  },

  list: function() {
    return Tweet.findAll({include: [User]}).then(function(tweets) {
      var result = [];
      tweets.forEach(function(tweet) {
        result.push(tweet.dataValues);
      })
      return result;
    });
  }
}

// var randArrayEl = function(arr) {
//  return arr[Math.floor(Math.random() * arr.length)];
// };

// var getFakeName = function() {
//  var fakeFirsts = ['Nimit', 'Dave', 'Will', 'Charlotte', 'Jacob','Ethan','Sophia','Emma','Madison'];
//  var fakeLasts = ["Alley", 'Stacky', 'Fullstackerson', 'Nerd', 'Ashby', 'Gatsby', 'Hazelnut', 'Cookie', 'Tilde', 'Dash'];
//  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
// };

// var getFakeTweet = function() {
//  var awesome_adj = ['awesome','breathtaking','amazing','sexy','sweet','cool','wonderful','mindblowing'];
//  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
// };

// for(var i=0; i<10; i++) {
//  module.exports.add( getFakeName(), getFakeTweet() );
// }











