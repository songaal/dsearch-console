import React from "react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import styled from "styled-components";

import AddIcon from '@material-ui/icons/Add';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';



import Helmet from 'react-helmet';

import {
    Fab,
    TextField,

    Card as MuiCard,
    CardContent,
    CardActionArea,
    Box,
    IconButton,
    Link,
    Divider as MuiDivider,
    Grid,
    Typography,
    Button
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import * as Icon from "react-feather";

const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);

const useStyles = makeStyles({
    cardRoot: {
        minHeight: "200px"
    },
    title: {
        fontWeight: "bold"
    },
    addCardButton: {
        border: "1px solid"
    }
});

function ClusterCard(props) {
    const classes = props.className
    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card variant="outlined">
                <CardActionArea className={classes.cardRoot}>
                    <CardContent>
                        <Box className={classes.title} m={1}>
                            {props.title}
                        </Box>
                        <Box m={1}>
                            마스터노드:
                            {
                                props.masterList.map((master, index) =>
                                (<Box key={index} component={"span"}>{master}</Box>))
                            }
                        </Box>
                        <Box m={1}>
                            노드:
                            <Box component={"span"}>{props.nodeCount}</Box>대
                        </Box>
                        <Box m={1}>
                            인덱스:
                            <Box component={"span"}>{props.indicesCount}</Box>개
                        </Box>
                        <Box m={1}>
                            샤드:
                            <Box component={"span"}>{props.totalShardCount}</Box>개
                        </Box>
                        <Box m={1}>
                            용량:
                            <Box component={"span"}>{props.useDisk}</Box>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

function AddClusterCard(props) {
    const classes = props.className
    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card variant="outlined" className={classes.cardRoot}>
                <CardContent>
                    <Box display="flex"
                         justifyContent="center"
                         m={1}
                         mt={10}
                         className={classes.title}
                    >
                        신규 클러스터 추가
                    </Box>
                    <Box display="flex"
                         justifyContent="center"
                         m={2}
                    >
                        {/*<IconButton  variant="outlined"*/}
                        {/*             color="primary"*/}
                        {/*             component="div"*/}
                        {/*             onClick={() => props.handleClick()}*/}
                        {/*             className={classes.addCardButton}>*/}
                        {/*    <Icon.Plus/>*/}
                        {/*</IconButton >*/}
                        <Fab color="primary"
                             aria-label="add"
                             onClick={() => props.handleClick()}
                        >
                            <AddIcon />
                        </Fab>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )
}

function AddGuideCard(props) {
    const classes = props.className
    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card variant="outlined" className={classes.cardRoot}>
                <CardContent>
                    <Box display="flex"
                         justifyContent="center"
                         m={1}
                         mt={15}
                         className={classes.title}
                    >
                        FastcatX 서버설치방법
                    </Box>
                    <Box display="flex"
                         justifyContent="center"
                         m={3}
                    >
                        <Link href="#" onClick={() => console.log("click")}>
                            바로가기
                        </Link>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )
}

function Cluster({ dispatch, cluster, clusterList }) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleClickOpen = () => { setOpen(true);};
    const handleClose = () => {setOpen(false);};


    const classes = useStyles();
    return (
        <React.Fragment>
            <Helmet title="클러스터"/>
            <Typography variant="h3" gutterBottom display="inline">
                클러스터
            </Typography>
            <Divider my={6}/>

            <Grid container spacing={6}>
                {clusterList.map((cluster, index) => (<ClusterCard key={index} {...cluster} className={classes} />))}
                <AddClusterCard key={"add"} className={classes} handleClick={handleClickOpen} />
                <AddGuideCard key={"guide"} className={classes} />
            </Grid>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    클러스터 추가
                </DialogTitle>
                <DialogContent>
                    <form className={classes.root} noValidate autoComplete="off">

                        <Box m={2}>
                            <TextField id="clusterName" label="이름" fullWidth/>
                        </Box>
                        <Box m={2}>
                            <TextField id="outlined-multiline-static"
                                       label="마스터노드주소"
                                       multiline
                                       rows={4}
                                       defaultValue=""
                                       variant="outlined"
                                       fullWidth
                            />
                        </Box>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus
                            onClick={handleClose}
                            color="primary"
                            variant="contained"
                    >
                        추가
                    </Button>
                    <Button onClick={handleClose}
                            autoFocus
                            variant="contained"
                    >
                        취소
                    </Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}

export default connect(store => ({ ...store.clusterReducers }))(Cluster);

