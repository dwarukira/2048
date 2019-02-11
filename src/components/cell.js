import React from "react"



const Cell = ({ id, value }) => (
    <div className="grid-cell" id={id}> { value != 0 ? value: ''   } </div>
)
export default Cell;