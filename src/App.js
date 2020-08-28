import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import $ from 'jquery';
import 'antd-mobile/dist/antd-mobile.css';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import Header from './components/layout/Header';
import About from './components/pages/About';

import Plants from './components/Plants';

import PopUp from './components/popup/PopUp';
import AddPopUp from './components/addPopup/AddPopUp'

import TabBarBottom from './components/layout/TabBarBottom'

import './App.css';

import {v4 as uuidv4} from 'uuid';
import { EuroCircleFilled } from '@ant-design/icons';

function loadPlants() {
  const allIDs = localStorage.getItem('')
  try {
    let initialStateArray = []
    const IDsArray = allIDs.split('\0')

    for(let i = 0; i < IDsArray.length-1; i++){
      const plantArray = localStorage.getItem(IDsArray[i]).split('\0')
      const plantName = plantArray[0]
      let currDOLW = '';
      if(plantArray.length > 2){
        currDOLW = plantArray[plantArray.length-2]
      }
      const loadPlant = {
        id: IDsArray[i],
        name: plantName,
        DOLW: currDOLW,
        show: true,
      }
      initialStateArray.push(loadPlant)
    }
    if (initialStateArray.length > 0){
      return initialStateArray
    }
    else {
      return []
    }
  }
  catch {
    console.log("Error loading local storage")
    return []
  }
}

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const utcOffset = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));


class App extends Component {
  targetElement = null;
  constructor(prop) {
    super(prop);
    this.state = {
      width: window.innerWidth,
      dpValue: now,
      idt: utcOffset.toISOString().slice(0,10),
      popup:  {
        seen: false,
        currId: '',
      },
      addPopup: {
        seen: false,
      },
      plants: loadPlants(),
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
    
  }
  
  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);

