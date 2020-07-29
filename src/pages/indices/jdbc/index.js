import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import {NavLink as RouterNavLink} from "react-router-dom";
import { connect } from "react-redux";
import Helmet from 'react-helmet';
import utils from "../../../utils";
import MuiAlert from '@material-ui/lab/Alert';
import {
    Box, Button,
    Dialog, DialogTitle,
    Table, TableRow, TableCell, TableHead, TableBody,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    Grid,
    Link,
    Select, MenuItem,
    Typography,
    TextField as MuiTextField,
    DialogContent,
    DialogActions,
    Snackbar
} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {spacing} from "@material-ui/system";
import { setJDBCList, setJDBCAccessTest, addJdbcIndex, deleteJdbcSource, updateJdbcSource } from '@actions/jdbcActions'

const drivers = ["Altibase", "Oracle", "Mysql"];
const JdbcDrivers = {
    "Altibase": "Altibase.jdbc.driver.AltibaseDriver",
    "Oracle": "oracle.jdbc.driver.OracleDriver",
    "Mysql":"com.mysql.cj.jdbc.Driver"
}
const JdbcDriversURL = {
    "Altibase": "jdbc:Altibase://",
    "Oracle": "jdbc:oracle:thin:@",
    "Mysql":"jdbc:mysql://"
}


const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const TextField = styled(MuiTextField)(spacing);

function JdbcTable({dispatch, authUser, JdbcList, changedJdbcList}){
    const [jdbcSourceEditDialogOpen, setJdbcSourceEditDialogOpenAction] = useState(false)
    const [jdbcListIndex, setJdbcListIndex] = useState(-1)

    let editId = useRef("");
    let editName = useRef("");
    let editDriver = useRef("");
    let editUser = useRef("");
    let editPassword = useRef("");
    let editURL = useRef("");

    const handleEditJdbcSource = (event) => {
        let JdbcSource = JdbcList.hits.hits[jdbcListIndex];
        let editJdbcSource = {};

        editJdbcSource.id = editId.current.value;
        editJdbcSource.name = editName.current.value;
        editJdbcSource.driver = editDriver.current.value;
        editJdbcSource.user = editUser.current.value;
        if(editPassword.current.value.length !== 0 ) editJdbcSource.password = editPassword.current.value;
        editJdbcSource.url = editURL.current.value;
        let doc = {}
        doc.doc = editJdbcSource;
        dispatch(updateJdbcSource(JdbcSource.id, editJdbcSource));
        setJdbcSourceEditDialogOpenAction(false)
    }

    const handleDeleteJdbcSource = (event) => {
        let JdbcSource = JdbcList.hits.hits[jdbcListIndex];
        dispatch(deleteJdbcSource(JdbcSource.id))
        setJdbcSourceEditDialogOpenAction(false);
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
                            <TableCell>#</TableCell>
                            <TableCell>아이디</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>드라이버</TableCell>
                            <TableCell>URL</TableCell>
                            <TableCell>사용자</TableCell>
                            <TableCell>비밀번호</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {JdbcList.hits.hits.length > 0 ?  (
                            JdbcList.hits.hits.map((item, index)=>{
                                let password = item.sourceAsMap.password;
                                let star = "";
                                
                                for(let i = 0; i < password.length-3; i++){
                                    star += "*";
                                }

                                password = password.substring(0, 2) + star + password.substring(password.length-1, password.length);
                                return <TableRow key={item.sourceAsMap.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.sourceAsMap.id}</TableCell>
                                    <TableCell>{item.sourceAsMap.name}</TableCell>
                                    <TableCell>{item.sourceAsMap.driver}</TableCell>
                                    <TableCell>{item.sourceAsMap.url}</TableCell>
                                    <TableCell>{item.sourceAsMap.user}</TableCell>
                                    <TableCell>{password}</TableCell>
                                    {/* <TableCell>{item._source.password}</TableCell> */}
                                    {authUser.role.index ? <TableCell><Link id={index} href="#" onClick={handleEditDialogOpen}>수정</Link></TableCell> : <TableCell></TableCell>}
                                </TableRow>})):(<TableRow><TableCell align="center" colSpan={8}>{"현재 등록된 JDBC가 없습니다."}</TableCell></TableRow>)}
                    </TableBody>
                    <Dialog open={jdbcSourceEditDialogOpen} onClose={handleEditDialogClose} >
                        <DialogTitle id="dialog-title">{"JDBC 소스"}</DialogTitle>
                        <DialogContent>
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
    let JdbcSource = JdbcList.hits.hits[JdbcListIndex];

    return(
        <Box p={2}>
            <Box display="flex" m={3}  alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>아이디</Typography>
                <TextField placeholder="ID" fullWidth variant="outlined" defaultValue={JdbcSource.sourceAsMap.id} inputRef={editId} />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>이름</Typography>
                <TextField placeholder="Name" fullWidth variant="outlined" defaultValue={JdbcSource.sourceAsMap.name} inputRef={editName}/>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{ width: "150px" }}>드라이버</Typography>
                <TextField placeholder="Driver" fullWidth variant="outlined" defaultValue={JdbcSource.sourceAsMap.driver} inputRef={editDriver}/>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>URL</Typography>
                <TextField placeholder="jdbc:Altibase://localhost:3306/" fullWidth variant="outlined" defaultValue={JdbcSource.sourceAsMap.url} inputRef={editURL}/>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>사용자</Typography>
                <TextField placeholder="USER" fullWidth variant="outlined" defaultValue={JdbcSource.sourceAsMap.user} inputRef={editUser}/>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>비밀번호</Typography>
                <TextField placeholder="PASSWORD (LEAVE BLANK IF YOU DON'T WANT CHANGE)" fullWidth variant="outlined" type="password" inputRef={editPassword}/>
            </Box>
        </Box>
    );
}

