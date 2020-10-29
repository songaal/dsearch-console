import React, {useEffect} from "react";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import {NavLink as RouterNavLink} from "react-router-dom";
import {setServerSummaryActions} from '@actions/serverSummaryActions'
import Async from '~/components/Async';

import Helmet from 'react-helmet';

import {
    Box,
    Breadcrumbs as MuiBreadcrumbs,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    FormControl,
    Grid,
    Link,
    MenuItem,
    Select,
    TableCell
} from "@material-ui/core";

import {makeStyles, withStyles} from '@material-ui/core/styles';
import {spacing} from "@material-ui/system";
import {connect} from "react-redux";


const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 250,
    },
    root: {
        flexGrow: 1,
        width: '100%',
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
const SUMMARY = 'NO_SELECTED';

function Server({dispatch, server}) {
    const classes = useStyles();

    const [indices, setIndices] = React.useState(SUMMARY);

    const handleChange = (event) => {
        setIndices(event.target.value);
    };

    useEffect(() => {
        dispatch(setServerSummaryActions());
    }, [])

    useEffect(() => {
        selectNode();
    }, [server.nodes])

    const selectNode =()=>{
        if(location.search != "" || location.search != undefined){
            const nodes = (Object.entries(server.nodes));
            const nodeName = location.search.split("=")[1];
            for(let i=0; i<nodes.length; i++){
                if(nodeName == nodes[i][1].name){
                    setIndices(nodes[i][0]);
                    break;
                }
            }
        }
    }

    let ServerInfoCall
    if(indices !== '' && indices !== SUMMARY) {
        ServerInfoCall = Async(() => import("./serverInfo"));
    }else{
        ServerInfoCall = Async(() => import("./summary"));
    }

    return (

        <React.Fragment>
            <Helmet title="Server 정보"/>
            
            <Breadcrumbs aria-label="Breadcrumb" mt={2} mb={2}>
                <Link href="./server" color="inherit">
                       서버 개요
                </Link>
                <Box>
                    <FormControl className={classes.formControl}>
                    {/*<InputLabel>서버</InputLabel>*/}
                    <Select
                        value={indices}
                        onChange={handleChange}
                    >
                        <MenuItem value={SUMMARY} disabled>서버를 선택하세요.</MenuItem>
                        {Object.entries(server.nodes).sort((a, b) => {
                            if(a[1].name > b[1].name) return 1;
                            else if(a[1].name < b[1].name) return -1;
                            else return 0;
                        }).map((node,index) => (
                            <MenuItem key={node[0]} value={node[0]}>{node[1].name}</MenuItem>    
                        ))};
                    </Select>
                    </FormControl>
                </Box>
            </Breadcrumbs>

            <ServerInfoCall nodeKey={indices}/>

            {/*<Card>*/}
            {/*    <CardContent>*/}
            {/*        */}
            {/*        <Grid container spacing={6}>*/}
            {/*            <Grid item xs={12}>*/}
            {/*                */}
            {/*            </Grid>*/}
            {/*        </Grid>*/}

            {/*    </CardContent>*/}
            {/*</Card>*/}
        </React.Fragment>
    );
}

export default connect(store => ({ server: store.serverSummaryReducers.server}))(Server);
