import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
    Grid, IconButton, InputBase,
    Button as MuiButton,
    Card, CardContent,
    Box as MuiBox,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    Draggable,
    TextField
} from "@material-ui/core";


import DynamicTable from "~/components/DynamicTable";
import {Language, Search} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {palette, sizing, spacing} from "@material-ui/system";
import {
    createDictionary,
    deleteDictionary,
    downloadDictionary,
    setDictionary
} from "../../../redux/actions/dictionaryActions";
import {setIndicesDataAction} from "../../../redux/actions/indicesIndexDataActions";
import utils from "../../../utils";

const Button = styled(MuiButton)(spacing, sizing, palette)
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
        borderBottom: "1px solid gray",
        '&:hover': {
            borderBottom: "2px solid black"
        }
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
let selected = []
const TYPE = "space"
function SpaceDictionary({dispatch, space}) {
    const [keyword, setKeyword] = useState("");
    const [search, setSearch] = useState("");
    const [keywordMatched, setKeywordMatched] = useState(false);
    const [mode, setMode] = useState("view")  //view, edit
    const [pageNum, setPageNum] = useState(0);
    const [rowSize, setRowSize] = useState(40);
    const [createKeyword, setCreateKeyword] = useState("");

    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [createDialogOpen, setCreateDialogOpen] = React.useState(false);

    const classes = useStyles();
    const lastPageNum = space['lastPageNum']||0

    function handleSelectClick(id, checked) {
        console.log(id, checked)
        selected = checked ? selected.concat(id) : selected.filter(select => select !== id)
    }

    useEffect(() => {
        dispatch(setDictionary(TYPE, pageNum, rowSize))
    }, [])


    function handlePagination(pageNum) {
        // selected = []
        setPageNum(pageNum)
        dispatch(setDictionary(TYPE,pageNum, rowSize, keywordMatched, search))
    }
    function handleSearch() {
        selected = []
        setSearch(keyword)
        setPageNum(0)
        dispatch(setDictionary(TYPE,0, rowSize, keywordMatched, keyword))
    }
    function handleCheckboxChange(event) {
        selected = []
        setSearch(keyword)
        setPageNum(0)
        setKeywordMatched(event.target.checked)
        dispatch(setDictionary(TYPE,0, rowSize, event.target.checked, keyword))
    }
    function handleSearchShortcut(event) {
        if (event.keyCode === 13) {
            handleSearch()
        }
    }
    async function handleDelete() {
        for (let i = 0; i < selected.length; i++) {
            await deleteDictionary(TYPE, selected[i])
        }
        setDeleteDialogOpen(false);
        await utils.sleep(1000);
        dispatch(setDictionary(TYPE,0, rowSize, keywordMatched, keyword))
    }
    async function handleCreate() {
        await createDictionary(TYPE, { keyword: createKeyword })
        setCreateKeyword("")
        setCreateDialogOpen(false);
        await utils.sleep(1000);
        setKeyword(createKeyword)
        dispatch(setDictionary(TYPE,0, rowSize, keywordMatched, createKeyword))

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
                                    onChange={event => setKeyword(event.target.value)}
                                    onKeyUp={handleSearchShortcut}
                                />
                                <IconButton type="submit"
                                            className={classes.iconButton}
                                            aria-label="search"
                                            onClick={handleSearch}
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
                                            onClick={event => downloadDictionary(TYPE)}
                                    >다운로드</Button>
                                )
                                :
                                (
                                    <React.Fragment>
                                        <Button variant="outlined"
                                                color="primary"
                                                onClick={() => {setCreateKeyword('');setCreateDialogOpen(true);}}
                                        >추가</Button>
                                        <Button variant="outlined"
                                                color="primary"
                                                mr={1}
                                                onClick={() => setDeleteDialogOpen(true)}
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

                    <br/>

                    <Grid container spacing={6}>
                        <Grid item xs={3}>
                            <DynamicTable dataList={[{
                                field: "단어",
                                data: (space.hits||[])
                                    .filter((hit, index) => index >=  0 && index < 10)
                                    .map(hit => ({id: hit.id, text: hit['sourceAsMap']['keyword']}))
                            }]}
                                          showCheckBox={mode === "edit"}
                                          onSelectClick={handleSelectClick}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <DynamicTable dataList={[{
                                field: "단어",
                                data: (space.hits || [])
                                    .filter((hit, index) => index >= 10 && index < 20)
                                    .map(hit => ({id: hit.id, text: hit['sourceAsMap']['keyword']}))
                            }]}
                                          showCheckBox={mode === "edit"}
                                          onSelectClick={handleSelectClick}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <DynamicTable dataList={[{
                                field: "단어",
                                data: (space.hits||[])
                                    .filter((hit, index) => index >= 20 && index < 30)
                                    .map(hit => ({id: hit.id, text: hit['sourceAsMap']['keyword']}))
                            }]}
                                          showCheckBox={mode === "edit"}
                                          onSelectClick={handleSelectClick}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <DynamicTable dataList={[{
                                field: "단어",
                                data: (space.hits||[])
                                    .filter((hit, index) => index >= 30 && index < 40)
                                    .map(hit => ({id: hit.id, text: hit['sourceAsMap']['keyword']}))
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



            <Dialog
                open={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
            >
                <DialogTitle style={{ cursor: 'move' }}>
                    등록
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={4}>
                            <Box mt={2}>
                                키워드
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField autoFocus={true}
                                       value={createKeyword}
                                       onChange={event => setCreateKeyword(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreate} color="secondary">
                        추가
                    </Button>
                    <Button autoFocus onClick={() => setCreateDialogOpen(false)} color="primary">
                        취소
                    </Button>

                </DialogActions>
            </Dialog>

            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle style={{ cursor: 'move' }}>
                    경고!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {selected.length} 선택하신 단어를 삭제하시겠습니까?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete} color="secondary">
                        삭제
                    </Button>
                    <Button autoFocus onClick={() => setDeleteDialogOpen(false)} color="primary">
                        취소
                    </Button>

                </DialogActions>
            </Dialog>

        </>

    )
}

export default connect(store => ({space: store.dictionaryReducers.space}))(SpaceDictionary);
