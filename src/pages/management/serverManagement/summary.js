import React from "react";
import styled from "styled-components";
import {NavLink as RouterNavLink} from "react-router-dom";
import Async from '~/components/Async';

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
    TableBody

} from "@material-ui/core";

import {makeStyles, withStyles} from '@material-ui/core/styles';
import {spacing, boxSizing} from "@material-ui/system";
import { SentimentSatisfied } from "@material-ui/icons";



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


const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const serverList = [
    {id:'search1'},
    {id:'search2'},
    {id:'search3'}
]

const NodeInfoRows = [
    {id:'search1', name:'search1', ipAddress:'119.205.194.151', dataAddress:'10.10.10.51', nodePort:'9090', servicePort:'8090', isUse:'활성' , isActive:'동작중'},
    {id:'search2', name:'search2', ipAddress:'119.205.194.152', dataAddress:'10.10.10.52', nodePort:'9090', servicePort:'8090', isUse:'활성' , isActive:'동작중'},
    {id:'search3', name:'search3', ipAddress:'119.205.194.153', dataAddress:'10.10.10.53', nodePort:'9090', servicePort:'8090', isUse:'활성' , isActive:'동작중'}
];

const SystemStatusRows = [
    {node:'마스터', disk:'63.2% (153313MB / 242455MB)', javaCPU:'1%', SystemCPU:'2%', JavaMem:'41.5%(3400MB/8192MB)', SystemMem:'96864MB', cpuLoad:'0.5'},
    {node:'검색서버', disk:'53.2% (153313MB / 242455MB)', javaCPU:'51%', SystemCPU:'52%', JavaMem:'45.8%(3400MB/8192MB)', SystemMem:'96864MB', cpuLoad:'0.5'},
    {node:'색인서버', disk:'11.2% (153313MB / 242455MB)', javaCPU:'81%', SystemCPU:'82%', JavaMem:'61.1%(3400MB/8192MB)', SystemMem:'96864MB', cpuLoad:'0.5'}
];

const SystemInfoRows = [
    {node:'마스터', eginePath:'/home/danawa/es', osName:'Linux', osArch:'amd64', javaPath:'/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.212.b04-0.el7_6.x86_64/jre', javaProvider:'Oracle', javaVersion:'1.8.0_191'},
    {node:'검색서버', eginePath:'/home/danawa/es', osName:'Linux', osArch:'amd64', javaPath:'/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.212.b04-0.el7_6.x86_64/jre', javaProvider:'Oracle', javaVersion:'1.8.0_191'},
    {node:'색인서버', eginePath:'/home/danawa/es', osName:'Linux', osArch:'amd64', javaPath:'/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.212.b04-0.el7_6.x86_64/jre', javaProvider:'Oracle', javaVersion:'1.8.0_191'}
];

function SystemInfo() {

    const classes = useStyles();

    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            시스템 정보
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>노드</StyledTableCell>
                    <StyledTableCell>엔진경로</StyledTableCell>
                    <StyledTableCell>OS 이름</StyledTableCell>
                    <StyledTableCell>OS Arch</StyledTableCell>
                    <StyledTableCell>Java 경로</StyledTableCell>
                    <StyledTableCell>Java 제공자</StyledTableCell>
                    <StyledTableCell>Java 버전</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {SystemInfoRows.map((row, index) => (
                    <TableRow>
                        <StyledTableCell>{index}</StyledTableCell>
                        <StyledTableCell>{row.node}</StyledTableCell>
                        <StyledTableCell>{row.eginePath}</StyledTableCell>
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

function SystemStatus() {

    const classes = useStyles();

    return (
        <div style={{ maxWidth: '100%' }}>
        <Typography variant="h6" className={classes.root}>
            시스템 상태
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>노드</StyledTableCell>
                    <StyledTableCell>디스크</StyledTableCell>
                    <StyledTableCell>Java CPU</StyledTableCell>
                    <StyledTableCell>System CPU</StyledTableCell>
                    <StyledTableCell>Java 메모리</StyledTableCell>
                    <StyledTableCell>System 메모리</StyledTableCell>
                    <StyledTableCell>부하</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {SystemStatusRows.map((row, index) => (
                    <TableRow>
                        <StyledTableCell>{index}</StyledTableCell>
                        <StyledTableCell>{row.node}</StyledTableCell>
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

// callApi = () => {
//     fetch("https://jsonplaceholder.typicode.com/todos/1")
//       .then(res => res.json())
//       .then(json => {
//         this.setState({
//           data: json.title
//         })
//      })
// }

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
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>아이디</StyledTableCell>
                    <StyledTableCell>이름</StyledTableCell>
                    <StyledTableCell >IP주소</StyledTableCell>
                    <StyledTableCell>데이터IP주소</StyledTableCell>
                    <StyledTableCell>노드포트</StyledTableCell>
                    <StyledTableCell>서비스포트</StyledTableCell>
                    <StyledTableCell>사용여부</StyledTableCell>
                    <StyledTableCell>동작여부</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {NodeInfoRows.map((row, index) => (
                    <TableRow>
                        <StyledTableCell>{index}</StyledTableCell>
                        <StyledTableCell>{row.id}</StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell>{row.ipAddress}</StyledTableCell>
                        <StyledTableCell>{row.dataAddress}</StyledTableCell>
                        <StyledTableCell>{row.nodePort}</StyledTableCell>
                        <StyledTableCell>{row.servicePort}</StyledTableCell>
                        <StyledTableCell>{row.isUse}</StyledTableCell>
                        <StyledTableCell>{row.isActive}</StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
      </div>
    )
}

function Server() {


    const classes = useStyles();

    return (
        
        <>
            <Helmet title="Server 정보"/>
            <Typography variant="h3"
                        gutterBottom
                        display="inline"
            >
                서버개요
            </Typography>
            <Card>
                <CardContent>             
                    <Divider my={6}/>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <NodeInfoTable/>
                        </Grid>
                        <Grid item xs={12}>
                            <SystemStatus/>
                        </Grid>
                        <Grid item xs={12}>
                            <SystemInfo/>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </>
    );
}

export default Server;