function JdbcSource({errorHandleJdbcSource, jdbcId, jdbcName, jdbcDriver, jdbcAddr, jdbcPort, jdbcDB, jdbcUser, jdbcPassword, jdbcParams, jdbcURL, setProvider}){
    return (
        <Box p={2}>
            <Box display="flex" m={3}  alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>아이디</Typography>
                <TextField error={errorHandleJdbcSource.id} id="jdbcSourceId" size="small" placeholder="ID" fullWidth variant="outlined"  inputRef={jdbcId} />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>이름</Typography>
                <TextField error={errorHandleJdbcSource.name} id="jdbcSourceName" size="small" placeholder="Name" fullWidth variant="outlined" inputRef={jdbcName}/>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{ width: "150px" }}>DB제공자</Typography>
                <Select id="jdbcSourceDriver" fullWidth onChange={setProvider} defaultValue="">
                    {drivers.map((item, index) => {
                        console.log(item, index);
                        if(index === 0) return <MenuItem key={item} value={item}> {item} Driver</MenuItem>;
                        return <MenuItem key={item} value={item}> {item} Driver</MenuItem>;
                    })}
                </Select>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>드라이버</Typography>
                <TextField error={errorHandleJdbcSource.driver} id="jdbcSourceDbSupport" size="small" fullWidth variant="outlined" inputRef={jdbcDriver} />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>호스트주소</Typography>
                <TextField error={errorHandleJdbcSource.address} id="jdbcSourceHostAddress" size="small" placeholder="127.0.0.1" fullWidth variant="outlined" inputRef={jdbcAddr} />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>포트</Typography>
                <TextField error={errorHandleJdbcSource.port} id="jdbcSourcePort" size="small" placeholder="3306" fullWidth variant="outlined" inputRef={jdbcPort} />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>DB명</Typography>
                <TextField error={errorHandleJdbcSource.db_name} id="jdbcSourceDbName" size="small" fullWidth variant="outlined" inputRef={jdbcDB}/>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>사용자</Typography>
                <TextField error={errorHandleJdbcSource.user} id="jdbcSourceUser" size="small" placeholder="USER" fullWidth variant="outlined" inputRef ={jdbcUser}/>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>비밀번호</Typography>
                <TextField error={errorHandleJdbcSource.password} id="jdbcSourcePassword" type="password" size="small" placeholder="PASSWORD" fullWidth variant="outlined" inputRef={jdbcPassword} />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>JDBC파라미터</Typography>
                <TextField error={errorHandleJdbcSource.params} id="jdbcSourceParams" size="small" fullWidth variant="outlined" inputRef={jdbcParams} />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>URL</Typography>
                <TextField error={errorHandleJdbcSource.url} id="jdbcSourceURL" size="small" placeholder="jdbc:mysql://" fullWidth variant="outlined" inputRef={jdbcURL}/>
            </Box>
        </Box>
    );
}

function AccessTestSuccess({JdbcAccessTest, accessFlag, handleAccessFlag}){

    return <Snackbar open={accessFlag} autoHideDuration={3000} onClose={() => {handleAccessFlag(); JdbcAccessTest.message = false; }}>
                {JdbcAccessTest.message ? 
                    <MuiAlert elevation={6} variant="filled" severity="info">{"연결테스트 성공"} </MuiAlert> : <MuiAlert elevation={6} variant="filled" severity="error">{"연결테스트 실패"}</MuiAlert>}
            </Snackbar>

    // return <Snackbar open={JdbcAccessTest.message} autoHideDuration={5000} onClose={() => {JdbcAccessTest.message = false;}}>
    //             <MuiAlert elevation={6} variant="filled" severity="info"> 연결테스트 성공 </MuiAlert>
    //         </Snackbar>
}

