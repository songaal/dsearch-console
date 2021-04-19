import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {connect, useDispatch} from "react-redux";
import {
    Box as MuiBox,
    Button as MuiButton,
    Card,
    CardContent,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Select,
    TextField,
    Snackbar,
    FormControlLabel,
    LinearProgress,
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import DynamicTable from "~/components/DynamicTable";
import {ArrowDropDown, Search} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {palette, sizing, spacing} from "@material-ui/system";
import {
    createDictionary,
    deleteDictionary,
    downloadDictionary,
    setDictionary,
    updateDictionary,
    sendFile,
    resetDict,
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

let checkedList = []
let searchedKeyword = ""
function SynonymDictionary({dictionary, authUser, setting, dataSet}) {
    const result = dataSet[dictionary] || {}
    const dispatch = useDispatch()
    const classes = useStyles()
    const [searchColumns, setSearchColumns] = useState("id,keyword,value");
    // const [keyword, setKeyword] = useState("");
    const [isMatch, setMatch] = useState(false);
    const [mode, setMode] = useState("view")  //view, edit
    const [pageNum, setPageNum] = useState(0);
    const [rowSize] = useState(20);

    // 입력 성능 개선
    const newCreateId = React.useRef(null);
    const newCreateKeyword = React.useRef(null);
    const newCreateValue = React.useRef(null);
    const newKeyword = React.useRef({value: ""});

    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [createDialogOpen, setCreateDialogOpen] = React.useState(false);

    const [message, setMessage] = React.useState("");

    // 파일 업로드
    const [alertFlag, setAlertFlag] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [alertColor, setAlertColor] = React.useState("info");

    const [moreMenu, setMoreMenu] = useState(null)
    const [overwrite, setOverwrite] = useState(false)
    const [resetDialogOpen, setResetDialogOpen] = React.useState(false);
    const [fileDialogOpen, setFileDialogOpen] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [uploadProgress, setUploadProgress] = React.useState(false);
    // authUser.role.analysis = false;

    useEffect(() => {
        let keyword = newKeyword.current.value
        dispatch(setDictionary(dictionary, pageNum, rowSize, isMatch, keyword, searchColumns))
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    function handleColumnChange(event) {
        let keyword = newKeyword.current.value
        checkedList = []
        setSearchColumns(event.target.value)
        dispatch(setDictionary(dictionary, 0, rowSize, isMatch, keyword, event.target.value, searchColumns))
    }

    function toggleCheckbox(id, checked) {
        checkedList = checked ? checkedList.concat(id) : checkedList.filter(select => select !== id)
    }

    function handlePagination(pageNum) {
        // 2/1 같이 표시 되는것 방지 코드
        if(pageNum > result['lastPageNum']){
            return;
        }

        setPageNum(pageNum)
        dispatch(setDictionary(dictionary, pageNum, rowSize, isMatch, searchedKeyword, searchColumns))
    }

    function handleSearchClick() {
        let keyword = newKeyword.current.value
        checkedList = []
        searchedKeyword = keyword
        setPageNum(0)
        dispatch(setDictionary(dictionary, 0, rowSize, isMatch, keyword, searchColumns))
    }

    function handleCheckboxChange(event) {
        let keyword = newKeyword.current.value
        checkedList = []
        searchedKeyword = keyword
        setPageNum(0)
        setMatch(event.target.checked)
        dispatch(setDictionary(dictionary, 0, rowSize, event.target.checked, keyword, searchColumns))
    }

    function handleSearchShortcut(event) {
        if (event.keyCode === 13) {
            handleSearchClick()
        }
    }

    async function handleDeleteData() {
        let keyword = newKeyword.current.value
        for (let i = 0; i < checkedList.length; i++) {
            await deleteDictionary(dictionary, checkedList[i])
        }
        checkedList = []
        setDeleteDialogOpen(false);
        await utils.sleep(1000);
        dispatch(setDictionary(dictionary, 0, rowSize, isMatch, keyword, searchColumns))
    }

    async function handleCreateData() {
        let createId = ""
        let createKeyword = ""
        let createValue = ""

        if(newCreateId.current != null){
            createId = newCreateId.current.value
        }
        if(newCreateKeyword.current != null){
            createKeyword = newCreateKeyword.current.value
        }
        if(newCreateValue.current != null){
            createValue = newCreateValue.current.value
        }

        await createDictionary(dictionary, {id: createId, keyword: createKeyword, value: createValue})

        let msg = "";
        if(createId !== undefined && createId !== null && createId !== "" && createId.length > 0){
            msg += createId
        } 
        
        if(createKeyword !== undefined && createKeyword !== null && createKeyword !== "" && createKeyword.length > 0)  {
            console.log("createKeyword", createKeyword, createKeyword.length);
            if(msg !== "" || msg.length > 0) {
                msg += " > "
            }
            msg += createKeyword
        }

        if(createValue !== undefined && createValue !== null && createValue !== "" && createValue.length > 0)  {
            console.log("createValue", createValue, createValue.length);
            if(msg !== "" || msg.length > 0) {
                msg += " > "
            }
            msg += createValue
        }

        if(newCreateId.current != null){
            newCreateId.current.value = "";
        }
        if(newCreateKeyword.current != null){
            newCreateKeyword.current.value = "";
        }
        if(newCreateValue.current != null){
            newCreateValue.current.value = "";
        }

        await utils.sleep(1000);
        let keyword = newKeyword.current.value
        dispatch(setDictionary(dictionary, 0, rowSize, isMatch, keyword, searchColumns))

        setMessage('"' + msg + '" 이(가) 추가되었습니다');
        setTimeout(() => {
            setMessage("");
        }, 5000);
    }

    async function handleDeleteButton(id) {
        if (!window.confirm("해당 라인을 삭제 하시겠습니까?")) {
            return false;
        }
        checkedList = checkedList.filter(checkedListId => checkedListId !== id)
        await deleteDictionary(dictionary, id)
        await utils.sleep(1000);
        handlePagination(pageNum)
    }

    async function handleUpdateButton(id, row, columns) {
        if (!window.confirm("해당 라인을 수정 하시겠습니까?")) {
            return false;
        }

        let data = columns.reduce((o, k, i) => {
            return Object.assign( {[setting['columns'][i]['type']]: row[i]}, o)
        }, {})

        await updateDictionary(dictionary, id, data)
        await utils.sleep(1000);
        handlePagination(pageNum)
    }

    let dataList = setting['columns'].map(column => {
        const hits = (result['hits'] || [])
        return {
            field: column['label'],
            data: hits.map(hit => ({id: hit['id'], text: (hit['sourceAsMap'][column['type']] || '')}))
        }
    })

    let createLabels = {}
    const colId = setting['columns'].find(column => column['type'] === 'id')
    const colKeyword = setting['columns'].find(column => column['type'] === 'keyword')
    const colValue = setting['columns'].find(column => column['type'] === 'value')
    if (colId) {
        createLabels.id = colId['label']
    }
    if (colKeyword) {
        createLabels.keyword = colKeyword['label']
    }
    if (colValue) {
        createLabels.value = colValue['label']
    }

    return (
        <>
            <br/>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={6}>
                            <Box className={classes.form} display={"inline"}>
                                {
                                    setting['columns'] && setting['columns'].length > 1 ?
                                        <FormControl className={classes.select}>
                                            <Select value={searchColumns}
                                                    onChange={handleColumnChange}
                                            >
                                                <MenuItem value={"id,keyword,value"}>전체</MenuItem>
                                                {
                                                    (setting['columns'] || [])
                                                        .map(column => <MenuItem key={column['type']} value={column['type']}>{column['label']}</MenuItem>)
                                                }
                                            </Select>
                                        </FormControl>
                                        :
                                        null
                                }
                                <InputBase
                                    className={classes.input}
                                    placeholder="검색"
                                    inputRef={newKeyword}
                                    // value={keyword}
                                    // onChange={event => setKeyword(event.target.value)}
                                    onKeyUp={handleSearchShortcut}
                                />

                                <IconButton type="submit"
                                            className={classes.iconButton}
                                            aria-label="search"
                                            onClick={handleSearchClick}
                                >
                                    <Search />
                                </IconButton>

                                <Checkbox color="primary"
                                          value={isMatch}
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
                                            onClick={() => downloadDictionary(dictionary)}
                                    >다운로드</Button>
                                )
                                :
                                (
                                    <React.Fragment style={{justifyContent: "space-between"}}>
                                            <Button variant="outlined"
                                                color="primary"
                                                mx={1}
                                                onClick={() => {setCreateDialogOpen(true);}}
                                            >추가</Button>
                                            
                                            <Button variant="outlined"
                                                color="primary"
                                                mx={1}
                                                onClick={() => { if(checkedList.length > 0) setDeleteDialogOpen(true)} }
                                            >삭제</Button>

                                        <FormControl>
                                            <Button variant="outlined"
                                                color="primary"
                                                type="file"
                                                mx={1}
                                                onClick={(e) => {
                                                    setMoreMenu(e.currentTarget);
                                                }}
                                            >더보기<ArrowDropDown /></Button>

                                            <Menu
                                                anchorEl={moreMenu}
                                                open={Boolean(moreMenu)}
                                                onClose={() => { setMoreMenu(null) }}
                                                getContentAnchorEl={null}
                                                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                                transformOrigin={{ vertical: "top", horizontal: "center" }}
                                            >
                                                <MenuItem onClick={() => { setFileDialogOpen(true) }}>
                                                    사전 파일 업로드
                                                </MenuItem>
                                                <MenuItem onClick={() => setResetDialogOpen(true)}>
                                                    사전 초기화
                                                </MenuItem>
                                            </Menu>
                                        </FormControl>
                                    </React.Fragment>
                                )
                            }
                            <Button variant="outlined"
                                    color="primary"
                                    mx={1}
                                    onClick={() => handlePagination(pageNum)}
                            >새로고침</Button>
                            {authUser.role.analysis ? <Button variant="outlined"
                                    color="primary"
                                    onClick={() => setMode(mode === "view" ? "edit" : "view")}
                                    mx={1}
                            >{mode === "view" ? "수정" : "보기"}</Button>
                            : <></> }
                            
                            
                        </Grid>
                    </Grid>

                    <br/>

                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <DynamicTable dataList={dataList}
                                          showCheckBox={mode === "edit"}
                                          isEdit={true}
                                          onSelectClick={toggleCheckbox}
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
                                    {(result['lastPageNum'] || 0) === 0 ? 0 : pageNum + 1} / {result['lastPageNum'] || 0}
                                </Box>
                                <Button variant={"outlined"}
                                        onClick={() => handlePagination(pageNum + 1)}
                                        disabled={(pageNum + 1) === (result['lastPageNum'] || 0) || (result['lastPageNum'] || 0) === 0}
                                >
                                    다음
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>



            <Dialog
                fullWidth={true}
                open={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
            >
                <DialogTitle style={{ cursor: 'move' }}>
                    등록
                </DialogTitle>
                <DialogContent>

                    {
                        createLabels.id ?
                            <Grid container>
                                <Grid item xs={4}>
                                    <Box m={5}> {createLabels.id} </Box>
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField 
                                        autoFocus={true}
                                        style={{ margin: "4px" }}
                                        label={createLabels.id}
                                        inputRef={newCreateId} 
                                        onKeyPress={ (e) => { if (e.key === 'Enter') handleCreateData();}}/>
                                </Grid>
                            </Grid>
                            :
                            null
                    }
                    {
                        createLabels.keyword ?
                            <Grid container>
                                <Grid item xs={4}>
                                    <Box m={5}> {createLabels.keyword} </Box>
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField 
                                        autoFocus={createLabels.id ? false : true}
                                        style={{ margin: "4px" }}
                                        label={createLabels.keyword}
                                        inputRef={newCreateKeyword} 
                                        onKeyPress={ (e) => { if (e.key === 'Enter') handleCreateData();}}/>
                                </Grid>
                            </Grid>
                            :
                            null
                    }
                    {
                        createLabels.value ?
                            <Grid container>
                                <Grid item xs={4}>
                                    <Box m={5}> {createLabels.value} </Box>
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField 
                                        autoFocus={createLabels.id || createLabels.keyword ? false : true}
                                        style={{ margin: "4px" }}
                                        label={createLabels.value}
                                        inputRef={newCreateValue} 
                                        onKeyPress={ (e) => { if (e.key === 'Enter') handleCreateData();}}/>
                                </Grid>
                            </Grid>
                            :
                            null
                    }

                </DialogContent>
                <DialogActions>
                    {
                        message !== "" ? 
                        <Box ml={2} mr={18} style={{color: "red"}}> <b> {message} </b></Box>
                            : <></>
                    }

                    <Button onClick={handleCreateData} color="secondary">
                        추가
                    </Button>
                    <Button onClick={() => setCreateDialogOpen(false)} color="primary">
                        닫기
                    </Button>

                </DialogActions>
            </Dialog>

            <Dialog
                fullWidth={true}
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle style={{ cursor: 'move' }}>
                    경고!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {checkedList.length} 선택하신 단어를 삭제하시겠습니까?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteData} color="secondary">
                        삭제
                    </Button>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                        취소
                    </Button>

                </DialogActions>
            </Dialog>
            <Dialog
                fullWidth={true}
                open={resetDialogOpen}
                onClose={() => setResetDialogOpen(false)}
            >
                <DialogTitle style={{ cursor: 'move' }}>
                    경고!
                </DialogTitle>
                <DialogContent>
                    <Snackbar open={alertFlag} autoHideDuration={3000} onClose={() => { setAlertFlag(false); setAlertMessage("") }}>
                        <MuiAlert elevation={6} variant="filled" severity={alertColor}> {alertMessage} </MuiAlert>
                    </Snackbar>
                    <DialogContentText>
                        정말 이 사전을 초기화 하시겠습니까?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { 
                        let fd = new FormData();
                        fd.append('dictionaryName', dictionary)
                        dispatch(resetDict(fd))
                        setResetDialogOpen(false)
                        window.location.reload();
                    }} color="secondary">
                        초기화 하기
                    </Button>
                    <Button onClick={() => setResetDialogOpen(false)} color="primary">
                        취소
                    </Button>

                </DialogActions>
            </Dialog>

            <Dialog
                fullWidth={true}
                open={fileDialogOpen}
                onClose={() => setFileDialogOpen(false)}
            >
                <DialogTitle style={{ cursor: 'move' }}>
                    사전 파일 업로드
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Snackbar open={alertFlag} autoHideDuration={3000} onClose={() => { setAlertFlag(false); setAlertMessage("") }}>
                            <MuiAlert elevation={6} variant="filled" severity={alertColor}> {alertMessage} </MuiAlert>
                        </Snackbar>

                        <input
                            id="fileUpload"
                            // style={{ display: "none" }}
                            type='file'
                            onChange={(e) => {
                                setFile(e.target.files[0])
                            }}
                        />
                         <FormControlLabel
                            control={
                                <Checkbox color="primary" 
                                    checked={overwrite} 
                                    onChange={(e) => { 
                                        setOverwrite(e.target.checked) 
                                    }} />}
                            label="업로드 한 파일로 덮어 쓰시겠습니까?"
                            labelPlacement="end"
                        />
                         { 
                            uploadProgress ? <LinearProgress /> : <></>
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { 
                        
                        let fd = new FormData();
                        fd.append('overwrite', overwrite);
                        fd.append('dictionaryFields', result['fields'])
                        fd.append('dictionaryType', "synonym_2way");
                        fd.append('dictionaryName', dictionary)
                        fd.append('filename', file);
                        dispatch(sendFile(fd))
                            .then((res) => {
                                console.log("onchange res", res);
                                setAlertFlag(true);
                                if(res.data.result){
                                    setAlertColor("info");
                                    setAlertMessage(res.data.message)
                                    setFileDialogOpen(false)
                                }else{
                                    setAlertColor("error");
                                    setAlertMessage(res.data.message)
                                }
                                setFile(null);
                                setUploadProgress(false);
                                handlePagination(0);
                            }).catch((err) => {
                                console.log("onchange err", err);
                                setAlertFlag(true);
                                setAlertColor("error");
                                setAlertMessage("실패");
                                setUploadProgress(false);
                                setFile(null);
                            });
                    }} color="secondary">
                        등록
                    </Button>
                    <Button onClick={() => setFileDialogOpen(false)} color="primary">
                        취소
                    </Button>

                </DialogActions>
            </Dialog>

        </>

    )
}

export default connect(store => ({ 
    authUser: store.dsearchReducers.authUser
}))(SynonymDictionary)