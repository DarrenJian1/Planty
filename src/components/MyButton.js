import Radium from 'radium';
import React from 'react';
import color from 'color';
import PropTypes from 'prop-types';
 
class MyButton extends React.Component {
  static propTypes = {
    kind: PropTypes.oneOf(['primary', 'warning']).isRequired
  };
 
  render() {
    // Radium extends the style attribute to accept an array. It will merge
    // the styles in order. We use this feature here to apply the primary
    // or warning styles depending on the value of the `kind` prop. Since its
    // all just JavaScript, you can use whatever logic you want to decide which
    // styles are applied (props, state, context, etc).
    return (
      <button style={[styles.base, styles[this.props.kind]]}>
        {this.props.children}
      </button>
    );
  }
}
 
MyButton = Radium(MyButton);
 
// You can create your style objects dynamically or share them for
// every instance of the component.
var styles = {
  base: {
    color: '#000',
    border: 'none',
    background: 'transparent',
 
    // Adding interactive state couldn't be easier! Add a special key to your
    // style object (:hover, :focus, :active, or @media) with the additional rules.
    ':hover': {
      // background: color('#000')
      //   .lighten(0.2)
      //fontSize: '17px'
      fontWeight: '700'
    }
  },
 
  primary: {
    background: '#000'
  },
 
  warning: {
    background: '#FF4136'
  }
};

export default MyButton