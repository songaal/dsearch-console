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
    TextField,
    Select,
    FormControl,
    MenuItem,
} from "@material-ui/core";

import DynamicTable from "~/components/DynamicTable";
import { Search } from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {palette, sizing, spacing} from "@material-ui/system";
import {
    createDictionary,
    deleteDictionary,
    downloadDictionary,
    setDictionary
} from "../../../redux/actions/dictionaryActions";
import utils from "../../../utils";

const Button = styled(MuiButton)(spacing, sizing, palette)
const Box = styled(MuiBox)(spacing, sizing)

const useStyles = makeStyles((theme) => ({
    formControl: { minWidth: 150 },
    select: { minWidth: 80 },
    form: { padding: '2px 4px', display: 'flex', alignItems: 'center', width: 500 },
    input: { marginLeft: theme.spacing(1), flex: 1, borderBottom: "1px solid gray", '&:hover': { borderBottom: "2px solid black" } },
    iconButton: {padding: 5,},
    divider: { height: 28, margin: 4,},
    right: { textAlign: "right"}
}));

let selected = []
const TYPE = "synonym"
function SynonymDictionary({dispatch, synonym}) {
    const [keyword, setKeyword] = useState("");
    const [search, setSearch] = useState("");
    const [keywordMatched, setKeywordMatched] = useState(false);
    const [mode, setMode] = useState("view")  //view, edit
    const [pageNum, setPageNum] = useState(0);
    const [rowSize, setRowSize] = useState(15);
    const [createKeyword, setCreateKeyword] = useState("");
    const [field, setField] = useState("전체")
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [createDialogOpen, setCreateDialogOpen] = React.useState(false);

    const classes = useStyles();
    const lastPageNum = synonym['lastPageNum']||0

    useEffect(() => {
        dispatch(setDictionary(TYPE, pageNum, rowSize))
    }, [])

    function handleSelectClick(id, checked) {
        console.log(id, checked)
        selected = checked ? selected.concat(id) : selected.filter(select => select !== id)
    }
    function handlePagination(pageNum) {
        setPageNum(pageNum)
        dispatch(setDictionary(TYPE, pageNum, rowSize, keywordMatched, search))
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
                                <FormControl className={classes.select}>
                                    <Select value={field} onChange={(event) => setField(event.target.value)}>
                                        <MenuItem value={"전체"}>전체</MenuItem>
                                        <MenuItem value={"1keyword.raw"}>KEYWORD</MenuItem>
                                        <MenuItem value={"synonym.raw"}>SYNONYM</MenuItem>
                                    </Select>
                                </FormControl>

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
                        <Grid item xs={12}>
                            <DynamicTable dataList={
                                [
                                    { field: "키워드", data: (synonym.hits || []).map(hit => ({id: hit.id, text: hit['sourceAsMap']['keyword']})) },
                                    { field: "유사어", data: (synonym.hits || []).map(hit => ({id: hit.id, text: hit['sourceAsMap']['synonym']})) }
                                ]
                            }
                                          showCheckBox={mode === "edit"}
                                          isEdit={true}
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

export default connect(store => ({synonym: store.dictionaryReducers.synonym}))(SynonymDictionary);