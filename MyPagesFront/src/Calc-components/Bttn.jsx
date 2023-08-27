import React from "react";
import './Bttn.css';

const isOperator = val => {
    return !isNaN(val) || val === "." || val === "=";
};

export const Bttn = props => (
    <div className={`button-wrapper ${
        isOperator(props.children) ? null : "operator"
        }`}
        onClick={()=>props.handleClick(props.children)}
        >
        {props.children}
    </div>
);