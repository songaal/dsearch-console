import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {Box as MuiBox, Button, Card as MuiCard, CardContent, Grid, Typography} from "@material-ui/core";

import {spacing} from "@material-ui/system";
import {Cached} from "@material-ui/icons";
import {setClusterSettingsAction} from "../../../redux/actions/clusterSettingsActions";
import Loader from "~/components/Loader";

const Card = styled(MuiCard)(spacing);
const Box = styled(MuiBox)(spacing);

function Transient({dispatch, transient}) {
    const [data, setData] = useState({})

    useEffect(() => {
        dispatch(setClusterSettingsAction())
    }, [])

    useEffect(() => {
        let settings = {}
        Object.keys(transient).forEach(key => {
            const prefixKey = key.substring(0, key.indexOf(".") - 1)
            if (settings[prefixKey] === undefined) {
                settings[prefixKey] = []
            }
            if (transient[prefixKey] && typeof transient[prefixKey] === "object" && transient[prefixKey].length > 0) {
                settings[prefixKey].push({key: key, value: (transient[key] || []).join("\n")})
            } else {
                settings[prefixKey].push({key: key, value: transient[key] || ""})
            }
        })
        setData(settings)
    }, [transient])

    function refresh() {
        setData({})
        dispatch(setClusterSettingsAction())
    }

    return (
        <React.Fragment>
            <Box align={"right"} mt={2}>
                <Button variant={"outlined"}
                        color={"primary"}
                        size={"small"}
                        onClick={refresh}
                ><Cached/> 설정 리로드</Button>
            </Box>
            {
                Object.keys(data).map((key, index) => {
                    return (
                        <Box key={index} my={3}>
                            <Typography variant={"h5"}>
                                {key.toUpperCase()}
                            </Typography>
                            <Card>
                                <CardContent>
                                    <Grid container spacing={6}>
                                        {
                                            data[key].map(setting => {
                                                return (
                                                    <Grid key={setting['key']} item xs={12} sm={6} md={4} lg={3}>
                                                        <Box align={"center"}>
                                                            <Box style={{fontSize: "0.9em"}}>
                                                                {setting['key']}
                                                            </Box>
                                                            <Box mt={2}>
                                                                {setting['value']}
                                                            </Box>
                                                        </Box>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Box>
                    )
                })
            }
        </React.Fragment>
    );
}

export default connect(store => ({...store.clusterSettingsReducers}))(Transient);
