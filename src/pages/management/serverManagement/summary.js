import React, { useEffect } from "react";
import styled from "styled-components";
import Async from '~/components/Async';
import { setServerSummary } from '@actions/serverSummaryActions'
import AntTabs from "~/components/AntTabs";
import Helmet from 'react-helmet';

import {
    Breadcrumbs as MuiBreadcrumbs,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    Grid,
    Link,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box,
    Button,
    TextareaAutosize

} from "@material-ui/core";

import {makeStyles, withStyles} from '@material-ui/core/styles';
import {spacing, boxSizing} from "@material-ui/system";
import {connect} from "react-redux";
import serverSummaryReducers from "../../../redux/reducers/serverSummaryReducers"
import { pluginService } from "chart.js";

const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 250,
    },
    root: {
        flexGrow: 1,
        width: '100%',
        // backgroundColor: theme.palette.background.paper,
    },
    edit: {
        width: '100%'
    }
}), {withTheme: true});


const StyledTableCell = withStyles((theme) => ({
    body: {
        fontSize: 12
    },
}))(TableCell);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const serverList = [
    {id:'search1'},
    {id:'search2'},
    {id:'search3'}
]

function NodeSettingTalbe({server}) {

    const classes = useStyles();
    //const aaa = server.nodes
    //const keys = Object.keys(server.nodes)
    //console.log(server.nodes, abc, typeof Object.entries(aaa),  "abc ",  Object.values(aaa))

     return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            노드 설정
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>노드</StyledTableCell>
                    <StyledTableCell>ES버전</StyledTableCell>
                    <StyledTableCell>호스트</StyledTableCell>
                    <StyledTableCell>IP주소</StyledTableCell>
                    <StyledTableCell>역할</StyledTableCell>
                    <StyledTableCell>XPACK 설치</StyledTableCell>
                    <StyledTableCell>XPACK 보안</StyledTableCell>
                    <StyledTableCell>부트스트랩</StyledTableCell>
                    
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.values(server.nodes).map((row, index) => (
                    <TableRow>
                        <StyledTableCell>{index}</StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell>{row.version}</StyledTableCell>
                        <StyledTableCell>{row.host}</StyledTableCell>
                        <StyledTableCell>{row.ip}</StyledTableCell>
                        <StyledTableCell>{row["roles"].join(", ")}</StyledTableCell>
                        <StyledTableCell>{row.attributes["xpack.installed"] == 'true' ? <font color="blue">설치됨</font> : <font color="red">미설치</font> }</StyledTableCell>
                        <StyledTableCell>{row.settings.xpack.security.enabled == 'true' ? <font color="blue">활성</font> : <font color="red">비활성</font>}</StyledTableCell>

                        <StyledTableCell>
                            {Object.entries(row.settings["bootstrap"]).map((bootstrapOption) => (
                                bootstrapOption
                            )).join(", \n")}
                        </StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}


function NodePathTable({nodes}) {

    const classes = useStyles();
   
    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            경로
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>노드</StyledTableCell>
                    <StyledTableCell>홈</StyledTableCell>
                    <StyledTableCell>로그</StyledTableCell>
                    <StyledTableCell>백업</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.values(nodes).map((row, index) => (
                    <TableRow>
                        <StyledTableCell>{index}</StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell>{row.settings.path.home}</StyledTableCell>
                        <StyledTableCell>{row.settings.path.logs}</StyledTableCell>
                        <StyledTableCell>{row.settings.path.repo}</StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}

function NetworkTable({nodes}) {

    const classes = useStyles();
   
    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            네트워크
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>노드</StyledTableCell>
                    <StyledTableCell>퍼블리시 주소</StyledTableCell>
                    <StyledTableCell>HTTP 바운드 주소</StyledTableCell>
                    <StyledTableCell>전송 바운드 주소</StyledTableCell>
                    <StyledTableCell>HTTP 포트</StyledTableCell>
                    <StyledTableCell>전송 포트</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.values(nodes).map((row, index) => (
                    <TableRow>
                        <StyledTableCell>{index}</StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell>{row.settings.network.publish_host}</StyledTableCell>
                        <StyledTableCell>{row.http.bound_address}</StyledTableCell>
                        <StyledTableCell>{row.transport.bound_address}</StyledTableCell>
                        <StyledTableCell>{row.settings.http.port}</StyledTableCell>
                        <StyledTableCell>{row.settings.transport.tcp.port}</StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}

function OsInfoTable({nodes}) {

    const classes = useStyles();
   
    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            운영체제
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>노드</StyledTableCell>
                    <StyledTableCell>종류</StyledTableCell>
                    <StyledTableCell>아키텍쳐</StyledTableCell>
                    <StyledTableCell>버전</StyledTableCell>
                    <StyledTableCell>할당 프로세스 수</StyledTableCell>
                    <StyledTableCell>리프레쉬 인터벌(ms)</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.values(nodes).map((row, index) => (
                    <TableRow>
                        <StyledTableCell>{index}</StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell>{row.os.name} , {row.os.pretty_name}</StyledTableCell>
                        <StyledTableCell>{row.os.arch}</StyledTableCell>
                        <StyledTableCell>{row.os.version}</StyledTableCell>
                        <StyledTableCell>{row.os.allocated_processors}</StyledTableCell>
                        <StyledTableCell>{row.os.refresh_interval_in_millis}</StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}

function JvmInfoTable({nodes}) {

    const classes = useStyles();

    const format = (time) => {
        var date = new Date(time);
        
        return date.getFullYear() + '-' +('0' + (date.getMonth()+1)).slice(-2)+ '-' +  ('0' + date.getDate()).slice(-2) + ' '+date.getHours()+ ':'+('0' + (date.getMinutes())).slice(-2)+ ':'+date.getSeconds()
    }

    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            JVM
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>노드</StyledTableCell>
                    <StyledTableCell>PID</StyledTableCell>
                    <StyledTableCell>버전</StyledTableCell>
                    <StyledTableCell>VM 이름</StyledTableCell>
                    <StyledTableCell>VM 버전</StyledTableCell>
                    <StyledTableCell>벤더</StyledTableCell>
                    <StyledTableCell>시작시각</StyledTableCell>
                    <StyledTableCell>가비지 컬렉터</StyledTableCell>
                    <StyledTableCell>초기메모리</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.values(nodes).map((row, index) => (
                    <TableRow>
                        <StyledTableCell>{index}</StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell>{row.jvm.pid}</StyledTableCell>
                        <StyledTableCell>{row.jvm.version}</StyledTableCell>
                        <StyledTableCell>{row.jvm.vm_name}</StyledTableCell>
                        <StyledTableCell>{row.jvm.vm_version}</StyledTableCell>
                        <StyledTableCell>{row.jvm.vm_vendor}</StyledTableCell>
                        <StyledTableCell>{format(row.jvm.start_time_in_millis)}</StyledTableCell>
                        <StyledTableCell>{row.jvm["gc_collectors"].join(", \n")}</StyledTableCell>
                        <StyledTableCell>
                            Heap : {row.jvm.mem.heap_init_in_bytes > (1024*1024*1024) ?  row.jvm.mem.heap_init_in_bytes / (1024*1024*1024)+"GB" : row.jvm.mem.heap_init_in_bytes / (1024*1024)+"MB"} <br/>

                            Non-Heap : {row.jvm.mem.non_heap_init_in_bytes > (1024*1024*1024) ?  row.jvm.mem.non_heap_init_in_bytes / (1024*1024*1024)+"GB" : row.jvm.mem.non_heap_init_in_bytes / (1024*1024)+"MB"} 

                        </StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}

function JvmOptionTable({nodes}) {

    const classes = useStyles();
   
    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            JVM 옵션
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>노드</StyledTableCell>
                    <StyledTableCell>JVM 옵션</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.values(nodes).map((row, index) => (
                    <TableRow>
                        <StyledTableCell>{index}</StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell>{row.jvm["input_arguments"].join(" ")}</StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}

function PluginInfoTable({nodes}) {

    const classes = useStyles();
   
    
    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            플러그인
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>노드</StyledTableCell>
                    <StyledTableCell>플러그인</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.values(nodes).map((row, index) => (
                    <TableRow>
                        <StyledTableCell>{index}</StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell>
                            
                            {Object.values(row["plugins"]).map((plugin, index) => (
                                plugin.name + ':' + plugin.version 
                            )).join(", ")}

                        </StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}


function ModuleInfoTable({nodes}) {

    const classes = useStyles();
   
    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            모듈
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>노드</StyledTableCell>
                    <StyledTableCell>모듈</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.values(nodes).map((node, index) => (
                    <TableRow>
                        <StyledTableCell>{index}</StyledTableCell>
                        <StyledTableCell>{node.name}</StyledTableCell>
                        <StyledTableCell>
                            {Object.values(node["modules"]).map((module, index) => (
                                module.name + ':' + module.version 
                            )).join(", ")}
                        </StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}


function Server({dispatch, server}) {

    const classes = useStyles();


    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_SERVER_URL}/_nodes`)
    //         .then((response) => response.json())
    //         .then((result) => {
    //             dispatch(setServerSummary(result))
    //         })
    // }, [])


    return (
        
        <>
            <Helmet title="Server 정보"/>
            <Typography variant="h3"
                        gutterBottom
                        display="inline"
            >
                {server.cluster_name}
            </Typography>
            <Card>
                <CardContent>             
                    <Divider my={6}/>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                          <NodeSettingTalbe server={server}/>
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
                </CardContent>
            </Card>
        </>
    );
}

export default Server;
