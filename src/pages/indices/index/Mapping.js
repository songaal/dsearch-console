import React from "react";
import {connect} from "react-redux"
import styled from "styled-components";

import {
    Box as MuiBox,
    Card as MuiCard,
    CardContent,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextareaAutosize
} from "@material-ui/core";

import {makeStyles} from '@material-ui/core/styles';
import {positions, spacing} from "@material-ui/system";
import Json2html from "~/components/Json2Html"

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

function deserializer(parentKey, value, entries) {
    if (typeof value === "object" && value.length > 0) {
        // list
        for (let i = 0; i < value.length; i++ ) {
            entries = Object.assign(deserializer("[" + i + "]", value, entries), entries)
        }
    } else if (typeof value === "object") {
        // object

    } else {
        // value
        entries[parentKey] = value
    }
    return entries
}


function FormCard({json}) {
    const entries = {}
    deserializer("", json, entries)
    console.log(entries)

    return (
        <div>
            <Card>
                <CardContent m={0}>
                    <table>
                        <tbody>

                        </tbody>
                    </table>
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
    const classes = useStyles();
    const [chk, setChk] = React.useState('form');

    function handleRadioChange(e) {
        setChk(e.target.value)
    }

    console.log(mappings)

    return (
        <React.Fragment>

            <FormControl component="fieldset">
                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                    <FormControlLabel value="form" checked={chk === "form"} onChange={handleRadioChange} control={<Radio color="primary" />} label="폼" />
                    <FormControlLabel value="json" checked={chk === "json"} onChange={handleRadioChange} control={<Radio color="primary" />} label="json" />
                </RadioGroup>
            </FormControl>

            <Box mt={2}>
                {
                    chk === "form" ? <FormCard json={mappings} /> : <JsonCard json={mappings} />
                }
            </Box>

        </React.Fragment>
    );
}

export default connect(store => ({...store.indicesReducers}))(Mapping);
