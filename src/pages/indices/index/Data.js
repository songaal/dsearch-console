import React, {useState} from "react";
import styled from "styled-components";
import {makeStyles} from '@material-ui/core/styles';
import {Box, Divider as MuiDivider, FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import {spacing} from "@material-ui/system";
import DataEditTable from "./DataEditTable";
import IndexedDataTable from "./IndexedDataTable";

const useStyles = makeStyles((theme) => ({}));

const Divider = styled(MuiDivider)(spacing);

function Index() {
    const classes = useStyles();
    const [chk, setChk] = useState('indexed'); // source, indexed

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

export default Index