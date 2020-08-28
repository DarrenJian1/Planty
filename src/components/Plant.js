import React, {Component} from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import {SettingOutlined, CloseOutlined} from '@ant-design/icons';

//import { DatePicker, List, Button, InputItem } from 'antd-mobile';
//import { createForm } from 'rc-form';
//import MyButton from './MyButton';
import leafyIcon from '../images/LeafyIcon.png';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicking from './DatePicking';
import DatePicker from 'react-mobile-datepicker';


export class Plant extends Component {
    state = {
        DOLW: '',
        dateState: '',
        time: new Date(),
        isOpen: false,
        //width: window.innerWidth,
    }

    // componentWillMount() {
    //     window.addEventListener('resize', this.handleWindowSizeChange);
    // }
      
    //   // make sure to remove the listener
    //   // when the component is not mounted anymore
    // componentWillUnmount() {
    //     window.removeEventListener('resize', this.handleWindowSizeChange);
    // }
      
    // handleWindowSizeChange = () => {
    //     this.setState({ width: window.innerWidth });
    // };

    handleClick = () => {
        this.setState({ isOpen: true });
    }
 
    handleCancel = () => {
        this.setState({ isOpen: false });
    }
 
    handleSelect = (date) => {
        const stringDate = `${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDate()).slice(-2)}/${date.getFullYear()}`
        this.setState({ DOLW: stringDate, isOpen: false });
        this.props.addDOLW(this.props.plant.id,stringDate)
    }

