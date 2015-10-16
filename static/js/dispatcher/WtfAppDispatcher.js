var socket = require('socket.io-client').connect();
var Dispatcher = require('flux').Dispatcher;
var WtfAppDispatcher = new Dispatcher();
var WtfConstants = require('../constants/WtfConstants');
var ActionTypes = WtfConstants.ActionTypes;

socket.on('movement', function (movement) {
  WtfAppDispatcher.dispatch({
    type: ActionTypes.RECEIVE_MOVEMENT_MESSAGE,
    movement: movement
  });
});

module.exports = WtfAppDispatcher;
