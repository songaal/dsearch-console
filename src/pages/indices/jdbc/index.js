import React, {useState}from "react";
import styled from "styled-components";
import {NavLink as RouterNavLink} from "react-router-dom";

import Helmet from 'react-helmet';

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
import { AlignLeft } from "react-feather";

const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const TextField = styled(MuiTextField)(spacing);
function JdbcTable(){
    const [jdbcSourceEditDialogOpen, setjdbcSourceEditDialogOpenAction] = useState(false)
    const handleEditDialogClose = (event) => {
        setjdbcSourceEditDialogOpenAction(false)
    };

    const handleEditDialogOpen = (event) => {
        setjdbcSourceEditDialogOpenAction(true)
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
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>analytics</TableCell>
                            <TableCell>로그분석기</TableCell>
                            <TableCell>com.mysql.jdbc.Driver</TableCell>
                            <TableCell>jdbc:mysql://192.168.1.141:3306/analytics?characterEncoding=utf-8</TableCell>
                            <TableCell>analytics</TableCell>
                            <TableCell>an******s</TableCell>
                            <TableCell><Link href="#" onClick={handleEditDialogOpen}> 수정 </Link></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2</TableCell>
                            <TableCell>analytics</TableCell>
                            <TableCell>로그분석기</TableCell>
                            <TableCell>com.mysql.jdbc.Driver</TableCell>
                            <TableCell>jdbc:mysql://192.168.1.141:3306/analytics?characterEncoding=utf-8</TableCell>
                            <TableCell>analytics</TableCell>
                            <TableCell>an******s</TableCell>
                            <TableCell><Link href="#" onClick={handleEditDialogOpen}> 수정 </Link></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3</TableCell>
                            <TableCell>analytics</TableCell>
                            <TableCell>로그분석기</TableCell>
                            <TableCell>com.mysql.jdbc.Driver</TableCell>
                            <TableCell>jdbc:mysql://192.168.1.141:3306/analytics?characterEncoding=utf-8</TableCell>
                            <TableCell>analytics</TableCell>
                            <TableCell>an******s</TableCell>
                            <TableCell><Link href="#" onClick={handleEditDialogOpen}> 수정 </Link></TableCell>
                        </TableRow>
                        
                        <TableRow>
                            <TableCell>4</TableCell>
                            <TableCell>analytics</TableCell>
                            <TableCell>로그분석기</TableCell>
                            <TableCell>com.mysql.jdbc.Driver</TableCell>
                            <TableCell>jdbc:mysql://192.168.1.141:3306/analytics?characterEncoding=utf-8</TableCell>
                            <TableCell>analytics</TableCell>
                            <TableCell>an******s</TableCell>
                            <TableCell><Link href="#" onClick={handleEditDialogOpen}> 수정 </Link></TableCell>
                        </TableRow>
                    </TableBody>
                    <Dialog open={jdbcSourceEditDialogOpen} onClose={handleEditDialogClose} >
                    <DialogTitle id="dialog-title">JDBC 소스</DialogTitle>
                    <DialogContent style={{width:"100%"}}>
                        <label>설정</label>
                        <Divider></Divider>
                        <JdbcSourceEdit></JdbcSourceEdit>
                    </DialogContent>

                    <DialogActions >
                        <Button variant="contained" style={{backgroundColor:"red", color:"white"}}>삭제</Button>
                        <div style={{flex: '1 0 0'}} />
                        <Button variant="contained" color="default">닫기</Button>
                        <Button variant="contained" color="primary">저장</Button>
                    </DialogActions>
                </Dialog>
                </Table>
    );
}


function JdbcSourceEdit(){
    return(
        <Box fullWidth p={2}>
            <Box display="flex" m={3}  alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>아이디</Typography>
                <TextField placeholder="ID" fullWidth variant="outlined" />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>이름</Typography>
                <TextField placeholder="Name" fullWidth variant="outlined" />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{ width: "150px" }}>드라이버</Typography>
                <TextField placeholder="Driver" fullWidth variant="outlined"/>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>URL</Typography>
                <TextField placeholder="jdbc:Altibase://.3306/" fullWidth variant="outlined"/>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>사용자</Typography>
                <TextField placeholder="USER" fullWidth variant="outlined"/>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>비밀번호</Typography>
                <TextField placeholder="PASSWORD" fullWidth variant="outlined" />
            </Box>
            
        </Box>
    );
}

function JdbcSource(){
    return (
        <Box fullWidth p={2}>
            <Box display="flex" m={3}  alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>아이디</Typography>
                <TextField placeholder="ID" fullWidth variant="outlined" />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>이름</Typography>
                <TextField placeholder="Name" fullWidth variant="outlined" />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>DB제공자</Typography>
                <TextField  fullWidth variant="outlined" />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{ width: "150px" }}>드라이버</Typography>
                <Select fullWidth>
                    <MenuItem value="">
                        None
                    </MenuItem>
                    <MenuItem value={10}>Altibase Driver</MenuItem>
                    <MenuItem value={20}>Oracle Database Driver</MenuItem>
                    <MenuItem value={30}>MySql Database Driver</MenuItem>
                </Select>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>호스트주소</Typography>
                <TextField placeholder="127.0.0.1" fullWidth variant="outlined" />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>포트</Typography>
                <TextField placeholder="3306" fullWidth variant="outlined" />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>DB명</Typography>
                <TextField fullWidth variant="outlined" />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>사용자</Typography>
                <TextField placeholder="USER" fullWidth variant="outlined"/>
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>비밀번호</Typography>
                <TextField placeholder="PASSWORD" fullWidth variant="outlined" />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>JDBC파라미터</Typography>
                <TextField fullWidth variant="outlined" />
            </Box>
            <Box display="flex" m={3} alignItems="center" justifyContent="right">
                <Typography style={{width:"150px"}}>URL</Typography>
                <TextField placeholder="jdbc:Altibase://.3306/" fullWidth variant="outlined"/>
            </Box>
        </Box>
    );
}


function JdbcCard() {
    const [jdbcSourceDialogOpen, setjdbcSourceDialogOpenAction] = useState(false)
    

    const handleSourceDialogClose = (event) => {
        setjdbcSourceDialogOpenAction(false)
    };

    const handleSourceDialogOpen = (event) => {
        setjdbcSourceDialogOpenAction(true)
    };

    return (
        <Card mb={6}>
            <CardContent>
                <Link href="#" onClick={handleSourceDialogOpen}> <Box display="flex" alignItems="center" justifyContent="left"><AddCircleOutlineIcon /> <Typography>  JDBC 추가  </Typography> </Box></Link> 
                <JdbcTable></JdbcTable>
                <Dialog open={jdbcSourceDialogOpen} onClose={handleSourceDialogClose} >
                    <DialogTitle id="dialog-title">JDBC 소스</DialogTitle>
                    <DialogContent style={{width:"100%"}}>
                        <label>설정</label>
                        <Divider></Divider>
                        <JdbcSource></JdbcSource>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="default">닫기</Button>
                        <Button variant="contained" color="default">연결테스트</Button>
                        <Button variant="contained" color="primary">추가</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
}

function JDBC() {
    return (
        <React.Fragment>
            <Helmet title="Blank"/>
            <Typography variant="h3" gutterBottom display="inline">
                JDBC
            </Typography>

            {/* <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} exact to="/">
                    Dashboard
                </Link>
                <Link component={NavLink} exact to="/">
                    Pages
                </Link>
                <Typography>JDBC</Typography>
            </Breadcrumbs> */}

            <Divider my={6}/>

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <JdbcCard />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default JDBC;
