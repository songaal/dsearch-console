import React from "react";
import {Box, Card, CardContent, Checkbox, IconButton, InputBase, TextField, Typography} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formControl: { minWidth: 150 },
    select: { minWidth: 80 },
    form: { padding: '2px 4px', display: 'flex', alignItems: 'center', width: 500 },
    input: { marginLeft: theme.spacing(1), flex: 1, borderBottom: "1px solid gray", '&:hover': { borderBottom: "2px solid black" } },
    iconButton: {padding: 5,},
    divider: { height: 28, margin: 4,},
    right: { textAlign: "right"}
}));


export default function () {
    const classes = useStyles()

    return (
        <React.Fragment>
            <br/>
            <Card>
                <CardContent>
                    <Box>
                        <InputBase
                            className={classes.input}
                            placeholder="검색"
                        />
                        <IconButton type="submit"
                                    className={classes.iconButton}
                                    aria-label="search"
                        >
                            <Search/>
                        </IconButton>
                    </Box>
                    <br/>
                    <Box>
                        <Typography variant="h5">
                            노트북
                        </Typography>
                        <ul>
                            <li>N[-5.0]</li>
                            <li>사용자사전: FOUND</li>
                            <li>유사어사전: notebook, laptop, 랩탑, 노트북용</li>
                            <li>카테고리키워드사전: FOUND</li>
                        </ul>
                    </Box>
                </CardContent>
            </Card>


        </React.Fragment>
    )
}