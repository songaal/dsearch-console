import React from "react";
import styled from "styled-components";

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

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

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

const ServerName = 'search1'

const NodeInfoRows = [
    {id:'search1', name:'search1', ipAddress:'119.205.194.151', dataAddress:'10.10.10.51', nodePort:'9090', servicePort:'8090', isUse:'활성' , isActive:'동작중'}
];

const SystemStatusRows = [
    {disk:'50.1%(100MB/200MB)', javaCPU:'1%', SystemCPU:'2%', JavaMem:'41.5%(3400MB/8192MB)', SystemMem:'96864MB', cpuLoad:'0.5'}
];

const JobStatusRows = [
    {name:'indexing VM', status:'SUCCESS', elapsed:'30m', startTime:'2020.05.13 10:01:01', endTime:'2020.05.13 10:31:01'}
];

const SystemInfoRows = [
    {eginePath:'/home/danawa/fastcat', serverId:'15ad315', osName:'Linux', osArch:'amd64', javaPath:'/user/lib/jvm/java', javaProvider:'Oracle', javaVersion:'1.8.0_191'}
];

const CollectionRows = [
    {name:'볼륨M', countDoc:'517700', dataPath:'data/index()', dataVolume:'8 GB', countSeg:'5', UUID:'-', updateTime:'2020-05-13'}
];

const PluginRows = [
    {name:'상품명분석기', id:'PRODUCT', analayzer:'STANDARD', license:'Valid', version:'1.0', dec:'상품명 분석기사전 제공'},
    {name:'한국어분석기', id:'KOREAN', analayzer:'STANDARD', license:'Valid', version:'1.0', dec:'한국어 분석기사전 제공'}
];

const ModuleRows = [
    {name:'ClusterService', status:'Running'},
    {name:'DBService', status:'Running'},
    {name:'QueryService', status:'Running'}
];

const ThreadRows = [
    {group:'main', name:'New I/O worker #82', tid:'104', priority:'5', status:'RUNNABLE', isDaemon:'Daemon', isAlive:'실행중', interrupted:'-'}
];

const JobListRows = [
    {id:'0', className:'org.fastcatsearch.job.SegmentDelayCloseScheduleJob', schedule:'스케쥴 안됨', isResult:'결과존재', startTime:'2020-05-13 12:00:00'}
];


    
//const classes = useStyles();

