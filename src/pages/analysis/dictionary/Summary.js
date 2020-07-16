import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    Box,
    Card,
    CardContent,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Checkbox, Snackbar
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import {setSummary, applyDictionary} from "../../../redux/actions/dictionaryActions";

function SummaryTable({summary}){
    if(summary.dictionaryInfo === undefined || summary.dictionaryTimes === undefined || summary.dictionarySettings === undefined) return <></>;

    var infoDict = JSON.parse(summary.dictionaryInfo).dictionary;
    var times = summary.dictionaryTimes.hits.hits;
    var settings = summary.dictionarySettings;
    var tableInfo = [];

    for(var i in infoDict){
        if(infoDict[i].type == "SYSTEM"){
            var info = infoDict[i];
            info.name = "시스템 사전";
            tableInfo.push(info);
            break;
        }
    }

    for(var i in settings){
        var info = settings[i];
        for(var j in infoDict){
            if(settings[i].id == infoDict[j].type){
                info.count = infoDict[j].count;
                info.words = infoDict[j].words;
                info.indexCount = infoDict[j].indexCount;
                break;
            }
        }

        for(var j in times){
            if(settings[i].id == times[j].sourceAsMap.id){
                if(times[j].sourceAsMap.updatedTime === undefined && times[j].sourceAsMap.appliedTime === undefined) continue;
                info.updatedTime = new Date(times[j].sourceAsMap.updatedTime).toLocaleString();
                info.appliedTime = new Date(times[j].sourceAsMap.appliedTime).toLocaleString();
                break;
            }
        }
        tableInfo.push(info);
    }
    return tableInfo.map((info) => { return  <TableRow key={info.id}>
        <TableCell><Checkbox /></TableCell>
        <TableCell>{info.name}</TableCell>
        <TableCell>{info.type}</TableCell>
        <TableCell>{info.indexCount ? info.indexCount : "-"}</TableCell>
        <TableCell> {info.updatedTime ? info.updatedTime : "-"} </TableCell>
        <TableCell>{info.count}</TableCell>
        <TableCell> {info.appliedTime ? info.appliedTime : "-"} </TableCell>
        <TableCell> {info.tokenType ? info.tokenType : "-"} </TableCell>
        <TableCell> {info.ignoreCase ? info.ignoreCase ? "Y": "N" : "-"} </TableCell>
        </TableRow> });
}


 function Summary({dispatch, authUser, summary}) {
     const [applyDict, setApplyDict ] = useState(false);
    useEffect(() => {
        dispatch(setSummary())
    }, [])

    const clickApplyDictionary = (event) => {
        let data = {};
        data.index=".fastcatx_dict" // 변경 예정
        data.exportFile= true
        data.distribute= true
        dispatch(applyDictionary(data))
        setApplyDict(true);
    }
    // authUser.role.analysis = false;
    return (
        <React.Fragment>
            <br/>
            <Card>
                <CardContent>
                    <Box>
                        {authUser.role.analysis ? 
                            <Button variant={"contained"} color={"primary"} onClick={clickApplyDictionary}>사전적용</Button> 
                            : <></>}
                    </Box>
                    <Box>
                        <Snackbar open={applyDict} autoHideDuration={5000} onClose={() => { setApplyDict(false) }}>
                            <MuiAlert elevation={6} variant="filled" severity="info"> 사전 적용 성공 </MuiAlert>
                        </Snackbar>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>이름</TableCell>
                                    <TableCell>타업</TableCell>
                                    <TableCell>작업단어갯수</TableCell>
                                    <TableCell>수정시간</TableCell>
                                    <TableCell>적용단어갯수</TableCell>
                                    <TableCell>적용시간</TableCell>
                                    <TableCell>토큰타입</TableCell>
                                    <TableCell>대소문자무시</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <SummaryTable authUser={authUser} summary={summary} />
                            </TableBody>
                        </Table>
                    </Box>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}


export default connect(store => ({ 
    authUser: store.fastcatxReducers.authUser,
    summary: store.dictionaryReducers.summary
}))(Summary)