import React from "react";
import styled from "styled-components";
import {NavLink as RouterNavLink} from "react-router-dom";
import Helmet from 'react-helmet';

import {
    Box,
    Table as MuiTable, TableRow, TableCell, TableHead, TableBody,
    TextField as MuiTextField,
    TextareaAutosize as MuiTextareaAutosize,
    Breadcrumbs as MuiBreadcrumbs,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    Grid,
    Link,
    Typography
} from "@material-ui/core";

import {TreeView, TreeItem} from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));
import { spacing } from "@material-ui/system";
import { margin } from "polished";

const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const TextareaAutosize = styled(MuiTextareaAutosize)(spacing);
const Table = styled(MuiTable)(spacing);

function ScoreTreeView() {
    return (
        <TreeView
            style={{flexGrow:1}}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            <TreeItem nodeId="1" label="7.8209105 : weight(TOTALINDEX:선풍기 in 640088) [PerFieldSimilarity], result of" >
                <TreeItem nodeId="2" label="7.8209105: score(freq=1.0), computed as boost * idf * tf from" >
                    <TreeItem nodeId="3" label="2.2: boost" /> 
                    <TreeItem nodeId="4" label="6.839571: idf, computed as log(1 + (N - n + 0.5) / (n + 0.5)) from:">
                        <TreeItem nodeId="5" label="3420: n, number of documents containing term" /> 
                        <TreeItem nodeId="6" labe="31947217: N, total number of documents with field" />
                    </TreeItem>
                    <TreeItem nodeId="7" label="0.51976347: tf, computed as freq / (freq + k1 * (1 - b + b * dl / avgdl)) from:">
                        <TreeItem nodeId="8" label="1.0: freq, occurrences of term within document" /> 
                        <TreeItem nodeId="9" label="1.2: k1, term saturation parameter" />
                        <TreeItem nodeId="10" label="0.75: b, length normalization parameter" />
                        <TreeItem nodeId="11" label="10.0: dl, length of field" />
                        <TreeItem nodeId="12" label="14.424187: avgdl, average length of field" />
                    </TreeItem>
                </TreeItem>
            </TreeItem>
        </TreeView>
    );
}

function ResultDocument(){
    return(
        <Table >
            <TableBody>
                <TableRow>
                    <TableCell style={{width: '100px'}}>ID</TableCell>
                    <TableCell > 787770 </TableCell>
                    <TableCell > 787770 </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{width: '100px'}}>제조사</TableCell>
                    <TableCell > 르젠 </TableCell>
                    <TableCell > 르젠 </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{width: '100px'}}>상품명</TableCell>
                    <TableCell > LZEF DC270 </TableCell>
                    <TableCell > LZEF, DC, 270, DC270 </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{width: '100px'}}>간략설명</TableCell>
                    <TableCell > 스탠드  선풍기 가정용 소비전력30W 14인치 </TableCell>
                    <TableCell > 스탠드, 선풍기, 가정용, 소비, 전력, 30, 30W, 35, 14, 14인치 </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{width: '100px'}}>묶음명</TableCell>
                    <TableCell ></TableCell>
                    <TableCell ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{width: '100px'}}>관련키워드</TableCell>
                    <TableCell> LZEF DC270 르젠옴므선풍기 </TableCell>
                    <TableCell>LZEF, DC, 270,G DC270, 르젠, 옴므, 선풍기</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{width: '100px'}}>카테고리</TableCell>
                    <TableCell> 전기스탠드형 > 계절가전용품 > 선풍기 </TableCell>
                    <TableCell> 전기, 스탠드형, 계절, 가전, 용품, 선풍기</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell >점수</TableCell>
                    <TableCell  colSpan={2} >
                        <ScoreTreeView></ScoreTreeView>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );

}


function RankingTuningResults() {

    return (<Table style={ {margin: "9px"} }>
        <TableHead>
            <TableRow>
                <TableCell align="right"> # </TableCell>
                <TableCell align="center"> 결과 문서 </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell align="right">1</TableCell>
                <TableCell align="right">
                    <ResultDocument />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">2</TableCell>
                <TableCell align="right">
                    <ResultDocument />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">3</TableCell>
                <TableCell align="right">
                    <ResultDocument />
                </TableCell>
            </TableRow>
            <TableRow >
                <TableCell align="right"> 4</TableCell>
                <TableCell align="right">
                    <ResultDocument />
                </TableCell>
            </TableRow>
            <TableRow >
                <TableCell align="right">5</TableCell>
                <TableCell align="right">
                    <ResultDocument />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">6</TableCell>
                <TableCell align="right">
                    <ResultDocument />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">7</TableCell>
                <TableCell align="right">
                    <ResultDocument />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">8</TableCell>
                <TableCell align="right">
                    <ResultDocument />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">9</TableCell>
                <TableCell align="right">
                    <ResultDocument />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right">10</TableCell>
                <TableCell align="right">
                    <ResultDocument />
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>);
}


function RankingTuningCard() {
    return (
        <Card mb={6}>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="center" fullWidth >
                    <Typography variant="h3" gutterBottom display="inline">총 123,043건의 검색결과</Typography>
                </Box>

                <Box display="flex" alignContent="space-between" fullWidth style={{ height: "100%"}} >
                    <TextareaAutosize
                            m={2}
                                style={{ minWidth: "10%", width: "30%"}}
                                rowsMin={50}
                                placeholder="이 곳에 튜닝할 내용을 입력해 주세요"
                            />
                            
                            <RankingTuningResults  />
                </Box>
            </CardContent>
        </Card>
    );
}

function RankingTuning() {
    return (
        <React.Fragment>
            <Helmet title="Blank"/>
            <Typography variant="h3" gutterBottom display="inline">
                랭킹튜닝
            </Typography>

            {/* <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} exact to="/">
                    Dashboard
                </Link>
                <Link component={NavLink} exact to="/">
                    Pages
                </Link>
                <Typography>랭킹튜닝</Typography>
            </Breadcrumbs> */}

            <Divider my={6}/>

            <Grid container spacing={6}>
                <Grid item xs={12}  wrap="nowrap">
                    <RankingTuningCard />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default RankingTuning;
