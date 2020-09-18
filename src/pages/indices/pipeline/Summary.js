import React, {useEffect, useState, useRef} from "react";
import { connect } from "react-redux";
import {
    Box, CircularProgress,
    Card,
    CardContent,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell, Link,
    TableBody,Typography,
    Dialog, DialogTitle,DialogContent, DialogActions,
    Checkbox, Snackbar, TextField, TextareaAutosize, Divider
} from "@material-ui/core";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-kuroir";
import { setPipelineList, deletePipeline, addPipeline, editPipeline} from '@actions/pipelineActions'
import utils from "../../../utils";

function Summary({ dispatch, list }) {
    useEffect(() => {
        dispatch(setPipelineList())
    }, [])

    const name = useRef(null);
    const aceEditor = useRef(null);
    const [modalFlag, setModalFlag] = useState(false)
    
    const [key, setKey] = useState('')
    const [flag, setFlag] = useState(0);

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
        dispatch(addPipeline(name.current.value, aceEditor.current.editor.getValue()))
        closeModal()
        utils.sleep(1000).then(() => {dispatch(setPipelineList());})
        // list[name.current.value] = JSON.parse(aceEditor.current.editor.getValue())
    }

    function handleEditPipeline(){
        dispatch(editPipeline(key, aceEditor.current.editor.getValue()))
        closeModal()
        utils.sleep(1000).then(() => {dispatch(setPipelineList());})
        // list[name.current.value] = JSON.parse(aceEditor.current.editor.getValue())
    }

    function handleDeletePipeline(){
        dispatch(deletePipeline(key))
        closeModal()
        utils.sleep(1000).then(() => {dispatch(setPipelineList());})
        // delete list[key]
    }

    return (
        <React.Fragment>
            <Card>
                <CardContent>
                    <Box>
                        <Box align={'right'} paddingRight={"30px"}>
                            <Link
                                onClick={openModalAdd}
                                style={{ cursor: "pointer" }}
                                color={"primary"}>
                                파이프라인 추가
                            </Link>
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
                                                        <TableCell align={"center"}>
                                                            <Button variant={"outlined"} color={"primary"} style={{ whiteSpace: "nowrap" }} onClick={()=> openModalEdit(item)} >수정</Button>
                                                        </TableCell>
                                                        <TableCell align={"center"}>
                                                            <Button variant="outlined" style={{ whiteSpace: "nowrap", borderColor:"red", color: "red"}} onClick={() => openModalDelete(item)}>삭제</Button>
                                                        </TableCell>
                                                    </TableRow>
                                        })
                                }
                            </TableBody>
                        </Table>
                    </Box>
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
                        flag == 1 ? <pre> {JSON.stringify(list[key], null, 2)} </pre> :
                            flag == 2 ? <Box style={{width: "100%"}}>
                                            <Typography>파이프라인 이름 입력</Typography>
                                            <TextField fullWidth inputRef={name}></TextField>
                                            <br />
                                            <Divider></Divider>
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
                                                <Typography>파이프라인 이름</Typography>
                                                <TextField disabled={true} fullWidth value={key}> </TextField>
                                                <br />
                                                <Divider></Divider>
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