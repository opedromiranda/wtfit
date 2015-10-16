var React = require('react');
var MovementLight = require('./components/MovementLight.react');

window.React = React;

React.render(
  <MovementLight />,
  document.getElementById('react')
);
