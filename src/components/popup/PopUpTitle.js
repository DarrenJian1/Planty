import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class PopUpTitle extends Component {
    //const Date = props => {props.date};
    
    state = {
        title: this.props.title
    }

    onSubmit = (e) => {
        e.preventDefault();
        //this.props.updateDOLW(this.props.plant.id,this.state.DOLW);
        //this.setState({DOLW: ''});
        this.props.updateItem(this.props.popup.currId, 0 ,this.state.title);

        document.getElementById("TitleHolderStyle").blur();
        //this.setState({title: ''})
    }

    onChange = (e) => this.setState({[e.target.name]:e.target.value});

    onClick = (e) => {
        this.setState({title: ''});
        
    }

    render() {
        return(
                <div style={titleStyle}>
                    {this.props.notEdit ? <div style={titleForm}>{this.props.title}</div> :
                    <form onSubmit={this.onSubmit} onClick={this.onClick}>
                        <input
                            id="TitleHolderStyle"
                            type="text"
                            name="title"
                            style={titleFormEdit}
                            placeholder={this.props.title}
                            value={this.state.title}
                            onChange={this.onChange}
                        />
                    </form>
                    }
                </div>
        )
    }
}

//PropTypes
PopUpTitle.propTypes = {
    currId: PropTypes.object.isRequired
}

// const nameStyle = {
//     overflow: 'hidden',
//     padding: '10px 0px',
//     margin: '10px 0px',
//     maxHeight: '58px',
// }

const titleStyle= {
    margin: '1rem',
    padding: '0',
    textAlign: 'center',
    width: '100%',
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

const titleForm = {
    width:'90%',
    position: 'relative',
    left: '50%',
    marginLeft: '-45%',
    padding: '0',
    backgroundColor: 'transparent',
    backgroundRepeat: 'noRepeat',
    //overflow: 'scroll',
    //overflowWrap: 'break-word',
    textAlign: 'center',
    color: 'black',
    //display: 'inline',
    display: 'block',
    fontSize: '3vh',
}

const titleFormEdit = {
    border: 'solid 1px',
    borderRadius: '4px',
    width:'90%',
    position: 'relative',
    left: '50%',
    marginLeft: '-45%',
    padding: '0',
    backgroundColor: 'transparent',
    backgroundRepeat: 'noRepeat',
    textAlign: 'center',
    color: 'black',
    display: 'block',
    fontSize: '3vh',
}

export default PopUpTitle;