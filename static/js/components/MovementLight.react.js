var React = require('react');
var ImmutablePropTypes = require('react-immutable-proptypes');
var MovementStore = require('../store/MovementStore');
var assign = require('object-assign');
var baseStyles = require('./styles/MovementLight.styles.js');
var classnames = require('classnames');

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
    var classes = classnames('wtf-ml');
    var movement = this.state.movement;
    var styles = assign({}, baseStyles);

    if (movement.get('detected')) {
      assign(styles, {
        backgroundColor: 'green',
      });
    }

    return (
      <div className={classes}>
        <div style={styles}></div>
      </div>
    );
  },

  _onChange: function () {
    this.setState(getStateFromStore());
  }
});

module.exports = MovementLight;