function NodeInfoTable() {

    const classes = useStyles();
    
    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            노드 설정
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>아이디</StyledTableCell>
                    <StyledTableCell>이름</StyledTableCell>
                    <StyledTableCell >IP주소</StyledTableCell>
                    <StyledTableCell>데이터IP주소</StyledTableCell>
                    <StyledTableCell>노드포트</StyledTableCell>
                    <StyledTableCell>서비스포트</StyledTableCell>
                    <StyledTableCell>사용여부</StyledTableCell>
                    <StyledTableCell>동작여부</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {NodeInfoRows.map((row) => (
                    <TableRow>
                        <StyledTableCell>{row.id}</StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell>{row.ipAddress}</StyledTableCell>
                        <StyledTableCell>{row.dataAddress}</StyledTableCell>
                        <StyledTableCell>{row.nodePort}</StyledTableCell>
                        <StyledTableCell>{row.servicePort}</StyledTableCell>
                        <StyledTableCell>{row.isUse}</StyledTableCell>
                        <StyledTableCell>{row.isActive}</StyledTableCell>
                        <StyledTableCell>재시작 종료하기</StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}

function SystemStatusTable() {

    const classes = useStyles();
    
    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            시스템 상태
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>디스크</StyledTableCell>
                    <StyledTableCell>Java CPU</StyledTableCell>
                    <StyledTableCell>System CPU</StyledTableCell>
                    <StyledTableCell>Java 메모리</StyledTableCell>
                    <StyledTableCell>System 메모리</StyledTableCell>
                    <StyledTableCell>부하</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {SystemStatusRows.map((row) => (
                    <TableRow>
                        <StyledTableCell>{row.disk}</StyledTableCell>
                        <StyledTableCell>{row.javaCPU}</StyledTableCell>
                        <StyledTableCell>{row.SystemCPU}</StyledTableCell>
                        <StyledTableCell>{row.JavaMem}</StyledTableCell>
                        <StyledTableCell>{row.SystemMem}</StyledTableCell>
                        <StyledTableCell>{row.cpuLoad}</StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}

function JobStatusTable() {

    const classes = useStyles();
    
    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            작업 상태
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>작업</StyledTableCell>
                    <StyledTableCell>상태</StyledTableCell>
                    <StyledTableCell>소요시간</StyledTableCell>
                    <StyledTableCell>시작</StyledTableCell>
                    <StyledTableCell>종료</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {JobStatusRows.map((row,index) => (
                    <TableRow>
                        <StyledTableCell>{index}</StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell>{row.status}</StyledTableCell>
                        <StyledTableCell>{row.elapsed}</StyledTableCell>
                        <StyledTableCell>{row.startTime}</StyledTableCell>
                        <StyledTableCell>{row.endTime}</StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}

function SystemInfoTable() {

    const classes = useStyles();
    
    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            시스템 정보
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>엔진경로</StyledTableCell>
                    <StyledTableCell>서버 ID</StyledTableCell>
                    <StyledTableCell>OS Name</StyledTableCell>
                    <StyledTableCell>OS Arch</StyledTableCell>
                    <StyledTableCell>Java 경로</StyledTableCell>
                    <StyledTableCell>Java 제공자</StyledTableCell>
                    <StyledTableCell>Java 버전</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {SystemInfoRows.map((row) => (
                    <TableRow>
                        <StyledTableCell>{row.eginePath}</StyledTableCell>
                        <StyledTableCell>{row.serverId}</StyledTableCell>
                        <StyledTableCell>{row.osName}</StyledTableCell>
                        <StyledTableCell>{row.osArch}</StyledTableCell>
                        <StyledTableCell>{row.javaPath}</StyledTableCell>
                        <StyledTableCell>{row.javaProvider}</StyledTableCell>
                        <StyledTableCell>{row.javaVersion}</StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}

function CollectionRowsTable() {
 
    const classes = useStyles();

    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            컬렉션 정보
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>이름</StyledTableCell>
                    <StyledTableCell>문서갯수</StyledTableCell>
                    <StyledTableCell>데이터경로</StyledTableCell>
                    <StyledTableCell>데이터 디스크용량</StyledTableCell>
                    <StyledTableCell>세그먼트 갯수</StyledTableCell>
                    <StyledTableCell>리비전 UUID</StyledTableCell>
                    <StyledTableCell>업데이트시각</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {CollectionRows.map((row) => (
                    <TableRow>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell>{row.countDoc}</StyledTableCell>
                        <StyledTableCell>{row.dataPath}</StyledTableCell>
                        <StyledTableCell>{row.dataVolume}</StyledTableCell>
                        <StyledTableCell>{row.countSeg}</StyledTableCell>
                        <StyledTableCell>{row.UUID}</StyledTableCell>
                        <StyledTableCell>{row.updateTime}</StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}

function PluginRowsTable() {
    const classes = useStyles();
    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            플러그인 상태 정보
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>이름</StyledTableCell>
                    <StyledTableCell>아이디</StyledTableCell>
                    <StyledTableCell>분석기</StyledTableCell>
                    <StyledTableCell>라이선스</StyledTableCell>
                    <StyledTableCell>버전</StyledTableCell>
                    <StyledTableCell>설명</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {PluginRows.map((row) => (
                    <TableRow>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell>{row.id}</StyledTableCell>
                        <StyledTableCell>{row.analayzer}</StyledTableCell>
                        <StyledTableCell>{row.license}</StyledTableCell>
                        <StyledTableCell>{row.version}</StyledTableCell>
                        <StyledTableCell>{row.dec}</StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}

function ModuleRowsTable() {
    const classes = useStyles();
    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            모듈 상태 정보
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>이름</StyledTableCell>
                    <StyledTableCell>상태</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {ModuleRows.map((row) => (
                    <TableRow>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell>{row.status}</StyledTableCell>
                        <StyledTableCell>정지 재시작</StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}

function ThreadRowsTable() {
    const classes = useStyles();
    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            쓰레드 상태
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>그룹</StyledTableCell>
                    <StyledTableCell>이름</StyledTableCell>
                    <StyledTableCell>Tid</StyledTableCell>
                    <StyledTableCell>우선순위</StyledTableCell>
                    <StyledTableCell>상태</StyledTableCell>
                    <StyledTableCell>데몬여부</StyledTableCell>
                    <StyledTableCell>Alive</StyledTableCell>
                    <StyledTableCell>Interrupted</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {ThreadRows.map((row, index) => (
                    <TableRow>
                        <StyledTableCell>{index}</StyledTableCell>
                        <StyledTableCell>{row.group}</StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell>{row.tid}</StyledTableCell>
                        <StyledTableCell>{row.priority}</StyledTableCell>
                        <StyledTableCell>{row.status}</StyledTableCell>
                        <StyledTableCell>{row.isDaemon}</StyledTableCell>
                        <StyledTableCell>{row.isAlive}</StyledTableCell>
                        <StyledTableCell>{row.interrupted}</StyledTableCell>
                        <StyledTableCell>Stacktrace</StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}

function JobListRowsTable() {
 
    const classes = useStyles();

    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            실행작업들
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>작업아이디</StyledTableCell>
                    <StyledTableCell>클래스명</StyledTableCell>
                    <StyledTableCell>스케줄</StyledTableCell>
                    <StyledTableCell>결과존재여부</StyledTableCell>
                    <StyledTableCell>시작</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {JobListRows.map((row, index) => (
                    <TableRow>
                        <StyledTableCell>{index}</StyledTableCell>
                        <StyledTableCell>{row.id}</StyledTableCell>
                        <StyledTableCell>{row.className}</StyledTableCell>
                        <StyledTableCell>{row.schedule}</StyledTableCell>
                        <StyledTableCell>{row.isResult}</StyledTableCell>
                        <StyledTableCell>{row.startTime}</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}

function YamlCard() {
    const classes = useStyles();
    return (<div>
        <Card>
            <CardContent alignItems="center" justify="center">
                <Box align={"right"}>
                    <Button variant={"outlined"} color={"primary"}>저장</Button>
                </Box>
                <Box>
                    <TextareaAutosize rowsMin={50} className={classes.edit} placeholder="" value={doc}/>
                </Box>
            </CardContent>
        </Card>
    </div>)
}

function serverInfo() {

    const classes = useStyles();
    return (

        <>
            <Helmet title="Server 정보"/>         
            <Card>
                <CardContent>        
                    <Typography variant="h3" className={classes.root}>
                        {ServerName}
                    </Typography>
                    <Divider my={6}/>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <NodeInfoTable/>
                        </Grid>
                        <Grid item xs={12}>
                            <SystemStatusTable/>
                        </Grid>
                        <Grid item xs={12}>
                            <JobStatusTable/>
                        </Grid>
                        <Grid item xs={12}>
                            <SystemInfoTable/>
                        </Grid>
                        <Grid item xs={12}>
                            <CollectionRowsTable/>
                        </Grid>
                        <Grid item xs={12}>
                            <PluginRowsTable/>
                        </Grid>
                        <Grid item xs={12}>
                            <ModuleRowsTable/>
                        </Grid>
                        <Grid item xs={12}>
                            <ThreadRowsTable/>
                        </Grid>
                        <Grid item xs={12}>
                            <JobListRowsTable/>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </>
    );
}

export default serverInfo;

