import React, {useState} from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import {makeStyles} from '@material-ui/core/styles';
import Helmet from 'react-helmet';

import {
    Box,
    Card as MuiCard,
    Divider as MuiDivider,
    Typography,
    CardContent,
    TextField, FormControl, InputLabel, Select, MenuItem
} from "@material-ui/core";

import {spacing} from "@material-ui/system";

import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const useStyles = makeStyles((theme) => ({
    textField: {
        minWidth: "250px"
    }
}));

function ApiManagement() {
    const classes = useStyles();
    const [url, setUrl] = useState("/static/index.json")

    function handleChange(event){
        setUrl(event.target.value)
    }

    return (
        <React.Fragment>
            <Helmet title="API"/>

            <Box>
                <FormControl className={classes.formControl}>
                    <TextField label="주소"
                               value={url}
                               onChange={handleChange}
                               className={classes.textField}
                    />
                </FormControl>
            </Box>

            <br/>

            <Typography variant="h3" gutterBottom display="inline">
                API
            </Typography>

            <Divider my={6}/>

            <SwaggerUI url={url} />

        </React.Fragment>
    );
}

export default ApiManagement;
