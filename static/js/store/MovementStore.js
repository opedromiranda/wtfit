var WtfAppDispatcher = require('../dispatcher/WtfAppDispatcher');
var WtfConstants = require('../constants/WtfConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Immutable = require('immutable');

var ActionTypes = WtfConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _movement = Immutable.Map({
  detected: false,
  date: undefined
});

function _updateMovement(movement) {
  _movement = _movement
    .set('detected', movement.detected)
    .set('date', movement.date)
}

var MovementStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function () {
    return _movement;
  }
});

MovementStore.dispatchToken = WtfAppDispatcher.register(function (action) {

  switch (action.type) {
    case ActionTypes.RECEIVE_MOVEMENT_MESSAGE:
      _updateMovement(action.movement);
      MovementStore.emitChange();
      break;
    default:
  }
});

module.exports = MovementStore;
