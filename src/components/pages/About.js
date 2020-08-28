import React from 'react';
import TabBarBottom from '../layout/TabBarBottom';
import { CSVLink } from "react-csv";
import {CSVReader} from 'react-papaparse';
import Radium from 'radium';


function About(props) {

    const csvStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        //marginBottom: '10px',
    }

    const uploadStyle = {
        dropArea: {
            borderColor: 'pink',
            borderRadius: '20px',
            width: '300px',
            height: '70px',
            
          },
          dropAreaActive: {
            borderColor: 'red',
          },
          dropFile: {
            width: '300px',
            height: '150px',
            borderRadius: '20px',
            background: '#transparent',
            // border: 'solid 1px',
          },
          fileSizeInfo: {
            color: '#000',
            background: 'transparent',
            borderRadius: 3,
            lineHeight: 1,
            marginBottom: '0.6em',
            padding: '0 0.4em',
          },
          fileNameInfo: {
            color: '#000',
            background: 'transparent',
            borderRadius: 3,
            fontSize: 14,
            lineHeight: 1,
            padding: '0 0.4em',
          },
          removeButton: {
            color: '#cd2c2c',
          },
          progressBar: {
            backgroundColor: 'pink',
          },
          
    }

    const headers=[
        {label: 'ID', key: "id"},
        {label: 'Info', key: "info"}
    ]

    var data = [];

    var getAllIDs = localStorage.getItem('');
    //data.push({allIDs: getAllIDs})
    if(getAllIDs){
        var allIDsArray = getAllIDs.split('\0');
        for(let i = 0; i < allIDsArray.length-1; i++){
            var ID = allIDsArray[i];
            data.push({id: ID, info: localStorage.getItem(allIDsArray[i]).split('\0')})
        }
    }  

    var uploadedData = [];

    /*                  CSV Reader                     */

    const handleOnDrop = (data) => {
        console.log('---------------------------')
        console.log(data)
        console.log('---------------------------')
        uploadedData = data;
    }
    
    const handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
    }
    
    const handleOnRemoveFile = (data) => {
        console.log('---------------------------')
        console.log(data)
        console.log('---------------------------')
    }

    /*******************************************************/

    const uploadData = () => {
        var allIDs = "";
        for (let i = 1; i < uploadedData.length; i++){
            allIDs = allIDs += uploadedData[i].data[0] + '\0';
            //const regex = /uploadedData[i].meta.delimiter/g;
            localStorage.setItem(uploadedData[i].data[0],(uploadedData[i].data[1].replace(/,/g,'\0')));
        }
        localStorage.setItem('',allIDs);
    }

    

    return (
        <div>
            
            <h2 style={{textAlign: 'center'}}>About</h2>
            <p>This web app was made to keep track of plant waterings! It saves all data locally on the browser or on the web app if saved to the homescreen.</p>
            
            <h2 style={{textAlign: 'center'}}>Saving/Transfering Data</h2>
            <p>To transfer this data to another phone or another browser. First, download the data from the following link</p>
            <div style={{textAlign: 'center', marginBottom: '10px'}}>
                <CSVLink data={data} headers={headers}>
                    <button key="download" style={styles.buttonStyle}>Download Data</button>
                </CSVLink>
            </div>
            
            <p>Then upload that csv file to the following:</p>
            <div style={csvStyle}>
                
                <CSVReader
                    onDrop={handleOnDrop}
                    onError={handleOnError}
                    noDrag
                    addRemoveButton
                    onRemoveFile={handleOnRemoveFile}
                    style={uploadStyle}
                >
                    <span>Click to upload.</span>
                </CSVReader>
                <button key="upload" onClick={uploadData} style={styles.buttonFlexStyle}>Submit</button>
                
                
            </div>
            <TabBarBottom/>
        </div>
    )

}

const styles = {
    buttonStyle: {
        background:'#ffdfef', 
        borderRadius:'5px', 
        border:'none',
        padding: '0 5px',
        height: '30px',
        ':hover': {
            background: '#fff0f7',
        }
    },
    buttonFlexStyle: {
        background:'#ffdfef', 
        borderRadius:'5px', 
        border:'none',
        padding: '0 5px',
        height: '30px',
        margin: 'auto 0 auto 10%',
        ':hover': {
            background: '#fff0f7',
        }
    },
    uploadStyle: {
        ':hover': {
            border: '#fff0f7',
        },
    }
}


export default Radium(About);
