import React from "react";
import PropTypes from 'prop-types';

class RemoveRow extends React.Component {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired
  }

  static defaultProps = {
    value: '&times;'
  }

  removeRow = () => {
    this.props.handleRemoveSpecificRow(this.props.popup.currId, this.props.rowIndex);
    this.props.removeSpecificRowState(this.props.rowIndex);
  }

  render() {
    return [
      <button
        key={this.props.popup.currId}
        className="btn btn-outline-danger btn-sm"
        onClick={this.removeRow}
      >
        &times;
      </button>
    ];
  }
}

export default RemoveRow;