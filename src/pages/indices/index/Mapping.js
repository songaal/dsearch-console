import React from "react";
import {connect} from "react-redux"
import styled from "styled-components";
import Json2html from "~/components/Json2Html"

import {
    Box as MuiBox,
    Card as MuiCard,
    CardContent,
    FormControl,
    FormControlLabel,Checkbox,
    Radio,
    RadioGroup,
    TextareaAutosize
} from "@material-ui/core";

import {makeStyles} from '@material-ui/core/styles';
import {positions, spacing} from "@material-ui/system";

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
    },
    addIcon: {
        verticalAlign: "top"
    },
    table: {
        padding: '10px'
    },
}));

const Box = styled(MuiBox)(spacing, positions);
const Card = styled(MuiCard)(spacing);

// const fieldsKeyword = "fields."
// const propertiesKeyword = "properties."
// function parsing(object) {
//     let group1 = {}
//     Object.keys(object).forEach(fullKey => {
//         function getKey(fullKey) {
//             const fieldKey = fullKey.substring(0, fullKey.indexOf("."))
//             const childFullKey = fullKey.substring(fieldKey.length + 1)
//             let tmpGroupKey = ""
//             let tmpKey = ""
//             if (childFullKey.startsWith(fieldsKeyword)) {
//                 // fields.
//                 let childFieldKey1 = childFullKey.substring(fieldsKeyword.length)
//                 childFieldKey1 = childFieldKey1.substring(0, childFieldKey1.indexOf("."))
//                 if (!group1[`${fieldKey}.${childFieldKey1}`]) {
//                     group1[`${fieldKey}.${childFieldKey1}`] = {}
//                 }
//                 let childFieldKey2 = childFullKey.substring(fieldsKeyword.length + childFieldKey1.length + 1)
//                 tmpGroupKey = `${fieldKey}.${childFieldKey1}`
//                 tmpKey = childFieldKey2
//             } else if (childFullKey.startsWith(propertiesKeyword)) {
//                 // properties.
//                 let childFieldKey1 = childFullKey.substring(propertiesKeyword.length)
//                 childFieldKey1 = childFieldKey1.substring(0, childFieldKey1.indexOf("."))
//                 if (!group1[`${fieldKey}.${childFieldKey1}`]) {
//                     group1[`${fieldKey}.${childFieldKey1}`] = {}
//                 }
//                 let childFieldKey2 = childFullKey.substring(propertiesKeyword.length + childFieldKey1.length + 1)
//                 tmpGroupKey = `${fieldKey}.${childFieldKey1}`
//                 tmpKey = childFieldKey2
//             } else {
//                 if (!group1[fieldKey]) {
//                     group1[fieldKey] = {}
//                 }
//                 tmpGroupKey = fieldKey
//                 tmpKey = childFullKey
//             }
//             return { tmpGroupKey, tmpKey }
//         }
//
//         let result = getKey(fullKey)
//         if (
//             ["type", "enabled", "analyzer", "copy_to.0",
//                 "ignore_above", "null_value", "doc_value",
//                 "similarity", "term_vector", "store"
//             ].includes(result['tmpKey'])) {
//             group1[result['tmpGroupKey']][result['tmpKey']] = object[fullKey]
//         } else {
//             let tmpKey = "" + result['tmpKey']
//             let tmpGroupKey = "" + result['tmpGroupKey']
//             while (true) {
//                 if (tmpKey.startsWith("fields")) {
//                     let tmpResult = getKey(tmpKey.substring(fieldsKeyword.length))
//                     console.log(tmpGroupKey + "." + tmpResult['tmpGroupKey'])
//                     if (group1[result['tmpGroupKey'] + "." + tmpGroupKey + "." + tmpResult['tmpGroupKey']] === undefined) {
//                         group1[result['tmpGroupKey'] + "." + tmpGroupKey + "." + tmpResult['tmpGroupKey']] = {}
//                     }
//                     group1[result['tmpGroupKey'] + "." + tmpGroupKey + "." + tmpResult['tmpGroupKey']][tmpResult['tmpKey']] = object[fullKey]
//                     tmpKey = "" + tmpResult['tmpKey']
//                     tmpGroupKey = "" + tmpResult['tmpGroupKey']
//                 } else if (tmpKey.startsWith("properties")) {
//                     let tmpResult = getKey(tmpKey.substring(propertiesKeyword.length))
//                     if (group1[result['tmpGroupKey'] + "." + tmpGroupKey + "." + tmpResult['tmpGroupKey']] === undefined) {
//                         group1[result['tmpGroupKey'] + "." + tmpGroupKey + "." + tmpResult['tmpGroupKey']] = {}
//                     }
//                     group1[result['tmpGroupKey'] + "." + tmpGroupKey + "." + tmpResult['tmpGroupKey']][tmpResult['tmpKey']] = object[fullKey]
//                     tmpKey = "" + tmpResult['tmpKey']
//                     tmpGroupKey = "" + tmpResult['tmpGroupKey']
//                 } else {
//                     break
//                 }
//             }
//         }
//     })
//     return group1
// }


