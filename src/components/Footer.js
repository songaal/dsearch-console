import React, {useEffect, useState} from "react";
// import styled from "styled-components";

// import {Grid, Hidden, List, ListItem as MuiListItem, ListItemText} from "@material-ui/core";
import {GApageView, initGA} from "../ga";
import {useHistory} from "react-router-dom";
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
function Footer() {
    const history = useHistory()

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
        <div> </div>
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
