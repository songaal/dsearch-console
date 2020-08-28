import React, {useState} from "react";
import {Box, FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import DataEditTable from "./DataEditTable";
import IndexedDataTable from "./IndexedDataTable";

function Data() {
    const [chk, setChk] = useState('source'); // source, indexed

    function handleRadioChange(e) {
        setChk(e.target.value)
    }

    return (
        <React.Fragment>

            <FormControl component="fieldset">
                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                    <FormControlLabel value="source" checked={chk === "source"} onChange={handleRadioChange}
                                      control={<Radio color="primary"/>} label="기본"/>
                    <FormControlLabel value="indexed" checked={chk === "indexed"} onChange={handleRadioChange}
                                      control={<Radio color="primary"/>} label="분석된 색인어"/>
                </RadioGroup>
            </FormControl>

            <Box mt={2}>
                {
                    chk === "source" ? <DataEditTable/> : <IndexedDataTable />
                }
            </Box>
        </React.Fragment>
    );
}

export default Data