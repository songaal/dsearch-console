import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import {NavLink as RouterNavLink} from "react-router-dom";
import { connect } from "react-redux";
import Helmet from 'react-helmet';
import utils from "../../../utils";
import {
    Box, Button,
    Dialog, DialogTitle,
    Table, TableRow, TableCell, TableHead, TableBody,
    Breadcrumbs as MuiBreadcrumbs,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    Grid,
    Link,
    Select, MenuItem,
    Typography,
    TextField as MuiTextField,
    DialogContent,
    DialogActions
} from "@material-ui/core";

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {spacing} from "@material-ui/system";
import { setJDBCList, addJdbcIndex, deleteJdbcSource, updateJdbcSource } from '@actions/jdbcActions'

const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const TextField = styled(MuiTextField)(spacing);


function JdbcTable({dispatch, JdbcList, JdbcAddResult, JdbcDeleteResult}){
    const [jdbcSourceEditDialogOpen, setJdbcSourceEditDialogOpenAction] = useState(false)
    const [jdbcListIndex, setJdbcListIndex] = useState(-1)

    var editId = useRef("");
    var editName = useRef("");
    var editDriver = useRef("");
    var editUser = useRef("");
    var editPassword = useRef("");
    var editURL = useRef("");

    const handleEditJdbcSource = (event) => {
        var JdbcSource = JdbcList.hits.hits[jdbcListIndex];
        var editJdbcSource = {};

        editJdbcSource.ID = editId.current.value;
        editJdbcSource.NAME = editName.current.value;
        editJdbcSource.DRIVER = editDriver.current.value;
        editJdbcSource.USER = editUser.current.value;
        editJdbcSource.PASSWORD = editPassword.current.value;
        editJdbcSource.URL = editURL.current.value;
        
        dispatch(updateJdbcSource(JdbcSource._id, editJdbcSource));
        setJdbcSourceEditDialogOpenAction(false);
        utils.sleep(1000).then(()=>{dispatch(setJDBCList());});
        
    }

    const handleDeleteJdbcSource = (event) => {
        /* To Do : 삭제 함수 */
        var JdbcSource = JdbcList.hits.hits[jdbcListIndex];
        console.log(JdbcSource._id)
        dispatch(deleteJdbcSource(JdbcSource._id));
        setJdbcSourceEditDialogOpenAction(false);
        utils.sleep(1000).then(()=>{dispatch(setJDBCList());});
    };

    const handleEditDialogClose = (event) => {
        setJdbcSourceEditDialogOpenAction(false)
    };

    const handleEditDialogOpen = (event) => {
        setJdbcListIndex(event.target.id);
        setJdbcSourceEditDialogOpenAction(true)
    };

    return (
                <Table>
                    <colgroup>
                        <col width="1%" />
                        <col width="10%" />
                        <col width="13%" />
                        <col width="20%" />
                        <col width="30%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="5%" />
                    </colgroup>
                    <TableHead>
                        <TableRow>
                            <TableCell> # </TableCell>
                            <TableCell> 아이디 </TableCell>
                            <TableCell> 이름 </TableCell>
                            <TableCell> 드라이버 </TableCell>
                            <TableCell> URL </TableCell>
                            <TableCell> 사용자 </TableCell>
                            <TableCell> 비밀번호 </TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {JdbcList.hits.hits.length > 0 ?  (
                            JdbcList.hits.hits.map((item, index)=>{
                                
                                return <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item._source.ID}</TableCell>
                                    <TableCell>{item._source.NAME}</TableCell>
                                    <TableCell>{item._source.DRIVER}</TableCell>
                                    <TableCell>{item._source.URL}</TableCell>
                                    <TableCell>{item._source.USER}</TableCell>
                                    <TableCell>{item._source.PASSWORD}</TableCell>
                                    <TableCell><Link id={index} href="#" onClick={handleEditDialogOpen}> 수정 </Link></TableCell>
                                </TableRow>
                            })
                         ) : (<TableRow> <TableCell align="center" colSpan={8} > 현재 등록된 JDBC가 없습니다.</TableCell></TableRow> )}
                    </TableBody>
                    <Dialog open={jdbcSourceEditDialogOpen} onClose={handleEditDialogClose} >
                    <DialogTitle id="dialog-title">JDBC 소스</DialogTitle>
                    <DialogContent style={{width:"100%"}}>
                        <label>설정</label>
                        <Divider></Divider>
                        <JdbcSourceEdit 
                            JdbcList={JdbcList} 
                            JdbcListIndex={jdbcListIndex}
                            editId = {editId}
                            editName = {editName}
                            editDriver ={editDriver}
                            editUser = {editUser}
                            editPassword = {editPassword}
                            editURL = {editURL}
                            />
                    </DialogContent>
                    <DialogActions >
                        <Button variant="contained" style={{backgroundColor:"red", color:"white"}} onClick={handleDeleteJdbcSource}>삭제</Button>
                        <div style={{flex: '1 0 0'}} />
                        <Button variant="contained" color="default" onClick={handleEditDialogClose}>닫기</Button>
                        <Button variant="contained" color="primary" onClick={handleEditJdbcSource}>저장</Button>
                    </DialogActions>
                </Dialog>
                </Table>
    );
}


