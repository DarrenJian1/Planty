import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class ViewMoreForm extends Component {
    //const Date = props => {props.date};
    
    state = {
        item: this.props.item,
        index: this.props.index
    }

    onSubmit = (e) => {
        e.preventDefault();
        //this.props.updateDOLW(this.props.plant.id,this.state.DOLW);
        //this.setState({DOLW: ''});
        this.props.updateItem(this.props.popup.currId,this.state.index + 1,this.state.item);
    }

    onChange = (e) => this.setState({[e.target.name]:e.target.value});

    onClick = (e) => {
        this.setState({item: ''});
        
    }



    render() {
        ///const id = this.props.popup.currId;
        return(
                //<div style={dolwTitle}><p>Last Watered</p></div>
                //<div style={floatLeft}><p style={colonStyle}>:</p></div>
                <div style={formStyle}>
                    <button onClick={this.props.delDOLW.bind(this,this.props.currId,this.state.index+1)} style={exitStyle}>&times;</button>
                    <form onSubmit={this.onSubmit} onClick={this.onClick}>
                        <input
                            id="placeHolderStyle"
                            type="text"
                            name="item"
                            style={dolwForm}
                            //placeholder={DOLW}
                            value={this.state.item}
                            onChange={this.onChange}
                        />
                    </form>
                </div>
        )
    }
}

//PropTypes
ViewMoreForm.propTypes = {
    currId: PropTypes.object.isRequired
}

// const nameStyle = {
//     overflow: 'hidden',
//     padding: '10px 0px',
//     margin: '10px 0px',
//     maxHeight: '58px',
// }

const formStyle= {
    margin: '0 20px',
    padding: '0',
    textAlign: 'center',
}

// const dolwTitle = {
//     fontSize: '10px',
//     width: '40px',
//     textAlign: 'center',
//     position: 'relative',
//     bottom: '5px',
//     display: 'block',
//     float: 'left',
// }

const dolwForm = {
    width:'100px',
    padding: '2px 1px',
    position: 'relative',
    margin: '0',
    left: '5px',
    backgroundColor: 'transparent',
    backgroundRepeat: 'noRepeat',
    overflow: 'hidden',
    textAlign: 'center',
    color: 'black',
    //borderColor: 'black',
    border: '1px solid #000',
    //display: 'inline',
    display: 'block',
}

const exitStyle = {
    background: 'none',
    opacity: '1',
    color: '#000',
    border: 'none',
    padding: '0px',
    margin: '0px',
    cursor: 'pointer',
    position: 'absolute',
    //float: 'left',
    left: '50px',
    fontSize: '15px',
}

export default ViewMoreForm;