    // 5. Useful if we have called disableBodyScroll for multiple target elements,
    // and we just want a kill-switch to undo all that.
    // OR useful for if the `hideTargetElement()` function got circumvented eg. visitor
    // clicks a link which takes him/her to a different page within the app.
    clearAllBodyScrollLocks();
  }
    
  handleWindowSizeChange = () => {
      this.setState({ width: window.innerWidth });
  };  

  componentDidMount() {
    this.targetElement = document.querySelector('#bodybody');
    
  }
  showTargetElement = () => {
    // ... some logic to show target element
 
    // 3. Disable body scroll
    disableBodyScroll(this.targetElement, {
      allowTouchMove: el => {
        while (el && el !== document.body) {
          if (el.getAttribute('body-scroll-lock-ignore') !== null) {
            return true;
          }
     
          el = el.parentNode;
        }
      },
    });
  };
 
  hideTargetElement = () => {
    // ... some logic to hide target element
 
    // 4. Re-enable body scroll
    enableBodyScroll(this.targetElement);
  };

  togglePop = (id) => {
    this.setState({
      popup:{
        seen: !this.state.popup.seen,
        currId: id
      }
    });
  };

  toggleAddPop = () => {
    this.setState({
      addPopup:{
        seen: !this.state.addPopup.seen,
      }
    })
  }

  updateItem = (id,index,item) => {
    const plantArray = localStorage.getItem(id).split('\0');
    let updateString = '';
    for(let i = 0; i < plantArray.length-1; i++){
      if(i === index){
          updateString += item + '\0';
      }
      else {
        updateString += plantArray[i]  + '\0';
      }
    }
    if(index === 0){
      this.setState({ plants: this.state.plants.map(plant => {
        if(plant.id === id){
          plant.name = item;
        }
        return plant;
      })});
    }
    else if(index === plantArray.length-2) {
      this.setState({ plants: this.state.plants.map(plant => {
        if(plant.id === id){
            plant.DOLW = item;
        }
        return plant;
      })});
    }
    localStorage.setItem(id,updateString);
  }

  sortPlants = (sortBy) => {
    if(sortBy === "name"){
      this.nameSortPlants()
    }
    else if(sortBy === "DOLW"){
      this.dateSortPlants()
    }
  }

  nameSortPlants = () => {
    //const allIDs = localStorage.getItem('').split('\0');
    var allPlants = this.state.plants;
    allPlants.sort(function(a,b){
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if(nameA < nameB){
        return -1
      }
      if(nameA > nameB){
        return 1;
      }
      return 0;
    });
    this.setState({plants: allPlants})
    var sortedIDs = "";
    for(let i = 0; i < allPlants.length; i++){
      sortedIDs += allPlants[i].id + '\0'
    }
    localStorage.setItem('',sortedIDs);
  }

  dateSortPlants = () => {
    var allPlants = this.state.plants;
    allPlants.sort(function(a,b){
      var nameA = a.DOLW;
      var nameB = b.DOLW;
      if(nameA < nameB){
        return -1
      }
      if(nameA > nameB){
        return 1;
      }
      return 0;
    });
    this.setState({plants: allPlants})
    var sortedIDs = "";
    for(let i = 0; i < allPlants.length; i++){
      sortedIDs += allPlants[i].id + '\0'
    }
    localStorage.setItem('',sortedIDs);
  }

  handleSearch = (search) => {
    this.setState({ plants: this.state.plants.map(plant => {
      console.log(plant.name)
      console.log(search)
      if(!plant.name.includes(search)){
          plant.show = false;
      }
      else {
        plant.show = true;
      }
      return plant;
    })});
  }

  addDOLW = (id,DOLW) => {
    localStorage.setItem(id,localStorage.getItem(id)+ DOLW  + '\0')
    this.setState({ plants: this.state.plants.map(plant => {
      if(plant.id === id){
        plant.DOLW = DOLW
      }
      return plant;
    })});
  }

  delPlant = (id) => {
    let allIDs = localStorage.getItem('')
    const IDsArray = allIDs.split('\0')
    let newIDsArray = ''
    for(let i = 0; i < IDsArray.length - 1; i++){
      if (IDsArray[i] !== id){
        newIDsArray = newIDsArray + IDsArray[i] + '\0'
      }
    }
    localStorage.setItem('',newIDsArray)
    localStorage.removeItem(id)
    this.setState({plants: [...this.state.plants.filter(plant => plant.id !== id)]});
  }

  addPlant = (name) => {
    const newPlant = {
      id: uuidv4(),
      name: name,
      DOLW: '',
      show: true,
    }
    this.setState({
      plants: [...this.state.plants, newPlant]
    })
    localStorage.setItem(newPlant.id,newPlant.name + newPlant.DOLW + '\0')
    const allIDs = localStorage.getItem('')
    if (allIDs != null) {
      localStorage.setItem('',allIDs+newPlant.id+'\0')
    }
    else {
      localStorage.setItem('',newPlant.id+'\0')
    }
    
  }
  addPlant = (name,DOLW) => {
    const newPlant = {
      id: uuidv4(),
      name: name,
      DOLW: DOLW,
      show: true,
    }
    this.setState({
      plants: [...this.state.plants, newPlant]
    })
    localStorage.setItem(newPlant.id,newPlant.name + '\0' + newPlant.DOLW + '\0')
    const allIDs = localStorage.getItem('')
    if (allIDs != null) {
      localStorage.setItem('',allIDs+newPlant.id+'\0')
    }
    else {
      localStorage.setItem('',newPlant.id+'\0')
    }
    
  }

  handleRemoveSpecificRow = (id,index) => {
    let plantArray = localStorage.getItem(id).split('\0')
    let updatedPlant = plantArray[0] + '\0';
    for(let i = 1; i < plantArray.length-1; i++){
      if (i-1 !== index){
        updatedPlant = updatedPlant + plantArray[i]  + '\0';
      }
    }
    if(index+1 === plantArray.length-2) {
      this.setState({ plants: this.state.plants.map(plant => {
        if(plant.id === id){
          if(plantArray.length-1<3){
            plant.DOLW = '';
          }
          else {
            plant.DOLW = plantArray[plantArray.length-3];
          }
        }
        return plant;
      })});
    }
    localStorage.setItem(id,updatedPlant)
  }

  updateDOLW = (id, index, newValue) => {
    let plantArray = localStorage.getItem(id).split('\0')
    let updatedPlant = plantArray[0] + '\0';
    for(let i = 1; i < plantArray.length-1; i++){
      if (i-1 !== index){
        updatedPlant = updatedPlant + plantArray[i]  + '\0';
      }
      else {
          updatedPlant = updatedPlant + newValue + '\0'
      }
    }
    if(index+1 === plantArray.length-2) {
      this.setState({ plants: this.state.plants.map(plant => {
        if(plant.id === id){
          plant.DOLW = newValue;
          
        }
        return plant;
      })});
    }
    localStorage.setItem(id,updatedPlant)
    

}


  render() {
    return (
      <Router>
        <div className="App" >
          <div className="container_custom" >
            {this.state.popup.seen ? <PopUp popup ={this.state.popup} toggle={this.togglePop} updateItem={this.updateItem} handleRemoveSpecificRow={this.handleRemoveSpecificRow} updateDOLW={this.updateDOLW} width={this.state.width}/> : null}
            {this.state.addPopup.seen ? <AddPopUp addPopup={this.state.addPopup} toggle={this.toggleAddPop} addPlant={this.addPlant} width={this.state.width}/> : null}
            <Header />
            <div className="content">
              <Route exact path="/" render={props=>(
                <React.Fragment>
                  <Plants plants={this.state.plants} addDOLW={this.addDOLW} delPlant={this.delPlant} togglePop={this.togglePop} width={this.state.width} addPlant={this.addPlant} sortPlants={this.sortPlants} handleSearch={this.handleSearch}/>
                </React.Fragment>
              )} />
              <Route path="/about" component={About} />
            </div>
            <TabBarBottom toggleAddPop={this.toggleAddPop}/>
          </div>
        </div>
      </Router>
    );
  }

}

export default App;
