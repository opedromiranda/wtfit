var React = require('react');
var ImmutablePropTypes = require('react-immutable-proptypes');
var MovementStore = require('../store/MovementStore');

function getStateFromStore() {
  return {
    movement: MovementStore.get()
  }
}

var MovementLight = React.createClass({

  propTypes: {
    movement: ImmutablePropTypes.map
  },

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

    if (movement.get('detected')) {
      result = (
        <p>Movement detected</p>
      );
    } else {
      result = (
        <p>Movement not detected</p>
      );
    }

    return result;
  },

  _onChange: function () {
    this.setState(getStateFromStore());
  }
});

module.exports = MovementLight;
