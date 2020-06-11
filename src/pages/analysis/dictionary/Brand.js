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
    setDictionary, updateDictionary
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
const TYPE = "brand"
let fieldKey = 'id,keyword,synonym'
function BrandDictionary({dispatch, brand}) {
    const [keyword, setKeyword] = useState("");
    const [search, setSearch] = useState("");
    const [keywordMatched, setKeywordMatched] = useState(false);
    const [mode, setMode] = useState("view")  //view, edit
    const [pageNum, setPageNum] = useState(0);
    const [rowSize, setRowSize] = useState(15);

    const [createId, setCreateId] = useState("");
    const [createKeyword, setCreateKeyword] = useState("");
    const [createSynonym, setCreateSynonym] = useState("");

    const [fieldNames, setFieldName] = useState("전체")
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [createDialogOpen, setCreateDialogOpen] = React.useState(false);

    const classes = useStyles();
    const lastPageNum = brand['lastPageNum']||0

    useEffect(() => {
        let field = fieldNames === "전체" ? 'id,keyword,synonym' : fieldNames;
        fieldKey = field
        dispatch(setDictionary(TYPE, pageNum, rowSize, keywordMatched, keyword, field))
    }, [])

    useEffect(() => {
        let field = fieldNames === "전체" ? 'id,keyword,synonym' : fieldNames;
        if (fieldKey !== field) {
            fieldKey = field
            dispatch(setDictionary(TYPE, 0, rowSize, keywordMatched, search, field))
        }
    }, [fieldNames])

    function handleSelectClick(id, checked) {
        selected = checked ? selected.concat(id) : selected.filter(select => select !== id)
    }
    function handlePagination(pageNum) {
        setPageNum(pageNum)
        let field = fieldNames === "전체" ? 'id,keyword,synonym' : fieldNames;
        dispatch(setDictionary(TYPE, pageNum, rowSize, keywordMatched, search, field))
    }
    function handleSearch() {
        selected = []
        setSearch(keyword)
        setPageNum(0)
        let field = fieldNames === "전체" ? 'id,keyword,synonym' : fieldNames;
        dispatch(setDictionary(TYPE,0, rowSize, keywordMatched, keyword, field))
    }
    function handleCheckboxChange(event) {
        selected = []
        setSearch(keyword)
        setPageNum(0)
        setKeywordMatched(event.target.checked)
        let field = fieldNames === "전체" ? 'id,keyword,synonym' : fieldNames;
        dispatch(setDictionary(TYPE,0, rowSize, event.target.checked, keyword, field))
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
        await createDictionary(TYPE, { id: createId, keyword: createKeyword, synonym: createSynonym })
        setCreateId("")
        setCreateKeyword("")
        setCreateSynonym("")
        setCreateDialogOpen(false);
        await utils.sleep(1000);
        setKeyword(createId)
        let field = fieldNames === "전체" ? 'id,keyword,synonym' : fieldNames;
        dispatch(setDictionary(TYPE,0, rowSize, keywordMatched, createId, field))
    }
    async function handleDeleteButton(id) {
        selected = selected.filter(selectedId => selectedId !== id)
        await deleteDictionary(TYPE, id)
        await utils.sleep(1000);
        handlePagination(pageNum)
    }
    async function handleUpdateButton(id, row, fields) {
        await updateDictionary(TYPE, id, {
            id: row[0],
            keyword: row[0],
            synonym: row[1],
        })
        await utils.sleep(1000);
        handlePagination(pageNum)
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
                                    <Select value={fieldNames}
                                            onChange={event => setFieldName(event.target.value)}
                                    >
                                        <MenuItem value={"전체"}>전체</MenuItem>
                                        <MenuItem value={"id"}>ID</MenuItem>
                                        <MenuItem value={"keyword"}>KEYWORD</MenuItem>
                                        <MenuItem value={"synonym"}>VALUE</MenuItem>
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
                                    { field: "아이디", data: (brand.hits || []).map(hit => ({id: hit.id, text: hit['sourceAsMap']['id']})) },
                                    { field: "키워드", data: (brand.hits || []).map(hit => ({id: hit.id, text: hit['sourceAsMap']['keyword']})) },
                                    { field: "값", data: (brand.hits || []).map(hit => ({id: hit.id, text: hit['sourceAsMap']['synonym']})) }
                                ]
                            }
                                          showCheckBox={mode === "edit"}
                                          isEdit={true}
                                          onSelectClick={handleSelectClick}
                                          onUpdate={handleUpdateButton}
                                          onDelete={handleDeleteButton}
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
                                아이디
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField autoFocus={true}
                                       value={createId}
                                       onChange={event => setCreateId(event.target.value)}
                            />
                        </Grid>
                    </Grid>

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

                    <Grid container>
                        <Grid item xs={4}>
                            <Box mt={2}>
                                값
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField value={createSynonym}
                                       onChange={event => setCreateSynonym(event.target.value)}
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

export default connect(store => ({brand: store.dictionaryReducers.brand}))(BrandDictionary);
