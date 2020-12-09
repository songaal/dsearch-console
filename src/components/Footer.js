import React, {useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
// import styled from "styled-components";

// import {Grid, Hidden, List, ListItem as MuiListItem, ListItemText} from "@material-ui/core";
import {GApageView, initGA} from "../ga";
import {useHistory} from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {setClusterServerCheck} from "../redux/actions/clusterActions"
import {withTheme} from "styled-components";
// import { setAutoCompleteAction, setAutoCompleteStoreAction, getAutoCompleteURLAction } from "../redux/actions/dsearchPluginActions";
//
// const Wrapper = styled.div`
//   padding: ${props => props.theme.spacing(1) / 4}px
//     ${props => props.theme.spacing(4)}px;
//   background: ${props => props.theme.palette.common.white};
//   position: relative;
// `;
//
// const ListItem = styled(MuiListItem)`
//   display: inline-block;
//   width: auto;
//   padding-left: ${props => props.theme.spacing(2)}px;
//   padding-right: ${props => props.theme.spacing(2)}px;
//
//   &,
//   &:hover,
//   &:active {
//     color: #000;
//   }
// `;
let isListen = false
function Footer({serverCheck}) {
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        initGA()
    }, [])

    if (!isListen) {
        isListen = true
        history.listen(location => {
            GApageView(location.pathname)
        });
    }
    return (
        <React.Fragment>


            {/*<Snackbar*/}
            {/*    anchorOrigin={{vertical: 'top', horizontal: 'center'}}*/}
            {/*    open={serverCheck}*/}
            {/*    autoHideDuration={99999999}*/}
            {/*    onClose={() => {}}*/}
            {/*>*/}
            {/*    <MuiAlert elevation={6} variant="filled" severity="warning">*/}
            {/*        클러스터를 점검 중입니다.*/}
            {/*    </MuiAlert>*/}
            {/*</Snackbar>*/}

        </React.Fragment>
        // <Wrapper>
        //     <Grid container spacing={0}>
        //         <Hidden smDown>
        //             <Grid container item xs={12} md={6}>
        //                 <List>
        //                     <ListItem component="a" href="#">
        //                         <ListItemText primary="Support"/>
        //                     </ListItem>
        //                     <ListItem component="a" href="#">
        //                         <ListItemText primary="Help Center"/>
        //                     </ListItem>
        //                     <ListItem component="a" href="#">
        //                         <ListItemText primary="Privacy"/>
        //                     </ListItem>
        //                     <ListItem component="a" href="#">
        //                         <ListItemText primary="Terms of Service"/>
        //                     </ListItem>
        //                 </List>
        //             </Grid>
        //         </Hidden>
        //         <Grid container item xs={12} md={6} justify="flex-end">
        //             <List>
        //                 <ListItem>
        //                     <ListItemText primary={`© ${new Date().getFullYear()} - Material App`}/>
        //                 </ListItem>
        //             </List>
        //         </Grid>
        //     </Grid>
        // </Wrapper>
    );
}
export default Footer;
// export default connect(store => ({
//     serverCheck: store.clusterReducers.serverCheck
// }))(Footer);

