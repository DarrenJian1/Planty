import React from "react";
import RemoveRow from './RemoveRow';

export const columns = [{
        dataField: 'index',
        text: 'id',
    },
    {
    dataField: 'DOLW',
    text: 'Last Watered',
    sort: true
    },
    {
        dataField: 'remove',
        text: '',
        editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
            <RemoveRow />//popup={this.props.popup}/>
          )
  }
];
  
export const defaultSorted = [{
    dataField: 'index',
    order: 'asc'
}];

  export const options = {
    withFirstAndLast: true, // Hide the going to First and Last page button
    hidePageListOnlyOnePage: true,
    sizePerPageList: [{
      text: '5', value: 5
    }]
  };

  