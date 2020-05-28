import React, { useEffect } from "react";
import styled from "styled-components";
import {NavLink as RouterNavLink} from "react-router-dom";
import { setServerSummaryActions } from '@actions/serverSummaryActions'
import Async from '~/components/Async';

import Helmet from 'react-helmet';

import {
    Breadcrumbs as MuiBreadcrumbs,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    Grid,
    Link,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem

} from "@material-ui/core";

import {makeStyles, withStyles} from '@material-ui/core/styles';
import {spacing, boxSizing} from "@material-ui/system";
import { SentimentSatisfied } from "@material-ui/icons";
import AntTabs from "~/components/AntTabs"
import {connect} from "react-redux";
import serverSummaryReducers from "../../../redux/reducers/serverSummaryReducers"



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
    }
}));


const StyledTableCell = withStyles((theme) => ({
    body: {
        fontSize: 12
    },
}))(TableCell);


const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

// callApi = () => {
//     fetch("https://jsonplaceholder.typicode.com/todos/1")
//       .then(res => res.json())
//       .then(json => {
//         this.setState({
//           data: json.title
//         })
//      })
// }

function Server({dispatch, server}) {


    const classes = useStyles();

    const [indices, setIndices] = React.useState('');
   
    const handleChange = (event) => {
        setIndices(event.target.value);
    };


    useEffect(() => {
        dispatch(setServerSummaryActions())
    }, [])
    

    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_SERVER_URL}/_nodes`)
    //         .then((response) => response.json())
    //         .then((result) => {
    //             dispatch(setServerSummary(result))
    //         })
    // }, [])

    let ServerInfoCall
    if(indices != '') {
        ServerInfoCall = Async(() => import("./serverInfo")); 
    }else{
        ServerInfoCall = Async(() => import("./summary")); 
    }

    return (
        
        <React.Fragment>
            <Helmet title="Server 정보"/>
            
            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link href="./server" color="inherit">
                       서버 개요
                </Link>
                <Box>
                    <FormControl className={classes.formControl}>
                    <InputLabel>서버</InputLabel>
                    <Select
                        value={indices}
                        onChange={handleChange}
                    >
                    {Object.entries(server.nodes).map((node,index) => (
                        <MenuItem value={node[0]}>{node[1].name}</MenuItem>
                    ))};

                    </Select>
                    </FormControl>
                </Box>
            </Breadcrumbs>

            <Card>
                <CardContent>
                    
                    <Divider my={6}/>

                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <ServerInfoCall nodeKey={indices}/>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </React.Fragment>
    );
}

export default connect(store => ({ server: store.serverSummaryReducers.server}))(Server);
