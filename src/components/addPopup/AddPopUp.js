import React, {Component} from "react";
import {Text, View, StyleSheet} from 'react-native';
import PopUpTitle from '../popup/PopUpTitle';
import {EditOutlined, CloseOutlined} from '@ant-design/icons';
import Radium from 'radium';
import DatePicking from '../popup/DatePicking';
import DatePicker from 'react-mobile-datepicker';
import $ from 'jquery';


export default class AddPopUp extends Component {
    state = {
        isOpen: false,
        name: '',
        time: new Date(),
        DOLW: '',
    };

    constructor(prop){
        super(prop);

    }  

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addPlant(this.state.name,this.state.DOLW);
        this.setState({name: '',DOLW:''});
    }

    onSubmitName = (e) => {
        e.preventDefault();
        $('#lastWaterBtn').click();
    }

    onChange = (e) => this.setState({[e.target.name]:e.target.value})

    onDateSubmit = (date) => {
        let stringDate = `${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDate()).slice(-2)}/${date.getFullYear()}`
        this.setState({
            DOLW: stringDate,
        })
    }

    handleClick = () => {
        this.props.toggle();
    };

    handleDateClick = () => {
        this.setState({ isOpen: true, DOLW: ""});
    }

    handleDateCancel = () => {
        this.setState({ isOpen: false });
    }

    handleDateSelect = (date) => {
        let stringDate = `${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDate()).slice(-2)}/${date.getFullYear()}`
        this.setState({
            DOLW: stringDate,
        })
    }

    handleOutsideClick = (e) => {
        if(e.target.classList.contains('modal_custom')){
            this.props.toggle();
        }
    }


    render() {
        const isMobile = this.props.width <= 500;
        
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
                <div className="modal_custom" onClick={this.handleOutsideClick}>
                    <div className="modal_content_custom">
                        <button key="close" onClick={this.handleClick} style={exitStyle}><CloseOutlined /></button>

                        {/* <PopUpTitle popup={this.props.popup} title={"Add Plant"} updateItem={this.props.updateItem} notEdit={this.state.notEdit}/> */}
                        <View style={styles.inputFields}>
                        <form id="addPlantPopup" onSubmit={this.onSubmit}>
                            <View style={styles.eachLine}>
                                <View style={styles.setWidth}>
                                    <Text style={styles.textRight}>
                                        Name:
                                    </Text>
                                </View>
                                <View style={styles.textInput}>
                                    <textarea
                                        id="addPlantPopup"
                                        type="text"
                                        name="name"
                                        style={radium_styles.base}
                                        placeholder=""
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        onSubmit={this.onSubmitName}
                                    />
                                </View>
                            </View>
                            <View style={styles.eachLine}>
                                <View style={styles.setWidth}>
                                    <Text style={styles.textRight}>
                                        Last Watered:
                                    </Text>
                                </View>
                                
                                <View style={styles.textInput}>
                                    <input
                                        type="button"
                                        onClick={()=> this.handleDateClick()}
                                        id="lastWaterBtn"
                                        key="addPopupMobileDatePicker"
                                        //className="popupDate"
                                        style={radium_styles.date}
                                        name="DOLW"
                                        value={this.state.DOLW}
                                    />
                                </View>

                                <DatePicker
                                    value={this.state.time}
                                    isOpen={this.state.isOpen}
                                    onSelect={this.handleDateSelect}
                                    onCancel={this.handleDateCancel} 
                                    dateConfig={dateConfig}
                                    headerFormat='MM/DD/YYYY'
                                    confirmText='select'
                                    cancelText='cancel'
                                />
                            </View>
                            <View style={styles.eachLine}>
                                <input
                                    type="submit"
                                    value="Add"
                                    //className="btn_custom"
                                    style={radium_styles.add_Button}
                                />
                            </View>
                            
                        </form>
                        </View>
                            
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="modal_custom" onClick={this.handleOutsideClick}>
                    <div className="modal_content_custom">
                        <button key="close" onClick={this.handleClick} style={exitStyle}><CloseOutlined /></button>
                        
                        <View style={styles.inputFields}>
                        <form id="addPlantPopup" onSubmit={this.onSubmit}>
                            <View style={styles.eachLine}>
                                <View style={styles.setWidth}>
                                    <Text style={styles.textRight}>
                                        Name:
                                    </Text>
                                </View>
                                <View style={styles.textInput}>
                                    <textarea
                                        id="addPlantPopup"
                                        type="text"
                                        name="name"
                                        style={radium_styles.base}
                                        placeholder=""
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        onSubmit={this.onSubmitName}
                                    />
                                </View>
                            </View>
                            <View style={styles.eachLine}>
                                <View style={styles.setWidth}>
                                    <Text style={styles.textRight}>
                                        Last Watered:
                                    </Text>
                                </View>
                                
                                <View style={styles.textInput}>
                                    <DatePicking DOLW={this.state.DOLW} onDateSubmit={this.onDateSubmit} dateState={this.state.DOLW} cName={"addPopupForm"} />
                                </View>
                                
                            </View>
                            
                            <div style={eachLine}>
                                <input
                                    type="submit"
                                    value="Add"
                                    //className="btn_custom"
                                    style={radium_styles.add_Button}
                                />
                            </div>
                            
                        </form>
                        </View>

                            
                    </div>
                </div>
            );
        }
    }

}

