var React = require('react');
var ImmutablePropTypes = require('react-immutable-proptypes');
var MovementStore = require('../store/MovementStore');
var assign = require('object-assign');

function getStateFromStore() {
  return {
    movement: MovementStore.get()
  }
}

var MovementLight = React.createClass({

  getInitialState: function () {
    return getStateFromStore();
  },

  componentDidMount: function () {
    MovementStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    MovementStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var movement = this.state.movement;
    var result;
    var message;
    var baseSensorStyle = {
      width: '50px',
      height: '50px',
      MozBorderRadius: '50px',
	    WebkitBorderRadius: '50px',
	    borderRadius: '50px',
      backgroundColor: 'black',
      WebKitTransition: 'background-color 1000ms linear',
      MozTransition: 'background-color 1000ms linear',
      transition: 'background-color 1000ms linear',
    };
    var activeSensorStyle = {
      backgroundColor: 'green',
    };

    if (movement.get('detected')) {
      activeSensorStyle = assign(baseSensorStyle, activeSensorStyle);

      message = (
        <p>Movement detected</p>
      );
    } else {
      message = (
        <p>Movement not detected</p>
      );
    }

    result = (
      <div>
        {message}
        <div style={baseSensorStyle}></div>
      </div>
    );

    return result;
  },

  _onChange: function () {
    this.setState(getStateFromStore());
  }
});

module.exports = MovementLight;
