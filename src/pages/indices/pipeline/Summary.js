import React, {useEffect, useState, useRef} from "react";
import { connect } from "react-redux";
import {
    Box, CircularProgress,
    Card,
    CardContent,
    Button,
    Table, Grid,
    TableHead,
    TableRow,
    TableCell, Link, 
    TableBody,Typography,
    Dialog, DialogTitle,DialogContent, DialogActions,
    Checkbox, Snackbar, TextField, TextareaAutosize, Divider
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-kuroir";
import { setPipelineList, deletePipeline, addPipeline, editPipeline} from '@actions/pipelineActions'

function Summary({ dispatch, authUser, list }) {
    useEffect(() => {
        dispatch(setPipelineList())
    }, [])

    const name = useRef(null);
    const aceEditor = useRef(null);
    const [nameError, setNameError] = useState(false)
    const [modalFlag, setModalFlag] = useState(false)
    const [successFlag, setSuccessFlag] = useState(false)
    const [snackbarFlag, setSnackbarFlag] = useState(false)
    const [message, setMessage] = useState('')
    const [key, setKey] = useState('')
    const [flag, setFlag] = useState(0);

    function isJson(str) {
        try {
            let json = JSON.parse(str);
            return (typeof json === 'object');
        } catch (e) {
            return false;
        }
    }

    function closeModal(){
        setModalFlag(false)
    }

    function openModal(id){
        setKey(event.target.id);
        setModalFlag(true);
        setFlag(1);
    }

    function openModalEdit(item){
        setKey(item);
        setModalFlag(true);
        setFlag(3);
    }

    function openModalDelete(item){
        setKey(item);
        setModalFlag(true);
        setFlag(4);
    }

    function openModalAdd(){
        setModalFlag(true);
        setFlag(2);
    }

    function handleAddPipeline(){
        let pipelineName = name.current.value;
        if(pipelineName.length !== pipelineName.replace(/\s| /gi, "").length){
            setNameError(true);
            return ;
        }

        if(!isJson(aceEditor.current.editor.getValue())){
            return ;
        }

        setMessage("추가")
        
        dispatch(
            addPipeline(name.current.value, aceEditor.current.editor.getValue())
        ).then((res)=>{
            setSnackbarFlag(true)
            setSuccessFlag(true)
            dispatch(setPipelineList());
        })
        .catch((err) => {
            setSnackbarFlag(true)
            setSuccessFlag(false)
            dispatch(setPipelineList());
        })
        closeModal()
    }

    function handleEditPipeline(){
        if(!isJson(aceEditor.current.editor.getValue())){
            return ;
        }

        setMessage("수정")
        dispatch(
            editPipeline(key, aceEditor.current.editor.getValue())
        ).then((res)=>{
            setSnackbarFlag(true)
            setSuccessFlag(true)
            dispatch(setPipelineList());
        })
        .catch((err) => {
            setSnackbarFlag(true)
            setSuccessFlag(false)
            dispatch(setPipelineList());
        })
        closeModal()
    }

    function handleDeletePipeline(){
        setMessage("삭제")
        dispatch(
            deletePipeline(key)
        ).then((res)=>{
            setSnackbarFlag(true)
            setSuccessFlag(true)
            dispatch(setPipelineList());
        })
        .catch((err) => {
            setSnackbarFlag(true)
            setSuccessFlag(false)
            dispatch(setPipelineList());
        })
        closeModal()
    }

    return (
        <React.Fragment>
            <Card>
                <CardContent>
                    <Box>
                        <Box align={'right'} paddingRight={"30px"}>
                            {authUser.role.index ? 
                                <Link
                                    onClick={openModalAdd}
                                    style={{ cursor: "pointer" }}
                                    color={"primary"}>
                                    파이프라인 추가
                                </Link> 
                                : <></>
                            }
                        </Box>
                        
                        <Table>
                            <colgroup>
                                <col width="5%" />
                                <col />
                                <col width="10%" />
                                <col width="10%" />
                            </colgroup>
                            <TableHead>
                                <TableRow>
                                    <TableCell align={"center"} >#</TableCell>
                                    <TableCell align={"center"} >파이프라인 이름</TableCell>
                                    <TableCell align={"center"} >수정</TableCell>
                                    <TableCell align={"center"} >삭제</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                        Object.keys(list).sort().map((item, index) => {
                                            return  <TableRow key={index}>
                                                        <TableCell align={"center"}> 
                                                            {index + 1} 
                                                        </TableCell>
                                                        <TableCell align={"center"}>
                                                            <Link onClick={() => openModal(item)} variant={"inherit"} style={{ cursor: "pointer" }} color={"primary"} id={item} >{item}</Link>
                                                        </TableCell>
                                                        {/* <TableCell align={"center"}>
                                                                <Button variant={"outlined"} color={"primary"} style={{ whiteSpace: "nowrap" }} onClick={()=> openModalEdit(item)} >수정</Button>
                                                            </TableCell>
                                                            <TableCell align={"center"}>
                                                                <Button variant="outlined" style={{ whiteSpace: "nowrap", borderColor:"red", color: "red"}} onClick={() => openModalDelete(item)}>삭제</Button>
                                                            </TableCell> */}
                                                        {authUser.role.index ? 
                                                            <TableCell align={"center"}>
                                                                <Button variant={"outlined"} color={"primary"} style={{ whiteSpace: "nowrap" }} onClick={()=> openModalEdit(item)} >수정</Button>
                                                            </TableCell> : <TableCell></TableCell> }
                                                        {authUser.role.index ? 
                                                            <TableCell align={"center"}>
                                                                <Button variant="outlined" style={{ whiteSpace: "nowrap", borderColor:"red", color: "red"}} onClick={() => openModalDelete(item)}>삭제</Button>
                                                            </TableCell> : <TableCell></TableCell> }
                                                    </TableRow>
                                        })
                                }
                            </TableBody>
                        </Table>
                    </Box>
                    <Snackbar open={snackbarFlag} autoHideDuration={3000} onClose={() => { setSnackbarFlag(false); }}>
                        {successFlag ? <MuiAlert elevation={6} variant="filled" severity="info"> {message} {" 성공"} </MuiAlert> 
                                     : <MuiAlert elevation={6} variant="filled" severity="error"> {message}  {" 실패"} </MuiAlert> }
                    </Snackbar>
                </CardContent>
            </Card>

            <Dialog open={modalFlag}
                    fullWidth
                    onClose={() => closeModal()}
            >
                <DialogTitle>
                    {
                        flag == 1 ? "파이프라인 설정" :
                            flag == 2 ? "파이프라인 추가" : 
                                flag == 3? "파이프라인 수정":
                                    "파이프라인 삭제"
                    }
                </DialogTitle>
                <DialogContent>
                    {
                        flag == 1 ? <pre style={{fontFamily: "godic", fontSize:"15px"}}> {JSON.stringify(list[key], null, 2)} </pre> :
                            flag == 2 ? <Box style={{width: "100%"}}>
                                            <TextField
                                                fullWidth inputRef={name} error={nameError}
                                                placeholder={"파이프라인 명칭을 입력해 주세요."}
                                                label="파이프라인 명칭 입력"
                                                helperText="공백을 넣지 말아주세요"
                                            />
                                            <br />
                                            <AceEditor
                                                ref={aceEditor}
                                                id="aceEditor"
                                                mode="json"
                                                theme="kuroir"
                                                fontSize="15px"
                                                height={"300px"}
                                                tabSize={2}
                                                width="100%"
                                                setOptions={{ useWorker: false }}
                                            /> 
                                        </Box>: 
                                flag == 3 ? <Box style={{width: "100%"}}>
                                                <TextField
                                                    fullWidth 
                                                    disabled={true} value={key}
                                                    label="파이프라인 명칭"
                                                    helperText="명칭은 수정할 수 없습니다."
                                                />
                                                <br />
                                                <AceEditor
                                                    ref={aceEditor}
                                                    mode="json"
                                                    theme="kuroir"
                                                    fontSize="15px"
                                                    height={"300px"}
                                                    width="100%"
                                                    tabSize={2}
                                                    setOptions={{ useWorker: false }}
                                                    value={JSON.stringify(list[key], null, 2)}
                                                /> 
                                            </Box>:
                                    "이 파이프라인을 삭제하시겠습니까?"
                    }
                </DialogContent>
                <DialogActions>
                    {
                        flag == 1 ? <></> :
                            flag == 2 ? <Button variant={"outlined"} color={"primary"} onClick={() => handleAddPipeline()}>추가</Button> : 
                                flag == 3 ? <Button variant={"outlined"} color={"primary"} onClick={() => handleEditPipeline()}>수정</Button> :
                                <Button variant="outlined" style={{ whiteSpace: "nowrap", borderColor:"red", color: "red"}} onClick={() => handleDeletePipeline()}>삭제</Button>
                    }
                    <Button onClick={() => closeModal()}>닫기</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default connect(store => ({
    authUser: store.dsearchReducers.authUser,
    list: store.pipelineReducers.pipelineList
}))(Summary)