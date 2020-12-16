import React from "react";
import styled from "styled-components";

import {
    Box,
    Card as MuiCard, CardContent,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";

import {makeStyles, withStyles} from '@material-ui/core/styles';
import {spacing} from "@material-ui/system";
import {connect} from "react-redux";

const Card = styled(MuiCard)(spacing);

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 250,
    },
    root: {
        flexGrow: 1,
        width: '100%',
        marginBottom: "15px"
    },
    edit: {
        width: '100%'
    }
}));

const StyledTableCell = withStyles((theme) => ({
    body: {
        fontSize: 12
    },
}))(TableCell);


const propertyCheck = (property) => {
    if (!property) {
        return '-'
    } else if (property == null) {
        return '-'
    } else if (typeof property == 'undefined' || typeof property == undefined) {
        return '-'
    } else if (property === 'undefined' || property === undefined) {
        return '-'
    } else {
        return property
    }
}

function NodeSettingTable(node) {
    const classes = useStyles();
    return (
        <div style={{maxWidth: '100%'}}>
            <Typography variant="h6" className={classes.root}>
                노드정보
            </Typography>

            <Card>
                <CardContent style={{overflow: "auto"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>ES버전</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>호스트</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>IP주소</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>역할</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>XPACK 설치</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>XPACK 보안</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>부트스트랩</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(node).map((row) => (
                                <TableRow>
                                    <StyledTableCell>{row.version}</StyledTableCell>
                                    <StyledTableCell>{row.host}</StyledTableCell>
                                    <StyledTableCell>{row.ip}</StyledTableCell>
                                    <StyledTableCell>{(row["roles"] || []).join(", ")}</StyledTableCell>
                                    <StyledTableCell>{(row.attributes || {})["xpack.installed"] === 'true' ?
                                        <font color="blue">설치됨</font> : <font color="red">미설치</font>}</StyledTableCell>
                                    <StyledTableCell>{propertyCheck((((row.settings || {}).xpack || {}).security || {}).enabled) === 'true' ?
                                        <font color="blue">활성</font> : <font color="red">비활성</font>}</StyledTableCell>

                                    <StyledTableCell>
                                        {Object.entries(((row.settings || {})["bootstrap"] || {})).map((bootstrapOption) => (
                                            bootstrapOption
                                        )).join(", \n")}
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

function NodePathTable(node) {
    const classes = useStyles();
    return (
        <div style={{maxWidth: '100%'}}>
            <Typography variant="h6" className={classes.root}>
                경로
            </Typography>
            <Card>
                <CardContent style={{overflow: "auto"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>홈</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>로그</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>백업</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(node).map((row, index) => (
                                <TableRow>
                                    <StyledTableCell>{((row.settings || {}).path || {}).home || ""}</StyledTableCell>
                                    <StyledTableCell>{((row.settings || {}).path || {}).logs || ""}</StyledTableCell>
                                    <StyledTableCell>{((row.settings || {}).path || {}).repo || ""}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

function NetworkTable(node) {

    const classes = useStyles();
    return (
        <div style={{maxWidth: '100%'}}>
            <Typography variant="h6" className={classes.root}>
                네트워크
            </Typography>
            <Card>
                <CardContent style={{overflow: "auto"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>퍼블리시 주소</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>HTTP 바운드 주소</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>전송 바운드 주소</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>HTTP 포트</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>전송 포트</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(node).map((row) => (
                                <TableRow>
                                    <StyledTableCell>{((row.settings || {}).network || {}).publish_host || ""}</StyledTableCell>
                                    <StyledTableCell>{(row.http || {}).bound_address || ""}</StyledTableCell>
                                    <StyledTableCell>{(row.transport || {}).bound_address || ""}</StyledTableCell>
                                    <StyledTableCell>{propertyCheck(((row.settings || {}).http || {}).port || "")}</StyledTableCell>
                                    <StyledTableCell>{propertyCheck((((row.settings || {}).transport || {}).tcp || {}).port || "")}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}


function OsInfoTable(node) {
    const classes = useStyles();
    return (
        <div style={{maxWidth: '100%'}}>
            <Typography variant="h6" className={classes.root}>
                운영체제
            </Typography>
            <Card>
                <CardContent style={{overflow: "auto"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>종류</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>아키텍쳐</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>버전</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>할당 프로세스 수</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>리프레쉬 인터벌(ms)</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(node).map((row) => (
                                <TableRow>
                                    <StyledTableCell>{(row.os || {}).name || ""} , {(row.os || {}).pretty_name || ""}</StyledTableCell>
                                    <StyledTableCell>{(row.os || {}).arch || ""}</StyledTableCell>
                                    <StyledTableCell>{(row.os || {}).version || ""}</StyledTableCell>
                                    <StyledTableCell>{(row.os || {}).allocated_processors || ""}</StyledTableCell>
                                    <StyledTableCell>{(row.os || {}).refresh_interval_in_millis || ""}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}


function JvmInfoTable(node) {
    const classes = useStyles();
    const format = (time) => {
        let date = new Date(time);
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' ' + date.getHours() + ':' + ('0' + (date.getMinutes())).slice(-2) + ':' + date.getSeconds()
    }
    return (
        <div style={{maxWidth: '100%'}}>
            <Typography variant="h6" className={classes.root}>
                JVM
            </Typography>
            <Card>
                <CardContent style={{overflow: "auto"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>PID</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>버전</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>VM 이름</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>VM 버전</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>벤더</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>시작시각</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>가비지 컬렉터</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>초기메모리</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(node).map((jvm, index) => (
                                <TableRow>
                                    <StyledTableCell>{jvm.pid}</StyledTableCell>
                                    <StyledTableCell>{jvm.version}</StyledTableCell>
                                    <StyledTableCell>{jvm.vm_name}</StyledTableCell>
                                    <StyledTableCell>{jvm.vm_version}</StyledTableCell>
                                    <StyledTableCell>{jvm.vm_vendor}</StyledTableCell>
                                    <StyledTableCell>{format(jvm.start_time_in_millis)}</StyledTableCell>
                                    <StyledTableCell>{(jvm["gc_collectors"] || []).join(", \n")}</StyledTableCell>
                                    <StyledTableCell>
                                        Heap
                                        : {((jvm.mem || {}).heap_init_in_bytes || 0) > (1024 * 1024 * 1024) ? ((jvm.mem || {}).heap_init_in_bytes || 0) / (1024 * 1024 * 1024) + "GB" : ((jvm.mem || {}).heap_init_in_bytes || 0) / (1024 * 1024) + "MB"}
                                        <br/>
                                        Non-Heap
                                        : {((jvm.mem || {}).non_heap_init_in_bytes || 0) > (1024 * 1024 * 1024) ? ((jvm.mem || {}).non_heap_init_in_bytes || 0) / (1024 * 1024 * 1024) + "GB" : ((jvm.mem || {}).non_heap_init_in_bytes || 0) / (1024 * 1024) + "MB"}
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

function JvmOptionTable(node) {
    const classes = useStyles();
    return (
        <div style={{maxWidth: '100%'}}>
            <Typography variant="h6" className={classes.root}>
                JVM 옵션
            </Typography>
            <Card>
                <CardContent>
                    {Object.values(node).map((jvm, index) => (
                        <Box>
                            {jvm["input_arguments"].join(" ")}
                        </Box>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}

function JvmThreadPoolTable({node}) {
    const classes = useStyles();
    return (
        <div style={{maxWidth: '100%'}}>
            <Typography variant="h6" className={classes.root}>
                Thread Pool
            </Typography>
            <Card>
                <CardContent style={{overflow: "auto"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {Object.keys(node).map((ThreadKey, index) => (
                                    <StyledTableCell style={{whiteSpace: "nowrap"}}>{ThreadKey}</StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                {Object.values(node).map((ThreadValue, index) => (
                                    <StyledTableCell>{Object.entries(ThreadValue).map((value) => (
                                        value[0] + ' : ' + value[1]
                                    )).join(", \n")}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

function PluginInfoTable({node}) {
    const classes = useStyles();
    return (
        <div style={{maxWidth: '100%'}}>
            <Typography variant="h6" className={classes.root}>
                플러그인
            </Typography>
            <Card>
                <CardContent style={{overflow: "auto"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>#</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>이름</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>버전</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>엘라스틱서치버전</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>자바버전</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>설명</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>클래스명</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>확장 플러그인</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>네이티브 컨트롤러 포함</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(node).map((plugin, index) => (
                                <TableRow>
                                    <StyledTableCell>{index}</StyledTableCell>
                                    <StyledTableCell>{plugin.name}</StyledTableCell>
                                    <StyledTableCell>{plugin.version}</StyledTableCell>
                                    <StyledTableCell>{plugin.elasticsearch_version}</StyledTableCell>
                                    <StyledTableCell>{plugin.java_version}</StyledTableCell>
                                    <StyledTableCell>{plugin.description}</StyledTableCell>
                                    <StyledTableCell>{plugin.classname}</StyledTableCell>
                                    <StyledTableCell>{plugin["extended_plugins"].join(", ")}</StyledTableCell>
                                    <StyledTableCell>{plugin.has_native_controller === 'false' ? '아니오' : '예'}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

function ModuleInfoTable({node}) {
    const classes = useStyles();
    return (
        <div style={{maxWidth: '100%'}}>
            <Typography variant="h6" className={classes.root}>
                모듈
            </Typography>
            <Card>
                <CardContent style={{overflow: "auto"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>#</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>이름</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>버전</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>엘라스틱서치버전</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>자바버전</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>설명</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>클래스명</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>확장 플러그인</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>네이티브 컨트롤러 포함</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(node).map((module, index) => (
                                <TableRow>
                                    <StyledTableCell>{index}</StyledTableCell>
                                    <StyledTableCell>{module.name}</StyledTableCell>
                                    <StyledTableCell>{module.version}</StyledTableCell>
                                    <StyledTableCell>{module.elasticsearch_version}</StyledTableCell>
                                    <StyledTableCell>{module.java_version}</StyledTableCell>
                                    <StyledTableCell>{module.description}</StyledTableCell>
                                    <StyledTableCell>{module.classname}</StyledTableCell>
                                    <StyledTableCell>{module["extended_plugins"].join(", ")}</StyledTableCell>
                                    <StyledTableCell>{module.has_native_controller === 'false' ? '아니오' : '예'}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}


function serverInfo({server, nodeKey}) {
    return (
        <>
            <br/>
            <br/>

            <Typography variant="h6"
                        gutterBottom
                        display="inline">
                노드: {server.nodes[nodeKey].name}
            </Typography>

            <br/>
            <br/>
            <br/>

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <NodeSettingTable node={server.nodes[nodeKey]}/>
                </Grid>
                <Grid item xs={12}>
                    <NodePathTable node={server.nodes[nodeKey]}/>
                </Grid>
                <Grid item xs={12}>
                    <NetworkTable node={server.nodes[nodeKey]}/>
                </Grid>
                <Grid item xs={12}>
                    <OsInfoTable node={server.nodes[nodeKey]}/>
                </Grid>
                <Grid item xs={12}>
                    <JvmInfoTable node={server.nodes[nodeKey].jvm}/>
                </Grid>
                <Grid item xs={12}>
                    <JvmOptionTable node={server.nodes[nodeKey].jvm}/>
                </Grid>
                <Grid item xs={12}>
                    <JvmThreadPoolTable node={server.nodes[nodeKey].thread_pool}/>
                </Grid>
                <Grid item xs={12}>
                    <PluginInfoTable node={server.nodes[nodeKey].plugins}/>
                </Grid>
                <Grid item xs={12}>
                    <ModuleInfoTable node={server.nodes[nodeKey].modules}/>
                </Grid>
            </Grid>

        </>
    );
}

export default connect(store => ({server: store.serverSummaryReducers.server}))(serverInfo);

