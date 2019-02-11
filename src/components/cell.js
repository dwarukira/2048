import React from "react"



const Cell = ({ id, value }) => (
    <div className="grid-cell" id={id}> { value != 0 ? (<div className={`tile tile-${value}`}>{value}</div>) : ''   } </div>
);

export default Cell;
