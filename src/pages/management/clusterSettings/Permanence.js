import React from "react";
import styled from "styled-components";

import {Box as MuiBox, Button, Card as MuiCard, CardContent, Grid, TextField, Typography} from "@material-ui/core";

import {spacing} from "@material-ui/system";
import {Cached} from "@material-ui/icons";

const Card = styled(MuiCard)(spacing);
const Box = styled(MuiBox)(spacing);

function Permanence() {
    return (
        <React.Fragment>

            <Box align={"right"} mt={2}>
                <Button variant={"outlined"} color={"primary"} size={"small"}><Cached /> 설정 리로드</Button>
            </Box>

            <Box my={3}>
                <Typography variant={"h5"}>
                    THREAD_POOL
                </Typography>
                <Card>
                    <CardContent>
                        <Grid container spacing={6}>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <Box align={"center"}>
                                    <Box style={{fontSize: "0.9em"}}>
                                        thread_pool.fetch_shard_started_core
                                    </Box>
                                    <Box>
                                        <TextField value={"1"} fullWidth disabled/>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <Box align={"center"}>
                                    <Box style={{fontSize: "0.9em"}}>
                                        thread_pool.fetch_shard_started.keep_alive
                                    </Box>
                                    <Box>
                                        <TextField value={"false"} fullWidth disabled/>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <Box align={"center"}>
                                    <Box style={{fontSize: "0.9em"}}>
                                        thread_pool.analyze.queue_size
                                    </Box>
                                    <Box>
                                        <TextField value={"16"} fullWidth disabled/>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <Box align={"center"}>
                                    <Box style={{fontSize: "0.9em"}}>
                                        thread_pool.analyze.queue_size
                                    </Box>
                                    <Box>
                                        <TextField value={"8"} fullWidth disabled/>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>

            <Box my={3}>
                <Typography variant={"h5"}>
                    SEARCH
                </Typography>
                <Card>
                    <CardContent>
                        <Grid container spacing={6}>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <Box align={"center"}>
                                    <Box style={{fontSize: "0.9em"}}>
                                        search.max_buckets
                                    </Box>
                                    <Box>
                                        <TextField value={"20000"} fullWidth disabled/>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <Box align={"center"}>
                                    <Box style={{fontSize: "0.9em"}}>
                                        search.default_search_timeout
                                    </Box>
                                    <Box>
                                        <TextField value={"50000"} fullWidth disabled/>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </React.Fragment>
    );
}

export default Permanence;
