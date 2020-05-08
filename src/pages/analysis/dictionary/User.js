import React from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
    Grid, IconButton, InputBase,
    Button,
} from "@material-ui/core";
import DynamicTable from "~/components/DynamicTable";
import {Search} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 250,
    },
    form: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        borderBottom: "1px solid"
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 5,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    right: {
        textAlign: "right"
    }
}), {withTheme: true});


const dataList1 = [
    {"field": "단어", data: ['dacco테스트', '테스트dacco', 'fff테스트', 'ff테스트', '테스트fff', '테스트ff', '장혁준667', '장혁준fe', '장혁준ffe', '장혁준ffef']},
]

const dataList2 = [
    {"field": "단어", data: ['dacco테스트', '테스트dacco', 'fff테스트', 'ff테스트', '테스트fff', '테스트ff', '장혁준667', '장혁준fe', '장혁준ffe', '장혁준ffef']},
]

const dataList3 = [
    {"field": "단어", data: ['dacco테스트', '테스트dacco', 'fff테스트', 'ff테스트', '테스트fff', '테스트ff', '장혁준667', '장혁준fe', '장혁준ffe', '장혁준ffef']},
]

const dataList4 = [
    {"field": "단어", data: ['dacco테스트', '테스트dacco', 'fff테스트', 'ff테스트', '테스트fff', '테스트ff', '장혁준667', '장혁준fe', '장혁준ffe', '장혁준ffef']},
]

function UserDictionary({dispatch, userList, user}) {

    const classes = useStyles();
    return (
        <>
            <Grid container>
                <Grid item xs={6}>
                    <form noValidate autoComplete="off" className={classes.form}>
                        <InputBase
                            className={classes.input}
                            placeholder="ID"
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <Search />
                        </IconButton>
                    </form>
                </Grid>
                <Grid item xs={6} className={classes.right}>
                    <Button variant={"outlined"} color={"primary"}>다운로드</Button>
                    <Button variant={"outlined"} color={"primary"}>새로고침</Button>
                    <Button variant={"outlined"} color={"primary"}>수정</Button>
                </Grid>
            </Grid>

            <br/>
            <Grid container spacing={6}>
                <Grid item xs={3}>
                    <DynamicTable dataList={dataList1} />
                </Grid>
                <Grid item xs={3}>
                    <DynamicTable dataList={dataList2} />
                </Grid>
                <Grid item xs={3}>
                    <DynamicTable dataList={dataList3} />
                </Grid>
                <Grid item xs={3}>
                    <DynamicTable dataList={dataList4} />
                </Grid>
            </Grid>
        </>
    )
}

export default connect(store => ({userList: store.dictionaryReducers.userList, user: store.dictionaryReducers.user}))(UserDictionary);