function FormCard({json, detail}) {
    // let dataMap = {}
    // const flatMap = flatten(testJson['properties'] ? testJson['properties'] : testJson)
    // if (json) {
    //     dataMap = parsing(flatten(json['properties'] ? json['properties'] : json))
    // }
    // console.log(json, typeof json)

    return (
        <div>
            <Card>
                <CardContent m={2}>
                    <Box style={{ overflow: "auto", minWidth: "700px" }}>
                        {Json2html({ json: JSON.stringify(json), type: "mappings", mode: "view", detail: detail })}
                    </Box>


                    {/*<Box style={{overflow: "auto"}}>*/}
                    {/*    <table cellPadding="0" cellSpacing="0"*/}
                    {/*           style={{width: "100%", textAlign: "center", whiteSpace: "nowrap"}}>*/}
                    {/*        <thead>*/}
                    {/*        <tr>*/}
                    {/*            <th style={{height: "50px", width: "50px", border: "1px solid silver"}}>#</th>*/}
                    {/*            <th style={{border: "1px solid silver"}}>이름</th>*/}
                    {/*            <th style={{border: "1px solid silver"}}>타입</th>*/}
                    {/*            <th style={{border: "1px solid silver"}}>색인</th>*/}
                    {/*            <th style={{border: "1px solid silver"}}>분석기</th>*/}
                    {/*            <th style={{border: "1px solid silver"}}>copy_to</th>*/}
                    {/*            <th style={{border: "1px solid silver"}}>ignore_above</th>*/}
                    {/*            <th style={{border: "1px solid silver"}}>null_value</th>*/}
                    {/*            <th style={{border: "1px solid silver"}}>doc_values</th>*/}
                    {/*            <th style={{border: "1px solid silver"}}>similarity</th>*/}
                    {/*            <th style={{border: "1px solid silver"}}>term_vector</th>*/}
                    {/*            <th style={{border: "1px solid silver"}}>저장</th>*/}
                    {/*            <th style={{border: "1px solid silver"}}>기타</th>*/}
                    {/*        </tr>*/}
                    {/*        </thead>*/}
                    {/*        <tbody>*/}
                    {/*        {*/}
                    {/*            Object.keys(dataMap).map((key, index) => {*/}
                    {/*                let tmpObject = dataMap[key]*/}
                    {/*                const type = tmpObject['type'] || ""*/}
                    {/*                const enabled = tmpObject['enabled'] === undefined ? true : tmpObject['enabled']*/}
                    {/*                const analyzer = tmpObject['analyzer'] || type === "text" ? "standard" : ""*/}
                    {/*                const copyTo = tmpObject['copy_to.0'] || ""*/}
                    {/*                const ignoreAbove = tmpObject['ignore_above'] || ""*/}
                    {/*                const nullValue = tmpObject['null_value'] || ""*/}
                    {/*                const docValue = tmpObject['doc_value'] === undefined ? true : tmpObject['doc_value']*/}
                    {/*                const similarity = tmpObject['similarity'] || "BM25"*/}
                    {/*                const termVector = tmpObject['term_vector'] || ""*/}
                    {/*                const store = tmpObject['store'] === undefined ? true : tmpObject['store']*/}
                    {/*                const etc = tmpObject['etc'] || ""*/}

                    {/*                return (*/}
                    {/*                    <tr key={index}>*/}
                    {/*                        <td style={{border: "1px solid silver"}}>{index + 1}</td>*/}
                    {/*                        <td style={{border: "1px solid silver"}}>{key}</td>*/}
                    {/*                        <td style={{border: "1px solid silver"}}>{type}</td>*/}
                    {/*                        <td style={{border: "1px solid silver"}}><Checkbox*/}
                    {/*                            style={{cursor: "default"}} checked={enabled}/></td>*/}
                    {/*                        <td style={{border: "1px solid silver"}}>{analyzer}</td>*/}
                    {/*                        <td style={{border: "1px solid silver"}}>{copyTo}</td>*/}
                    {/*                        <td style={{border: "1px solid silver"}}>{ignoreAbove}</td>*/}
                    {/*                        <td style={{border: "1px solid silver"}}>{nullValue}</td>*/}
                    {/*                        <td style={{border: "1px solid silver"}}>{docValue}</td>*/}
                    {/*                        <td style={{border: "1px solid silver"}}>{similarity}</td>*/}
                    {/*                        <td style={{border: "1px solid silver"}}>{termVector}</td>*/}
                    {/*                        <td style={{border: "1px solid silver"}}><Checkbox*/}
                    {/*                            style={{cursor: "default"}} checked={store}/></td>*/}
                    {/*                        <td style={{border: "1px solid silver"}}>{etc}</td>*/}
                    {/*                    </tr>*/}
                    {/*                )*/}
                    {/*            })*/}
                    {/*        }*/}
                    {/*        </tbody>*/}
                    {/*    </table>*/}
                    {/*</Box>*/}
                </CardContent>
            </Card>
        </div>
    )
}

