import React, {Component, useState} from 'react';
import Plant from '../Plant'
import PropTypes from 'prop-types';

import { MuuriComponent } from "muuri-react";
import { useFilter, generateItems, options } from "./util";
import { Select, Header, Footer, Button, Input, Demo } from "./component";

import "./muuri.css";

export default function MuuriGrid(props){
    const [items, setItems] = useState(generateItems());

    // Sort state.
    const [sort, setSort] = React.useState({
        value: "title"
    });

    // Filter state.
    const [filter, setFilter] = React.useState({
        search: "",
        value: "all"
    });

    // Filter method.
    const filterFunction = useFilter(filter.value, filter.search);
    // const children = props.plants.map((plant) => (
    //     <Plant key = {plant.id} plant = {plant}
    //     addDOLW = {props.addDOLW} delPlant={props.delPlant} togglePop = {props.togglePop}/>
    //     //<Item key={plant.id}/>
    // ));

    const children = items.map(({ id, color, title, width, height }) => (
        <Item
          key={id}
          color={color}
          title={title}
          width={width}
          height={height}
          remove={() => setItems(items.filter(item => item.id !== id))}
        />
      ));

    return (
        <React.Fragment>
            <Demo>
            <Header>
            <Input
                onKeyUp={e => setFilter({ ...filter, search: e.target.value })}
            />
            <Select
                values={["All"]}
                onChange={e => setFilter({ ...filter, value: e.target.value })}
            />
            <Select
                values={["Title"]}
                onChange={e => setSort({ ...sort, value: e.target.value })}
            />
            </Header>
            <MuuriComponent
                {...options}>
                {children}
            </MuuriComponent>
            </Demo>
        </React.Fragment>
    );
    
}
const Item = ({ color, width, height, title, remove }) => {
    return (
      <div className={`item`}>
        <div className="item-content">
          <div className="card">
            <div className="card-title">{title}</div>
            <div className="card-remove">
              <i className="material-icons" onMouseDown={remove}>
                &#xE5CD;
              </i>
            </div>
          </div>
        </div>
      </div>
    );
  };