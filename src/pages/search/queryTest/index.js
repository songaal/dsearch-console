import React from "react";
import styled from "styled-components";
import Helmet from 'react-helmet';

import {
    Card,
    CardContent,
    Divider as MuiDivider,
    Grid,
    Link,
    Typography,
    TextareaAutosize,
    Box,
} from "@material-ui/core";
import {spacing, display, border, sizing, boxSizing } from "@material-ui/system";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';


const Divider = styled(MuiDivider)(spacing);


const useStyles = makeStyles((theme) => ({
    table: {
        padding: '10px'
    },
    addIcon: {
        verticalAlign: "top"
    }
}));

let json = {
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

function getType (json) {
    return typeof json === 'object' ? json.length === undefined ? 'object' : 'array': typeof json;
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

function QueryTest() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Helmet title="쿼리테스트"/>
            <Typography variant="h3" gutterBottom display="inline">
                쿼리테스트
            </Typography>

            <Divider my={6}/>

            <Grid container spacing={6}>
                <Grid item xs={12} >
                    {json2html(json)}
                </Grid>

            </Grid>
        </React.Fragment>
    );
}

export default QueryTest;