function JdbcSourceEdit({JdbcList, JdbcListIndex, editId, editName, editDriver, editURL, editUser, editPassword}){
    var JdbcSource = JdbcList.hits.hits[JdbcListIndex];
    return(
        <Box fullWidth p={2}>
            <Box display="flex" m={3}  alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>아이디</Typography>
                <TextField placeholder="ID" fullWidth variant="outlined" defaultValue={JdbcSource._source.ID} inputRef={editId} />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>이름</Typography>
                <TextField placeholder="Name" fullWidth variant="outlined" defaultValue={JdbcSource._source.NAME} inputRef={editName}/>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{ width: "150px" }}>드라이버</Typography>
                <TextField placeholder="Driver" fullWidth variant="outlined" defaultValue={JdbcSource._source.DRIVER} inputRef={editDriver}/>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>URL</Typography>
                <TextField placeholder="jdbc:Altibase://.3306/" fullWidth variant="outlined" defaultValue={JdbcSource._source.URL} inputRef={editURL}/>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>사용자</Typography>
                <TextField placeholder="USER" fullWidth variant="outlined" defaultValue={JdbcSource._source.USER} inputRef={editUser}/>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>비밀번호</Typography>
                <TextField placeholder="PASSWORD" fullWidth variant="outlined" defaultValue={JdbcSource._source.PASSWORD} inputRef={editPassword}/>
            </Box>
        </Box>
    );
}

function JdbcSource({jdbcId, jdbcName, jdbcSupport, jdbcAddr, jdbcPort, jdbcDB, jdbcUser, jdbcPassword, jdbcParams, jdbcURL, setDriver}){
    return (
        <Box fullWidth p={2}>
            <Box display="flex" m={3}  alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>아이디</Typography>
                <TextField id="jdbcSourceId" size="small" placeholder="ID" fullWidth variant="outlined"  inputRef={jdbcId} />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>이름</Typography>
                <TextField id="jdbcSourceName" size="small" placeholder="Name" fullWidth variant="outlined" inputRef={jdbcName}/>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>DB제공자</Typography>
                <TextField id="jdbcSourceDbSupport" size="small" fullWidth variant="outlined" inputRef={jdbcSupport} />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{ width: "150px" }}>드라이버</Typography>
                <Select id="jdbcSourceDriver" fullWidth onChange={setDriver} >
                    <MenuItem value="">
                        None
                    </MenuItem>
                    <MenuItem value={"Altibase Driver"}>Altibase Driver</MenuItem>
                    <MenuItem value={"Oracle Database Driver"}>Oracle Database Driver</MenuItem>
                    <MenuItem value={"MySql Database Driver"}>MySql Database Driver</MenuItem>
                </Select>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>호스트주소</Typography>
                <TextField id="jdbcSourceHostAddress" size="small" placeholder="127.0.0.1" fullWidth variant="outlined" inputRef={jdbcAddr} />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>포트</Typography>
                <TextField id="jdbcSourcePort" size="small" placeholder="3306" fullWidth variant="outlined" inputRef={jdbcPort} />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>DB명</Typography>
                <TextField id="jdbcSourceDbName" size="small" fullWidth variant="outlined" inputRef ={jdbcDB}/>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>사용자</Typography>
                <TextField id="jdbcSourceUser" size="small" placeholder="USER" fullWidth variant="outlined" inputRef ={jdbcUser}/>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>비밀번호</Typography>
                <TextField id="jdbcSourcePassword" size="small" placeholder="PASSWORD" fullWidth variant="outlined" inputRef={jdbcPassword} />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>JDBC파라미터</Typography>
                <TextField id="jdbcSourceParams" size="small" fullWidth variant="outlined" inputRef={jdbcParams} />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>URL</Typography>
                <TextField id="jdbcSourceURL" size="small" placeholder="jdbc:Altibase://.3306/" fullWidth variant="outlined" inputRef={jdbcURL}/>
            </Box>
        </Box>
    );
}


