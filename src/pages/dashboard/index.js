import React, {useEffect} from "react";
import styled from "styled-components";
import {
    setIndexAliasActions,
    setIndexResultActions,
    setIndexStatusActions,
    setRunningIndexActions,
    setIndicesActions
} from '@actions/dashBoardActions'
import Helmet from "react-helmet";
import {useHistory} from "react-router-dom"
import {
    Link,
    Box,
    Button,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    Grid as MuiGrid,
    LinearProgress,
    Table,
    TableBody,
    TableCell as MuiTableCell,
    TableHead,
    TableRow as MuiTableRow,
    Typography
} from "@material-ui/core";
import {palette, sizing, spacing} from "@material-ui/system";
import {lighten, makeStyles, withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Brightness1Icon from '@material-ui/icons/Brightness1';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles((theme) => ({
    headerField: {fontSize: '1.2em', fontWeight: "bold"},
    headerValue: {fontSize: '1.2em', fontWeight: "bold"},
    primaryShard: {border: "1px solid",},
    replicaShard: {border: "1px dashed", },
    margin: {
        margin: theme.spacing(1),
      },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
}));

const BorderLinearProgress = withStyles({
    root: {
      height: 10,
      backgroundColor: lighten('#A9D0F5', 0.5),
    },
    bar: {
      borderRadius: 20,
      backgroundColor: '#013ADF',
    },
  })(LinearProgress);


const Card = styled(MuiCard)(spacing, sizing);
const Divider = styled(MuiDivider)(spacing, sizing);
const Grid = styled(MuiGrid)(spacing, sizing);
const TableRow = styled(MuiTableRow)(spacing, sizing, palette);
const TableCell = styled(MuiTableCell)`
    border: 1px solid rgba(224, 224, 224, 1);
    padding: 3px;
`;
const Shard = styled(Button)`
    min-width: 25px;
    max-width: 25px;
    width: 25px;
    margin: 2px;
    min-height: 25px;
    max-height: 25px;
    height: 25px;
    font-size: 0.9em;
    padding: 2px;
`;


const idxRunning = [
    {index:"shop-c",  docs:40000, lastIndex:"1시간 5분", exportDoc:200000},
    {index:"community",  docs:16331, lastIndex:"30분", exportDoc:20000}
]


const idxWarning = [
    {status:"yellow", index:"shop-a", desc:"레플리카 샤드 이상"},
    {status:"red", index:"prod", desc:"프라이머리 샤드 이상"}
]

const idxResult = [
    {status:"success", index:"shop-a", alias:"shop", lastSuccess:"5분전", elapsed:"1시간 20분", docs:140000, storage:"530mb"},
    {status:"fail", index:"shop-b", alias:"shop", lastSuccess:"56분전", elapsed:"1초", docs:0, storage:"10kb"},
]

const getFinishTime = (startTime, estimatedTime) => {
    var date = new Date().getTime() - new Date(startTime).getTime();
    return (date.valueOf()/ estimatedTime) * 100
}


const untilTime = (time) => {
    var date = new Date().getTime() - new Date(time).getTime();

    var hours   = ((date / 3600) / 1000) * 60;

    let h = Math.floor(hours / 60)
    let m = Math.floor(hours % 60)
    // var minutes = Math.ceil(((date - (hours * 3600)) / 60)/ 1000);
    if(h >= 720){
        let month = h / 30 / 24;
        return Math.ceil(month) + "개월"
    }else if(h >= 24){
        let d = h / 24;
        return  Math.ceil(d) + '일'
    }else if(h != 0 && m != 0) {
        return h+'시간 ' + m+'분'
    }else if(h != 0 && m == 0) {
        return h+'시간'
    }else{
        return m+'분' 
    }
}

function numberWithCommas(num) {
    if(num === undefined || num === null) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function WarningIndex({status, indices}) {
    const classes = useStyles();
    const history = useHistory();
    function moveDetail(uuid) {
        history.push(`./indices/${uuid}`)
    }

    let list = [];
    Object.values(status).map(row => {
        if(row.health != 'green'){
            let uuid = "";
            Object.values(indices).forEach(item => {
                if (item.index == row.index) {
                    uuid = item.uuid;
                }
            })
            let item = row;
            item.uuid = uuid;
            list.push(item);
        }
    })

    console.log(list);

    return(
        <Card>
            <CardContent>
            <Typography variant="h4" gutterBottom display="inline">
                주의할 인덱스
            </Typography>
            <br/><br/>
            <Table>
                <TableHead></TableHead>
                <TableBody>
                    {list.map(row =>{
                         return(
                            <TableRow key={row.index}>
                            <TableCell align="center">
                                <Box display="flex" justifyContent="left" alignItems="center">
                                    <Brightness1Icon style={{color:row.health, marginRight:"5px"}} />
                                    <Link style={{cursor: "pointer"}} onClick={() => moveDetail(row['uuid'])}>
                                        <Typography variant="h5">{row.index}</Typography>
                                    </Link>
                                </Box>
                            </TableCell>
                            <TableCell align="center">
                                {row.health == 'yellow' ? <font color="orange"> 레플리카 샤드 이상 </font> :
                                <font color="red"> 프라이머리 샤드 이상 </font>}
                            </TableCell>
                                </TableRow>

                        )
                    })}

                    {/* {Object.values(status).map(row => {
                        if(row.health != 'green') {
                            return(
                                <TableRow key={row.index}>
                                <TableCell align="center">
                                    <Box display="flex" justifyContent="center" >
                                        <Brightness1Icon style={{color:row.health}} />
                                        <Typography variant="h5">{row.index}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    {row.health == 'yellow' ? <font color="orange"> 레플리카 샤드 이상 </font> :
                                    <font color="red"> 프라이머리 샤드 이상 </font>}
                                </TableCell>
                                    </TableRow>

                        }
                    }
                    )} */}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
    );

}


function RunningIndex({result, running, status, indices}) {
    const history = useHistory();
    const classes = useStyles();
    let indexMap = new Map()
    let indexList = []
    let successIndexList = {};

    const getElapsed = (time) => {
        // epoch_millis to epoch_seconds
        time = time / 1000;

        var hours   = Math.floor(time / 3600);
        var minutes = Math.ceil((time - (hours * 3600)) / 60);
        
        if(hours != 0) {
            return hours+'시간 ' + minutes+'분' 
        }else{
            return minutes+'분' 
        }
    }

    if(result.hits.hits.length >= 0){
        for(let item of result.hits.hits){
            successIndexList[item._source.index] = item._source;
        }
    }

    let keyList = Object.keys(running);
    if (keyList.length !== 0) {
        for (let key of keyList) {
            let server = running[key].server;

            if(server !== undefined){
                let uuid = "";
                Object.values(indices).forEach(item => {
                    if (item.index == server.index) {
                        uuid = item.uuid;
                    }
                })

                if( successIndexList[server.index] !== undefined
                    && successIndexList[server.index].endTime !== undefined 
                    && successIndexList[server.index].startTime !== undefined
                    && successIndexList[server.index].docSize !== undefined){
                    
                    let estimatedTime = successIndexList[server.index].endTime - successIndexList[server.index].startTime;
                    let docSize = successIndexList[server.index].docSize;
                    
                    getFinishTime(server.startTime, estimatedTime);
                    indexList.push({startTime: server.startTime, index: server.index, estimatedTime: estimatedTime, docSize: docSize, uuid : uuid});
                }else{
                    indexList.push({startTime: server.startTime, index: server.index, uuid: uuid});
                }
            }
        }
    }
    
    function moveDetail(uuid) {
        history.push(`./indices/${uuid}`)
    }
    
    return(
        <Card>
            <CardContent>
            <Typography variant="h4" gutterBottom display="inline">
                전체색인 실행중
            </Typography>
            <br/><br/>
            <Table>
                <TableHead></TableHead>
                <TableBody>
                    {indexList.length === 0 ? <TableRow><TableCell align="center"> <Box display="flex" alignItems="center" justifyContent="center"> <Typography>현재 실행중인 색인 작업이 없습니다.</Typography></Box>  </TableCell></TableRow> : 
                        Object.values(indexList).map(row =>
                            <TableRow key={row.index}>
                                <TableCell align="center">
                                    <Link style={{ cursor: "pointer" }} onClick={() => moveDetail(row['uuid'])}>
                                        <Typography variant="h5">{row.index}</Typography>
                                    </Link>
                                </TableCell>
                                <TableCell align="center">
                                    <Box display="flex" alignItems="center" justifyContent="center">
                                        <Box width="100%" mr={1}>
                                            <BorderLinearProgress
                                                className={classes.margin}
                                                variant="determinate"
                                                color="secondary"
                                                value={Number(getFinishTime(row.startTime, row.estimatedTime))}
                                                // value={Number(`${Math.round( (untilTime(row.startTime) / getElapsed(row.estimatedTime))*100)}`)}
                                            />
                                        </Box>
                                        <Box minWidth={15}>
                                            <Typography variant="body2" color="textSecondary"></Typography>
                                        </Box>
                                    </Box>
                                    {row.estimatedTime !== undefined ? <> 예상 종료 시간 : {getElapsed(row.estimatedTime)} <br/> </> : <>예상 종료 시간 : - <br /></> }
                                    {row.docSize !== undefined ? <> 예상 처리 문서 건수 : {row.docSize} <br/> </> : <>예상 처리 문서 건수 : - <br /></> }
                                    시작시간 : {untilTime(row.startTime)} 전 시작<br/>
                                </TableCell>
                            </TableRow>
                        )
                    }
                
                    {/* {Object.values(indexList).map(row =>
                        <TableRow key={row.index}>
                            <TableCell>
                                {row.index}
                            </TableCell>
                            <TableCell>
                                <Box display="flex" alignItems="center">
                                    <Box width="100%" mr={1}>
                                    <BorderLinearProgress
                                        className={classes.margin}
                                        variant="determinate"
                                        color="secondary"
                                        //value={`${Math.round((125210 / row.lastDoc)*100)}`}
                                        value={`${Math.round((row.currentDoc / row.lastDoc)*100)}`}
                                    />
                                    </Box>
                                    <Box minWidth={15}>
                                        <Typography variant="body2" color="textSecondary">{`${Math.round((row.currentDoc / row.lastDoc)*100)}%`}</Typography>
                                    </Box>
                                </Box>
                                {numberWithCommas(row.currentDoc)} 건 <br/>
                                시작시간 {untilTime(row.startTime)} 전 시작 <br/>
                                예상문서 약 {numberWithCommas(row.lastDoc)} 건<br/>
                            </TableCell>
                        </TableRow>
                    )} */}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
    );

}

function TopArea({ result, running, status, indices}) {
    const classes = useStyles();

    return (
        <Grid container spacing={3} >
            <Grid item xs={6}>
                <RunningIndex result={result} running={running} status={status} indices={indices} />
            </Grid>
            <Grid item xs={6}>
                <WarningIndex status={status} indices={indices} />
            </Grid>
        </Grid>
    )
}

function BottomArea({result, alias, indices}) {
    const history = useHistory();

    const format = (time) => {
        // var date = new Date(time * 1000);
        var date = new Date(time);
        
        return date.getFullYear() + '-' +
        ('0' + (date.getMonth()+1)).slice(-2)+ '-' +  
        ('0' + date.getDate()).slice(-2) + ' '+
        ('0'+(date.getHours())).slice(-2)+ ':'+
        ('0' + (date.getMinutes())).slice(-2)+ ':'+
        ('0' + (date.getSeconds())).slice(-2)
    }

    const getElapsed = (time) => {
        // epoch_millis to epoch_seconds
        time = time / 1000;

        var hours   = Math.floor(time / 3600);
        var minutes = Math.ceil((time - (hours * 3600)) / 60);
        
        if(hours != 0) {
            return hours+'시간 ' + minutes+'분' 
        }else{
            return minutes+'분' 
        }
    }

    let resultList = []
    Object.values(result.hits.hits).forEach(row => {

        let aliasName = ""
        Object.values(alias).forEach(row2 =>  {

            if(row._source.index == row2.index) {
                aliasName = row2.alias
            }
        })

        let uuid = ""
        Object.values(indices).forEach(item => {
            if(item.index == row._source.index){
                uuid = item.uuid;
            }
        })
   
        resultList.push(
            {
                index:row._source.index,
                alias: aliasName,
                status: row._source.status,
                startTime: row._source.startTime,
                endTime: row._source.endTime,
                docSize: row._source.docSize,
                storage: row._source.store,
                uuid: uuid
            }
        )
    })

    function moveDetail(uuid) {
        history.push(`./indices/${uuid}`)
    }

    return (
        <React.Fragment>

            <Card mt={2} style={{ overflow: "auto" }}>

                <CardContent>
                    <Typography variant="h4" gutterBottom display="inline">
                        전체색인 결과
                    </Typography>
                    <br /> <br />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">색인 결과</TableCell>
                                <TableCell align="center">인덱스</TableCell>
                                <TableCell align="center">별칭</TableCell>
                                <TableCell align="center">최근 성공</TableCell>
                                <TableCell align="center">소요 시간</TableCell>
                                <TableCell align="center">문서수</TableCell>
                                <TableCell align="center">스토리지 용량</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {resultList.length === 0 ? <TableRow><TableCell colSpan={7} align="center"> <Box display="flex" alignItems="center" justifyContent="center"> <Typography>전체 색인 결과가 없습니다.</Typography></Box> </TableCell></TableRow> : 
                            Object.values(resultList).map(row => {
                                return (
                                    <TableRow key={row.index}>
                                        <TableCell align="center">
                                            <Box display="flex" justifyContent="left" alignItems="center">
                                                {
                                                    row['status'] && row['status'] == 'SUCCESS' ?
                                                        <Brightness1Icon color="primary"/>
                                                        :
                                                        <Brightness1Icon style={{color: 'red'}}/>
                                                }
                                                <Typography style={{marginLeft: "5px"}} >{row['status']}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link style={{cursor: "pointer"}} onClick={() => moveDetail(row['uuid'])}>
                                                <Typography variant="h5">{row.index}</Typography>
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.alias}
                                        </TableCell>
                                        <TableCell align="center">
                                            <b>{untilTime(row.endTime)} 전 </b><br/>
                                            {format(row.endTime)}
                                        </TableCell>
                                        <TableCell align="center">
                                            {getElapsed(row.endTime - row.startTime)}
                                        </TableCell>
                                        <TableCell align="center">
                                            {numberWithCommas(row.docSize)}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.storage}
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}

function DashBoard({dispatch, result, running, status, alias, indices}) {
    const classes = useStyles();

    useEffect(() => {
        dispatch(setIndexResultActions())
        const resultActions = setInterval(()=>{dispatch(setIndexResultActions());}, 1000 * 60 * 3);
        dispatch(setRunningIndexActions())
        dispatch(setIndexStatusActions())
        dispatch(setIndexAliasActions())
        dispatch(setIndicesActions());
    }, [])
    
    return (
        <React.Fragment>
            <Helmet title="대시보드"/>

            <Typography variant="h3" gutterBottom display="inline"> 대시보드 </Typography>

            <Divider my={6} />
            <TopArea result={result} running={running} status={status} indices={indices}/>
            <BottomArea result={result} alias={alias} status={status} indices={indices} />
        </React.Fragment>
    );
}

export default connect(store => ({
    result: store.dashBoardReducers.result,
    running: store.dashBoardReducers.running,
    status: store.dashBoardReducers.status,
    alias: store.dashBoardReducers.alias,
    indices: store.dashBoardReducers.indices
}))(DashBoard);
