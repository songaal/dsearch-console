import React, {useState, useEffect, useRef} from "react";
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
    Checkbox
} from "@material-ui/core";
import {setSummary, applyDictionary} from "../../../redux/actions/dictionaryActions";
import { StorefrontRounded } from "@material-ui/icons";

// 수정시간, 저장시간은 인덱스에 있는지 보고 없으면 필드 추가 
// 현재 .fastcatx_dict 생성시간을 수정시간 및 저장시간에 배치.
// 추후 수정시간 저장시간 필드가 생기면 교체 예정.

function SummaryTable({summary}){
    console.log(summary)
    if(summary.dictionaryInfo === undefined || summary.dictionaryTimes === undefined || summary.dictionarySettings === undefined) return <></>;


    console.log(summary.infoDict);
    console.log(summary.time);
    console.log(summary.settingList);

    var infoDict = JSON.parse(summary.dictionaryInfo).dictionary;
    // var date = summary.time;
    // var updatedTime = new Date(date.hits.hits[0].sourceAsMap.updatedTime);
    // var appliedTime = new Date(date.hits.hits[0].sourceAsMap.appliedTime);
    
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


 function Summary({dispatch, summary}) {
    useEffect(() => {
        dispatch(setSummary())
    }, [])

    const clickApplyDictionary = (event) => {
        var data = {};
        data.index=".fastcatx_dict"
        data.exportFile= true
        data.distribute= true
        dispatch(applyDictionary(data))
    }
        
    return (
        <React.Fragment>

            <br/>

            <Card>
                <CardContent>
                    <Box>
                        <Button variant={"contained"} color={"primary"} onClick={clickApplyDictionary}>사전적용</Button>
                    </Box>
                    <Box>
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
                                <SummaryTable summary={summary} />
                            </TableBody>
                        </Table>
                    </Box>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}


export default connect(store => ({ 
    summary: store.dictionaryReducers.summary
    // settings: store.dictionaryReducers.settings,
    // infoDict: store.dictionaryReducers.infoDict
    // indexSettings :  store.dictionaryReducers.indexSettings,
    // date : store.dictionaryReducers.date
}))(Summary)