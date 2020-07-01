import React from "react";
import styled from "styled-components";
import {NavLink as RouterNavLink} from "react-router-dom";

import {
    Box as MuiBox,
    Button,
    Card as MuiCard,
    CardContent,
    Grid,
    TextareaAutosize,
    TextField,
    Typography
} from "@material-ui/core";

import {spacing} from "@material-ui/system";
import {Cached} from "@material-ui/icons";

const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);
const Box = styled(MuiBox)(spacing);

function Temporary() {
    return (
        <React.Fragment>

            <Box align={"right"} mt={2}>
                <Button variant={"outlined"} color={"primary"} size={"small"}><Cached /> 설정 리로드</Button>
            </Box>

            <Box my={3}>
                <Typography variant={"h5"}>
                    DISCOVERY
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
                                        <TextareaAutosize rowsMax={2} value={"1\n1231\n23"} fullWidth disabled/>
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

        </React.Fragment>
    );
}

export default Temporary;
