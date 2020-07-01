import React from "react";
import styled from "styled-components";
import {NavLink as RouterNavLink} from "react-router-dom";

import Helmet from 'react-helmet';

import {
    Box,
    Table, TableRow, TableCell, TableHead, TableBody,
    TextField as MuiTextField,
    Breadcrumbs as MuiBreadcrumbs,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    Grid,
    Link,
    Typography
} from "@material-ui/core";

import {spacing} from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const TextField = styled(MuiTextField)(spacing);



function ResultDocument(){
    return(
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell> 787770 </TableCell>
                    <TableCell> 787770 </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell> 787770 </TableCell>
                    <TableCell> 787770 </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell> 787770 </TableCell>
                    <TableCell> 787770 </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell> 787770 </TableCell>
                    <TableCell> 787770 </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell> 787770 </TableCell>
                    <TableCell> 787770 </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell> 787770 </TableCell>
                    <TableCell> 787770 </TableCell>
                </TableRow>
                
            </TableBody>
        </Table>
    );

}


function RankingTuningResults() {

    return (<Table>
        <TableHead>
            <TableRow>
                <TableCell> # </TableCell>
                <TableCell> 결과 문서 </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow hover>
                <TableCell>1</TableCell>
                <TableCell><ResultDocument /></TableCell>
            </TableRow>
            <TableRow hover>
                <TableCell>2</TableCell>
                <TableCell>결과문서2</TableCell>
            </TableRow>
            <TableRow hover>
                <TableCell>3</TableCell>
                <TableCell>결과문서3</TableCell>
            </TableRow>
            <TableRow hover>
                <TableCell>4</TableCell>
                <TableCell>결과문서4</TableCell>
            </TableRow>
            <TableRow hover>
                <TableCell>5</TableCell>
                <TableCell>결과문서5</TableCell>
            </TableRow>
            <TableRow hover>
                <TableCell>6</TableCell>
                <TableCell>결과문서6</TableCell>
            </TableRow>
            <TableRow hover>
                <TableCell>7</TableCell>
                <TableCell>결과문서7</TableCell>
            </TableRow>
            <TableRow hover>
                <TableCell>8</TableCell>
                <TableCell>결과문서8</TableCell>
            </TableRow>
            <TableRow hover>
                <TableCell>9</TableCell>
                <TableCell>결과문서9</TableCell>
            </TableRow>
            <TableRow hover>
                <TableCell>10</TableCell>
                <TableCell>결과문서10</TableCell>
            </TableRow>
        </TableBody>
    </Table>);
}


function RankingTuningCard() {
    return (
        <Card mb={6}>
            <CardContent>
                <Box display="flex" fullWidth p={2} style={{height:"100%"}}>
                    <Grid item xs={6}>
                        <TextField multiline rows={36} fullWidth></TextField>
                    </Grid>
                    
                    <Divider orientation="vertical" flexItem></Divider>

                    <Grid item xs={6}>
                        <RankingTuningResults />
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
}

function RankingTuning() {
    return (
        <React.Fragment>
            <Helmet title="Blank"/>
            <Typography variant="h3" gutterBottom display="inline">
                랭킹튜닝
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} exact to="/">
                    Dashboard
                </Link>
                <Link component={NavLink} exact to="/">
                    Pages
                </Link>
                <Typography>랭킹튜닝</Typography>
            </Breadcrumbs>

            <Divider my={6}/>

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <RankingTuningCard/>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default RankingTuning;