function JdbcCard({dispatch, JdbcList, JdbcAccessTest, JdbcAddResult, JdbcDeleteResult}) {
    const [jdbcSourceDialogOpen, setjdbcSourceDialogOpenAction] = useState(false)
    const [jdbcDriver, setJdbcDriver] = useState("");
    const [jdbcAccessTest, setJdbcAccessTest] = useState(true)
    const [jdbSource, setJdbcSource] = useState({})

    var jdbcId = useRef("");
    var jdbcName = useRef("");
    var jdbcSupport = useRef("");
    var jdbcAddr = useRef("");
    var jdbcPort = useRef("");
    var jdbcDB = useRef("");
    var jdbcUser = useRef("");
    var jdbcPassword = useRef("");
    var jdbcParams = useRef("");
    var jdbcURL = useRef("");

    function setDriver(event, index){
        console.log(index.props.value);
        setJdbcDriver(index.props.value);
    }
    
    const handleSourceDialogClose = (event) => {
        setjdbcSourceDialogOpenAction(false)
    };

    const handleSourceDialogOpen = (event) => {
        setjdbcSourceDialogOpenAction(true)
    };

    const handleAccessTest = (event) => {
        var jdbcdSourceObj = {};
        jdbcdSourceObj.id = jdbcId.current.value
        jdbcdSourceObj.name =  jdbcName.current.value
        jdbcdSourceObj.support = jdbcSupport.current.value;
        jdbcdSourceObj.driver = jdbcDriver;
        jdbcdSourceObj.addr = jdbcAddr.current.value;
        jdbcdSourceObj.port = jdbcPort.current.value;
        jdbcdSourceObj.dbName = jdbcDB.current.value;
        jdbcdSourceObj.user = jdbcUser.current.value;
        jdbcdSourceObj.pwd = jdbcPassword.current.value;
        jdbcdSourceObj.params = jdbcParams.current.value;
        jdbcdSourceObj.url = jdbcURL.current.value;
        /* To do : 연결 테스트 함수 */

        // dispatch(setJDBCAccessTest());
        setJdbcAccessTest(false)
        setJdbcSource(jdbcdSourceObj)
    }

    const handleJdbcSouceAdd = (event) => {
        // if(jdbcAccessTest){
        //     return;
        // }

        var addJdbcSource = {};
        addJdbcSource.ID = jdbcId.current.value
        addJdbcSource.NAME =  jdbcName.current.value
        addJdbcSource.PROVIDER = jdbcSupport.current.value;
        addJdbcSource.DRIVER = jdbcDriver;
        addJdbcSource.ADDRESS = jdbcAddr.current.value;
        addJdbcSource.PORT = jdbcPort.current.value;
        addJdbcSource.DB_NAME = jdbcDB.current.value;
        addJdbcSource.USER = jdbcUser.current.value;
        addJdbcSource.PASSWORD = jdbcPassword.current.value;
        addJdbcSource.PARAMS = jdbcParams.current.value;
        addJdbcSource.URL = jdbcURL.current.value;
        
        console.log(addJdbcSource);
        var keyList = Object.keys(jdbSource);
        var flag = true;
        // for(var key of keyList){
        //     if(jdbSource[key]  != addJdbcSource[key]){
        //         flag = false;
        //         break;
        //     }
        // }
        // console.log(flag);
        setjdbcSourceDialogOpenAction(false);
        /* To Do : JDBC 등록 함수 */
        if(flag) {
            dispatch(addJdbcIndex(addJdbcSource));
            utils.sleep(1000).then(()=>{dispatch(setJDBCList());});
        }
    }

    return (
        <Card mb={6}>
            <CardContent>
                <Link href="#" onClick={handleSourceDialogOpen}> <Box display="flex" alignItems="center" justifyContent="left"><AddCircleOutlineIcon /> <Typography>  JDBC 추가  </Typography> </Box></Link> 
                <JdbcTable dispatch={dispatch} JdbcList={JdbcList} JdbcAccessTest={JdbcAccessTest} JdbcAddResult={JdbcAddResult}  JdbcDeleteResult={JdbcDeleteResult}></JdbcTable>
                <Dialog open={jdbcSourceDialogOpen} onClose={handleSourceDialogClose} >
                    <DialogTitle id="dialog-title">JDBC 소스</DialogTitle>
                    <DialogContent style={{width:"100%"}}>
                        <label>설정</label>
                        <Divider></Divider>
                        <JdbcSource 
                            jdbcId={jdbcId}
                            jdbcName={jdbcName}
                            jdbcSupport ={jdbcSupport}
                            setDriver = {setDriver}
                            jdbcAddr ={jdbcAddr}
                            jdbcPort = {jdbcPort}
                            jdbcDB = {jdbcDB}
                            jdbcUser = {jdbcUser}
                            jdbcPassword = {jdbcPassword}
                            jdbcParams = {jdbcParams}
                            jdbcURL = {jdbcURL}
                         />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="default">닫기</Button>
                        <Button variant="contained" color="default" onClick={handleAccessTest}>연결테스트</Button>
                        <Button disabled={jdbcAccessTest} variant="contained" color="primary" onClick={handleJdbcSouceAdd}>추가</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
}

function JDBC({dispatch, JdbcList, JdbcAccessTest, JdbcAddResult, JdbcDeleteResult}) {
    useEffect(() => {
        dispatch(setJDBCList())
    }, [])
    
    return (
        <React.Fragment>
            <Helmet title="Blank"/>
            <Typography variant="h3" gutterBottom display="inline">
                JDBC
            </Typography>

            <Divider my={6}/>

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <JdbcCard dispatch={dispatch} JdbcList={JdbcList} JdbcAccessTest={JdbcAccessTest} JdbcAddResult={JdbcAddResult}  JdbcDeleteResult={JdbcDeleteResult}/>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default connect(store => ({
    JdbcList: store.jdbcReducers.JdbcList,
    JdbcAccessTest: store.jdbcReducers.JdbcAccessTest,
    JdbcDeleteResult: store.jdbcReducers.JdbcDeleteResult,
    JdbcAddResult: store.jdbcReducers.JdbcAddResult,
}))(JDBC);

