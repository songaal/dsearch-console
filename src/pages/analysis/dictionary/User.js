import React, {useState} from "react";
import styled from "styled-components";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
    Grid, IconButton, InputBase,
    Button as MuiButton,
    Card, CardContent,
    Hidden,
} from "@material-ui/core";
import DynamicTable from "~/components/DynamicTable";
import {Language, Search} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {sizing, spacing} from "@material-ui/system";

const Button = styled(MuiButton)(spacing, sizing)

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
}));

const sample = [
    {
        field: "단어",
        data: [ {id: 1, text: "1"}, {id: 2, text: "2"}, {id: 3, text: "3"}, {id: 4, text: "4"} ]
    }
]



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
    const [selected, setSelected] = useState([])
    const [mode, setMode] = useState("view")  //view, edit
    const classes = useStyles();

    function handleSelectClick(id, checked) {
        checked ? setSelected(selected.concat(id)) : setSelected(selected.filter(select => select !== id))
    }

    return (
        <>
            <br/>
            <Card>
                <CardContent>
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
                            {mode === "view" ?
                                (
                                    <Button variant="outlined"
                                            color="primary"
                                            mx={1}
                                    >다운로드</Button>
                                )
                                :
                                (
                                    <React.Fragment>
                                        <Button variant="outlined"
                                                color="primary"
                                        >추가</Button>
                                        <Button variant="outlined"
                                                color="secondary"
                                                mr={1}
                                        >삭제</Button>
                                    </React.Fragment>
                                )
                            }

                            <Button variant="outlined"
                                    color="primary"
                                    mx={1}
                            >새로고침</Button>
                            <Button variant="outlined"
                                    color="primary"
                                    onClick={() => setMode(mode === "view" ? "edit" : "view")}
                                    mx={1}
                            >{mode === "view" ? "수정" : "보기"}</Button>
                        </Grid>
                    </Grid>

                    <br/>
                    <Grid container spacing={6}>
                        <Grid item xs={3}>
                            <DynamicTable dataList={sample}
                                          showCheckBox={mode === "edit"}
                                          onSelectClick={handleSelectClick}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <DynamicTable dataList={dataList2}
                                          showCheckBox={mode === "edit"}
                                          onSelectClick={handleSelectClick}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <DynamicTable dataList={dataList3}
                                          showCheckBox={mode === "edit"}
                                          onSelectClick={handleSelectClick}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <DynamicTable dataList={dataList4}
                                          showCheckBox={mode === "edit"}
                                          onSelectClick={handleSelectClick}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>

    )
}

export default connect(store => ({userList: store.dictionaryReducers.userList, user: store.dictionaryReducers.user}))(UserDictionary);
