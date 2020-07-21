import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import styled from "styled-components";

import {
    Box as MuiBox,
    Button as MuiButton,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    Grid as MuiGrid,
    Menu,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography as MuiTypography,
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {positions, spacing} from "@material-ui/system";
import {ArrowDropDown} from "@material-ui/icons";
import {deleteIndexHistoryList, setIndexHistoryList} from "../../../redux/actions/collectionActions";

const Divider = styled(MuiDivider)(spacing, positions);
const Typography = styled(MuiTypography)(spacing, positions);
const Box = styled(MuiBox)(spacing, positions);
const Card = styled(MuiCard)(spacing, positions);
const Button = styled(MuiButton)(spacing, positions);
const Grid = styled(MuiGrid)(spacing, positions);

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 250,
    },
    root: {
        flexGrow: 1,
        width: '100%',
    },
    edit: {
        width: '100%'
    }
}));

function rpad(str, padLen, padStr) {
    if (padStr.length > padLen) {
        return str + "";
    }
    str += ""; // 문자로
    padStr += ""; // 문자로
    while (str.length < padLen)
        str += padStr;
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
}

const paginationSize = 2

function History({dispatch, authUser, collection, history}) {
    const classes = useStyles();
    const [moreMenu, setMoreMenu] = useState(null)
    const [from, setFrom] = useState(0)

    function toggleMoreMenu(event) {
        setMoreMenu(moreMenu === null ? event.currentTarget : null)
    }

    useEffect(() => {
        dispatch(setIndexHistoryList({
            indexA: collection['indexA']['index'],
            indexB: collection['indexB']['index'],
            size: paginationSize,
            from,
        }))
    }, [])

    function handleSetIndexHistoryList(editFrom) {
        setFrom(editFrom)
        dispatch(setIndexHistoryList({
            indexA: collection['indexA']['index'],
            indexB: collection['indexB']['index'],
            size: paginationSize,
            from: editFrom,
        }))
    }

    function handleIndexHistoryList(date) {
        dispatch(deleteIndexHistoryList({
            indexA: collection['indexA']['index'],
            indexB: collection['indexB']['index'],
            time: date.getTime()
        })).then(response => {
            setFrom(0)
            setTimeout(() => {
                dispatch(setIndexHistoryList({
                    indexA: collection['indexA']['index'],
                    indexB: collection['indexB']['index'],
                    size: paginationSize,
                    from: 0,
                }))
            }, 1000)
            toggleMoreMenu()
        }).catch(error => {
            console.log(error)
            alert(error)
            toggleMoreMenu()
        })

    }

    if (!history['hits']) {
        return null;
    }

    console.log('collection', collection)
    console.log('hits >> ', history['hits'])

    // 색인: index, 전파 : spread, 교체: transform
    const lastPage = Math.ceil(history['hits']['total']['value'] / paginationSize)
    const nowPage = Math.ceil(from / paginationSize) + 1

    return (
        <React.Fragment>
            <br/>

            <Card>
                <CardContent>
                    <Box>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>타입</TableCell>
                                    <TableCell>결과</TableCell>
                                    <TableCell>문서수</TableCell>
                                    <TableCell>자동실행</TableCell>
                                    <TableCell>시작</TableCell>
                                    <TableCell>종료</TableCell>
                                    <TableCell>소요시간</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    ((history['hits']||{})['hits']||[]).map((hit, index) => {
                                        const sourceAsMap = hit['_source']

                                        const jobTypeName = sourceAsMap['jobType'] === "index" ? '색인' : sourceAsMap['jobType'] === "spread" ? "전파" : "교체"
                                        const autoRun = sourceAsMap['autoRun'] ? "자동" : "수동"
                                        let st = new Date();
                                        let et = new Date();
                                        let time = '';
                                        let formatDocSize = sourceAsMap['docSize'];

                                        try {
                                            formatDocSize = Number(sourceAsMap['docSize']).toLocaleString()
                                            st.setTime(rpad(sourceAsMap['startTime'], 13, '0'))
                                            et.setTime(rpad(sourceAsMap['endTime'], 13, '0'))
                                            let diff = et.getTime() - st.getTime()
                                            let H = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                            let m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                                            let s = Math.floor((diff % (1000 * 60)) / 1000);
                                            time = `${H}시 ${m}분 ${s}초`
                                        } catch (err) {
                                            console.error('err', err)
                                            st = ''
                                            et = ''
                                        }
                                        return (
                                            <TableRow key={hit['_id']}>
                                                <TableCell>{from + index + 1}</TableCell>
                                                <TableCell>{jobTypeName}</TableCell>
                                                <TableCell>{sourceAsMap['status']}</TableCell>
                                                <TableCell>{formatDocSize}</TableCell>
                                                <TableCell>{autoRun}</TableCell>
                                                <TableCell>{st.toLocaleString()}</TableCell>
                                                <TableCell>{et.toLocaleString()}</TableCell>
                                                <TableCell>{time}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </Box>

                    <br/>
                    <Grid container>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <Box align={"center"}>
                                <Box align={"center"}>
                                    <Button variant={"outlined"}
                                            disabled={nowPage === 1}
                                            onClick={() => handleSetIndexHistoryList(((nowPage - 1) * paginationSize) - paginationSize)}
                                    >
                                        이전
                                    </Button>
                                    <Box component={"span"} m={3}>
                                        {nowPage} / {lastPage === 0 ? 1 : lastPage}
                                    </Box>
                                    <Button variant={"outlined"}
                                            disabled={nowPage === (lastPage === 0 ? 1 : lastPage)}
                                            onClick={() => handleSetIndexHistoryList(nowPage * paginationSize)}
                                    >
                                        다음
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box align={'right'}>
                                {authUser.role.index ? <><Button variant={"outlined"}
                                                                 onClick={toggleMoreMenu}
                                >
                                    더보기
                                    <ArrowDropDown/>
                                </Button>
                                    <Menu
                                        anchorEl={moreMenu}
                                        open={Boolean(moreMenu)}
                                        onClose={toggleMoreMenu}
                                    >
                                        <MenuItem onClick={() => handleIndexHistoryList(new Date())}>
                                            초기화
                                        </MenuItem>
                                        <MenuItem onClick={() => {let d = new Date(); d.setDate(d.getDate() - 7); handleIndexHistoryList(d)}}>
                                            7일이전 모두 삭제
                                        </MenuItem>
                                    </Menu> </> : <></>}
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

        </React.Fragment>
    );
}

export default connect(store => ({
    authUser: store.fastcatxReducers.authUser,
    ...store.collectionReducers
}))(History);
