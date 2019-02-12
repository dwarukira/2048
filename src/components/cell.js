import React from "react"



const Cell = ({ id, value, ...rest}) => (
    <div className="grid-cell" id={id}>
        { value !== 0 ?
            (<div className={`tile tile-${value}`} {...rest}>{value}</div>)
            : ''
        }
    </div>
);

export default Cell;
