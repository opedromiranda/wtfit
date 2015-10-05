var WtfAppDispatcher = require('../dispatcher/WtfAppDispatcher');
var WtfConstants = require('../constants/WtfConstants');

var ActionTypes = WtfConstants.ActionTypes;

module.exports = {
  receiveMovement: function (movement) {
    WtfAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_MOVEMENT_MESSAGE,
      movement: movement
    });
  }
}
