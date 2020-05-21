import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Async from '~/components/Async';
import Helmet from 'react-helmet';
import AntTabs from "~/components/AntTabs";
import { setIndicesMapping } from '@actions/indicesMappingActions';

import {
    Card as MuiCard,
    CardContent,
    CardHeader,
    Divider as MuiDivider,
    Grid,
    Typography as MuiTypography,
    Box as MuiBox,
    FormControl,
    Select,
    FormHelperText,
    InputLabel,
    MenuItem, Paper, Table, TableHead, TableRow, TableBody, Checkbox, TableContainer, TableCell,
    Link,
    AppBar,
    Tab,
    Tabs,
    TextareaAutosize,
    Button as MuiButton,
    TextField,
    Radio, RadioGroup, FormControlLabel, FormLabel
} from "@material-ui/core";

import {makeStyles, withStyles} from '@material-ui/core/styles';
import {spacing, positions, palette} from "@material-ui/system";
import SearchIcon from "@material-ui/icons/Search";
import {connect} from "react-redux";
import indicesMappingReducers from "../../../redux/reducers/indicesMappingReducers";
import AddIcon from "@material-ui/icons/Add";

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
}), {withTheme: true});

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

function json2html(json) {
    json = json.properties ? json.properties : json
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles();

    const entries = Object.entries(json)
    return (
        <table border={1} width={"100%"} cellSpacing={0} cellPadding={0} className={classes.table}>
            <thead>
            <tr>
                <th>#</th>
                <th>이름</th>
                <th>타입</th>
                <th>속성</th>
            </tr>
            </thead>
            <tbody>
            {
                entries.map((entry, index) => {
                    const name = entry[0];
                    const value = entry[1];
                    const type = entry[1]['type'] === undefined
                    && Object.keys(entry[1]).length === 1
                    && entry[1]['properties'] !== undefined ?
                        'object' : entry[1]['type'];

                    const etc = Object.entries(value)
                        .filter(v => v[0] !== 'type')
                        .map(v => v[0] + ':' + JSON.stringify(v[1]))
                        .join(<br/>)

                    if (type === 'object' || type === 'nested') {
                        return (
                            <>
                                <tr>
                                    <td align={"center"}>{index}</td>
                                    <td>
                                        <AddIcon fontSize={"small"} className={classes.addIcon} color="primary"/>
                                        {name}
                                    </td>
                                    <td>{type}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td colSpan={3}>
                                        {json2html(value)}
                                    </td>
                                </tr>
                            </>
                        )
                    } else {
                        return (
                            <tr>
                                <td align={"center"}>{index}</td>
                                <td>{name}</td>
                                <td>{type}</td>
                                <td>{etc}</td>
                            </tr>
                        )
                    }
                })
            }
            </tbody>
        </table>
    )
}

function FormCard({json}) {
    return (
        <div>
            <Card>
                <CardContent m={0}>
                    {json2html(json)}
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


function Mapping({dispatch}) {
    const classes = useStyles();
    const [indices, setIndices] = React.useState('VM');
    const [chk, setChk] = React.useState('form');
    const [tabIndex, setTabIndex] = React.useState(0);


    const tabs = [
        {label: "매핑"},
        {label: "셋팅"}
    ];

    const handleRadioChange = (e) => {
        setChk(e.target.value)
    }
    const handleChange = (event) => {
        setIndices(event.target.value);
    };
    return (
        <React.Fragment>
            <Helmet title="템플릿 수정"/>

            <Typography variant="h3"
                        gutterBottom
                        display="inline"
            >
                템플릿 수정
            </Typography>

            <Divider my={6}/>

            <Grid container>
                <Grid item xs={6}>
                    <Box align={'left'}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">템플릿</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={indices}
                                onChange={handleChange}
                            >
                                <MenuItem value={"VM"}>VM-TEMPLATE</MenuItem>
                                <MenuItem value={"V01"}>VM-TEST-TEMPLATE</MenuItem>
                                <MenuItem value={"V02"}>VM-AAAAA-TEMPLATE</MenuItem>
                                <MenuItem value={"V03"}>VM-BBBBB-TEMPLATE</MenuItem>

                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box align={'right'}>
                        <Button variant="outlined" color="primary" >저장</Button>
                        <Button variant="outlined" onClick={() => history.go(-1)} ml={1}>취소</Button>
                    </Box>
                </Grid>
            </Grid>

            <br/>
            <FormControl>
                <TextField label="인덱스 패턴" value={"VM-TEST-*"}/>
            </FormControl>

            <br/><br/>


            <AntTabs tabs={tabs}/>

            <br/>

            <FormControl component="fieldset">
                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                    <FormControlLabel value="form" checked={chk === "form"} onChange={handleRadioChange} control={<Radio color="primary" />} label="폼" />
                    <FormControlLabel value="json" checked={chk === "json"} onChange={handleRadioChange} control={<Radio color="primary" />} label="json" />
                </RadioGroup>
            </FormControl>

            {
                chk === "form" ? <FormCard json={json} /> : <JsonCard json={json} />
            }

        </React.Fragment>
    );
}

export default connect(store => ({ mapping: store.indicesMappingReducers.mapping }))(Mapping);