import React from "react";
import styled from "styled-components";
import {NavLink as RouterNavLink} from "react-router-dom";

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
    AppBar,
    Box,
    Tabs,
    Tab,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Button

} from "@material-ui/core";

import {makeStyles, withStyles} from '@material-ui/core/styles';
import {spacing, boxSizing} from "@material-ui/system";



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

function EmptyCard() {
    return (
        <Card mb={6}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Empty card
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Empty card
                </Typography>
            </CardContent>
        </Card>
    );
}


const a = [{id:'search1', name:'search1', ipAddress:'119.205.194.151', dataAdress:'10.10.10.51', nodePort:'9090', servicePort:'8090', isUse:'활성' , isActive:'동작중'}];


const serverList = [
    {id:'search1'},
    {id:'search2'},
    {id:'search3'}
]

const NodeInfoRows = [
    {id:'search1', name:'search1', ipAddress:'119.205.194.151', dataAddress:'10.10.10.51', nodePort:'9090', servicePort:'8090', isUse:'활성' , isActive:'동작중'},
    {id:'search2', name:'search2', ipAddress:'119.205.194.152', dataAddress:'10.10.10.52', nodePort:'9090', servicePort:'8090', isUse:'활성' , isActive:'동작중'},
    {id:'search3', name:'search3', ipAddress:'119.205.194.153', dataAddress:'10.10.10.53', nodePort:'9090', servicePort:'8090', isUse:'활성' , isActive:'동작중'}

  //  createData('search1', 'search1', '119.205.194.151', '10.10.10.51', 9090, 8090, '활성' , '동작중'),
//createData('search2', 'search2', '119.205.194.152', '10.10.10.52', 9090, 8090, '활성', '동작중'),
  //  createData('search3', 'search3', '119.205.194.153', '10.10.10.53', 9090, 8090 ,'활성' ,'동작중'),
];

// const SystemStatusRows = [
//     createData('마스터', '63.2% (153313MB / 242455MB)', '3%', '4%', '49.8% (8158MB / 16384MB)','64322MB',0.5),
//     createData('검색서버', '43.1% (647314MB / 1501974MB)', '59%', '60%', '62.5% (20471MB / 32768MB)','191706MB', 10.8),
//     createData('색인서버', '59.7% (454525MB / 761483MB)', '13%', '17%', '72.4% (23708MB / 32768MB)','96468MB',3.5),
// ];

// const SystemInfoRows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];


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
                <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>마스터</TableCell>
                        <TableCell>/home/danawa/es(</TableCell>
                        <TableCell>Linux</TableCell>
                        <TableCell>amd64</TableCell>
                        <TableCell>/usr/java/jdk1.8.0_45/jre</TableCell>
                        <TableCell>Oracle Corporation</TableCell>
                        <TableCell>1.8.0_45</TableCell>
                </TableRow>
                <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>검색서버</TableCell>
                        <TableCell>/home/danawa/es(</TableCell>
                        <TableCell>Linux</TableCell>
                        <TableCell>amd64</TableCell>
                        <TableCell>/usr/java/jdk1.8.0_45/jre</TableCell>
                        <TableCell>Oracle Corporation</TableCell>
                        <TableCell>1.8.0_45</TableCell>
                </TableRow>
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
            <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>마스터</TableCell>
                    <TableCell>63.2% (153313MB / 242455MB)(</TableCell>
                    <TableCell>3%</TableCell>
                    <TableCell>4%</TableCell>
                    <TableCell>49.8% (8158MB / 16384MB)</TableCell>
                    <TableCell>64322MB</TableCell>
                    <TableCell>0.5</TableCell>
            </TableRow>
            <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>검색서버</TableCell>
                    <TableCell>58.8% (447586MB / 761483MB)(</TableCell>
                    <TableCell>1%</TableCell>
                    <TableCell>54%</TableCell>
                    <TableCell>34.7% (11384MB / 32768MB)</TableCell>
                    <TableCell>96468MB</TableCell>
                    <TableCell>1.2</TableCell>
                </TableRow>
            </TableBody>
      </Table>
      </div>
    )
}

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

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}


function Server() {


    const classes = useStyles();

    const [indices, setIndices] = React.useState('');
    const [value, setValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange = (event) => {
        setIndices(event.target.value);
    };



    // const tabs = [
    //     {icon: (<SearchIcon/>), component: Async(() => import("./Search"))},
    //     {label: "개요", component: Async(() => import("./Summary"))},
    //     {label: "사용자사전", component: Async(() => import("./User"))},
    //     {label: "유사어사전", component: Async(() => import("./Synonyms"))}
    // ];


    return (
        <React.Fragment>
            <Helmet title="Server 정보"/>
            
            <Box>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">서버</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={indices}
                        onChange={handleChange}
                    >
                        <MenuItem value={"search1"}>search1</MenuItem>
                        <MenuItem value={"search2"}>search2</MenuItem>
                        <MenuItem value={"search3"}>search3</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <getServerList/>
            <AppBar position="static" color={"default"}>
                <Tabs
                    value={value}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="개요" {...a11yProps(0)} />

                </Tabs>

                
                
               
                 
               
            </AppBar>

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
        </React.Fragment>
    );
}

export default Server;
