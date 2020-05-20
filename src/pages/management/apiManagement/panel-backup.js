import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import {makeStyles} from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import Alert from '@material-ui/lab/Alert';
import {Box, Card as MuiCard, Divider as MuiDivider, Grid, Tab, Tabs, Typography, CardContent,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Button,
} from "@material-ui/core";
import {
    ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';
import {spacing} from "@material-ui/system";
import blue from '@material-ui/core/colors/blue';
const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    get: {
        width: theme.typography.pxToRem(80),
        textAlign: "center",
        fontWeight: theme.typography.fontWeightBold,
        color: blue[500],
    },
    response: {

    }
}));

function API({method, uri, responseCode, responseBody}) {
    const classes = useStyles();
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Box color={"primary"} className={classes.get}>{method}</Box>
                <Typography className={classes.heading}>{uri}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container>
                    <Grid item xs={2}>
                        응답코드
                        <Divider my={2}/>
                    </Grid>
                    <Grid item xs={10}>
                        {responseCode}
                        <Divider my={2}/>
                    </Grid>
                    <Grid item xs={12}>
                        응답결과
                        <Divider my={2}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                                    <pre className={classes.response}>
                                        {JSON.stringify(responseBody, null, 4)}
                                    </pre>
                        </Box>
                    </Grid>
                </Grid>


            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

const rows = [
    {method: 'GET', uri: '/_cat/aliases', responseCode: 200,
        responseBody: [
            {
                "alias": "string",
                "filter": "string",
                "index": "string",
                "index_routing": "string",
                "search_routing": "string"
            }
        ]
    },
    {method: 'GET', uri: '/_cat/allocation', responseCode: 200,
        responseBody: [
            {
                "disk_available": "string",
                "disk_ratio": "string",
                "disk_used": "string",
                "ip": "string",
                "node": "string",
                "shards": "string"
            }
        ]
    },
    {method: 'GET', uri: '/_cat/count', responseCode: 200,
        responseBody: [
            {
                "count": "string",
                "epoch": "string",
                "timestamp": "string"
            }
        ]
    },
    {method: 'GET', uri: '/_cat/fielddata', responseCode: 200,
        responseBody: [
            {
                "field": "string",
                "host": "string",
                "id": "string",
                "ip": "string",
                "node": "string",
                "size": "string"
            }
        ]
    },
]

function ApiManagement() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <Helmet title="API"/>
            <Typography variant="h3" gutterBottom display="inline">
                API
            </Typography>

            <Divider my={6}/>

            <div className={classes.root}>

                <Typography variant="h6">
                    Cat
                </Typography>
                {rows.map(row => <API {...row}></API>)}

                <br/>
                <Typography variant="h6">
                    Cluster
                </Typography>
                {rows.map(row => <API {...row}></API>)}

                <br/>
                <Typography variant="h6">
                    Node
                </Typography>
                {rows.map(row => <API {...row}></API>)}

                <br/>
                <Typography variant="h6">
                    Indices
                </Typography>
                {rows.map(row => <API {...row}></API>)}

                <br/>
                <Typography variant="h6">
                    Tasks
                </Typography>
                {rows.map(row => <API {...row}></API>)}
            </div>

        </>
    );
}

export default ApiManagement;
