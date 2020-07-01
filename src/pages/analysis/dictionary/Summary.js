import React from "react";
import {
    Box,
    Card,
    CardContent,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Checkbox
} from "@material-ui/core";

export default function () {
    return (
        <React.Fragment>

            <br/>

            <Card>
                <CardContent>
                    <Box>
                        <Button variant={"contained"} color={"primary"}>사전적용</Button>
                    </Box>
                    <Box>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>이름</TableCell>
                                    <TableCell>타업</TableCell>
                                    <TableCell>작업단어갯수</TableCell>
                                    <TableCell>수정시간</TableCell>
                                    <TableCell>적용단어갯수</TableCell>
                                    <TableCell>적용시간</TableCell>
                                    <TableCell>토큰타입</TableCell>
                                    <TableCell>대소문자무시</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell><Checkbox /></TableCell>
                                    <TableCell>기초사전</TableCell>
                                    <TableCell>SYSTEM</TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>NONE</TableCell>
                                    <TableCell>Y</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Checkbox /></TableCell>
                                    <TableCell>사용자사전</TableCell>
                                    <TableCell>SYSTEM</TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>NONE</TableCell>
                                    <TableCell>Y</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Checkbox /></TableCell>
                                    <TableCell>유사어사전</TableCell>
                                    <TableCell>SYSTEM</TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>NONE</TableCell>
                                    <TableCell>Y</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Checkbox /></TableCell>
                                    <TableCell>불용어사전</TableCell>
                                    <TableCell>SYSTEM</TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>NONE</TableCell>
                                    <TableCell>Y</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Checkbox /></TableCell>
                                    <TableCell>복합명사사전</TableCell>
                                    <TableCell>SYSTEM</TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>NONE</TableCell>
                                    <TableCell>Y</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Checkbox /></TableCell>
                                    <TableCell>단위명사전</TableCell>
                                    <TableCell>SYSTEM</TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>NONE</TableCell>
                                    <TableCell>Y</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Checkbox /></TableCell>
                                    <TableCell>단위명동의어사전</TableCell>
                                    <TableCell>SYSTEM</TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>NONE</TableCell>
                                    <TableCell>Y</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Checkbox /></TableCell>
                                    <TableCell>제조사명사전</TableCell>
                                    <TableCell>SYSTEM</TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>NONE</TableCell>
                                    <TableCell>Y</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Checkbox /></TableCell>
                                    <TableCell>브랜드명사전</TableCell>
                                    <TableCell>SYSTEM</TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>NONE</TableCell>
                                    <TableCell>Y</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Checkbox /></TableCell>
                                    <TableCell>카테고리키워드사전</TableCell>
                                    <TableCell>SYSTEM</TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>NONE</TableCell>
                                    <TableCell>Y</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Checkbox /></TableCell>
                                    <TableCell>영단어사전</TableCell>
                                    <TableCell>SYSTEM</TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>581454</TableCell>
                                    <TableCell> - </TableCell>
                                    <TableCell>NONE</TableCell>
                                    <TableCell>Y</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}