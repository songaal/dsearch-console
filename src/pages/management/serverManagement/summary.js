import React from "react";
import styled from "styled-components";

import {
    Card as MuiCard,
    CardContent,
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
const Card = styled(MuiCard)(spacing);

function getLists(nodes){
    let obj = {};
    let sortList = [];
    let rowList = {};

    Object.values(nodes).map((row, index) =>{
        sortList.push(row.name);
        rowList[row.name] = row;
    })
    
    sortList = sortList.sort(function(a,b){
        if (a > b) return 1;
        if (b > a) return -1;
        return 0;
    });

    obj.sortList = sortList;
    obj.rowList = rowList;
    return obj;
}

function NodeSettingTable({server}) {
    const classes = useStyles();
    let lists = getLists(server.nodes);
    let sortList = lists.sortList;
    let rowList = lists.rowList;

    return (
        <div style={{maxWidth: '100%'}}>
            <Typography variant="h6" className={classes.root} >
                노드 설정
            </Typography>
            <Card>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>#</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>노드</StyledTableCell>
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
                            {sortList.map((item, index)=>{
                                let row = rowList[item];
                                return <TableRow>
                                 <StyledTableCell>{index}</StyledTableCell>
                                 <StyledTableCell>{row.name}</StyledTableCell>
                                 <StyledTableCell>{row.version}</StyledTableCell>
                                 <StyledTableCell>{row.host}</StyledTableCell>
                                 <StyledTableCell>{row.ip}</StyledTableCell>
                                 <StyledTableCell>{(row["roles"] || []).join(", ")}</StyledTableCell>
                                 <StyledTableCell>{(row.attributes || {})["xpack.installed"] == 'true' ?
                                     <font color="blue">설치됨</font> : <font color="red">미설치</font>}</StyledTableCell>
                                 <StyledTableCell>{(((row.settings || {}).xpack || {}).security || {}).enabled == 'true' ?
                                     <font color="blue">활성</font> : <font color="red">비활성</font>}</StyledTableCell>

                                 <StyledTableCell>
                                     {Object.entries(((row.settings || {})["bootstrap"] || {})).map((bootstrapOption) => (
                                         bootstrapOption
                                     )).join(", \n")}
                                 </StyledTableCell>
                             </TableRow>
                            })}


                            {/* {Object.values(server.nodes).map((row, index) => (
                                <TableRow>
                                    <StyledTableCell>{index}</StyledTableCell>
                                    <StyledTableCell>{row.name}</StyledTableCell>
                                    <StyledTableCell>{row.version}</StyledTableCell>
                                    <StyledTableCell>{row.host}</StyledTableCell>
                                    <StyledTableCell>{row.ip}</StyledTableCell>
                                    <StyledTableCell>{(row["roles"] || []).join(", ")}</StyledTableCell>
                                    <StyledTableCell>{(row.attributes || {})["xpack.installed"] == 'true' ?
                                        <font color="blue">설치됨</font> : <font color="red">미설치</font>}</StyledTableCell>
                                    <StyledTableCell>{(((row.settings || {}).xpack || {}).security || {}).enabled == 'true' ?
                                        <font color="blue">활성</font> : <font color="red">비활성</font>}</StyledTableCell>

                                    <StyledTableCell>
                                        {Object.entries(((row.settings || {})["bootstrap"] || {})).map((bootstrapOption) => (
                                            bootstrapOption
                                        )).join(", \n")}
                                    </StyledTableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}


function NodePathTable({nodes}) {
    const classes = useStyles();

    let lists = getLists(nodes);
    let sortList = lists.sortList;
    let rowList = lists.rowList;

    return (
        <div style={{maxWidth: '100%'}}>
            <Typography variant="h6" className={classes.root}>
                경로
            </Typography>
            <Card>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>#</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>노드</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>홈</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>로그</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>백업</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortList.map((item, index)=>{
                                let row = rowList[item];
                                return <TableRow>
                                            <StyledTableCell>{index}</StyledTableCell>
                                            <StyledTableCell>{row.name}</StyledTableCell>
                                            <StyledTableCell>{(((row.settings || {}).path || {}).home || "")}</StyledTableCell>
                                            <StyledTableCell>{(((row.settings || {}).path || {}).logs || "")}</StyledTableCell>
                                            <StyledTableCell>{(((row.settings || {}).path || {}).repo || "")}</StyledTableCell>
                                        </TableRow>
                                })
                            }
                            {/* {Object.values(nodes).map((row, index) => (
                                <TableRow>
                                    <StyledTableCell>{index}</StyledTableCell>
                                    <StyledTableCell>{row.name}</StyledTableCell>
                                    <StyledTableCell>{(((row.settings || {}).path || {}).home || "")}</StyledTableCell>
                                    <StyledTableCell>{(((row.settings || {}).path || {}).logs || "")}</StyledTableCell>
                                    <StyledTableCell>{(((row.settings || {}).path || {}).repo || "")}</StyledTableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

function NetworkTable({nodes}) {
    const classes = useStyles();
    let lists = getLists(nodes);
    let sortList = lists.sortList;
    let rowList = lists.rowList;

    return (
        <div style={{maxWidth: '100%'}}>
            <Typography variant="h6" className={classes.root}>
                네트워크
            </Typography>
            <Card>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>#</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>노드</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>퍼블리시 주소</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>HTTP 바운드 주소</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>전송 바운드 주소</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>HTTP 포트</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>전송 포트</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortList.map((item, index)=>{
                                let row = rowList[item];
                                return <TableRow>
                                            <StyledTableCell>{index}</StyledTableCell>
                                            <StyledTableCell>{row.name}</StyledTableCell>
                                            <StyledTableCell>{((row.settings || {}).network || {}).publish_host || ""}</StyledTableCell>
                                            <StyledTableCell>{(row.http || {}).bound_address || ""}</StyledTableCell>
                                            <StyledTableCell>{(row.transport || {}).bound_address || ""}</StyledTableCell>
                                            <StyledTableCell>{((row.settings || {}).http || {}).port || ""}</StyledTableCell>
                                            <StyledTableCell>{(((row.settings || {}).transport || {}).tcp || {}).port || ""}</StyledTableCell>
                                        </TableRow>
                                })
                            }
                            {/* {Object.values(nodes).map((row, index) => (
                                <TableRow>
                                    <StyledTableCell>{index}</StyledTableCell>
                                    <StyledTableCell>{row.name}</StyledTableCell>
                                    <StyledTableCell>{((row.settings || {}).network || {}).publish_host || ""}</StyledTableCell>
                                    <StyledTableCell>{(row.http || {}).bound_address || ""}</StyledTableCell>
                                    <StyledTableCell>{(row.transport || {}).bound_address || ""}</StyledTableCell>
                                    <StyledTableCell>{((row.settings || {}).http || {}).port || ""}</StyledTableCell>
                                    <StyledTableCell>{(((row.settings || {}).transport || {}).tcp || {}).port || ""}</StyledTableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

function OsInfoTable({nodes}) {
    const classes = useStyles();
    let lists = getLists(nodes);
    let sortList = lists.sortList;
    let rowList = lists.rowList;
    return (
        <div style={{maxWidth: '100%'}}>
            <Typography variant="h6" className={classes.root}>
                운영체제
            </Typography>
            <Card>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>#</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>노드</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>종류</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>아키텍쳐</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>버전</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>할당 프로세스 수</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>리프레쉬 인터벌(ms)</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortList.map((item, index)=>{
                                let row = rowList[item];
                                return <TableRow>
                                        <StyledTableCell>{index}</StyledTableCell>
                                        <StyledTableCell>{row.name}</StyledTableCell>
                                        <StyledTableCell>{(row.os || {}).name || ""} , {(row.os || {}).pretty_name || ""}</StyledTableCell>
                                        <StyledTableCell>{(row.os || {}).arch || ""}</StyledTableCell>
                                        <StyledTableCell>{(row.os || {}).version || ""}</StyledTableCell>
                                        <StyledTableCell>{Number((row.os || {}).allocated_processors).toLocaleString() || ""}</StyledTableCell>
                                        <StyledTableCell>{Number((row.os || {}).refresh_interval_in_millis).toLocaleString() || ""}</StyledTableCell>
                                    </TableRow>
                                })
                            }
                            {/* {Object.values(nodes).map((row, index) => (
                                <TableRow>
                                    <StyledTableCell>{index}</StyledTableCell>
                                    <StyledTableCell>{row.name}</StyledTableCell>
                                    <StyledTableCell>{(row.os || {}).name || ""} , {(row.os || {}).pretty_name || ""}</StyledTableCell>
                                    <StyledTableCell>{(row.os || {}).arch || ""}</StyledTableCell>
                                    <StyledTableCell>{(row.os || {}).version || ""}</StyledTableCell>
                                    <StyledTableCell>{(row.os || {}).allocated_processors || ""}</StyledTableCell>
                                    <StyledTableCell>{(row.os || {}).refresh_interval_in_millis || ""}</StyledTableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

function JvmInfoTable({nodes}) {
    const classes = useStyles();
    const format = (time) => {
        let date = new Date(time);
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' ' + date.getHours() + ':' + ('0' + (date.getMinutes())).slice(-2) + ':' + date.getSeconds()
    }

    let lists = getLists(nodes);
    let sortList = lists.sortList;
    let rowList = lists.rowList;

    return (
        <div style={{maxWidth: '100%'}}>
            <Typography variant="h6" className={classes.root}>
                JVM
            </Typography>
            <Card>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>#</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>노드</StyledTableCell>
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
                            {sortList.map((item, index)=>{
                                let row = rowList[item];
                                return <TableRow>
                                            <StyledTableCell>{index}</StyledTableCell>
                                            <StyledTableCell>{row.name || ""}</StyledTableCell>
                                            <StyledTableCell>{(row.jvm || {}).pid || ""}</StyledTableCell>
                                            <StyledTableCell>{(row.jvm || {}).version || ""}</StyledTableCell>
                                            <StyledTableCell>{(row.jvm || {}).vm_name || ""}</StyledTableCell>
                                            <StyledTableCell>{(row.jvm || {}).vm_version || ""}</StyledTableCell>
                                            <StyledTableCell>{(row.jvm || {}).vm_vendor || ""}</StyledTableCell>
                                            <StyledTableCell>{format((row.jvm || {}).start_time_in_millis)}</StyledTableCell>
                                            <StyledTableCell>{((row.jvm || {})["gc_collectors"] || []).join(", \n")}</StyledTableCell>
                                            <StyledTableCell>
                                                Heap
                                                : {(((row.jvm || {}).mem || {}).heap_init_in_bytes || 0) > (1024 * 1024 * 1024) ? (((row.jvm || {}).mem || {}).heap_init_in_bytes || 0) / (1024 * 1024 * 1024) + "GB" : (((row.jvm || {}).mem || {}).heap_init_in_bytes || 0) / (1024 * 1024) + "MB"}
                                                <br/>

                                                Non-Heap
                                                : {(((row.jvm || {}).mem || {}).non_heap_init_in_bytes || 0) > (1024 * 1024 * 1024) ? (((row.jvm || {}).mem || {}).non_heap_init_in_bytes || 0) / (1024 * 1024 * 1024) + "GB" : (((row.jvm || {}).mem || {}).non_heap_init_in_bytes || 0) / (1024 * 1024) + "MB"}

                                            </StyledTableCell>
                                        </TableRow>
                                })
                            }
                            {/* {Object.values(nodes).map((row, index) => (
                                <TableRow>
                                    <StyledTableCell>{index}</StyledTableCell>
                                    <StyledTableCell>{row.name || ""}</StyledTableCell>
                                    <StyledTableCell>{(row.jvm || {}).pid || ""}</StyledTableCell>
                                    <StyledTableCell>{(row.jvm || {}).version || ""}</StyledTableCell>
                                    <StyledTableCell>{(row.jvm || {}).vm_name || ""}</StyledTableCell>
                                    <StyledTableCell>{(row.jvm || {}).vm_version || ""}</StyledTableCell>
                                    <StyledTableCell>{(row.jvm || {}).vm_vendor || ""}</StyledTableCell>
                                    <StyledTableCell>{format((row.jvm || {}).start_time_in_millis)}</StyledTableCell>
                                    <StyledTableCell>{((row.jvm || {})["gc_collectors"] || []).join(", \n")}</StyledTableCell>
                                    <StyledTableCell>
                                        Heap
                                        : {(((row.jvm || {}).mem || {}).heap_init_in_bytes || 0) > (1024 * 1024 * 1024) ? (((row.jvm || {}).mem || {}).heap_init_in_bytes || 0) / (1024 * 1024 * 1024) + "GB" : (((row.jvm || {}).mem || {}).heap_init_in_bytes || 0) / (1024 * 1024) + "MB"}
                                        <br/>

                                        Non-Heap
                                        : {(((row.jvm || {}).mem || {}).non_heap_init_in_bytes || 0) > (1024 * 1024 * 1024) ? (((row.jvm || {}).mem || {}).non_heap_init_in_bytes || 0) / (1024 * 1024 * 1024) + "GB" : (((row.jvm || {}).mem || {}).non_heap_init_in_bytes || 0) / (1024 * 1024) + "MB"}

                                    </StyledTableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

function JvmOptionTable({nodes}) {
    const classes = useStyles();
    let lists = getLists(nodes);
    let sortList = lists.sortList;
    let rowList = lists.rowList;
    return (
        <div style={{maxWidth: '100%'}}>
            <Typography variant="h6" className={classes.root}>
                JVM 옵션
            </Typography>
            <Card>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>#</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>노드</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>JVM 옵션</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortList.map((item, index)=>{
                                let row = rowList[item];
                                return <TableRow>
                                            <StyledTableCell>{index}</StyledTableCell>
                                            <StyledTableCell>{row.name}</StyledTableCell>
                                            <StyledTableCell>{row.jvm["input_arguments"].join(" ")}</StyledTableCell>
                                        </TableRow>
                                })
                            }
                            {/* {Object.values(nodes).map((row, index) => (
                                <TableRow>
                                    <StyledTableCell>{index}</StyledTableCell>
                                    <StyledTableCell>{row.name}</StyledTableCell>
                                    <StyledTableCell>{row.jvm["input_arguments"].join(" ")}</StyledTableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

function PluginInfoTable({nodes}) {
    const classes = useStyles();
    let lists = getLists(nodes);
    let sortList = lists.sortList;
    let rowList = lists.rowList;
    return (
        <div style={{maxWidth: '100%'}}>
            <Typography variant="h6" className={classes.root}>
                플러그인
            </Typography>
            <Card>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>#</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>노드</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>플러그인</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortList.map((item, index)=>{
                                let row = rowList[item];
                                return <TableRow>
                                            <StyledTableCell>{index}</StyledTableCell>
                                            <StyledTableCell>{row.name}</StyledTableCell>
                                            <StyledTableCell>{row.jvm["input_arguments"].join(" ")}</StyledTableCell>
                                        </TableRow>
                                })
                            }
                            {/* {Object.values(nodes).map((row, index) => (
                                <TableRow>
                                    <StyledTableCell>{index}</StyledTableCell>
                                    <StyledTableCell>{row.name}</StyledTableCell>
                                    <StyledTableCell>

                                        {Object.values(row["plugins"]).map((plugin, index) => (
                                            plugin.name + ':' + plugin.version
                                        )).join(", ")}

                                    </StyledTableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}


function ModuleInfoTable({nodes}) {
    const classes = useStyles();
    let lists = getLists(nodes);
    let sortList = lists.sortList;
    let rowList = lists.rowList;
    return (
        <div style={{maxWidth: '100%'}}>
            <Typography variant="h6" className={classes.root}>
                모듈
            </Typography>
            <Card>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>노드</StyledTableCell>
                                <StyledTableCell style={{whiteSpace: "nowrap"}}>모듈</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortList.map((item, index)=>{
                                let row = rowList[item];
                                return <TableRow>
                                            <StyledTableCell>{index}</StyledTableCell>
                                            <StyledTableCell>{row.name}</StyledTableCell>
                                            <StyledTableCell>
                                                {Object.values(row["modules"]).map((module, index) => (
                                                    module.name + ':' + module.version
                                                )).join(", ")}
                                            </StyledTableCell>
                                        </TableRow>
                                })
                            }
                            {/* {Object.values(nodes).map((node, index) => (
                                <TableRow>
                                    <StyledTableCell>{index}</StyledTableCell>
                                    <StyledTableCell>{node.name}</StyledTableCell>
                                    <StyledTableCell>
                                        {Object.values(node["modules"]).map((module, index) => (
                                            module.name + ':' + module.version
                                        )).join(", ")}
                                    </StyledTableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}


function Server({server}) {
    return (
        <>
            <br/>
            <br/>

            <Typography variant="h6"
                        gutterBottom
                        display="inline"
            >
                클러스터: {server.cluster_name}
            </Typography>

            <br/>
            <br/>
            <br/>

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <NodeSettingTable server={server}/>
                </Grid>
                <Grid item xs={12}>
                    <NodePathTable nodes={server.nodes}/>
                </Grid>
                <Grid item xs={12}>
                    <NetworkTable nodes={server.nodes}/>
                </Grid>
                <Grid item xs={12}>
                    <OsInfoTable nodes={server.nodes}/>
                </Grid>
                <Grid item xs={12}>
                    <JvmInfoTable nodes={server.nodes}/>
                </Grid>
                <Grid item xs={12}>
                    <JvmOptionTable nodes={server.nodes}/>
                </Grid>
                <Grid item xs={12}>
                    <PluginInfoTable nodes={server.nodes}/>
                </Grid>
                <Grid item xs={12}>
                    <ModuleInfoTable nodes={server.nodes}/>
                </Grid>
            </Grid>
        </>
    );
}

export default connect(store => ({server: store.serverSummaryReducers.server}))(Server);
