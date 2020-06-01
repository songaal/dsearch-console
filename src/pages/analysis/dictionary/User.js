import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
    Grid, IconButton, InputBase,
    Button as MuiButton,
    Card, CardContent,
    Box as MuiBox,
    Checkbox,
} from "@material-ui/core";
import DynamicTable from "~/components/DynamicTable";
import {Language, Search} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {sizing, spacing} from "@material-ui/system";
import {downloadDictionaryUser, setDictionaryUser} from "../../../redux/actions/dictionaryActions";
import {setIndicesDataAction} from "../../../redux/actions/indicesIndexDataActions";

const Button = styled(MuiButton)(spacing, sizing)
const Box = styled(MuiBox)(spacing, sizing)

const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 150,
    },
    form: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 300,
        // borderBottom: "1px solid"
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        borderBottom: "1px solid"
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

// const sample = [
//     {
//         field: "단어",
//         data: [ {id: 1, text: "1"}, {id: 2, text: "2"}, {id: 3, text: "3"}, {id: 4, text: "4"} ]
//     }
// ]
function UserDictionary({dispatch, user}) {
    const [selected, setSelected] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [keywordMatched, setKeywordMatched] = useState(false);
    const [mode, setMode] = useState("view")  //view, edit
    const [pageNum, setPageNum] = useState(0);
    const [rowSize, setRowSize] = useState(40);
    const classes = useStyles();

    let lastPageNum = user['lastPageNum']||0

    function handleSelectClick(id, checked) {
        checked ? setSelected(selected.concat(id)) : setSelected(selected.filter(select => select !== id))
    }

    useEffect(() => {
        dispatch(setDictionaryUser(pageNum, rowSize))
    }, [])


    function handlePagination(pageNum) {
        setPageNum(pageNum)
        dispatch(setDictionaryUser(
            pageNum,
            rowSize,
            keywordMatched ? 'keyword.raw' : 'keyword',
            keyword
            )
        )
    }
    function handleInputChange(event) {
        setPageNum(0)
        setKeyword(event.target.value)
        dispatch(setDictionaryUser(
            0,
            rowSize,
            keywordMatched ? 'keyword.raw' : 'keyword',
            event.target.value
            )
        )
    }
    function handleCheckboxChange(event) {
        setPageNum(0)
        setKeywordMatched(event.target.checked)
        dispatch(setDictionaryUser(
            0,
            rowSize,
            event.target.checked ? 'keyword.raw' : 'keyword',
            keyword
            )
        )
    }

    return (
        <>
            <br/>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={6}>
                            <Box className={classes.form} display={"inline"}>
                                <InputBase
                                    className={classes.input}
                                    placeholder="검색"
                                    value={keyword}
                                    onChange={handleInputChange}
                                />
                                <IconButton type="submit"
                                            className={classes.iconButton}
                                            aria-label="search"
                                            onClick={event => handlePagination(0)}
                                >
                                    <Search />
                                </IconButton>

                                <Checkbox color="primary"
                                          value={keywordMatched}
                                          onChange={handleCheckboxChange}
                                /> 단어매칭

                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6} className={classes.right}>
                            {mode === "view" ?
                                (
                                    <Button variant="outlined"
                                            color="primary"
                                            mx={1}
                                            onClick={event => downloadDictionaryUser()}
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
                                    onClick={event => handlePagination(pageNum)}
                            >새로고침</Button>
                            <Button variant="outlined"
                                    color="primary"
                                    onClick={() => setMode(mode === "view" ? "edit" : "view")}
                                    mx={1}
                            >{mode === "view" ? "수정" : "보기"}</Button>
                        </Grid>
                    </Grid>

                    {/*<br/>*/}

                    {/*<Grid container>*/}
                    {/*    <Grid item xs={12}>*/}
                    {/*        <Box align={"center"}>*/}
                    {/*            <Button variant={"outlined"}*/}
                    {/*                    onClick={() => handlePagination(pageNum - 1)}*/}
                    {/*                    disabled={pageNum === 0}*/}
                    {/*            >*/}
                    {/*                이전*/}
                    {/*            </Button>*/}
                    {/*            <Box component={"span"} m={3}>*/}
                    {/*                {lastPageNum === 0 ? 0 : pageNum + 1} / {lastPageNum}*/}
                    {/*            </Box>*/}
                    {/*            <Button variant={"outlined"}*/}
                    {/*                    onClick={() => handlePagination(pageNum + 1)}*/}
                    {/*                    disabled={(pageNum + 1) === lastPageNum || lastPageNum === 0}*/}
                    {/*            >*/}
                    {/*                다음*/}
                    {/*            </Button>*/}
                    {/*        </Box>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}

                    <br/>
                    <Grid container spacing={6}>
                        <Grid item xs={3}>
                            <DynamicTable dataList={[{
                                field: "단어",
                                data: (user.hits||[])
                                    .filter((hit, index) => index >=  0 && index < 10)
                                    .map(hit => ({id: hit.id, text: hit.sourceAsMap.keyword}))
                            }]}
                                          showCheckBox={mode === "edit"}
                                          onSelectClick={handleSelectClick}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <DynamicTable dataList={[{
                                field: "단어",
                                data: (user.hits || [])
                                    .filter((hit, index) => index >= 10 && index < 20)
                                    .map(hit => ({id: hit.id, text: hit.sourceAsMap.keyword}))
                            }]}
                                          showCheckBox={mode === "edit"}
                                          onSelectClick={handleSelectClick}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <DynamicTable dataList={[{
                                field: "단어",
                                data: (user.hits||[])
                                    .filter((hit, index) => index >= 20 && index < 30)
                                    .map(hit => ({id: hit.id, text: hit.sourceAsMap.keyword}))
                            }]}
                                          showCheckBox={mode === "edit"}
                                          onSelectClick={handleSelectClick}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <DynamicTable dataList={[{
                                field: "단어",
                                data: (user.hits||[])
                                    .filter((hit, index) => index >= 30 && index < 40)
                                    .map(hit => ({id: hit.id, text: hit.sourceAsMap.keyword}))
                            }]}
                                          showCheckBox={mode === "edit"}
                                          onSelectClick={handleSelectClick}
                            />
                        </Grid>
                    </Grid>

                    <br/>

                    <Grid container>
                        <Grid item xs={12}>
                            <Box align={"center"}>
                                <Button variant={"outlined"}
                                        onClick={() => handlePagination(pageNum - 1)}
                                        disabled={pageNum === 0}
                                >
                                    이전
                                </Button>
                                <Box component={"span"} m={3}>
                                    {lastPageNum === 0 ? 0 : pageNum + 1} / {lastPageNum}
                                </Box>
                                <Button variant={"outlined"}
                                        onClick={() => handlePagination(pageNum + 1)}
                                        disabled={(pageNum + 1) === lastPageNum || lastPageNum === 0}
                                >
                                    다음
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </>

    )
}

export default connect(store => ({user: store.dictionaryReducers.user}))(UserDictionary);
