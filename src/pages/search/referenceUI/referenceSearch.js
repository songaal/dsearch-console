import React, { useState, createContext } from "react"
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
    List as MuiList,
    ListItem as MuiListItem,
} from "@material-ui/core";
import * as Icons from "@material-ui/icons";
import * as FeatherIcons from "react-feather";
import * as Color from '@material-ui/core/colors';

import { makeStyles } from "@material-ui/styles";
import {borders, display, palette, sizing, spacing} from "@material-ui/system";

import Alert from '@material-ui/lab/Alert';
import AntTabs from "~/components/AntTabs"
import LazyLoadImage from "~/components/LazyLoadImage"

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
const List = styled(MuiList)(spacing, palette, sizing, display, borders);
const ListItem = styled(MuiListItem)(spacing, palette, sizing, display, borders);

const useStyles = makeStyles(theme => ({

}));



function SearchPanel(result) {
    return (
        <React.Fragment>

            <Grid container>
                <Grid item xs={12} md={8} lg={9}>

                    <List p={0} pt={4}>


                        {
                            result.map((data, index) => {
                                return (
                                    <ListItem key={index} py={2}>
                                        <Card style={{width: "100%"}}>
                                            <CardContent>
                                                <Box style={{width: "100%"}}>
                                                    <Grid container>
                                                        <Grid item xs={4}>
                                                            <Box align={"center"} style={{width: "100%", minWidth: '100%'}} py={2} px={5}>
                                                                <LazyLoadImage image={{src: "http://img.danawa.com/prod_img/500000/109/392/img/9392109_1.jpg?shrink=160:160&_v=20190919103443" + index,
                                                                    width: "100%",
                                                                    maxWidth: "130px",
                                                                }}
                                                                />
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            <Box style={{width: '100%'}}>
                                                                <Box px={3} py={2} style={{backgroundColor: Color.blueGrey['200'], borderRadius: '5px'}}>
                                                                    <Typography variant="h5" mt={1}>
                                                                        청정원 논현동 포차 안주애 무뼈닭발
                                                                    </Typography>
                                                                </Box>
                                                                <Box px={4} pt={3}>
                                                                    <List>
                                                                        <ListItem p={1}>
                                                                            <Box component={"span"}>
                                                                                가격
                                                                            </Box>
                                                                            :
                                                                            <Box component={"span"} ml={2}>
                                                                                8000원
                                                                            </Box>
                                                                        </ListItem>
                                                                        <ListItem p={1}>
                                                                            <Box component={"span"}>
                                                                                상세
                                                                            </Box>
                                                                            :
                                                                            <Box component={"span"} ml={2}>
                                                                                닭발 | 양념육| 냉동보관
                                                                            </Box>
                                                                        </ListItem>
                                                                        <ListItem p={1}>
                                                                            <Box component={"span"}>
                                                                                상판매몰
                                                                            </Box>
                                                                            :
                                                                            <Box component={"span"} ml={2}>
                                                                                10개
                                                                            </Box>
                                                                        </ListItem>
                                                                    </List>
                                                                </Box>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </ListItem>
                                )
                            })
                        }

                    </List>
                </Grid>

                <Grid item xs={12} md={4} lg={3}>
                    <Card mt={4} pl={2} style={{backgroundColor: Color.blueGrey['100'], width: '100%'}}>
                        <CardContent>
                            <Box>
                                <Typography  variant="h5" mt={1}> 제조사 </Typography>
                                <List>
                                    <ListItem p={1}>
                                        <Box component={"span"}>
                                            - 사조대림
                                        </Box>
                                        <Box component={"span"} ml={2}>
                                            10
                                        </Box>
                                    </ListItem>
                                    <ListItem p={1}>
                                        <Box component={"span"}>
                                            - 냠냠식품
                                        </Box>
                                        <Box component={"span"} ml={2}>
                                            5
                                        </Box>
                                    </ListItem>
                                    <ListItem p={1}>
                                        <Box component={"span"}>
                                            - 바잇미
                                        </Box>
                                        <Box component={"span"} ml={2}>
                                            1
                                        </Box>
                                    </ListItem>
                                    <ListItem p={1}>
                                        <Box component={"span"}>
                                            - 힐링펫
                                        </Box>
                                        <Box component={"span"} ml={2}>
                                            1
                                        </Box>
                                    </ListItem>
                                </List>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card mt={4} pl={2} style={{backgroundColor: Color.blueGrey['100'], width: '100%'}}>
                        <CardContent>
                            <Box>
                                <Typography  variant="h5" mt={1}> 상품분류 </Typography>
                                <List>
                                    <ListItem p={1}>
                                        <Box component={"span"}>
                                            - 닭고기
                                        </Box>
                                        <Box component={"span"} ml={2}>
                                            10
                                        </Box>
                                    </ListItem>
                                </List>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Box align={"center"}>
                        <Button size={"large"} variant={"contained"} color={"primary"}>더보기</Button>
                    </Box>
                </Grid>
            </Grid>


        </React.Fragment>
    )
}

function ReferenceSearch() {
    const classes = useStyles()

    let params = []
    for (let i=0; i < 5; i++) {
        params.push(i)
    }

    const tabs = [
        {label: "기준상품", component: () => SearchPanel(params)},
        {label: "검색상품", component: () => SearchPanel(params)},
        {label: "커뮤니티", component: () => SearchPanel(params)},
        {label: "테스트",   component: () => SearchPanel(params)},
    ]


    function handleChange(index) {
        console.log(index)
    }

    return (
        <React.Fragment>
            <Helmet title="검색결과"/>

            <Grid container>
                <Grid item xs={10}>
                    <Typography variant="h3" gutterBottom display="inline">
                        레퍼런스 UI
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Box align={"right"}>
                        <Button color={"default"} variant={"contained"}>설정</Button>
                    </Box>
                </Grid>
            </Grid>

            <Divider my={6}/>

            <AntTabs tabs={tabs} tabIndex={0} onChange={handleChange} />


        </React.Fragment>
    )
}

export default ReferenceSearch;