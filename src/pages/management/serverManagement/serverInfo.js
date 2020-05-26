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
}));

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




function NodeSettingTalbe(node) {

    const classes = useStyles();
    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            노드정보
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
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
                {Object.values(node).map((row, index) => (
                    <TableRow>
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

function NodePathTable(node) {

    const classes = useStyles();
   
    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
             경로
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>홈</StyledTableCell>
                    <StyledTableCell>로그</StyledTableCell>
                    <StyledTableCell>백업</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.values(node).map((row, index) => (
                    <TableRow>
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

function NetworkTable(node) {

    const classes = useStyles();
   
    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            네트워크
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>퍼블리시 주소</StyledTableCell>
                    <StyledTableCell>HTTP 바운드 주소</StyledTableCell>
                    <StyledTableCell>전송 바운드 주소</StyledTableCell>
                    <StyledTableCell>HTTP 포트</StyledTableCell>
                    <StyledTableCell>전송 포트</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.values(node).map((row, index) => (
                    <TableRow>
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


function OsInfoTable(node) {

    const classes = useStyles();
    
    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            운영체제
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>종류</StyledTableCell>
                    <StyledTableCell>아키텍쳐</StyledTableCell>
                    <StyledTableCell>버전</StyledTableCell>
                    <StyledTableCell>할당 프로세스 수</StyledTableCell>
                    <StyledTableCell>리프레쉬 인터벌(ms)</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.values(node).map((row) => (
                    <TableRow>
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


function JvmInfoTable(node) {

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
                {Object.values(node).map((jvm, index) => (
                    <TableRow>
                        <StyledTableCell>{jvm.pid}</StyledTableCell>
                        <StyledTableCell>{jvm.version}</StyledTableCell>
                        <StyledTableCell>{jvm.vm_name}</StyledTableCell>
                        <StyledTableCell>{jvm.vm_version}</StyledTableCell>
                        <StyledTableCell>{jvm.vm_vendor}</StyledTableCell>
                        <StyledTableCell>{format(jvm.start_time_in_millis)}</StyledTableCell>
                        <StyledTableCell>{jvm["gc_collectors"].join(", \n")}</StyledTableCell>
                        <StyledTableCell>
                            Heap : {jvm.mem.heap_init_in_bytes > (1024*1024*1024) ?  jvm.mem.heap_init_in_bytes / (1024*1024*1024)+"GB" : jvm.mem.heap_init_in_bytes / (1024*1024)+"MB"} <br/>

                            Non-Heap : {jvm.mem.non_heap_init_in_bytes > (1024*1024*1024) ?  jvm.mem.non_heap_init_in_bytes / (1024*1024*1024)+"GB" : jvm.mem.non_heap_init_in_bytes / (1024*1024)+"MB"} 

                        </StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}

function JvmOptionTable(node) {

    const classes = useStyles();
    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            JVM 옵션
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>JVM 옵션</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.values(node).map((jvm, index) => (
                    <TableRow>
                        <StyledTableCell>{jvm["input_arguments"].join(" ")}</StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}

function JvmThreadPoolTable({node}) {

    const classes = useStyles();
    
    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            Thread Pool
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    {Object.keys(node).map((ThreadKey, index) => (
                        <StyledTableCell>{ThreadKey}</StyledTableCell>          
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    {Object.values(node).map((ThreadValue,index) => (
                        <StyledTableCell>{Object.entries(ThreadValue).map((value) => (
                            value[0] + ' : ' + value[1]
                        )).join(", \n")}
                        </StyledTableCell>
                    ))}
                </TableRow>
            </TableBody>
      </Table>
      </div>
    )

    // return (
    //     <div style={{ maxWidth: '100%' }}>
    //     <Typography variant="h6" className={classes.root}>
    //         Thread Pool
    //     </Typography>
    //     <Table>
    //         <TableHead>
    //             <TableRow>
    //                <StyledTableCell>#</StyledTableCell>          
    //                <StyledTableCell>쓰레드명</StyledTableCell>
    //                <StyledTableCell>쓰레드속성</StyledTableCell>
    //             </TableRow>
    //         </TableHead>
    //         <TableBody>
    //             {Object.entries(node).map((ThreadKey, index) => (
    //             <TableRow>
    //                 <StyledTableCell>{index}</StyledTableCell>          
    //                 <StyledTableCell>{ThreadKey[0]}</StyledTableCell>
    //                 <StyledTableCell>{Object.entries(ThreadKey[1]).map((value) => (
    //                     value[0] + ' : ' + value[1]

    //                 )).join(', \n')}
    //                 </StyledTableCell>
    //             </TableRow>
    //             ))}
    //         </TableBody>
    //   </Table>
    //   </div>
    // )
}

function PluginInfoTable({node}) {

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
                    <StyledTableCell>이름</StyledTableCell>
                    <StyledTableCell>버전</StyledTableCell>
                    <StyledTableCell>엘라스틱서치버전</StyledTableCell>
                    <StyledTableCell>자바버전</StyledTableCell>
                    <StyledTableCell>설명</StyledTableCell>
                    <StyledTableCell>클래스명</StyledTableCell>
                    <StyledTableCell>확장 플러그인</StyledTableCell>
                    <StyledTableCell>네이티브 컨트롤러 포함</StyledTableCell>
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
                        <StyledTableCell>{plugin.has_native_controller == 'false' ? '아니오' : '예'}</StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}

function ModuleInfoTable({node}) {

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
                    <StyledTableCell>이름</StyledTableCell>
                    <StyledTableCell>버전</StyledTableCell>
                    <StyledTableCell>엘라스틱서치버전</StyledTableCell>
                    <StyledTableCell>자바버전</StyledTableCell>
                    <StyledTableCell>설명</StyledTableCell>
                    <StyledTableCell>클래스명</StyledTableCell>
                    <StyledTableCell>확장 플러그인</StyledTableCell>
                    <StyledTableCell>네이티브 컨트롤러 포함</StyledTableCell>
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
                        <StyledTableCell>{module.has_native_controller == 'false' ? '아니오' : '예'}</StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}




function serverInfo({server, nodeKey}) {

    const classes = useStyles();
    
    return (
        
        <>
            <Helmet title="Server 정보"/>         
            <Card>
                <CardContent>        
                    <Typography variant="h3" className={classes.root}>
                        {server.nodes[nodeKey].name}
                    </Typography>
                    <Divider my={6}/>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <NodeSettingTalbe node={server.nodes[nodeKey]}/>
                        </Grid>
                        <Grid>
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

                </CardContent>
            </Card>
        </>
    );
}

export default serverInfo;

