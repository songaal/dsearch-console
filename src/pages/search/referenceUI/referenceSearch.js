import React, { useState } from "react"
import styled from "styled-components";
import Helmet from 'react-helmet';
import {
    Box as MuiBox,
    Button as MuiButton,
    Divider as MuiDivider,
    FormControl as MuiFormControl,
    Grid as MuiGrid,
    IconButton as MuiIconButton,
    TextareaAutosize as MuiTextareaAutosize,
    TextField as MuiTextField,
    Typography as MuiTypography,
    Card as MuiCard,
    CardContent as MuiCardContent,
    Hidden,
    List,
    ListItem,
} from "@material-ui/core";
import {

} from "@material-ui/icons";

import {
    ArrowUp as ArrowUpIcon,
    ArrowDown as ArrowDownIcon,
    PlusSquare as PlusSquareIcon,
    MinusSquare as MinusSquareIcon,
} from "react-feather";

import { makeStyles } from "@material-ui/styles";
import {borders, display, palette, sizing, spacing} from "@material-ui/system";
import * as Color from '@material-ui/core/colors';

const Box = styled(MuiBox)(spacing, palette, sizing, display, borders);
const Divider = styled(MuiDivider)(spacing, palette, sizing, display, borders);
const Grid = styled(MuiGrid)(spacing, palette, sizing, display, borders);
const Typography = styled(MuiTypography)(spacing, palette, sizing, display, borders);
const TextField = styled(MuiTextField)(spacing, palette, sizing, display, borders);
const IconButton = styled(MuiIconButton)(spacing, palette, sizing, display, borders);
const Button = styled(MuiButton)(spacing, palette, sizing, display, borders);
const TextareaAutosize = styled(MuiTextareaAutosize)(spacing, palette, sizing, display, borders);
const FormControl = styled(MuiFormControl)(spacing, palette, sizing, display, borders);
const Card = styled(MuiCard)(spacing, palette, sizing, display, borders);
const CardContent = styled(MuiCardContent)(spacing, palette, sizing, display, borders);


const useStyles = makeStyles(theme => ({
    textarea: {width: "100%", minHeight: "200px"}
}));


function ReferenceSearch() {
    const classes = useStyles()


    return (
        <React.Fragment>
            <Helmet title="검색결과"/>
            <Box>

            </Box>
            <Button>Up</Button>

        </React.Fragment>
    )
}

export default ReferenceSearch;