const exitStyle = {
    background: 'none',
    opacity: '1',
    color: '#000',
    border: 'none',
    padding: '0px',
    margin: '0px',
    cursor: 'pointer',
    height: '0px',
    width: '0px',
    position: 'absolute',
    right: '22px',
    top: '-7px',
    fontSize: '20px',
    ':hover': {
        fontSize: '19px',
    },
}

const eachLine = {
    zIndex: '-1 !important',
    //display: 'flex',
    flexDirection: 'row',
    marginTop: '10%',
    justifyContent: 'center',
}

const styles = StyleSheet.create({
    inputFields: {
        position: 'relative',
        //left: '-10%',
    },
    textRight: {
        textAlign: 'right',
    },
    sameLine: {
        display: 'flex',
        flexDirection: 'row',
    },
    eachLine: {
        //display: 'flex',
        flexDirection: 'row',
        marginTop: '10%',
        justifyContent: 'center',
    },
    textInput: {
        width: '70%',
        fontSize: '2vh',
        textAlign: 'left',
    },
    setWidth: {
        width: '50%',
        justifyContent: 'flex-end',
        paddingBottom: '2px',
        //lineHeight: '25px',
    },
});


var radium_styles = {
    base: {
      background: 'transparent',
      height: '4vh',
      lineHeight: '5vh',
      padding: '0 2px',
      marginLeft: '10%',
      border: 'solid black 1px',
   
      // Adding interactive state couldn't be easier! Add a special key to your
      // style object (:hover, :focus, :active, or @media) with the additional rules.
        '::placeholder': {
            // background: color('#000')
            //   .lighten(0.2)
            //fontSize: '17px'
            color: '#aaa',
            justifyContent: 'flex-end',
        },
        '::-webkit-input-placeholder': {
            color: '#aaa',
            justifyContent: 'flex-end',
        },
        
        '::-moz-placeholder': {
            color: '#aaa',
            justifyContent: 'flex-end',
        },
        
        '::-ms-placeholder': {
            color: '#aaa',
            justifyContent: 'flex-end',
        },
    },
    date: {
        background: 'transparent',
        width: '55%',
        border: 'solid black 1px',
        textAlign: 'left',
        height: '4vh',
        lineHeight: '5vh',
        padding: '0 2px',
        marginLeft: '10%',
    },

    add_Button: {
        //flex: '1',
        width: '80%',
        display: 'inline-block',
        border: 'none',
        borderRadius: '10px',
        background: '#cef9ad',
        color: '#000',
        padding: '5px 0px',
        cursor: 'pointer',

        ':hover': {
            background: '#d2ffb1',
        }
    }
}

AddPopUp = Radium(AddPopUp)