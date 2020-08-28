import React, {Component} from 'react';
import Plant from './Plant';
import $ from 'jquery';

import {SettingOutlined, CloseOutlined} from '@ant-design/icons';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

import SearchBar from './materialUI/SearchBar';

import AddPlant from './AddPlant';
import PropTypes from 'prop-types';

// const useStyles = makeStyles((theme) => ({
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 120,
//     },
//     selectEmpty: {
//       marginTop: theme.spacing(2),
//     },
// }));

class Plants extends Component {
    
    state = {
        sortBy: '',
        deleteMode: false,
    }

    componentDidMount() {
        var winHeight = window.innerHeight;
        var headerHeight = $("header").outerHeight();
        var searchHeight = $("#searchBar").height();
        var navBotHeight = $("#tabBarBottom").outerHeight();
        
        var contentHeight = winHeight-headerHeight-navBotHeight-searchHeight;
        
        $(".plantParent").height(contentHeight);

        $("header").css('touch-action', 'none') // disable actions
        $("#addPlant").css('touch-action', 'none') // disable actions
        $("#tabBarBottom").css('touch-action', 'none') // disable actions
        //draggableElement.css('touch-action', 'auto') // restore actions
    }

    //classes = useStyles();
    handleChange = (sort) => {
        this.setState({sortBy: sort});
        this.props.sortPlants(sort);
    };

    

    togglePop = () => {
        // $("[id='deletePlantButton']").css('visibility', function(i, visibility) {
        //     return (visibility == 'visible') ? 'hidden' : 'visible';
        // });
        // $("[id='deletePlantButton']").css('transition', 'transform 2s')
        // $("[id='deletePlantButton']").css('transform', 'rotate(180deg)')
        this.setState({deleteMode: !this.state.deleteMode})
    }

    render() {
        return (
            <React.Fragment>
            <div style={searchBar} id="searchBar">
                <SearchBar handleChange={this.handleChange} handleSearch={this.props.handleSearch} togglePop={this.togglePop} deleteMode={this.state.deleteMode}/>
                
            
            </div>
            <div className="plantParent">
                {/* <FormControl className={classes.formControl}> */}
                
                {/* <AddPlant addPlant={this.props.addPlant}/> */}
                <div className='plants' id="main">
                    {this.props.plants.map((plant) => (
                    
                        plant.show ? <Plant key = {plant.id} plant = {plant}
                        addDOLW = {this.props.addDOLW} delPlant={this.props.delPlant} togglePop = {this.props.togglePop} width={this.props.width} deleteMode={this.state.deleteMode}/> : null
                    
                    ))}
                    
                    
                </div>
            </div>
            </React.Fragment>
        );
    }
}

const searchBar = {
    display: 'flex',
    justifyContent: 'center',
    borderBottom: 'solid 1px #d9f4df',
}

const sortStyle = {
    width: '20%',
    marginLeft: 'auto',
    marginRight: '5%',
    marginBottom: 'auto',
    marginTop: 'auto',
}


// Plants.propTypes = {
//     plants: PropTypes.array.isRequired
// }

export default Plants;