    onDateSubmit = (date) => {
        let stringDate = `${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDate()).slice(-2)}/${date.getFullYear()}`
        this.setState({dateState: stringDate})
        this.props.addDOLW(this.props.plant.id,stringDate)
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.DOLW === ""){
        }
        else {
            this.props.addDOLW(this.props.plant.id,this.state.DOLW);
            
        }
        //this.setState({DOLW: this.props.plant.DOLW});
        //this.refs['myForm'].submit()
        //e.target.blur();
        var name = this.props.plant.name
        document.getElementById(name).blur();
        this.setState({DOLW: ''})
       
    }

    onChange = (e) => this.setState({[e.target.name]:e.target.value});

    onClick = (e) => {
        this.setState({DOLW: ''});
    }

    render() {
        const isMobile = this.props.width <= 500;
        const {id, name} = this.props.plant;
        const monthMap = {
            '1': 'Jan',
            '2': 'Feb',
            '3': 'Mar',
            '4': 'Apr',
            '5': 'May',
            '6': 'Jun',
            '7': 'Jul',
            '8': 'Aug',
            '9': 'Sep',
            '10': 'Oct',
            '11': 'Nov',
            '12': 'Dec',
        };
        const dateConfig = {
            'month': {
                format: value => monthMap[value.getMonth() + 1],
                caption: 'Mon',
                step: 1,
            },
            'date': {
                format: 'DD',
                caption: 'Day',
                step: 1,
            },
            'year': {
                format: 'YYYY',
                caption: 'Year',
                step: 1,
            },
        };

        if(isMobile){
            return (
                <div style={plantStyle} className={`${this.props.plant.show ? "" : "hidden"}`}> 
                    <div style={headerStyle}>
                        <button key = "Exit" className={`${this.props.deleteMode ? "icon" : "hiding icon"}`} id="deletePlantButton" onClick={this.props.delPlant.bind(this,id)} style={exitStyle}><CloseOutlined /></button>
                        <button  key="More"onClick={this.props.togglePop.bind(this,id)} style={viewMoreStyle}>
                            <img src={leafyIcon} style={logoStyle}></img>    
                        </button>
                    </div>
                    <div style={contentStyle}>
                        <p style = {nameStyle}>
                            {name}
                        </p>
                        <div style={lastWater}>
                            <div style={dolwTitle}><p>Last Watered</p></div>
                            <div style={floatLeft}><p style={colonStyle}>:</p></div>
                            <div style={floatLeft}>
                                <button
                                    onClick={this.handleClick}
                                    id={this.props.plant.name}
                                    key="lastDOLW"
                                    style={dolwForm}
                                    name="DOLW">
                                    {this.props.plant.DOLW}
                                </button>
            
                                <DatePicker
                                    value={this.state.time}
                                    isOpen={this.state.isOpen}
                                    onSelect={this.handleSelect}
                                    onCancel={this.handleCancel} 
                                    dateConfig={dateConfig}
                                    headerFormat='MM/DD/YYYY'
                                    confirmText='select'
                                    cancelText='cancel'
                                />
                                
                            </div>
                        </div>
                    </div> 
                </div>
            );
        }
        else {
            return(
                <div style={plantStyle}> 
                    <div style={headerStyle}>
                        <button key = "Exit" id="deletePlantButton" className={`${this.props.deleteMode ? "icon" : "hiding icon"}`} onClick={this.props.delPlant.bind(this,id)} style={exitStyle}><CloseOutlined/></button>
                        <button key="More"onClick={this.props.togglePop.bind(this,id)} style={viewMoreStyle}>
                            <img src={leafyIcon} style={logoStyle}></img>
                        </button>
                    </div>
                    <div style={contentStyle}>
                        <p style = {nameStyle}>
                            {name} {'\n'}
                        </p>
                        <div style={lastWater}>
                            <div style={dolwTitle}><p>Last Watered</p></div>
                            <div style={floatLeft}><p style={colonStyle}>:</p></div>
                            <div style={floatLeft}>
                                
                                <DatePicking DOLW={this.props.plant.DOLW} onDateSubmit={this.onDateSubmit} dateState={this.state.DOLW} cName={"dolwForm"} />
                                
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        
    }
}

//PropTypes
// Plant.propTypes = {
//     plants: PropTypes.object.isRequired
// }

const plantStyle = {
    background: '#cef9ad',
    height: '100px',
    width: '100px',
    margin: '5px 5px',
    textAlign: 'center',
    borderRadius: '15px',
    padding: '0x 20px',

}

const headerStyle = {
    position: 'relative',
    bottom: '0px',
    height: '25px',
    margin: '0',
}

const contentStyle = {
    position: 'relative',
    bottom: '0px',
    height: '75px',
    margin: '0',
}

const exitStyle = {
    background: 'none',
    opacity: '1',
    color: '#000',
    //border: 'none',
    padding: '0px',
    margin: '0px',
    cursor: 'pointer',
    position: 'absolute',
    left: '3px',
    top: '0px',
    fontSize: '12px',
    // transition: 'transform 2s',
    ':hover': {
        fontSize: '14px',
        top: '-2px',
        color: '#cd2c2c',
    }
}

const viewMoreStyle = {
    background: 'transparent',
    color: '#000',
    border: 'none',
    padding: '0px 5px',
    cursor: 'pointer',
    position: 'absolute',
    right: '3px',
    top: '3px', 
    ':hover': {
        //backgroundColor: 'white',
        height: '20px',
        //color: 'black',
        //transition: 'all 0.2s',
    }
}
const logoStyle = {
    height: '17px',
    //backgrounnd: '#cef9e0',
    display: 'block',
    margin: '0 auto',
}

const nameStyle = {
    overflow: 'hidden',
    padding: '0px 2px',
    margin: '0px 0px 0px 0px',
    fontSize: '14px',
    lineHeight: '16px',
    maxHeight: '32px',
}

const lastWater = {
    padding: '0px 2px',
    width: 'inherit',
    position: 'absolute',
    bottom: '0px',
}

const floatLeft= {
    float: 'left',
    margin: '0',
    padding: '0',
}

const dolwTitle = {
    paddingTop: '5px',
    fontSize: '6px',
    width: '27px',
    textAlign: 'center',
    position: 'relative',
    //bottom: '5px',
    display: 'block',
    float: 'left',
}

const colonStyle = {
    position: 'relative',
    width: '6px',
    display: 'block',
}

const dolwForm = {
    width:'60px',
    padding: '2px 1px',
    height: '20px',
    //position: 'relative',
    margin: '4px 0 0 0',
    left: '5px',
    backgroundColor: 'transparent',
    backgroundRepeat: 'noRepeat',
    overflow: 'hidden',
    textAlign: 'center',
    color: 'black',
    border: '1px solid #000',
    display: 'block',
    fontSize: '10px',
}

Plant = Radium(Plant)
export default Plant;