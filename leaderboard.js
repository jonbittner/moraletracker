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
      Players.insert({name: "Ryan", avatar: "http://gravatar.com/avatar/b6d3539d5ffda82fd2c26d0fc42a126f",});
      Players.insert({name: "Marshall", avatar: "http://a0.twimg.com/profile_images/1406604829/photo_4_reasonably_small.jpg",});    
      Players.insert({name: "Nellie", avatar: "/nellie.jpg",});    
      Players.insert({name: "Caleb", avatar: "http://a0.twimg.com/profile_images/2228011122/superpowers_reasonably_small.jpg",});    
      Players.insert({name: "Kyle", avatar: "http://a0.twimg.com/profile_images/1754875012/384019_2422660721211_1092240058_32286172_1970484507_n_reasonably_small.jpg",});    
      Players.insert({name: "Mark", avatar: "/mark.png",});    
    }
  });
}
