import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {
    setIndexAliasActions,
    setIndexResultActions,
    setIndexStatusActions,
    setRunningIndexActions,
    setIndicesActions,
    setRunningPropagateIndexActions,
} from '@actions/dashBoardActions'
import Helmet from "react-helmet";
import {useHistory} from "react-router-dom"
import {
    Link,
    Box,
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
// const Shard = styled(Button)`
//     min-width: 25px;
//     max-width: 25px;
//     width: 25px;
//     margin: 2px;
//     min-height: 25px;
//     max-height: 25px;
//     height: 25px;
//     font-size: 0.9em;
//     padding: 2px;
// `;


// const idxRunning = [
//     {index:"shop-c",  docs:40000, lastIndex:"1시간 5분", exportDoc:200000},
//     {index:"community",  docs:16331, lastIndex:"30분", exportDoc:20000}
// ]


// const idxWarning = [
//     {status:"yellow", index:"shop-a", desc:"레플리카 샤드 이상"},
//     {status:"red", index:"prod", desc:"프라이머리 샤드 이상"}
// ]

// const idxResult = [
//     {status:"success", index:"shop-a", alias:"shop", lastSuccess:"5분전", elapsed:"1시간 20분", docs:140000, storage:"530mb"},
//     {status:"fail", index:"shop-b", alias:"shop", lastSuccess:"56분전", elapsed:"1초", docs:0, storage:"10kb"},
// ]

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
    }else if(h !== 0 && m !== 0) {
        return h+'시간 ' + m+'분'
    }else if(h !== 0 && m === 0) {
        return h+'시간'
    }else{
        return m+'분' 
    }
}

const getElapsed = time => {
    // epoch_millis to epoch_seconds
    time = time / 1000;

    let hours   = Math.floor(time / 3600);
    let minutes = Math.ceil((time - (hours * 3600)) / 60);
    if(minutes >= 60){
        hours += 1;
        minutes = 0;
    }

    if(hours !== 0) {
        return hours+'시간 ' + minutes+'분' 
    }else{
        return minutes+'분' 
    }
}


function numberWithCommas(num) {
    if(num === undefined || num === null || num === "null") return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function WarningIndex({status, indices}) {
    const history = useHistory();
    function moveDetail(uuid) {
        history.push(`./indices/${uuid}`)
    }

    let list = [];
    Object.values(status).map(row => {
        if(row.health !== 'green'){
            let uuid = "";
            Object.values(indices).forEach(item => {
                if (item.index === row.index) {
                    uuid = item.uuid;
                }
            })
            let item = row;
            item.uuid = uuid;
            list.push(item);
        }
        return row;
    })

    // console.log(list);

    return(
        <Card>
            <CardContent>
            <Typography variant="h4" gutterBottom display="inline">
                주의할 인덱스
            </Typography>
            <br/><br/>
            <Table>

                <TableBody>
                    {
                        list.length > 0 ?
                            list.map(row =>{
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
                                            {row.health === 'yellow' ? <font color="orange"> 레플리카 샤드 이상 </font> :
                                                <font color="red"> 프라이머리 샤드 이상 </font>}
                                        </TableCell>
                                    </TableRow>

                                )
                            })
                            :
                            (
                                <TableRow>
                                    <TableCell colSpan={2} style={{border: "0px"}}>
                                        <Box align={"center"} style={{height: "24px"}}>
                                            {/*정상*/}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )
                    }
                </TableBody>
            </Table>
            </CardContent>
        </Card>
    );

}


