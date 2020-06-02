import React, {useEffect} from "react";
import styled from "styled-components";
import {
    setClusterInfoActions,
    setIndicesInfoActions,
    setNodesInfoActions,
    setShardsInfoActions
} from '@actions/clusterInfoActions'
import Helmet from "react-helmet";

import {
    Button,
    Card as MuiCard,
    CardContent,
    Checkbox,
    Divider as MuiDivider,
    FormControlLabel,
    Grid as MuiGrid,
    Box ,
    Table,
    TableBody,
    TableCell as MuiTableCell,
    TableHead,
    TableRow as MuiTableRow,
    Typography,
    LinearProgress 
} from "@material-ui/core";
import {palette, sizing, spacing} from "@material-ui/system";
import {lighten,makeStyles,withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {pink, yellow} from '@material-ui/core/colors';
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







function WarningIndex() {
    const classes = useStyles();

    return(
        <>
               <Typography variant="h4" gutterBottom display="inline">
                    주의할 인덱스
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                인덱스
                            </TableCell>
                            <TableCell>
                                작업
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(idxWarning).map(row =>
                            <TableRow>
                                <TableCell>
                                <Brightness1Icon style={{color:row.status}} />
                                   {row.index}
                                </TableCell>
                                <TableCell>
                                    {row.desc}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>      
            </>
    );

}

function RunningIndex() {
    const classes = useStyles();

    return(
        <>
               <Typography variant="h4" gutterBottom display="inline">
                    전체색인 실행중
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                인덱스
                            </TableCell>
                            <TableCell>
                                작업
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(idxRunning).map(row =>
                            <TableRow>
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
                                            value={`${Math.round((row.docs / row.exportDoc)*100)}`}
                                        />
                                        </Box>
                                        <Box minWidth={15}>
                                            <Typography variant="body2" color="textSecondary">{`${Math.round((row.docs / row.exportDoc)*100)}%`}</Typography>
                                        </Box>
                                    </Box>
                                    {row.docs} <br/>
                                    {row.lastIndex} <br/>
                                    {row.exportDoc} <br/>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>      
            </>
    );

}

function TopArea() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Card mt={2}>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <RunningIndex />
                        </Grid>
                        <Grid item xs={6}>
                            <WarningIndex />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}


function BottomArea() {
   
    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom display="inline">
                전체색인 결과
            </Typography>
            <Card mt={2} style={{overflow: "auto"}}>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>색인 결과</TableCell>
                                <TableCell>인덱스</TableCell>
                                <TableCell>별칭</TableCell>
                                <TableCell>최근 성공</TableCell>
                                <TableCell>소요 시간</TableCell>
                                <TableCell>문서수</TableCell>
                                <TableCell>스토리지 용량</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(idxResult).map(row =>
                                <TableRow>
                                    <TableCell>
                                        {
                                            row.status == 'success' ? <Brightness1Icon color="primary" /> : 
                                            <Brightness1Icon style={{color:'red'}} />  
                                        }
                                        {row.status}
                                    </TableCell>
                                    <TableCell>
                                        {row.index}
                                    </TableCell>
                                    <TableCell>
                                        {row.alias}
                                    </TableCell>
                                    <TableCell>
                                        {row.lastSuccess}
                                    </TableCell>
                                    <TableCell>
                                        {row.elapsed}
                                    </TableCell>
                                    <TableCell>
                                        {row.docs}
                                    </TableCell>
                                    <TableCell>
                                        {row.storage}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}

function DashBoard() {
    const classes = useStyles();
    
    return (
        <React.Fragment>
            <Helmet title="대시보드"/>

            <Card>
                <CardContent>
                <Typography variant="h3" gutterBottom display="inline">
                    대시보드
            </Typography>

            <br/>

            <Divider my={6}/>

            <TopArea/>

            <br/>
            <BottomArea/>
                </CardContent>
            </Card>
           
        </React.Fragment>
    );
}

export default DashBoard;
