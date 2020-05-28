import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import { setClusterInfoActions, setNodesInfoActions, setIndicesInfoActions, setHealthInfoActions, setShardsInfoActions  } from '@actions/clusterInfoActions'
import Helmet from "react-helmet";

import {
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  Grid,
  Typography,
  Box as MuiBox,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  TableCell,
  Button,  
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import Async from "~/components/Async";
import { spacing } from "@material-ui/system";
import { Label, TurnedIn } from "@material-ui/icons";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {connect} from "react-redux";
import clusterInfoReducers from "../../../redux/reducers/clusterInfoReducers"


const useStyles = makeStyles(
  (theme) => ({
    formControl: {
      margin: theme.spacing(1),
      //minWidth: 10,
    },
    root: {
      flexGrow: 1,
      width: "100%",
      overflowX: "auto"
      // backgroundColor: theme.palette.background.paper,
    },
    edit: {
      width: "100%",
    },
    table: {
        minWidth: 1080
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),

  { withTheme: true }
);
const StyledTableCell = withStyles((theme) => ({
  body: {
    border: 1,
    fontSize: 14,
  },
}))(TableCell);

const stateCell = (color) => {
    return (
        {
            color: "black",
            background: color
        }
    )
}

const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);

function GetInfo({cluster}) {
  const classes = useStyles();

  return (
    <Card mb={6}>
      <CardContent>
          
        <Table className={classes.table} size="small" border={1}>
          <TableHead>
          </TableHead>
          <TableBody>
            <TableRow align="center" >
            <StyledTableCell align="left">
                <b>노드 : </b>  {cluster.nodes.count.total}
            </StyledTableCell>
            <StyledTableCell align="left">
                <StyledTableCell><b>인덱스 : </b></StyledTableCell>
                <StyledTableCell>{cluster.indices.count}</StyledTableCell>
            </StyledTableCell>
            <StyledTableCell align="left">
                <StyledTableCell><b>샤드 : </b></StyledTableCell>
                <StyledTableCell>{cluster.indices.shards.total}</StyledTableCell>
            </StyledTableCell>
            <StyledTableCell align="left">
                <StyledTableCell><b>문서수 : </b></StyledTableCell>
                <StyledTableCell>{cluster.indices.docs.count}</StyledTableCell>
            </StyledTableCell>
            <StyledTableCell align="left">
                <StyledTableCell><b>용량 : </b></StyledTableCell>
                <StyledTableCell>{cluster.indices.store.size}</StyledTableCell>
            </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
  
function GetClusterTable({indices, nodes, shards}) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  //닫힌 인덱스, 특수인덱스에 따른 처리
  let indicesArr = []
  {Object.values(indices).map(indicesInfo => 
    
    {
        //console.log('A : ' + state.checkedA + ' B : ' +state.checkedB + ' : ' + indicesInfo.status + ' : ' +indicesInfo.index)
        if(state.checkedA && indicesInfo.status == 'close') {
            indicesArr.push(indicesInfo)        
        }else if(state.checkedB && indicesInfo.index.charAt(0) == '.') {
            indicesArr.push(indicesInfo)
        }else if(indicesInfo.status == 'open' && indicesInfo.index.charAt(0) != '.'){
            indicesArr.push(indicesInfo)
        }
    }

  )}


  //샤드 표시를 위한 MAP 생성
  let newMap = new Map()  
  Object.values(nodes).forEach((nodesRow) => {
      let assignedArr= []
      let unassignedArr = []
      Object.values(indicesArr).forEach((indicesRow) => {
          Object.values(shards).forEach((shardsRow) => 
            {
                if(indicesRow.index == shardsRow.index && nodesRow.name == shardsRow.node) {
                    assignedArr.push({node:shardsRow.node ,index:shardsRow.index, shard:shardsRow.shard, state:shardsRow.state, prirep:shardsRow.prirep})
                }else if(indicesRow.index == shardsRow.index && shardsRow.state == 'UNASSIGNED'){
                    unassignedArr.push({node:'unassigned' ,index:shardsRow.index, shard:shardsRow.shard, state:shardsRow.state, prirep:shardsRow.prirep})
                }
            })
        })
        newMap.set(nodesRow.name, assignedArr)
        if(unassignedArr.length > 0) {
            newMap.set('unassigned', unassignedArr)
        }
  })

  
  return (
    <Card mb={6} className={classes.root}>
      <CardContent>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.checkedA}
              onChange={handleChange}
              name="checkedA"
              color="primary"
            />
          }
          label="닫힌 인덱스"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.checkedB}
              onChange={handleChange}
              name="checkedB"
              color="primary"
            />
          }
          label=". 특수 인덱스"
        />
        <Table className={classes.table} border={1} size="small">
          <TableHead>
            <TableRow align="center">
              <StyledTableCell>&nbsp;</StyledTableCell>
            {Object.values(indicesArr).map(indicesInfo => 
                
                {
                    return (
                        <TableCell style={stateCell(indicesInfo.health)} align="left" size='samll'>
                            <TableRow align="center">
                                <StyledTableCell><b>{indicesInfo.index}</b></StyledTableCell> 
                            </TableRow>
                            <TableRow align="center" size='small'>
                                <StyledTableCell>샤드 : P({indicesInfo.pri}), R({indicesInfo.rep}) </StyledTableCell>
                            </TableRow>
                            <TableRow align="center">
                                <StyledTableCell> 문서 : {indicesInfo['docs.count']} </StyledTableCell>
                            </TableRow>
                            <TableRow align="center">
                                <StyledTableCell>Size : {indicesInfo['store.size']}</StyledTableCell>
                            </TableRow>
                        </TableCell>
                    )
                }
            )}
            </TableRow>
          </TableHead>
          <TableBody>

            {
               newMap.get('unassigned') ? 
               <TableRow align="center">
                    <StyledTableCell align="left">
                        미할당
                    </StyledTableCell>

                    {                  
                        Object.values(indicesArr).map(element => {
                            return (
                                <TableCell align="left" border={1}> 
                                {
                                    Object.values(newMap.get('unassigned')).map(data => {
                                        if(element.index == data.index) {
                                            //console.log('shard : ' + data.shard)
                                           
                                                return (
                                                    <Button size="small" variant="contained" disabled>
                                                        {data.shard}
                                                    </Button>
                                                    )
                                            
                                                //data.shard
                                        }
                                    })
                                }
                                </TableCell>
                            )
                        })
                    }
               </TableRow> 
               :''

            }
            {Object.values(nodes).map(nodeRow =>  
                <TableRow align="center">
                    <StyledTableCell align="left">
                    {nodeRow.name}  <br/>
                    {nodeRow.ip} <br/>
                    {nodeRow.master == '*' ? '마스터노드' : ''}
                    </StyledTableCell>
                    {                  
                        Object.values(indicesArr).map(element => {
                            return (
                                <TableCell align="left" border={1}> 
                                {
                                    Object.values(newMap.get(nodeRow.name)).map(data => {
                                        if(element.index == data.index) {
                                            //console.log('shard : ' + data.shard)
                                            if(data.prirep == 'p') {
                                                return (
                                                    <Button size="small" variant="contained" color="secondary">
                                                        {data.shard}
                                                    </Button>
                                                    )
                                            }else if (data.prirep == 'r') {
                                                return (
                                                    <Button size="small" variant="outlined" color="secondary">
                                                        {data.shard}
                                                    </Button>
                                                    )
                                            }
                                                //data.shard
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
  );
}

function ClusterInfo({dispatch, shards , nodes, indices, cluster}) {
    const classes = useStyles();
    useEffect(() => {
        dispatch(setIndicesInfoActions()),
        dispatch(setClusterInfoActions()),
        dispatch(setNodesInfoActions()),
        dispatch(setShardsInfoActions())
    }, [])

   return (
    <React.Fragment>
      <Helmet title="클러스터" />
      <Typography variant="h3" gutterBottom display="inline">
        {cluster.cluster_name}
      </Typography>
      <br />

      <Divider my={6} />

      <Grid container spacing={6} >
        <Grid item xs={12}>
          <GetInfo cluster={cluster}/>
        </Grid>
        <Grid item xs={12} className = {classes.root}>
          <GetClusterTable indices={indices} nodes={nodes} shards={shards}/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default connect(store => ({ indices: store.clusterInfoReducers.indices, shards: store.clusterInfoReducers.shards, nodes: store.clusterInfoReducers.nodes, cluster: store.clusterInfoReducers.cluster  }))(ClusterInfo);
