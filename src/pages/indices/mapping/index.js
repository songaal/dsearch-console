import React from "react";
import styled from "styled-components";

import Helmet from 'react-helmet';

import {
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    Grid,
    Typography,
    Menu,
    MenuItem,
    Button,
    Box,
} from "@material-ui/core";

import {spacing} from "@material-ui/system";

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

function Mapping() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Helmet title="맵핑"/>

            <Box>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    Open Menu
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </Box>

            <Typography variant="h3" gutterBottom display="inline">
                맵핑
            </Typography>

            <Divider my={6}/>

            <Grid container spacing={6}>
                <Grid item xs={12}>

                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Mapping;
