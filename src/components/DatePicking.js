import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePicking(props) {

  //const handleChange = date => setDate(date);

  const handleChange = date => {
    props.onDateSubmit(date)
  };


  return <DatePicker  onChange={handleChange} placeholderText={props.DOLW} className={props.cName} closeOnScroll={e => e.target === document} withPortal portalId="root-portal"/>;
}
