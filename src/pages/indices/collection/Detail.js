import React, {useEffect} from "react";
import {connect} from "react-redux";
import { useLocation } from "react-router-dom"
import styled from "styled-components";
import Helmet from 'react-helmet';
import Async from "~/components/Async";

import {
    Divider as MuiDivider,
    Grid as MuiGrid,
    Typography as MuiTypography,
    FormControl, InputLabel, Select, MenuItem
} from "@material-ui/core";
import {positions, spacing} from "@material-ui/system";
import AntTabs from "~/components/AntTabs"
import {setCollection, setCollectionIndexSuffix, setCollectionList} from "../../../redux/actions/collectionActions";
import {setJDBCList} from "../../../redux/actions/jdbcActions";

const Divider = styled(MuiDivider)(spacing, positions);
const Typography = styled(MuiTypography)(spacing, positions);
const Grid = styled(MuiGrid)(spacing, positions);

// const useStyles = makeStyles((theme) => ({
//     formControl: {
//         minWidth: 250,
//     },
//     root: {
//         flexGrow: 1,
//         width: '100%',
//     },
//     edit: {
//         width: '100%'
//     }
// }));

const tabs = [
    {label: "개요", component: Async(() => import("./Summary"))},
    {label: "수집소스", component: Async(() => import("./Source"))},
    {label: "히스토리", component: Async(() => import("./History"))},
]

function Detail({dispatch, collection, collectionList}) {
    const location = useLocation();
    
    useEffect(() => {
        const collectionId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
        dispatch(setCollection(collectionId))
        dispatch(setCollectionIndexSuffix())
        dispatch(setJDBCList())
        dispatch(setCollectionList())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (Object.keys(collection).length === 0) {
        return null
    }

    function handleChange() {
        const collectionId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
        dispatch(setCollection(collectionId))
    }

    function handleCollectionChange(collectionBaseId) {
        
        let id = "";
        collectionList.forEach(item => {
            if(item['baseId'] === collectionBaseId){
                id = item['id'];
            }
        })

        if(id !== ""){
            window.location.replace(`../indices-collections/${id}`);
        }
    }

    return (
        <React.Fragment>
            <Helmet title="컬렉션"/>

            <br/>

            <Typography variant="h3">
                컬렉션
            </Typography>

            <Typography variant="h4" mt={2}>
                {/* 원본  */}
                {/* {collection['baseId']} */}

                <FormControl>
                    <InputLabel>컬렉션 아이디</InputLabel>
                    <Select value={collection['baseId']}
                        onChange={event => handleCollectionChange(event.target.value)}
                        style={{ minWidth: 250 }} >
                        {
                            collectionList.map(item =>  item['baseId'] ).sort().map(name => <MenuItem key={name} value={name}>{name}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Typography>

            <Divider my={6}/>

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <AntTabs tabs={tabs} tabIndex={0} onChange={handleChange}/>
                </Grid>
            </Grid>

        </React.Fragment>
    );
}

export default connect(store => ({...store.collectionReducers}))(Detail);
