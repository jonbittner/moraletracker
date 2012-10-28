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
      var names = ["Ada Lovelace",
                   "Grace Hopper",
                   "Marie Curie",
                   "Carl Friedrich Gauss",
                   "Nikola Tesla",
                   "Claude Shannon"];
      for (var i = 0; i < names.length; i++)
        Players.insert({name: names[i], score: Math.floor(Math.random())*5});
    }
  });
}
