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
    Box,
    Button,
    Card as MuiCard,
    CardContent,
    Checkbox,
    Divider as MuiDivider,
    FormControlLabel,
    Grid as MuiGrid,
    Table,
    TableBody,
    TableCell as MuiTableCell,
    TableHead,
    TableRow as MuiTableRow,
    Typography,
    Hidden,
} from "@material-ui/core";
import {palette, sizing, spacing} from "@material-ui/system";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {
    lightGreen, pink,
    red,
    yellow
} from '@material-ui/core/colors';

const useStyles = makeStyles({
    headerField: {fontSize: '1.2em', fontWeight: "bold"},
    headerValue: {fontSize: '1.2em', fontWeight: "bold"},
    primaryShard: {border: "1px solid",},
    replicaShard: {border: "1px dashed", },
});

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

function ClusterSummary({cluster}) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom display="inline">
                총 사용량
            </Typography>
            <Card mt={2}>
                <CardContent>
                    <Grid container alignItems={"center"} justify={"space-between"} mt={3}>
                        <Grid item xs={3} md={1}>
                            <Typography className={classes.headerField}>노드</Typography>
                        </Grid>
                        <Grid item xs={3} md={1}>
                            <Typography className={classes.headerValue}>{cluster.nodes.count.total}</Typography>
                        </Grid>

                        <Grid item xs={3} md={1}>
                            <Typography className={classes.headerField}>인덱스</Typography>
                        </Grid>
                        <Grid item xs={3} md={1}>
                            <Typography className={classes.headerValue}>{cluster.indices.count}</Typography>
                        </Grid>

                        <Grid item xs={3} md={1}>
                            <Typography className={classes.headerField}>샤드</Typography>
                        </Grid>
                        <Grid item xs={3} md={1}>
                            <Typography className={classes.headerValue}>{cluster.indices.shards.total}</Typography>
                        </Grid>

                        <Grid item xs={3} md={1}>
                            <Typography className={classes.headerField}>문서</Typography>
                        </Grid>
                        <Grid item xs={3} md={1}>
                            <Typography className={classes.headerValue}>{cluster.indices.docs.count}</Typography>
                        </Grid>

                        <Grid item xs={3} md={1}>
                            <Typography className={classes.headerField}>용량</Typography>
                        </Grid>
                        <Grid item xs={3} md={1}>
                            <Typography className={classes.headerValue}>{cluster.indices.store.size}</Typography>
                        </Grid>
                        <Hidden smUp>
                            <Grid item xs={3}>
                                <Typography></Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography></Typography>
                            </Grid>
                        </Hidden>

                    </Grid>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}



function ShardButton({prirep, label}) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Shard className={prirep === 'p' ? classes.primaryShard : prirep === 'r' ? classes.replicaShard : {} } variant="outlined">
                {label}
            </Shard>
        </React.Fragment>
    )
}

