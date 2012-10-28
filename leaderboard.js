// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Players = new Meteor.Collection("players");

if (Meteor.isClient) {
  Template.leaderboard.players = function () {
    return Players.find({}, {sort: {name: 1}});
  };

  Template.player.done = function(id, elem) {
    Players.update(id, {$set: {status: elem.find(".new_status").val()}});
    elem.find(".status").show()
    elem.find(".edit_status").hide()
  }

  Template.player.events({
    'click .one-star': function () {
      Players.update(this._id, {$set: {score: 1}});
    },

    'click .two-stars': function () {
      Players.update(this._id, {$set: {score: 2}});
    },

    'click .three-stars': function () {
      Players.update(this._id, {$set: {score: 3}});
    },

    'click .four-stars': function () {
      Players.update(this._id, {$set: {score: 4}});
    },

    'click .five-stars': function () {
      Players.update(this._id, {$set: {score: 5}});
    },

    'click .inc': function () {
      Players.update(this._id, {$inc: {score: 1}});
    },

    'click .dec': function () {
      Players.update(this._id, {$inc: {score: -1}});
    },

    'click .status': function (event) {
      var elem = $(event.target).closest(".player")
      elem.find(".status").hide()
      elem.find(".edit_status").show()
      elem.find(".new_status").focus()

      id = this._id

      elem.find(".new_status").keydown( function(e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if(key == 13) {
          Template.player.done(id, elem);
        }
      })

      elem.find(".new_status").focusout( function() {
        Template.player.done(id, elem);
      })
    },

    'click a.done': function (event) {
      var elem = $(event.target).closest(".player")
      Template.player.done(this._id, elem);
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
      Players.insert({name: "Jon", avatar: "http://gravatar.com/avatar/25e18cffe259859098f45d213b2f6db4",});
      Players.insert({name: "Ryan", avatar: "http://gravatar.com/avatar/25e18cffe259859098f45d213b2f6db4",});
      Players.insert({name: "Marshall", avatar: "http://gravatar.com/avatar/25e18cffe259859098f45d213b2f6db4",});    
      Players.insert({name: "Nellie", avatar: "http://gravatar.com/avatar/25e18cffe259859098f45d213b2f6db4",});    
      Players.insert({name: "Caleb", avatar: "http://gravatar.com/avatar/25e18cffe259859098f45d213b2f6db4",});    
      Players.insert({name: "Kyle", avatar: "http://gravatar.com/avatar/25e18cffe259859098f45d213b2f6db4",});    
      Players.insert({name: "Mark", avatar: "http://gravatar.com/avatar/25e18cffe259859098f45d213b2f6db4",});    
    }
  });
}