function JsonCard({json}) {
    const classes = useStyles();

    return (<div>
        <Card>
            <CardContent>
                <Box>
                    <TextareaAutosize rowsMin={50}
                                      className={classes.edit}
                                      disabled
                                      value={JSON.stringify(json, null, 4)}
                    />
                </Box>
            </CardContent>
        </Card>
    </div>)
}

function Mapping({mappings}) {
    const [chk, setChk] = React.useState('form');
    const [detail, setDetail] = React.useState(false);

    function handleRadioChange(e) {
        setChk(e.target.value)
    }

    return (
        <React.Fragment>

            <FormControl component="fieldset" style={{marginTop: "20px"}}>
                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                    <FormControlLabel value="form" checked={chk === "form"} onChange={handleRadioChange}
                                      control={<Radio color="primary"/>} label="폼"/>
                    <FormControlLabel value="json" checked={chk === "json"} onChange={handleRadioChange}
                                      control={<Radio color="primary"/>} label="json"/>
                </RadioGroup>

                <FormControlLabel value="상세보기"
                        onChange={(e) => { setDetail(e.target.checked) }}
                        checked={detail}
                        control={<Checkbox color="primary" />}
                        label="상세보기" />
            </FormControl>

            <Box mt={0}>
                {
                    chk === "form" ?
                        <FormCard json={mappings} detail={detail}/>
                        :
                        <JsonCard json={mappings}/>
                }
            </Box>

        </React.Fragment>
    );
}

export default connect(store => ({...store.indicesReducers}))(Mapping);
