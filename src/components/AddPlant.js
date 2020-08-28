import React, {Component} from 'react'
import PropTypes from 'prop-types'

export class AddPlant extends Component {
    state = {
        name: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addPlant(this.state.name);
        this.setState({name: ''});
    }

    onChange = (e) => this.setState({[e.target.name]:e.target.value})

    render() {
        return (
            
            <form id="addPlant" onSubmit={this.onSubmit} style={{display: 'flex'}}>
                <input
                    id="addPlant"
                    type="text"
                    name="name"
                    style={{flex: '10', padding: '5px'}}
                    placeholder="Add A New Plant!..."
                    value={this.state.name}
                    onChange={this.onChange}
                />
                <input
                    type="submit"
                    value="+"
                    className="btn_custom"
                    style={{flex: '1'}}
                />
            </form>
        )
    }
}

AddPlant.propTypes = {
    addPlant: PropTypes.func.isRequired
}

export default AddPlant