function ClusterShardMap({indices, nodes, shards}) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
    });

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    //닫힌 인덱스, 특수인덱스에 따른 처리
    let indicesArr = []
    {
        Object.values(indices).map(indicesInfo => {
                if (state.checkedA && indicesInfo.status == 'close') {
                    indicesArr.push(indicesInfo)
                } else if (state.checkedB && indicesInfo.index.charAt(0) == '.') {
                    indicesArr.push(indicesInfo)
                } else if (indicesInfo.status == 'open' && indicesInfo.index.charAt(0) != '.') {
                    indicesArr.push(indicesInfo)
                }
            }
        )
    }


    //샤드 표시를 위한 MAP 생성
    let newMap = new Map()
    Object.values(nodes).forEach((nodesRow) => {
        let assignedArr = []
        let unassignedArr = []
        Object.values(indicesArr).forEach((indicesRow) => {
            Object.values(shards).forEach((shardsRow) => {
                if (indicesRow.index == shardsRow.index && nodesRow.name == shardsRow.node) {
                    assignedArr.push({
                        node: shardsRow.node,
                        index: shardsRow.index,
                        shard: shardsRow.shard,
                        state: shardsRow.state,
                        prirep: shardsRow.prirep
                    })
                } else if (indicesRow.index == shardsRow.index && shardsRow.state == 'UNASSIGNED') {
                    unassignedArr.push({
                        node: 'unassigned',
                        index: shardsRow.index,
                        shard: shardsRow.shard,
                        state: shardsRow.state,
                        prirep: shardsRow.prirep
                    })
                }
            })
        })
        newMap.set(nodesRow.name, assignedArr)
        if (unassignedArr.length > 0) {
            newMap.set('unassigned', unassignedArr)
        }
    })

    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom display="inline">
                샤드 배치
            </Typography>
            <Card mt={2} style={{overflow: "auto"}}>
                <CardContent>
                    <FormControlLabel control={ <Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" color="primary"/> } label="닫힌 인덱스" />
                    <FormControlLabel control={ <Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" color="primary"/> } label=". 특수 인덱스" />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{
                                    fontSize: "0.5em",
                                    minWidth: "100px",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden"
                                }}>
                                </TableCell>
                                {Object.values(indicesArr).map(indicesInfo => {
                                        return (
                                            <TableCell style={{
                                                fontSize: "1em",
                                                minWidth: "100px",
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                textAlign: "left",
                                                backgroundColor: indicesInfo.health === 'red' ? pink['100'] : indicesInfo.health === 'yellow' ? yellow['A400'] : '#ffffff'
                                            }}>
                                                <Typography style={{fontWeight: "bold"}}>{indicesInfo.index}</Typography>
                                                <Typography>샤드: P({indicesInfo.pri}) R({indicesInfo.rep})</Typography>
                                                <Typography>문서: {indicesInfo['docs.count']}</Typography>
                                                <Typography>크기: {indicesInfo['store.size']}</Typography>
                                                {/*<Typography>상태: {indicesInfo.health}</Typography>*/}
                                            </TableCell>
                                        )
                                    }
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                newMap.get('unassigned') ?
                                    <TableRow>
                                        <TableCell align="center">미할당</TableCell>
                                        {
                                            Object.values(indicesArr).map((element, elementIndex) => {
                                                return (
                                                    <TableCell key={elementIndex}>
                                                        {
                                                            Object.values(newMap.get('unassigned')).map((data, dataIndex) => {
                                                                if (element.index === data.index) {
                                                                    return (
                                                                        <ShardButton prirep={data.prirep} label={data.shard} key={dataIndex} />
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </TableCell>
                                                )
                                            })
                                        }
                                    </TableRow>
                                    : <></>
                            }
                            {Object.values(nodes).map(nodeRow =>
                                <TableRow>
                                    <TableCell align="center">
                                        <Typography>{nodeRow.name}</Typography>
                                        <Typography>{nodeRow.ip}</Typography>
                                        <Typography>{nodeRow.master === '*' ? '마스터노드' : ''}</Typography>
                                        <Typography>{nodeRow.role}</Typography>
                                    </TableCell>
                                    {
                                        Object.values(indicesArr).map((element, elementIndex) => {
                                            return (
                                                <TableCell key={elementIndex}>
                                                    {
                                                        Object.values(newMap.get(nodeRow.name)).map((data, dataIndex) => {
                                                            if (element.index === data.index) {
                                                                return <ShardButton prirep={data.prirep} label={data.shard} />

                                                                // if (data.prirep === 'p') {
                                                                //     return <ShardButton type={"primary"} label={data.shard} />
                                                                //     // return (
                                                                //     //     <Button variant="contained" color="secondary">
                                                                //     //         {data.shard}
                                                                //     //     </Button>
                                                                //     // )
                                                                // } else if (data.prirep === 'r') {
                                                                //
                                                                //     // return (
                                                                //     //     <Button variant="outlined" color="secondary">
                                                                //     //         {data.shard}
                                                                //     //     </Button>
                                                                //     // )
                                                                // }
                                                            }
                                                        })
                                                    }
                                                </TableCell>
                                            )
                                        })
                                    }
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}

function ClusterInfo({dispatch, shards, nodes, indices, cluster}) {
    const classes = useStyles();
    useEffect(() => {
        dispatch(setIndicesInfoActions())
        dispatch(setClusterInfoActions())
        dispatch(setNodesInfoActions())
        dispatch(setShardsInfoActions())
    }, [])

    return (
        <React.Fragment>
            <Helmet title="클러스터"/>

            <Typography variant="h3" gutterBottom display="inline">
                클러스터
            </Typography>

            <br/>

            <Divider my={6}/>

            {/*{cluster.cluster_name}*/}

            <ClusterSummary cluster={cluster}/>

            <br/>

            <ClusterShardMap indices={indices} nodes={nodes} shards={shards}/>
        </React.Fragment>
    );
}

export default connect(store => ({
    indices: store.clusterInfoReducers.indices,
    shards: store.clusterInfoReducers.shards,
    nodes: store.clusterInfoReducers.nodes,
    cluster: store.clusterInfoReducers.cluster
}))(ClusterInfo);
