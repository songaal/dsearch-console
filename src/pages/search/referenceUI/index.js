import React from "react";
import styled from "styled-components";
import Helmet from 'react-helmet';
import {
    Box as MuiBox,
    Button as MuiButton,
    Divider as MuiDivider,
    FormControl as MuiFormControl,
    Grid as MuiGrid,
    IconButton as MuiIconButton,
    TextareaAutosize as MuiTextareaAutosize,
    TextField as MuiTextField,
    Typography as MuiTypography,
    Card as MuiCard,
    CardContent as MuiCardContent,
    Hidden,
    List,
    ListItem,
} from "@material-ui/core";
import {

} from "@material-ui/icons";

import {
    ArrowUp as ArrowUpIcon,
    ArrowDown as ArrowDownIcon,
    PlusSquare as PlusSquareIcon,
    MinusSquare as MinusSquareIcon,
} from "react-feather";

import { makeStyles } from "@material-ui/styles";
import {borders, display, palette, sizing, spacing} from "@material-ui/system";
import * as Color from '@material-ui/core/colors';

const Box = styled(MuiBox)(spacing, palette, sizing, display, borders);
const Divider = styled(MuiDivider)(spacing, palette, sizing, display, borders);
const Grid = styled(MuiGrid)(spacing, palette, sizing, display, borders);
const Typography = styled(MuiTypography)(spacing, palette, sizing, display, borders);
const TextField = styled(MuiTextField)(spacing, palette, sizing, display, borders);
const IconButton = styled(MuiIconButton)(spacing, palette, sizing, display, borders);
const Button = styled(MuiButton)(spacing, palette, sizing, display, borders);
const TextareaAutosize = styled(MuiTextareaAutosize)(spacing, palette, sizing, display, borders);
const FormControl = styled(MuiFormControl)(spacing, palette, sizing, display, borders);
const Card = styled(MuiCard)(spacing, palette, sizing, display, borders);
const CardContent = styled(MuiCardContent)(spacing, palette, sizing, display, borders);


const useStyles = makeStyles(theme => ({
    warm: { backgroundColor: Color.yellow['500'] },
    textarea: {width: "100%", minHeight: "200px"}
}));

function ReferenceUI() {
    const classes = useStyles()

    return (
        <React.Fragment>
            <Helmet title="레퍼런스UI"/>
            <Typography variant="h3" gutterBottom display="inline">
                레퍼런스UI
            </Typography>

            <Divider my={6}/>
            <br/>
            <Card>
                <CardContent>

                    <Grid container my={5}>
                        <Grid item xs={3} md={2}>
                            <Box align={"center"} mt={2}>
                                <Typography variant={"h6"} display={"inline"}> 영역이름 </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={7} md={8} lg={9}>
                            <Box align={"left"}>
                                <TextField style={{width: "70%"}} />
                                <Box display={"inline"} ml={2}>
                                    <IconButton>
                                        <ArrowUpIcon />
                                    </IconButton>
                                    <IconButton>
                                        <ArrowDownIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={2} md={2} lg={1}>
                            <Box align={"center"}>
                                <Button className={classes.warm} variant={"contained"}>삭제</Button>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container my={5}>
                        <Grid item xs={3} md={2}>
                            <Box align={"center"}>
                                <Typography variant={"h6"} display={"inline"}> 검색쿼리 </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9} md={10}>
                            <Box align={"left"}>
                                <TextareaAutosize className={classes.textarea} placeholder={"query:{}"}/>
                            </Box>
                        </Grid>
                    </Grid>


                    <Grid container my={5}>
                        <Grid item xs={3} md={2}>
                            <Box align={"center"}>
                                <Typography variant={"h6"} display={"inline"}> 제목 </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9} md={10}>
                            <Box align={"left"}>
                                <TextField fullWidth />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container my={5}>
                        <Grid item xs={3} md={2}>
                            <Box align={"center"}>
                                <Typography variant={"h6"} display={"inline"}> 클릭URL </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9} md={10}>
                            <Box align={"left"}>
                                <TextField fullWidth />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container my={5}>
                        <Grid item xs={3} md={2}>
                            <Box align={"center"}>
                                <Typography variant={"h6"} display={"inline"}> 썸네일 </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9} md={10}>
                            <Box align={"left"}>
                                <TextField fullWidth />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container my={10}>
                        <Grid item xs={3} md={2}>
                            <Box align={"center"}>
                                <Typography variant={"h6"} display={"inline"}> 정보 </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9} md={10}>
                            <Grid container>
                                <Grid item xs={5}>
                                    <Box align={"center"}>
                                        <Typography variant={"h6"} display={"inline"}> 라벨명 </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={5}>
                                    <Box align={"center"}>
                                        <Typography variant={"h6"} display={"inline"}> 값 </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box align={"center"}> </Box>
                                </Grid>
                            </Grid>

                            {/* Item List */}
                            <List>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={5}>
                                            <Box px={1}>
                                                <TextField fullWidth />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Box px={1}>
                                                <TextField fullWidth />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Hidden lgUp>
                                                <IconButton size={"small"}>
                                                    <PlusSquareIcon />
                                                </IconButton>
                                                <IconButton size={"small"}>
                                                    <MinusSquareIcon />
                                                </IconButton>
                                            </Hidden>
                                            <Hidden mdDown>
                                                <IconButton >
                                                    <PlusSquareIcon />
                                                </IconButton>
                                                <IconButton>
                                                    <MinusSquareIcon />
                                                </IconButton>
                                            </Hidden>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </List>

                        </Grid>
                    </Grid>


                    <Grid container my={10}>
                        <Grid item xs={3} md={2}>
                            <Box align={"center"}>
                                <Typography variant={"h6"} display={"inline"}> 어그리게이션 </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9} md={10}>
                            <Grid container>
                                <Grid item xs={5}>
                                    <Box align={"center"}>
                                        <Typography variant={"h6"} display={"inline"}> 라벨명 </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={5}>
                                    <Box align={"center"}>
                                        <Typography variant={"h6"} display={"inline"}> 값 </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box align={"center"}> </Box>
                                </Grid>
                            </Grid>
                            {/* item list */}
                            <List>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={5}>
                                            <Box px={1}>
                                                <TextField fullWidth />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Box px={1}>
                                                <TextField fullWidth />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Box display={"inline"}>
                                                <Hidden lgUp>
                                                    <IconButton size={"small"}>
                                                        <PlusSquareIcon />
                                                    </IconButton>
                                                    <IconButton size={"small"}>
                                                        <MinusSquareIcon />
                                                    </IconButton>
                                                </Hidden>
                                                <Hidden mdDown>
                                                    <IconButton >
                                                        <PlusSquareIcon />
                                                    </IconButton>
                                                    <IconButton>
                                                        <MinusSquareIcon />
                                                    </IconButton>
                                                </Hidden>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </List>


                        </Grid>
                    </Grid>

                </CardContent>
            </Card>

            <Grid container>
                <Grid item xs={12}>
                    <Box align={"center"} mt={10}>
                        <Button variant={"contained"} color={"primary"}>영역 추가</Button>
                    </Box>
                </Grid>
            </Grid>

        </React.Fragment>
    );
}

export default ReferenceUI;
