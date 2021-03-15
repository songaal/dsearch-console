import React from "react";
import {connect} from "react-redux";

import Set from './Set'
import Synonym from './Synonym'
import Space from './Space'
import Synonym2Way from './Synonym2Way'
import Custom from './Custom'

function WrapperTabPanel({ activeIndex, settings, dataSet }) {
    const setting = settings[activeIndex]
    const dictionary = setting['id']
    const type = setting['type']

    // console.log("settings ", settings);
    // console.log("dictionary ", dictionary);
    // console.log("type ", type);
    // console.log("dataSet ", dataSet);

    let Viewer = null
    switch (type) {
        case "SET": Viewer = Set; break;
        case "SYNONYM": Viewer = Synonym; break;
        case "SPACE": Viewer = Space; break; // Set 과 동일함...
        case "COMPOUND": Viewer = Synonym; break; // Synonym 과 동일함...
        case "SYNONYM_2WAY": Viewer = Synonym2Way; break; // Synonym 과 동일함...
        case "CUSTOM": Viewer = Custom; break; // Synonym 과 동일함...
        default: Viewer = () => <React.Fragment>지원하지 않는 타입 입니다.</React.Fragment>
    }

    return (
        <React.Fragment>
            <Viewer dictionary={dictionary}
                    setting={setting}
                    dataSet={dataSet}
            />
        </React.Fragment>
    )
}

export default connect(store => ({...store.dictionaryReducers}))(WrapperTabPanel)