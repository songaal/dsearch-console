import React from "react";

function QueryTest() {
    open(process.env.REACT_APP_KIBANA_URL, '_blank', "menubar=no,addressbar=no,statusbar=no")
    history.go(-1)
    return null;
}

export default QueryTest;
