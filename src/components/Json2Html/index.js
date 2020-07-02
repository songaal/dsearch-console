import React from "react";
import {Box} from "@material-ui/core";


function Json2html(json) {
    const entries = Object.entries(json)
    return (
        <table border={1} width={"100%"} cellSpacing={0} cellPadding={8}>
            <thead>
            <tr>
                <th>#</th>
                <th>이름</th>
                <th style={{width: "50px"}}>타입</th>
                <th>속성</th>
            </tr>
            </thead>
            <tbody>
            {
                entries.map((entry, index) => {
                    const name = entry[0];
                    const value = entry[1];
                    const type = entry[1]['type'] === undefined
                    && Object.keys(entry[1]).length === 1
                    && entry[1]['properties'] !== undefined ?
                        'object' : entry[1]['type'];

                    let etc = null
                    if (typeof value === 'object') {
                        etc = Object.entries(value)
                            .filter(v => v[0] !== 'type')
                            .map(v => JSON.stringify(v[0]) + ': ' + JSON.stringify(v[1] + " "))
                            .join(<br/>)
                    } else {
                        etc = value
                    }

                    if (type === 'object' || type === 'nested') {
                        return (
                            <React.Fragment key={name}>
                                <tr>
                                    <td align={"center"}>{index}</td>
                                    <td>
                                        {name}
                                    </td>
                                    <td style={{width: "50px"}}>{type}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td colSpan={3}>
                                        {Json2html(value)}
                                    </td>
                                </tr>
                            </React.Fragment>
                        )
                    } else {
                        return (
                            <tr key={name}>
                                <td align={"center"}>{index}</td>
                                <td>{name}</td>
                                <td style={{width: "50px"}}>{type}</td>
                                <td>{etc}</td>
                            </tr>
                        )
                    }
                })
            }
            </tbody>
        </table>
    )
}

function Render(json) {
    let validJson = null
    try {
        if (typeof json === 'string') {
            validJson = JSON.parse(json)
        }
        return Json2html(validJson)
    } catch (error) {
        console.error("parsing error", typeof json, json)
        return (<Box> JSON 형식이 잘못되었습니다. {JSON.stringify(error)}</Box>)
    }
}

export default Render