function JdbcCard({dispatch, authUser, JdbcList, JdbcAccessTest, changedJdbcList}) {
    const [jdbcSourceDialogOpen, setjdbcSourceDialogOpenAction] = useState(false)
    const [jdbcProvider, setJdbcProvider] = useState("");
    const [accessFlag, setAccessFlag] = useState(false);
    const [errorHandleJdbcSource, setErrorHandleJdbcSource] = useState({
        id: false,
        name: false,
        driver: false,
        address: false,
        port: false,
        db_name: false,
        user: false,
        password: false,
        params: false,
        url: false
    });

    if(changedJdbcList) {
        utils.sleep(1000).then(() => {dispatch(setJDBCList());})
    }

    let jdbcId = useRef("");
    let jdbcName = useRef("");
    let jdbcDriver = useRef("");
    let jdbcAddr = useRef("");
    let jdbcPort = useRef("");
    let jdbcDB = useRef("");
    let jdbcUser = useRef("");
    let jdbcPassword = useRef("");
    let jdbcParams = useRef("");
    let jdbcURL = useRef("");

    function handleAccessFlag(){
        setAccessFlag(false)
    }

    function setProvider(event, index){
        jdbcDriver.current.value = JdbcDrivers[event.target.value]
        jdbcURL.current.value = JdbcDriversURL[event.target.value]
        // console.log("index.props.value ", index.props.value);
        // console.log("event, target.value",);
        setJdbcProvider(event.target.value);
    }
    
    const handleSourceDialogClose = (event) => {
        setjdbcSourceDialogOpenAction(false)
    };

    const handleSourceDialogOpen = (event) => {
        /* 에러 초기화 */
        setErrorHandleJdbcSource({
            id: false,
            name: false,
            driver: false,
            address: false,
            port: false,
            db_name: false,
            user: false,
            password: false,
            params: false,
            url: false
        })
        setjdbcSourceDialogOpenAction(true)
    };

    const accessTest = (event) => {
        let flag = false;
        let change = {
            id: false,
            name: false,
            driver: false,
            address: false,
            port: false,
            db_name: false,
            user: false,
            password: false,
            params: false,
            url: false
        };
        
        if( jdbcId.current.value.length === 0) { flag = true; change.id = true; }
        if(jdbcName.current.value.length === 0){ flag = true; change.name = true; }
        if(jdbcDriver.current.value.length === 0){ flag = true; change.driver = true; }
        if(jdbcAddr.current.value.length === 0){ flag = true; change.address = true; }
        if(jdbcPort.current.value.length === 0){ flag = true; change.port = true; }
        if(jdbcUser.current.value.length === 0){ flag = true; change.user = true; }
        if(jdbcPassword.current.value.length === 0){ flag = true; change.password = true; }
        if(jdbcURL.current.value.length === 0) { flag = true; change.url = true; }
        if(jdbcDB.current.value.length === 0) { flag = true; change.db_name = true; }

        if(flag){
            setErrorHandleJdbcSource(change);
            return;
        }

        let jdbcdSourceObj = {};
        jdbcdSourceObj.id = jdbcId.current.value
        jdbcdSourceObj.name =  jdbcName.current.value
        jdbcdSourceObj.provider = jdbcProvider;
        jdbcdSourceObj.driver = jdbcDriver.current.value;
        jdbcdSourceObj.address = jdbcAddr.current.value;
        jdbcdSourceObj.port = jdbcPort.current.value;
        jdbcdSourceObj.db_name = jdbcDB.current.value;
        jdbcdSourceObj.user = jdbcUser.current.value;
        jdbcdSourceObj.password = jdbcPassword.current.value;
        jdbcdSourceObj.params = jdbcParams.current.value;
        jdbcdSourceObj.url = jdbcURL.current.value + jdbcAddr.current.value + ":"+ jdbcPort.current.value + "/" + jdbcDB.current.value + jdbcParams.current.value;

        setAccessFlag(true);
        dispatch(setJDBCAccessTest(jdbcdSourceObj));
    }


    /* 연결테스트를 하지 않아도 추가할 수 있어야 함*/
    const addJdbcSouce = (event) => {
        let flag = false;
        let change = {
            id: false,
            name: false,
            driver: false,
            address: false,
            port: false,
            db_name: false,
            user: false,
            password: false,
            params: false,
            url: false
        };
        
        if( jdbcId.current.value.length === 0) { flag = true; change.id = true; }
        if(jdbcName.current.value.length === 0){ flag = true; change.name = true; }
        if(jdbcDriver.current.value.length === 0){ flag = true; change.driver = true; }
        if(jdbcAddr.current.value.length === 0){ flag = true; change.address = true; }
        if(jdbcPort.current.value.length === 0){ flag = true; change.port = true; }
        if(jdbcUser.current.value.length === 0){ flag = true; change.user = true; }
        if(jdbcPassword.current.value.length === 0){ flag = true; change.password = true; }
        if(jdbcURL.current.value.length === 0) { flag = true; change.url = true; }
        if(jdbcDB.current.value.length === 0) { flag = true; change.db_name = true; }

        if(flag){
            setErrorHandleJdbcSource(change);
            return;
        }
        
        let addJdbcSource = {};
        addJdbcSource.id = jdbcId.current.value
        addJdbcSource.name =  jdbcName.current.value
        addJdbcSource.provider = jdbcProvider;
        addJdbcSource.driver = jdbcDriver.current.value;
        addJdbcSource.address = jdbcAddr.current.value;
        addJdbcSource.port = jdbcPort.current.value;
        addJdbcSource.db_name = jdbcDB.current.value;
        addJdbcSource.user = jdbcUser.current.value;
        addJdbcSource.password = jdbcPassword.current.value;
        addJdbcSource.params = jdbcParams.current.value;
        addJdbcSource.url = jdbcURL.current.value + jdbcAddr.current.value + ":"+ jdbcPort.current.value + "/" + jdbcDB.current.value + jdbcParams.current.value;
        setjdbcSourceDialogOpenAction(false);
        dispatch(addJdbcIndex(addJdbcSource))
    }

    return (
        <React.Fragment>


            <Box align={'right'}>
                {
                    authUser.role.index ?
                    <Link onClick={handleSourceDialogOpen}
                          style={{cursor: "pointer"}}
                          color={"primary"}>
                        JDBC 추가
                    </Link>
                    :
                    <></>
                }
            </Box>
            <br/>

            <Card mb={6}>
                <CardContent>
                    <JdbcTable dispatch={dispatch} authUser={authUser} JdbcList={JdbcList} JdbcAccessTest={JdbcAccessTest} changedJdbcList={changedJdbcList}></JdbcTable>
                    <Dialog open={jdbcSourceDialogOpen} onClose={handleSourceDialogClose} >
                        <DialogTitle id="dialog-title">{"JDBC 소스"}</DialogTitle>
                        <DialogContent style={{width:"100%"}}>
                            <label>설정</label>
                            <Divider />
                            <JdbcSource
                                errorHandleJdbcSource={errorHandleJdbcSource}
                                jdbcId={jdbcId}
                                jdbcName={jdbcName}
                                jdbcDriver ={jdbcDriver}
                                setProvider = {setProvider}
                                jdbcAddr ={jdbcAddr}
                                jdbcPort = {jdbcPort}
                                jdbcDB = {jdbcDB}
                                jdbcUser = {jdbcUser}
                                jdbcPassword = {jdbcPassword}
                                jdbcParams = {jdbcParams}
                                jdbcURL = {jdbcURL}
                            />
                            <AccessTestSuccess accessFlag={accessFlag} JdbcAccessTest={JdbcAccessTest} handleAccessFlag={handleAccessFlag}/>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="default" onClick={handleSourceDialogClose}>닫기</Button>
                            <Button variant="outlined" onClick={accessTest}>연결테스트</Button>
                            <Button variant="contained" color="primary" onClick={addJdbcSouce}>추가</Button>
                        </DialogActions>
                    </Dialog>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}

function JDBC({dispatch, authUser, JdbcList, JdbcAccessTest, changedJdbcList}) {
    useEffect(() => {
        dispatch(setJDBCList())
    }, [])

    return (
        <React.Fragment>
            <Helmet title="JDBC"/>
            <Typography variant="h3" gutterBottom display="inline">JDBC</Typography>
            <Divider my={6}/>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <JdbcCard dispatch={dispatch} authUser={authUser} JdbcList={JdbcList} JdbcAccessTest={JdbcAccessTest} changedJdbcList={changedJdbcList} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default connect(store => ({
    authUser: store.fastcatxReducers.authUser,
    JdbcList: store.jdbcReducers.JdbcList,
    JdbcAccessTest: store.jdbcReducers.JdbcAccessTest,
    changedJdbcList: store.jdbcReducers.changedJdbcList
}))(JDBC);

