import React from "react";
import {connect} from "react-redux";
import {
    Box,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from "@material-ui/core";

// import {spacing} from "@material-ui/system";
import {flatten} from "flat";

// const useStyles = makeStyles((theme) => ({}));


function Statistics({index, indexState}) {
    if (!index || indexState['indices'] === undefined) {
        return null
    }

    const flatMap = flatten(((indexState['indices']||{})[index]||{})['total']||{})
    let group = {}
    Object.keys(flatMap).forEach(fullKey => {
        const fieldKey = fullKey.substring(0, fullKey.indexOf("."))
        if (group[fieldKey] === undefined) {
            group[fieldKey] = []
        }
        group[fieldKey].push({key: fullKey, value: String(flatMap[fullKey])})
    })
    console.log(group)
    return (
        <React.Fragment>
            <Box>
                {
                    Object.keys(group).map(key => {
                        return (
                            <React.Fragment key={key}>
                                <br/>
                                <Typography variant={"h5"} mt={5}>
                                    {key.toUpperCase()}
                                </Typography>
                                <br />
                                <Card my={5}>
                                    <CardContent>
                                        <Table>
                                            <TableBody>
                                                {
                                                    group[key].map(obj => {
                                                        return (
                                                            <TableRow key={obj['key']}>
                                                                <TableCell style={{width: "50%"}}>{obj['key']}</TableCell>
                                                                <TableCell style={{width: "50%"}}>{obj['value']}</TableCell>
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
                    })
                }
            </Box>
        </React.Fragment>
    );
}

export default connect(store => ({...store.indicesReducers}))(Statistics);
