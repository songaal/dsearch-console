import React from "react";
import PropType from 'prop-types'

function DynamicTable({ type }) {
    console.log(type)




}
DynamicTable.prototype = {
    type: PropType.symbol.isRequired
}



return DynamicTable