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
} from "@material-ui/core";
import {spacing, display, border, sizing, boxSizing } from "@material-ui/system";

const Divider = styled(MuiDivider)(spacing);


let json = {
    "ADDDESCRIPTION" : {
        "type" : "text",
        "analyzer" : "korean"
    },
    "host" : {
        "type" : "text",
    },
    "message" : {
        "type" : "text",
        "fields" : {
            "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
            }
        }
    },
    "path" : {
        "type" : "text",
        "fields" : {
            "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
            }
        }
    },
    "tags" : {
        "type" : "text",
        "fields" : {
            "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
            }
        }
    }
}

function getType (json) {
    return typeof json === 'object' ? json.length === undefined ? 'object' : 'array': typeof json;
}

function json2html(json) {
    const type = getType(json)
    const entry = Object.entries(json)

    // let html =''
    // if (type === 'object') {
    //     html = '<div class="object">'
    //     for (let i = 0; i < entry.length; i++) {
    //         html += '<div class="key">'
    //         html += entry[i][0]
    //         html += '</div>'
    //         html += '<div class="value">'
    //         html += json2html(entry[i][1])
    //         html += '</div>'
    //     }
    //     html += '</div>'
    // } else if (type === 'array') {
    //     html = '<ol class="list">'
    //     for (let i = 0; i < entry.length; i++) {
    //         html += '<li class="value">'
    //         html += json2html(entry[i][1])
    //         html += '</li>'
    //     }
    //     html += '</ol>'
    // } else {
    //     html = json
    // }

    // return html
}

function QueryTest() {

    const convert = (json) => {
        const type = getType(json)
        const entry = Object.entries(json)
        if (type === 'object') {
            return (
                <Card>
                    <CardContent>
                        {
                            entry.map((o, i) => {
                                return (
                                    <Grid container key={i}>
                                        <Grid item>
                                            {o[0]}:
                                        </Grid>
                                        <Grid item>
                                             {convert(o[1])}
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }
                    </CardContent>
                </Card>
            )
        } else if (type === 'array') {
            return (<span></span>)
        } else {
            return (
                <span> {json} </span>
            )
        }
    }

    return (
        <React.Fragment>
            <Helmet title="쿼리테스트"/>
            <Typography variant="h3" gutterBottom display="inline">
                쿼리테스트
            </Typography>

            <Divider my={6}/>

            <Grid container spacing={6}>
                <Grid item xs={12} >
                    {
                        convert(json)
                    }
                </Grid>

            </Grid>
        </React.Fragment>
    );
}

export default QueryTest;
