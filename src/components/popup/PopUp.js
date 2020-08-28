import React, {Component} from "react";
import PopUpTitle from './PopUpTitle';
//import Table from 'react-bootstrap/Table';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';
import RemoveRow from './RemoveRow';
import {EditOutlined, CloseOutlined} from '@ant-design/icons';
import Radium from 'radium';
import * as BSTConst from './BSTableConstants';
import DatePicking from './DatePicking';
import DatePicker from 'react-mobile-datepicker';


export default class PopUp extends Component {
    state = {
        rows: [{}],
        notEdit: true,
        isOpen: false,
        currIndex: 0,
    };

    constructor(prop){
        super(prop);
        const id = this.props.popup.currId;
        const info = localStorage.getItem(id).split('\0');
        const inputState = [...this.state.rows];
        // for(let i = 1; i < info.length; i+=2){
        //     if(info.length-1 > i){
        //         inputState[i-1] = {
        //             index: ,
        //             DOLW: info[i],
        //             note: info[i+1],
        //         }
        //     }
        // }
        info.slice(1).map((date,index) => {
            if(info.length-1 > index + 1){
                inputState[index] = {
                    index: index,
                    DOLW: date
                }
            }
        });

        this.state = {
            rows: inputState,
            notEdit: true,
        }
    } 

    onDateSubmit = (index,date) => {
        const id = this.props.popup.currId;
        const info = localStorage.getItem(id).split('\0');
        const inputState = [...this.state.rows];
        let stringDate = `${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDate()).slice(-2)}/${date.getFullYear()}`

        //console.log("%s, %s",index+1, info.length-2);
        //if(index+1 === info.length-2) {
        this.props.updateItem(id,index+1,stringDate)
        //}
        
        // for(let i = 1; i < info.length; i+=2){
        //     if(index===i-1){
        //         inputState[index] = {
        //             index: index,
        //             DOLW: stringDate,
        //             note: note,
        //         }
        //     }
        // }
        info.slice(1).map((date,currIndex) => {
            if(index === currIndex){
                inputState[index] = {
                    index: index,
                    DOLW: stringDate
                }
            }
        });
        this.setState({
            rows: inputState,

        })
        
        
    }

    handleChange = (id,index) => e => {
        const{name,value}= e.target;
        const rows = [...this.state.rows];
        rows[index] = {
            [name]: value
        };
        this.setState({
            rows
        });

        let plantArray = localStorage.getItem(id).split('\0')
        let updatedPlant = ''
        for(let i = 0; i < plantArray.length - 1; i++){
          if (i-1 === index){
            updatedPlant = updatedPlant + value + '\0'
          }
          else {
              updatedPlant = updatedPlant + plantArray[i] + '\0'
          }
        }
        localStorage.setItem(id,updatedPlant)
    };

    removeSpecificRowState = (index) => {
        const rows = [...this.state.rows]
        rows.splice(index, 1)
        this.setState({ rows: rows.map((eachRow,index) => {
            eachRow.index = index;
            return eachRow;
          })});
    }

    handleClick = () => {
        this.props.toggle();
    };

    handleDateClick = (rowIndex) => {
        this.setState({ isOpen: true , currIndex: rowIndex});
    }

    handleDateCancel = () => {
        this.setState({ isOpen: false });
    }

    handleDateSelect = (date) => {
        const index = this.state.currIndex;
        const stringDate = `${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDate()).slice(-2)}/${date.getFullYear()}`
        const id = this.props.popup.currId;
        const info = localStorage.getItem(id).split('\0');
        const inputState = [...this.state.rows];
        info.slice(1).map((date,currentIndex) => {
            if(index === currentIndex){
                inputState[index] = {
                    index: index,
                    DOLW: stringDate
                }
            }
        });
        this.setState({
            rows: inputState,
            isOpen: false,
        })
        this.props.updateItem(id,index+1,stringDate);
    }

    handleEditClick = () => {
        this.setState({notEdit: !this.state.notEdit});
    };

    handleOutsideClick = (e) => {
        if(e.target.classList.contains('modal_custom')){
            this.props.toggle();
        }
    }

    removeRowFormatter = (cell,row) => <RemoveRow popup={this.props.popup} rowIndex={row.index} handleRemoveSpecificRow={this.props.handleRemoveSpecificRow} removeSpecificRowState={this.removeSpecificRowState}/>

