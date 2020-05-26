import React from "react";
import {
    Card,
    CardContent,
    Grid,
    IconButton,
    InputBase,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({}));

function IndexedDataPanel() {
    const classes = useStyles()
    return (
        <>
            <br/>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={6}>
                            <form noValidate autoComplete="off" className={classes.form}>
                                <InputBase
                                    className={classes.input}
                                    placeholder="ID"
                                />
                                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                    <Search/>
                                </IconButton>
                            </form>
                        </Grid>
                        <Grid item xs={6}>
                        </Grid>
                    </Grid>

                    <TableContainer>
                        <Table size={"small"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>아이디</TableCell>
                                    <TableCell>값</TableCell>
                                    <TableCell>분석결과</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/*<TableCell scope="row"> {row.val1} </TableCell>*/}
                                {/*<TableCell> {row.val2} </TableCell>*/}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </>
    )
}

export default IndexedDataPanel