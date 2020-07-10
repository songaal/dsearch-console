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
import {setSummary, setInfoDict, applyDictionary, setDictionaryIndexSettings, setDictionaryIndexDate} from "../../../redux/actions/dictionaryActions";
import { StorefrontRounded } from "@material-ui/icons";

// 수정시간, 저장시간은 인덱스에 있는지 보고 없으면 필드 추가 
// 현재 .fastcatx_dict 생성시간을 수정시간 및 저장시간에 배치.
// 추후 수정시간 저장시간 필드가 생기면 교체 예정.

function SummaryTable({summary}){
    console.log(summary);
    return <></>;
    // var timeString = "";
    // console.log(date)
    // if(indexSettings[".fastcatx_dict"] == undefined || date.hits == undefined || date.hits.hits.length == 0 ) return <></>;

    // console.log(indexSettings[".fastcatx_dict"].settings.index.creation_date)
    // var creation_date = new Date(Number(indexSettings[".fastcatx_dict"].settings.index.creation_date));
    // timeString = creation_date.getFullYear() + "." + (creation_date.getMonth() + 1) + "." + creation_date.getDate() + " " + creation_date.getHours() + ":" + creation_date.getMinutes() + ":" + creation_date.getSeconds();

    // var tableInfo = [];
    // for(var i in settings){
    //     for(var j in infoDict){
    //         if(settings[i].id == infoDict[j].type){
    //             var info = settings[i];
    //             info.count = infoDict[j].count;
    //             info.words = infoDict[j].words;
    //             info.indexCount = infoDict[j].indexCount;
    //             tableInfo.push(info);
    //             break;
    //         }
    //     }
    // }
    
    // return tableInfo.map((info) => { return  <TableRow>
    //     <TableCell><Checkbox /></TableCell>
    //     <TableCell>{info.name}</TableCell>
    //     <TableCell>{info.type}</TableCell>
    //     <TableCell>{info.indexCount}</TableCell>
    //     <TableCell> {new Date(date.hits.hits[0]._source.appliedTime).toLocaleString()} </TableCell>
    //     <TableCell>{info.count}</TableCell>
    //     <TableCell> {new Date(date.hits.hits[0]._source.updatedTime).toLocaleString()} </TableCell>
    //     <TableCell> {info.tokenType} </TableCell>
    //     <TableCell> {info.ignoreCase ? "Y" : "N"} </TableCell>
    //     </TableRow> });
}


 function Summary({dispatch, summary}) {
     

    useEffect(() => {
        dispatch(setSummary())
        // dispatch(setSettings())
        // dispatch(setInfoDict())
        // dispatch(setDictionaryIndexSettings());
        // dispatch(setDictionaryIndexDate());
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
                                <SummaryTable summary={summary}/>
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
    // infoDict: store.dictionaryReducers.infoDict,
    // indexSettings :  store.dictionaryReducers.indexSettings,
    // date : store.dictionaryReducers.date
}))(Summary)