    render() {
        const isMobile = this.props.width <= 500;

        const id = this.props.popup.currId;
        const info = localStorage.getItem(id).split('\0');
        
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

        const columns = [{
            dataField: 'index',
            text: 'id',
            hidden: 'true',
            headerStyle: (colum, colIndex) => {
                return { width: '20%', textAlign: 'center' };
            }},
            {
                dataField: 'remove',
                text: '',
                headerStyle: (colum, colIndex) => {
                    return { width: '20%', textAlign: 'center' };
                },
                isDummyField: true,
                hidden: this.state.notEdit,
                editable: false,
                formatter: this.removeRowFormatter,
                
            },
            {
                dataField: 'DOLW',
                text: 'Last Watered',
                sort: true,
                formatter: (cell)=> {
                    let newDate = cell;
                    console.log(newDate)
                    if(newDate !== undefined){
                        var b = newDate.split("/");
                        newDate = new Date(b[2],b[0]-1,b[1]);
                    }
                    else {
                        newDate = new Date(cell);
                    }
                    return `${('0' + (newDate.getUTCMonth() + 1)).slice(-2)}/${('0' + newDate.getUTCDate()).slice(-2)}/${newDate.getUTCFullYear()}`;
                    
                },
                // editor: {
                //     type: Type.DATE
                // }
                editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
                    <DatePicking { ...editorProps } rowIndex={rowIndex} DOLW={ value } cName={"popupDate"} onDateSubmit={this.onDateSubmit} />
                )
            },
        ];

        const columnsMobile = [{
            dataField: 'index',
            text: 'id',
            hidden: 'true',
            headerStyle: (colum, colIndex) => {
                return { width: '20%', textAlign: 'center' };
            }},
            {
                dataField: 'remove',
                text: '',
                headerStyle: (colum, colIndex) => {
                    return { width: '20%', textAlign: 'center' };
                },
                isDummyField: true,
                hidden: this.state.notEdit,
                editable: false,
                formatter: this.removeRowFormatter,
                
            },
            {
                dataField: 'DOLW',
                text: 'Last Watered',
                sort: true,
                editable: !this.state.notEdit,
                formatter: (cell)=> {
                    let newDate = cell;
                    console.log(newDate)
                    if(newDate !== undefined){
                        var b = newDate.split("/");
                        newDate = new Date(b[2],b[0]-1,b[1]);
                    }
                    else {
                        newDate = new Date(cell);
                    }
                    return `${('0' + (newDate.getMonth() + 1)).slice(-2)}/${('0' + newDate.getDate()).slice(-2)}/${newDate.getFullYear()}`;
                    
                },
                // editor: {
                //     type: Type.DATE
                // }
                editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
                    <React.Fragment>
      
                    <button
                        onClick={() => this.handleDateClick(rowIndex)}
                        id={this.props.popup.currId}
                        key="lastDOLW"
                        //style={dolwForm}
                        className="popupDate"
                        name="DOLW">
                        {value}
                    </button>
            
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
                    </React.Fragment>
                )
            },
        ];

        if(isMobile){
            return (
                <div className="modal_custom" onClick={this.handleOutsideClick}>
                    <div className="modal_content_custom">
                        <button key="edit"onClick={this.handleEditClick} style={editStyle}><EditOutlined /></button>
                        <button key="close" onClick={this.handleClick} style={exitStyle}><CloseOutlined /></button>

                        <PopUpTitle popup={this.props.popup} title={info[0]} updateItem={this.props.updateItem} notEdit={this.state.notEdit}/>

                        <BootstrapTable
                            bootstrap4
                            popup={this.props.popup}
                            keyField="index"
                            data={ this.state.rows }
                            columns={columnsMobile}
                            defaultSorted={ BSTConst.defaultSorted }
                            pagination={ paginationFactory(BSTConst.options) } 
                            cellEdit={ cellEditFactory({
                                mode: 'click',
                                afterSaveCell: (oldValue,newValue,row,col) => { 
                                    this.props.updateDOLW(this.props.popup.currId,row.index,newValue)
                                },
                                blurToSave: true,
                            }) }
                        />
                            
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="modal_custom" onClick={this.handleOutsideClick}>
                    <div className="modal_content_custom">
                        <button key="edit"onClick={this.handleEditClick} style={editStyle}><EditOutlined /></button>
                        <button key="close" onClick={this.handleClick} style={exitStyle}><CloseOutlined /></button>

                        <PopUpTitle popup={this.props.popup} title={info[0]} updateItem={this.props.updateItem} notEdit={this.state.notEdit}/>

                        <BootstrapTable
                            bootstrap4
                            popup={this.props.popup}
                            keyField="index"
                            data={ this.state.rows }
                            columns={columns }
                            defaultSorted={ BSTConst.defaultSorted }
                            pagination={ paginationFactory(BSTConst.options) } 
                            cellEdit={ cellEditFactory({
                                mode: 'click',
                                afterSaveCell: (oldValue,newValue,row,col) => { 
                                    this.props.updateDOLW(this.props.popup.currId,row.index,newValue)
                                },
                                blurToSave: true,
                            }) }
                        />
                            
                    </div>
                </div>
            );
        }
    }

}

const editStyle = {
    background: 'none',
    opacity: '1',
    color: '#000',
    border: 'none',
    padding: '0px',
    margin: '0px',
    cursor: 'pointer',
    position: 'absolute',
    left: '3px',
    top: '-5px',
    fontSize: '20px',
    ':hover': {
        fontSize: '19px',
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

PopUp = Radium(PopUp)