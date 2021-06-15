import React from "react";
import {connect} from "react-redux"
import styled from "styled-components";
import Json2html from "~/components/Json2Html"

import {
    Box as MuiBox,
    Card as MuiCard,
    CardContent,
    FormControl,
    FormControlLabel,Checkbox,
    Radio,
    RadioGroup,
    TextareaAutosize
} from "@material-ui/core";

import {makeStyles} from '@material-ui/core/styles';
import {positions, spacing} from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 250,
    },
    root: {
        flexGrow: 1,
        width: '100%',
    },
    edit: {
        width: '100%'
    },
    addIcon: {
        verticalAlign: "top"
    },
    table: {
        padding: '10px'
    },
}));

const Box = styled(MuiBox)(spacing, positions);
const Card = styled(MuiCard)(spacing);

function FormCard({json, detail}) {

    return (
        <div>
            <Card>
                <CardContent m={2}>
                    <Box style={{ overflow: "auto", minWidth: "700px" }}>
                        {Json2html({ json: JSON.stringify(json), type: "mappings", mode: "view", detail: detail })}
                    </Box>
                </CardContent>
            </Card>
        </div>
    )
}

function JsonCard({json}) {
    const classes = useStyles();

    return (<div>
        <Card>
            <CardContent>
                <Box>
                    <TextareaAutosize rowsMin={50}
                                      className={classes.edit}
                                      disabled
                                      value={JSON.stringify(json, null, 4)}
                    />
                </Box>
            </CardContent>
        </Card>
    </div>)
}

function Mapping({mappings}) {
    const [chk, setChk] = React.useState('form');
    const [detail, setDetail] = React.useState(false);
    
    function handleRadioChange(e) {
        setChk(e.target.value)
    }

    return (
        <React.Fragment>

            <FormControl component="fieldset" style={{marginTop: "20px"}}>
                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                    <FormControlLabel value="form" checked={chk === "form"} onChange={handleRadioChange}
                                      control={<Radio color="primary"/>} label="폼"/>
                    <FormControlLabel value="json" checked={chk === "json"} onChange={handleRadioChange}
                                      control={<Radio color="primary"/>} label="json"/>
                </RadioGroup>

                <FormControlLabel value="상세보기"
                        onChange={(e) => { setDetail(e.target.checked) }}
                        checked={detail}
                        control={<Checkbox color="primary" />}
                        label="상세보기" />
            </FormControl>

            <Box mt={0}>
                {
                    chk === "form" ?
                        <FormCard json={mappings} detail={detail}/>
                        :
                        <JsonCard json={mappings}/>
                }
            </Box>

        </React.Fragment>
    );
}

export default connect(store => ({...store.indicesReducers}))(Mapping);