function RunningIndex({result, running, status, indices, indexPercent}) {
    const history = useHistory();
    const classes = useStyles();
    let indexList = []
    let successIndexList = {};

    if(result.hits.hits.length >= 0){
        for(let item of result.hits.hits){
            successIndexList[item._source.index] = item._source;
        }
    }

    function convertStep(step){
        let result = "";
        if(step === "FULL_INDEX"){
            result = "색인";
        }else if(step === "PROPAGATE"){
            result = "전파";
        }else if(step === "EXPOSE"){
            result = "교체";
        }
        return result;
    }

    let keyList = Object.keys(running);
    if (keyList.length !== 0) {
        for (let key of keyList) {
            let server = running[key].server;

            if(server !== undefined){
                let uuid = "";
                Object.values(indices).forEach(item => {
                    if (item.index === server.index) {
                        uuid = item.uuid;
                    }
                })

                let nextStep = server.nextStep;
                let currentStep = server.currentStep;
                if(currentStep === "FULL_INDEX"){
                    currentStep = "색인";
                }else if(currentStep === "PROPAGATE"){
                    currentStep = "전파";
                }else if(currentStep === "EXPOSE"){
                    currentStep = "교체";
                }else{
                    currentStep = "";
                }

                if( successIndexList[server.index] !== undefined
                    && successIndexList[server.index].endTime !== undefined 
                    && successIndexList[server.index].startTime !== undefined
                    && successIndexList[server.index].docSize !== undefined){
                    
                    let estimatedTime = successIndexList[server.index].endTime - successIndexList[server.index].startTime;
                    let docSize = successIndexList[server.index].docSize;

                    getFinishTime(server.startTime, estimatedTime);
                    indexList.push({startTime: server.startTime, index: server.index, estimatedTime: estimatedTime, docSize: docSize, uuid : uuid, currentStep: currentStep, nextStep: nextStep});
                }else{
                    indexList.push({startTime: server.startTime, index: server.index, uuid: uuid, currentStep: currentStep, nextStep: nextStep});
                }
            }
        }
    }
    
    function moveDetail(uuid) {
        history.push(`./indices/${uuid}`)
    }
    
    function convertHumanReadableCount(docSize){
        let size = docSize+"";
        if(size.length <= 3) {
            return size;
        }
        var count = Math.ceil(size.length / 3);

        var newSize = [];
        for(var i=0; i<count; i++) {
            newSize.unshift(size.slice(-3*(i+1), size.length-(3*i)));
        }
        return newSize.join(',');
    }

    

    return(
        <Card>
            <CardContent>
            <Typography variant="h4" gutterBottom display="inline">
                전체색인 실행중
            </Typography>
            <br/><br/>
            <Table>
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
                                            <Typography variant="body2" color="textSecondary"> </Typography>
                                        </Box>
                                    </Box>
                                    {row.estimatedTime !== undefined ? <> 예상 종료 시간 : {getElapsed(row.estimatedTime)} <br/> </> : <>예상 종료 시간 : - <br /></> }
                                    {row.docSize !== undefined ? <> 예상 처리 문서 건수 : {convertHumanReadableCount(row.docSize)} <br/> </> : <>예상 처리 문서 건수 : - <br /></> }
                                    시작시간 : {untilTime(row.startTime)} 전 시작<br/>
                                    현재 진행중인 상태 :   <b>
                                        {row.currentStep} 
                                        {row.currentStep === "전파" ? <><br />{indexPercent[row.index]} </>: <> </>}
                                        {row.currentStep === "전파" ? " %" : <> </>}
                                    </b>
                                    <br />
                                    다음 진행 :
                                    {(row.nextStep === undefined || row.nextStep === null || row.nextStep.length === 0) ? "없음" : " " + convertStep(row.nextStep[0])}
                                    <br />
                                </TableCell>
                            </TableRow>
                        )
                    }

                </TableBody>
            </Table>
            </CardContent>
        </Card>
    );

}

function TopArea({dispatch, result, running, status, indices, indexPercent}) {
    return (
        <Grid container spacing={3} >
            <Grid item xs={6}>
                <RunningIndex result={result} running={running} status={status} indices={indices} indexPercent={indexPercent}/>
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


    let resultList = []
    Object.values(result.hits.hits).forEach(row => {

        let aliasName = ""
        Object.values(alias).forEach(row2 =>  {

            if(row._source.index === row2.index) {
                aliasName = row2.alias
            }
        })

        let uuid = ""
        Object.values(indices).forEach(item => {
            if(item.index === row._source.index){
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
                            Object.values(resultList).sort((a, b) => {
                                if(a.endTime > b.endTime){
                                    return -1;
                                }else if(a.endTime === b.endTime){
                                    return 0;
                                }else{
                                    return 1;
                                }
                            }).map(row => {
                                return (
                                    <TableRow key={row.index + "_" + row.alias}>
                                        <TableCell align="center">
                                            <Box display="flex" justifyContent="left" alignItems="center">
                                                {
                                                    row['status'] && row['status'] === 'SUCCESS' ?
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
let eventCode = null
function DashBoard({dispatch, result, running, status, alias, indices}) {
    const [indexPercent, setIndexPercent] = useState({});

    function loopFunc() {
        dispatch(setIndexResultActions())
        getPropagateIndexPercent()

        eventCode = setTimeout(()=>{
            loopFunc()
        }, 1000 * 60 * 3);
    }

    function getPropagateIndexPercent() {
        let keyList = Object.keys(running);
        if (keyList.length !== 0) {
            for (let key of keyList) {
                let index = running[key].server.index;
                dispatch(setRunningPropagateIndexActions(index))
                    .then((response) => {
                        // console.log(index, response['data'][index]['shards']);
                        let shardsList = response['data'][index]['shards'];
                        let percent = 0;
                        let count = 0;

                        shardsList.forEach(item => {
                            let shardPercent = item['index']['size']['percent'];
                            percent += Number(shardPercent.substring(0, shardPercent.length - 1));
                            count++;
                        });

                        let ip = indexPercent;
                        ip[index] = Math.ceil(percent / count) 
                        setIndexPercent(ip);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
    }

    useEffect(() => {
        dispatch(setRunningIndexActions())
        dispatch(setIndexStatusActions())
        dispatch(setIndexAliasActions())
        dispatch(setIndicesActions());
        loopFunc()
        return () => {
            if (eventCode !== null) {
                clearTimeout(eventCode)
            }
        }
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps
    getPropagateIndexPercent();
    
    return (
        <React.Fragment>
            <Helmet title="대시보드"/>

            <Typography variant="h3" gutterBottom display="inline"> 대시보드 </Typography>

            <Divider my={6} />
            <TopArea dispatch={dispatch} result={result} running={running} status={status} indices={indices} indexPercent={indexPercent}/>
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
