import React from "react";
import styled from "styled-components";

import {
    Box as MuiBox,
    Button as MuiButton,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextareaAutosize,
    Typography as MuiTypography
} from "@material-ui/core";

import {makeStyles} from '@material-ui/core/styles';
import {palette, positions, spacing} from "@material-ui/system";
import AddIcon from "@material-ui/icons/Add";
import Json2html from "~/components/Json2Html"

const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 250,
    },
    root: {
        flexGrow: 1,
        width: '100%',
        // backgroundColor: theme.palette.background.paper,
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

const Divider = styled(MuiDivider)(spacing);
const Box = styled(MuiBox)(spacing, positions);
const Card = styled(MuiCard)(spacing);
const Typography = styled(MuiTypography)(spacing, positions);
const Button = styled(MuiButton)(spacing, positions, palette);


const json = {
    "ADDDESCRIPTION": {
        "type": "text",
        "analyzer": "korean"
    },
    "CATEGORYCODE1": {
        "type": "integer"
    },
    "TEST_OBJECT_TYPE": {
        "properties": {
            "age": {"type": "integer"},
            "name": {
                "properties": {
                    "first": {"type": "text"},
                    "last": {"type": "text"}
                }
            }
        }
    },
    "TEST_NESTED_TYPE" : {
        "type" : "nested",
        "properties" : {
            "last_name" : {
                "type" : "text"
            },
            "vehicle" : {
                "type" : "keyword"
            }
        },
        "analyzer": "korean"
    },
    "TEST_NESTED_DEPTH_TYPE" : {
        "type" : "nested",
        "properties" : {
            "last_name" : {
                "type" : "text"
            },
            "vehicle" : {
                "type" : "nested",
                "properties" : {
                    "make" : {
                        "type" : "text"
                    },
                    "model" : {
                        "type" : "text"
                    }
                }
            }
        },
        "analyzer": "korean"
    },
    "CATEGORYCODE2": {
        "type": "integer"
    },
    "CATEGORYCODE3": {
        "type": "integer"
    },
    "CATEGORYCODE4": {
        "type": "integer"
    },
    "DATASTAT": {
        "type": "keyword"
    },
    "DELIVERYPRICE": {
        "type": "integer"
    },
    "GROUPSEQ": {
        "type": "integer"
    },
    "MOBILEPRICE": {
        "type": "integer"
    },
    "PCPRICE": {
        "type": "integer"
    },
    "POPULARITYSCORE": {
        "type": "integer"
    },
    "PRODUCTCODE": {
        "type": "keyword"
    },
    "PRODUCTIMAGEURL": {
        "type": "keyword"
    },
    "PRODUCTMAKER": {
        "type": "keyword"
    },
    "PRODUCTNAME": {
        "type": "text",
        "analyzer": "korean"
    },
    "REGISTERDATE": {
        "type": "date"
    },
    "SHOPCODE": {
        "type": "keyword"
    },
    "SHOPCOUPON": {
        "type": "keyword"
    },
    "SHOPGIFT": {
        "type": "keyword"
    },
    "SHOPPRODUCTCODE": {
        "type": "keyword"
    },
    "SIMPRODMEMBERCNT": {
        "type": "integer"
    },
    "host": {
        "type": "text",
        "fields": {
            "keyword": {
                "type": "keyword",
                "ignore_above": 256
            }
        }
    },
    "message": {
        "type": "text",
        "fields": {
            "keyword": {
                "type": "keyword",
                "ignore_above": 256
            }
        }
    },
    "path": {
        "type": "text",
        "fields": {
            "keyword": {
                "type": "keyword",
                "ignore_above": 256
            }
        }
    },
    "tags": {
        "type": "text",
        "fields": {
            "keyword": {
                "type": "keyword",
                "ignore_above": 256
            }
        }
    }
}


function FormCard({json}) {
    return (
        <div>
            <Card>
                <CardContent m={0}>
                    {Json2html(json)}
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
                                      placeholder=""
                                      value={JSON.stringify(json, null, 4)}
                    />
                </Box>
            </CardContent>
        </Card>
    </div>)
}

function Mapping() {
    const classes = useStyles();
    const [chk, setChk] = React.useState('form');

    function handleRadioChange(e) {
        setChk(e.target.value)
    }

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
                    chk === "form" ? <FormCard json={JSON.stringify(json)} /> : <JsonCard json={json} />
                }
            </Box>

        </React.Fragment>
    );
}

export default Mapping;
