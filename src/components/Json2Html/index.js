import React from "react";
import {
    Box,
    Button,
    Card as MuiCard,
    CardContent,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField, 
    Typography as MuiTypography
} from "@material-ui/core";
import flat from "flat";
import styled from "styled-components";
import {positions, spacing} from "@material-ui/system";

import {addCommentsAction, setIndexTemplateCommentsAction} from "../../redux/actions/indexTemplateActions";

const Card = styled(MuiCard)(spacing);
const Typography = styled(MuiTypography)(spacing, positions);

function SettingsJson2html(settings) {
    if (!settings) {
        return null
    }

    const flatSettingsMap = flat(settings['settings'] ? settings['settings'] : settings)
    return (
        <React.Fragment>
            <Card>
                <CardContent>
                    <Typography variant={"h5"} mt={5}>
                        주요항목
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>샤드 갯수</TableCell>
                                <TableCell>레플리카 갯수</TableCell>
                                <TableCell>리프레쉬 간격</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{(((settings['settings']||{})['index']||{})['number_of_shards']|| '-')}</TableCell>
                                <TableCell>{(((settings['settings']||{})['index']||{})['number_of_replicas']|| '-')}</TableCell>
                                <TableCell>{(((settings['defaults']||{})['index']||{})['refresh_interval']|| '-')}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <br/>
            <Card>
                <CardContent>
                    <Typography variant={"h5"} mt={5}>
                        기타항목
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>키</TableCell>
                                <TableCell>값</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                Object.keys(flatSettingsMap||{}).map(key => {
                                    return (
                                        <TableRow key={key}>
                                            <TableCell>{key}</TableCell>
                                            <TableCell>{flatSettingsMap[key]||''}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

function MappingsJson2html(json, name, comments, dispatch, mode, detail) {
    
    let comment = {};
    if(comments && comments.length > 0){
        comments.forEach((item) => {
            let map = item.sourceAsMap;
            if(map["name"] == name){
                comment.id = item.id;
                comment.comments = item.sourceAsMap.comments;
                comment.name = item.sourceAsMap.name;
            }
        })
    }else{
        comment.name = name;
    }

    let topFields = []
    if(mode === 'view' && !detail){
        topFields = [
            {title: "타입", key: "type", component: (val) => {return val}},
            {title: "색인", key: "enabled", component: (val) => {
                if (val !== undefined && val !== null && val === false) {
                    return (
                        <React.Fragment>
                            <Checkbox style={{cursor: "default"}} checked={false} />
                        </React.Fragment>
                    )
                } else {
                    return (
                        <React.Fragment>
                            <Checkbox style={{cursor: "default"}} checked={true}/>
                        </React.Fragment>
                    )
                }
            }},
            {title: "분석기", key: "analyzer", component: (val) => {return val}},
        ]
    }else{
        topFields = [
            {title: "타입", key: "type", component: (val) => {return val}},
            {title: "색인", key: "enabled", component: (val) => {
                if (val !== undefined && val !== null && val === false) {
                    return (
                        <React.Fragment>
                            <Checkbox style={{cursor: "default"}} checked={false} />
                        </React.Fragment>
                    )
                } else {
                    return (
                        <React.Fragment>
                            <Checkbox style={{cursor: "default"}} checked={true}/>
                        </React.Fragment>
                    )
                }
            }},
            {title: "분석기", key: "analyzer", component: (val) => {return val}},
            {title: "copy_to", key: "copy_to", component: (val) => {return val}},
            {title: "ignore_above", key: "ignore_above", component: (val) => {return val}},
            {title: "null_value", key: "null_value", component: (val) => {return val}},
            {title: "doc_values", key: "doc_values", component: (val) => {return val}},
            {title: "similarity", key: "similarity", component: (val) => {return val||""}},
            {title: "term_vector", key: "term_vector", component: (val) => {return val}},
            {title: "store", key: "store", component: (val) => {
                    if (val !== undefined && val !== null && val === false) {
                        return (
                            <React.Fragment>
                                <Checkbox style={{cursor: "default"}} checked={false} />
                            </React.Fragment>
                        )
                    } else {
                        return (
                            <React.Fragment>
                                <Checkbox style={{cursor: "default"}} checked={true}/>
                            </React.Fragment>
                        )
                    }
            }}
        ]
    }

    const flatJsonMap = flat(json['properties'] ? json['properties'] : json)

    let formatKeyFlatJsonMap = {}
    Object.keys(flatJsonMap).forEach(key => {
        const replaceKey = key.replace(/\.properties/gi, "")

        const sortKey = replaceKey.substring(0, replaceKey.lastIndexOf("."))
        const suffix = replaceKey.substring(replaceKey.lastIndexOf(".") + 1)
        if (!formatKeyFlatJsonMap[sortKey]) {
            formatKeyFlatJsonMap[sortKey] = {}
        }
        
        // copy_to 표시가 되지 않아 추가.
        if(sortKey.substring(sortKey.lastIndexOf(".") + 1) == "copy_to"){
            const sortKey2 = replaceKey.substring(0, sortKey.lastIndexOf("."))
            if(formatKeyFlatJsonMap[sortKey2] != undefined && formatKeyFlatJsonMap[sortKey2] != null){
                //리스트 형태일때는 copy_to.0 copy_to.1  이 형식으로 붙음
                let content = formatKeyFlatJsonMap[sortKey2]["copy_to"];
                if(content != null && content != undefined){
                    formatKeyFlatJsonMap[sortKey2]["copy_to"] = content.substring(0, content.length-2) +  ", " + flatJsonMap[key] 
                }else{
                    formatKeyFlatJsonMap[sortKey2]["copy_to"] = flatJsonMap[key] 
                }
            }else{
                formatKeyFlatJsonMap[sortKey2] = { "copy_to": flatJsonMap[key] }
            }
        }else{
            if(suffix == "copy_to"){
                let content = formatKeyFlatJsonMap[sortKey]["copy_to"];
                if(content != null && content != undefined){
                    formatKeyFlatJsonMap[sortKey]["copy_to"] = content.substring(0, content.length-2) +  ", " + flatJsonMap[key] 
                }else{
                    formatKeyFlatJsonMap[sortKey]["copy_to"] = flatJsonMap[key] 
                }
            }else{
                formatKeyFlatJsonMap[sortKey][suffix] = flatJsonMap[key]
            }
        }
    })

    return (
        <table border={1} width={"100%"} cellSpacing={0} cellPadding={8}>
            <thead>
            <tr>
                <th>#</th>
                <th>이름</th>
                {
                    topFields.map(field => <th key={field['title']}>{field['title']}</th>)
                }
                <th>기타설정</th>
                <th >설명</th>
            </tr>
            </thead>
            <tbody>
            {
                Object.keys(formatKeyFlatJsonMap)
                    .filter(key => !key.endsWith(".copy_to"))
                    .map((key, index) => {
                    const obj = formatKeyFlatJsonMap[key]

                    const etc = Object.keys(obj).map(k => {
                        const o = topFields.find(m => m['key'] === k)
                        return o ? null : k + ": " + obj[k]
                    }).filter(o => o)

                    let mappingName = key.replace(/\.fields/gi, "");
                    if(mappingName.includes("s-prod-v")){
                        mappingName = "s-prod-v";
                    }

                    return (
                        <tr key={index}>
                            <td align={"center"}>{index + 1}</td>
                            <td>{key.replace(/\.fields/gi, "")}</td>
                            {
                                topFields.map(field => <td key={field['title']} align={"center"}>{field['component'](obj[field['key']])}</td>)
                            }
                            <td>
                                {etc.join(", ")}
                            </td>
                            <td>
                                {
                                mode === 'view' ? 
                                    mappingName.includes(".") ? <></> 
                                        :
                                            comment.comments === undefined || comment.comments === null ? 
                                            <></> :
                                            <Box width="100%">
                                                {comment.comments[mappingName]}
                                            </Box> 
                                : <></> 
                                }
                                
                                {
                                    mode === 'edit' ?  
                                        mappingName.includes(".") ? <></> :
                                            comment.comments === undefined || comment.comments === null  ? 
                                                <TextField 
                                                    fullWidth
                                                    onKeyPress={(e) => {
                                                            if(comment.comments == undefined){
                                                                comment.comments = {};
                                                            }

                                                            let n = mappingName + "";
                                                            comment.comments[n] = e.target.value;
                                                            dispatch(addCommentsAction({"id": null, "name": name, "updatedComment": comment}))
                                                                .then((res) => {
                                                                    dispatch(setIndexTemplateCommentsAction())
                                                                }).catch((err) => { 
                                                                    console.log(err) 
                                                                });
                                                    }}
                                                    onBlur={(e) => {
                                                        if(comment.comments == undefined){
                                                            comment.comments = {};
                                                        }
                                                        let n = mappingName + "";
                                                        comment.comments[n] = e.target.value;
                                                        dispatch(addCommentsAction({"id": null, "name": name, "updatedComment": comment}))
                                                            .then((res) => {
                                                                dispatch(setIndexTemplateCommentsAction())
                                                            }).catch((err) => { 
                                                                console.log(err) 
                                                            });
                                                    }}
                                                    key={mappingName}
                                                    defaultValue={""} /> 

                                                :
                                                <TextField 
                                                    fullWidth
                                                    onKeyPress={
                                                        (e) => {
                                                                if(comment.comments == undefined){
                                                                    comment.comments = {};
                                                                }

                                                                let n = mappingName + "";
                                                                comment.comments[n] = e.target.value;
                                                                dispatch(addCommentsAction({"id": comment.id, "name": name, "updatedComment": comment}))
                                                                    .then((res) => {
                                                                        dispatch(setIndexTemplateCommentsAction())
                                                                    }).catch((err) => { 
                                                                        console.log(err) 
                                                                    });
                                                        }
                                                    }
                                                    onBlur={(e) => {
                                                        if(comment.comments == undefined){
                                                            comment.comments = {};
                                                        }
                                                        let n = mappingName + "";
                                                        comment.comments[n] = e.target.value;
                                                        dispatch(addCommentsAction({"id": null, "name": name, "updatedComment": comment}))
                                                            .then((res) => {
                                                                dispatch(setIndexTemplateCommentsAction())
                                                            }).catch((err) => { 
                                                                console.log(err) 
                                                            });
                                                    }}
                                                    key={mappingName}
                                                    defaultValue={comment.comments[mappingName]} /> 
                                    : <></>
                                }
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

function Render({json, type, name, comments, dispatch, mode, detail}) {
    let validJson = json
    try {
        if (typeof json === 'string') {
            validJson = JSON.parse(json)
        }
    } catch (error) {
        // console.warn("parsing error", typeof json)
    }

    if (validJson && type === "mappings") {
        return MappingsJson2html(validJson, name, comments, dispatch, mode, detail)
    } else if (validJson && type === "settings") {
        return SettingsJson2html(validJson)
    } else {
        return (
            <React.Fragment>
                <Box style={{minHeight: "150px"}}>
                </Box>
            </React.Fragment>
        )
    }

}

export default Render
