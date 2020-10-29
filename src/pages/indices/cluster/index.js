import React, {useEffect} from "react";
import styled from "styled-components";
import {
    setClusterInfoActions,
    setIndicesInfoActions,
    setNodesInfoActions,
    setShardsInfoActions
} from '@actions/clusterInfoActions'
import Helmet from "react-helmet";
import {useHistory} from "react-router-dom";
import {
    Box,
    Button,
    Card as MuiCard,
    CardContent,
    Checkbox,
    Divider as MuiDivider,
    FormControlLabel,
    Grid as MuiGrid,
    Hidden,
    Table,
    TableBody,
    TableCell as MuiTableCell,
    TableHead,
    TableRow as MuiTableRow,
    TextField,
    Typography,
    Link,
} from "@material-ui/core";
import {palette, sizing, spacing} from "@material-ui/system";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {pink, yellow} from '@material-ui/core/colors';

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
                            <Typography className={classes.headerValue}>{cluster.nodes.count.total ? Number(cluster.nodes.count.total).toLocaleString() : "0"}</Typography>
                        </Grid>

                        <Grid item xs={3} md={1}>
                            <Typography className={classes.headerField}>인덱스</Typography>
                        </Grid>
                        <Grid item xs={3} md={1}>
                            <Typography className={classes.headerValue}>{cluster.indices.count ? Number(cluster.indices.count).toLocaleString() : "0"}</Typography>
                        </Grid>

                        <Grid item xs={3} md={1}>
                            <Typography className={classes.headerField}>샤드</Typography>
                        </Grid>
                        <Grid item xs={3} md={1}>
                            <Typography className={classes.headerValue}>{cluster.indices.shards.total ? Number(cluster.indices.shards.total).toLocaleString() : "0"}</Typography>
                        </Grid>

                        <Grid item xs={3} md={1}>
                            <Typography className={classes.headerField}>문서</Typography>
                        </Grid>
                        <Grid item xs={3} md={1}>
                            <Typography className={classes.headerValue}>{cluster.indices.docs.count ? Number(cluster.indices.docs.count).toLocaleString() : "0"}</Typography>
                        </Grid>

                        <Grid item xs={3} md={1}>
                            <Typography className={classes.headerField}>용량</Typography>
                        </Grid>
                        <Grid item xs={3} md={1}>
                            <Typography className={classes.headerValue}>{cluster.indices.store.size}</Typography>
                        </Grid>
                        <Hidden smUp>
                            <Grid item xs={3}> </Grid>
                            <Grid item xs={3}> </Grid>
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
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
    });
    const [filter, setFilter] = React.useState("")

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    //닫힌 인덱스, 특수인덱스에 따른 처리
    let indicesArr = []
    Object.values(indices).forEach(indicesInfo => {
        if (state.checkedA && indicesInfo.status === 'close') {
            indicesArr.push(indicesInfo)
        } else if (state.checkedB && indicesInfo.index.charAt(0) === '.') {
            indicesArr.push(indicesInfo)
        } else if (indicesInfo.status === 'open' && indicesInfo.index.charAt(0) !== '.') {
            indicesArr.push(indicesInfo)
        }
    })

    //샤드 표시를 위한 MAP 생성
    let newMap = new Map()
    Object.values(nodes).forEach((nodesRow) => {
        let assignedArr = []
        let unassignedArr = []
        Object.values(indicesArr).forEach((indicesRow) => {
            Object.values(shards).forEach((shardsRow) => {
                if (indicesRow.index === shardsRow.index && nodesRow.name === shardsRow.node) {
                    assignedArr.push({
                        node: shardsRow.node,
                        index: shardsRow.index,
                        shard: shardsRow.shard,
                        state: shardsRow.state,
                        prirep: shardsRow.prirep
                    })
                } else if (indicesRow.index === shardsRow.index && shardsRow.state === 'UNASSIGNED') {
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

        let filterUnassignedArr = []
        for (let i = 0; i < unassignedArr.length; i++) {
            if(!isFilterIndex(unassignedArr[i]['index'])) {
                filterUnassignedArr.push(unassignedArr[i])
            }
        }

        if (filterUnassignedArr.length > 0) {
            newMap.set('unassigned', filterUnassignedArr)
        }
    })

    function isFilterIndex(index) {
        const filterSplit = filter.trim().split(",")
        if (filter.trim() === "" || filterSplit[0] === "") {
            return false
        }

        let isMatched = true
        for (let i = 0; i < filterSplit.length; i++) {
            try {
                if (String(index).startsWith(filterSplit[i].trim()) || String(index).match(filterSplit[i].trim())) {
                    isMatched = false;
                    break;
                }
            } catch(error) {
                // ignore
            }
        }
        return isMatched;
    }

    const matchedCount = Object.values(indicesArr).filter(indexObj => !isFilterIndex(indexObj['index'])).length;
    
    const history = useHistory();
    
    function moveIndexDetail(uuid) {
        history.push(`./indices/${uuid}`)
    }

    function moveServerDetail(nodeName) {
        history.push(`./management/server?nodename=${nodeName}`);
    }
    
    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom display="inline">
                샤드 배치
            </Typography>
            <Card mt={2} style={{overflow: "auto"}}>
                <CardContent>
                    <Box my={3}>
                        <TextField fullWidth placeholder={"인덱스 필터 (ex: product, example-index, -index)"} value={filter} onChange={event => setFilter(event.target.value)}/>
                    </Box>
                    <FormControlLabel control={ <Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" color="primary"/> } label="닫힌 인덱스" />
                    <FormControlLabel control={ <Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" color="primary"/> } label=". 특수 인덱스" />

                    {
                        matchedCount === 0 ?
                            <Table>
                                <TableBody>
                                    {
                                        Object.values(nodes).map((nodeRow, nodeRowIndex) => {
                                            return (
                                            <TableRow key={nodeRowIndex}>
                                                <TableCell align="center" style={{
                                                    fontSize: "0.5em",
                                                    minWidth: "80px",
                                                    textOverflow: "ellipsis",
                                                    overflow: "hidden"
                                                }}>
                                                    <Typography>{nodeRow.name}</Typography>
                                                    <Typography>{nodeRow.ip}</Typography>
                                                    <Typography>{nodeRow.master === '*' ? '마스터노드' : ''}</Typography>
                                                    <Typography>{nodeRow.role}</Typography>
                                                </TableCell>
                                                {
                                                    nodeRowIndex === 0 ?
                                                        <TableCell rowSpan={Object.keys(nodes).length} colSpan={20} align="center">
                                                            선택된 인덱스가 없습니다.
                                                        </TableCell>
                                                        :
                                                        null
                                                }
                                            </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                            :
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
                                        {
                                            Object.values(indicesArr).map((indicesInfo, indicesInfoIndex) => {
                                                    if(isFilterIndex(indicesInfo['index'])) {
                                                        return null
                                                    }
                                                    return (
                                                        <TableCell key={indicesInfoIndex} style={{
                                                            fontSize: "1em",
                                                            minWidth: "100px",
                                                            textOverflow: "ellipsis",
                                                            overflow: "hidden",
                                                            textAlign: "left",
                                                            backgroundColor: indicesInfo.health === 'red' ? pink['100'] : indicesInfo.health === 'yellow' ? yellow['A400'] : '#ffffff'
                                                        }}>
                                                            <Link style={{cursor: "pointer"}} onClick={() => moveIndexDetail(indicesInfo.uuid)}>{indicesInfo.index}</Link>
                                                            <Typography>샤드: P({indicesInfo.pri ? Number(indicesInfo.pri).toLocaleString() : "0"}) R({indicesInfo.rep ? Number(indicesInfo.rep).toLocaleString() : "0"})</Typography>
                                                            <Typography>문서: {indicesInfo['docs.count'] ? Number(indicesInfo['docs.count']).toLocaleString() : "0"}</Typography>
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
                                                        if(isFilterIndex(element.index)) {
                                                            return null
                                                        }
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
                                    {Object.values(nodes).map((nodeRow, nodeRowIndex) =>
                                        <TableRow key={nodeRowIndex}>
                                            <TableCell align="center">
                                            <Link style={{cursor: "pointer"}} onClick={() => moveServerDetail(nodeRow.name)}>{nodeRow.name}</Link>
                                                <Typography>{nodeRow.ip}</Typography>
                                                <Typography>{nodeRow.master === '*' ? '마스터노드' : ''}</Typography>
                                                <Typography>{nodeRow.role}</Typography>
                                            </TableCell>
                                            {
                                                Object.values(indicesArr).map((element, elementIndex) => {
                                                    if(isFilterIndex(element.index)) {
                                                        return null
                                                    }
                                                    return (
                                                        <TableCell key={elementIndex}>
                                                            {
                                                                Object.values(newMap.get(nodeRow.name)).map((data, dataIndex) => {
                                                                    if (element.index === data.index) {
                                                                        return <ShardButton key={dataIndex} prirep={data.prirep} label={data.shard} />
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
                    }
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
