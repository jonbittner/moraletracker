// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Players = new Meteor.Collection("players");

if (Meteor.isClient) {
  Template.leaderboard.players = function () {
    return Players.find({}, {sort: {score: -1, name: 1}});
  };

  Template.player.events({
    'click .inc': function () {
      Players.update(this._id, {$inc: {score: 1}});
    },

    'click .dec': function () {
      Players.update(this._id, {$inc: {score: -1}});
    },

    'click a.edit': function (event) {
      var player = $(event.target).closest(".player")
      player.find(".status").hide()
      player.find(".edit_status").show()
    },

    'click a.done': function (event) {
      var player = $(event.target).closest(".player")
      Players.update(this._id, {$set: {status: player.find(".new_status").val()}});
      
      player.find(".status").show()
      player.find(".edit_status").hide()
    },

    'click a.cancel': function (event) {
      var player = $(event.target).closest(".player")
      player.find(".new_status").val(Players.findOne(this._id).status)
      player.find(".status").show()
      player.find(".edit_status").hide()
    }
  });
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Players.find().count() === 0) {
	Players.insert({name: "Jon", avatar: "http://gravatar.com/HASH/25e18cffe259859098f45d213b2f6db4",});
	Players.insert({name: "Ryan", avatar: "http://gravatar.com/HASH/25e18cffe259859098f45d213b2f6db4",});
	Players.insert({name: "Marshall", avatar: "http://gravatar.com/HASH/25e18cffe259859098f45d213b2f6db4",});    
	Players.insert({name: "Nellie", avatar: "http://gravatar.com/HASH/25e18cffe259859098f45d213b2f6db4",});    
	Players.insert({name: "Caleb", avatar: "http://gravatar.com/HASH/25e18cffe259859098f45d213b2f6db4",});    
	Players.insert({name: "Kyle", avatar: "http://gravatar.com/HASH/25e18cffe259859098f45d213b2f6db4",});    
	Players.insert({name: "Mark", avatar: "http://gravatar.com/HASH/25e18cffe259859098f45d213b2f6db4",});    
    }
  });
}
