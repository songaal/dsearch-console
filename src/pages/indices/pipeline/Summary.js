import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Link, Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow, TableSortLabel,
    TextField,
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-kuroir";
import {addPipeline, deletePipeline, editPipeline, setPipelineList} from '@actions/pipelineActions'

const fields = [
    { id: "no", label: "#", sorting: false},
    { id: "name", label: "파이프라인 이름", sorting: true},
    { id: "edit", label: "수정", sorting: false},
    { id: "delete", label: "삭제", sorting: false},
]

const TEMPLATE = 
`{
    "description": "",
    "processors": [
      {
        "lowercase": {
            "field": "field"
        }
      },
      {
        "html_strip": {
          "field": "field"
        }
      },
      {
        "set": {
          "field": "field",
          "value": "value"
        }
      },
      {
        "trim": {
          "field": "field"
        }
      },
      {
        "split": {
          "field": "field",
          "separator": ","
        }
      },
      {
        "gsub": {
          "field": "field",
          "pattern": "pattern",
          "replacement": "replacement"
        }
      },
      {
        "remove": {
          "field": "field"
        }
      },
      {
        "script": {
          "lang": "painless",
          "source": ""
        }
      }
    ]
  }`;

function Summary({ dispatch, authUser, list }) {
    const aceEditor = useRef(null)

    useEffect(() => {
        dispatch(setPipelineList())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const name = useRef(null);
    
    const [nameError, setNameError] = useState(false)
    const [modalFlag, setModalFlag] = useState(false)
    const [successFlag, setSuccessFlag] = useState(false)
    const [snackbarFlag, setSnackbarFlag] = useState(false)
    const [message, setMessage] = useState('')
    const [key, setKey] = useState('')
    const [flag, setFlag] = useState(0);
    const [orderBy, setOrderBy] = useState("")
    const [order, setOrder] = useState("asc")

    function isJson(str) {
        try {
            let json = JSON.parse(str);
            return (typeof json === 'object');
        } catch (e) {
            return false;
        }
    }

    function closeModal(){
        console.log(key);
        setModalFlag(false)
    }

    function openModal(id){
        setKey(id);
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

    const viewList = Object.keys(list).map((l, n) => ({title: l, no: n}))

    return (
        <React.Fragment>
            <br/>

            <Box align={'right'}>
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

            <br/>

            <TableContainer component={Paper}>
                <Table>
                    <colgroup>
                        <col width="5%" />
                        <col />
                        <col width="10%" />
                        <col width="10%" />
                    </colgroup>
                    <TableHead>
                        <TableRow>
                            {
                                fields.map(field =>
                                    <TableCell align="center" key={field['id']}>
                                        {
                                            field["sorting"] ?
                                                <TableSortLabel
                                                    active={orderBy === field['id']}
                                                    direction={orderBy === field['id'] ? order : 'asc'}
                                                    onClick={event => {
                                                        setOrderBy(field['id'])
                                                        const isAsc = orderBy === field['id'] && order === 'asc';
                                                        setOrder(isAsc ? 'desc' : 'asc');
                                                    }}
                                                >
                                                    {field['label']}
                                                </TableSortLabel>
                                                :
                                                field['label']
                                        }
                                    </TableCell>)
                            }
                            {/*<TableCell align={"center"} >#</TableCell>*/}
                            {/*<TableCell align={"center"} >파이프라인 이름</TableCell>*/}
                            {/*<TableCell align={"center"} >수정</TableCell>*/}
                            {/*<TableCell align={"center"} >삭제</TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            viewList
                                .sort((a, b) => {
                                    if (orderBy && order) {
                                        let x = a['title']
                                        let y = b['title']
                                        if (order === 'asc') {
                                            return x > y ? 1 : -1
                                        } else {
                                            return x > y ? -1 : 1
                                        }
                                    } else {
                                        return 0
                                    }})
                                .map((item, index) => {
                                    return  <TableRow key={index}>
                                        <TableCell align={"center"}>
                                            {item['no'] + 1}
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            <Link onClick={() => openModal(item['title'])} variant={"inherit"} style={{ cursor: "pointer" }} color={"primary"} id={item['title']} >{item['title']}</Link>
                                        </TableCell>
                                        {/* <TableCell align={"center"}>
                                                                <Button variant={"outlined"} color={"primary"} style={{ whiteSpace: "nowrap" }} onClick={()=> openModalEdit(item)} >수정</Button>
                                                            </TableCell>
                                                            <TableCell align={"center"}>
                                                                <Button variant="outlined" style={{ whiteSpace: "nowrap", borderColor:"red", color: "red"}} onClick={() => openModalDelete(item)}>삭제</Button>
                                                            </TableCell> */}
                                        {authUser.role.index ?
                                            <TableCell align={"center"}>
                                                <Button variant={"outlined"} color={"primary"} style={{ whiteSpace: "nowrap" }} onClick={()=> openModalEdit(item['title'])} >수정</Button>
                                            </TableCell> : <TableCell></TableCell> }
                                        {authUser.role.index ?
                                            <TableCell align={"center"}>
                                                <Button variant="outlined" style={{ whiteSpace: "nowrap", borderColor:"red", color: "red"}} onClick={() => openModalDelete(item['title'])}>삭제</Button>
                                            </TableCell> : <TableCell></TableCell> }
                                    </TableRow>
                                })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar open={snackbarFlag} autoHideDuration={3000} onClose={() => { setSnackbarFlag(false); }}>
                {successFlag ? <MuiAlert elevation={6} variant="filled" severity="info"> {message} {" 성공"} </MuiAlert>
                    : <MuiAlert elevation={6} variant="filled" severity="error"> {message}  {" 실패"} </MuiAlert> }
            </Snackbar>

            {/*<Card>*/}
            {/*    <CardContent>*/}
            {/*        */}
            {/*    </CardContent>*/}
            {/*</Card>*/}

            <Dialog open={modalFlag}
                    fullWidth
                    onClose={() => closeModal()}
            >
                <DialogTitle>
                    {
                        flag === 1 ? "파이프라인 설정" :
                            flag === 2 ? "파이프라인 추가" : 
                                flag === 3? "파이프라인 수정":
                                    "파이프라인 삭제"
                    }
                </DialogTitle>
                <DialogContent>
                    {
                        flag === 1 ? <pre style={{fontFamily: "godic", fontSize:"15px"}}> {JSON.stringify(list[key], null, 2)} </pre> :
                            flag === 2 ? <Box style={{width: "100%"}}>
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
                                                value={TEMPLATE}
                                            /> 
                                        </Box>: 
                                flag === 3 ? <Box style={{width: "100%"}}>
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
                        flag === 1 ? <></> :
                            flag === 2 ? <Button variant={"outlined"} color={"primary"} onClick={() => handleAddPipeline()}>추가</Button> : 
                                flag === 3 ? <Button variant={"outlined"} color={"primary"} onClick={() => handleEditPipeline()}>수정</Button> :
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