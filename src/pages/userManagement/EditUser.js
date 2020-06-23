import React, {useState} from "react";
import {connect} from 'react-redux';
import styled from "styled-components";
import Helmet from 'react-helmet';
import {spacing} from "@material-ui/system";
import {
    Box,
    Button,
    Card as MuiCard,
    CardContent,
    Checkbox,
    Divider as MuiDivider,
    FormControlLabel,
    Grid as MuiGrid,
    TextField,
    Typography,
} from "@material-ui/core";
import {editUserPassword} from "../../redux/actions/fastcatxActions";

const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Grid = styled(MuiGrid)(spacing);

function EditUser({dispatch, authUser}) {
    const [ password, setPassword ] = useState("")
    const [ updatePassword, setUpdatePassword ] = useState("")
    const [ updatePasswordConfirm, setUpdatePasswordConfirm ] = useState("")
    const [ inValid, setInValid] = useState(false)
    const user = authUser['user']||{}
    const role = authUser['role']||{}

    function handleChangePassword() {
        if (updatePassword !== updatePasswordConfirm) {
            setInValid(true)
            return
        }
        dispatch(editUserPassword(user['id'], {
            password, updatePassword, updatePasswordConfirm
        })).then(() => {
            setPassword("")
            setUpdatePassword("")
            setUpdatePasswordConfirm("")
            alert("비밀번호가 변경되었습니다.")
        }).catch(err => {
            console.log(err)
            alert("입력 정보가 잘못되었습니다.")
        })
    }

    return (
        <React.Fragment>

            <Helmet title="정보수정"/>

            <Typography variant="h3" gutterBottom display="inline">
                정보수정
            </Typography>

            <Divider my={6}/>

            <Card>
                <CardContent>
                    <Grid container mt={8}>
                        <Grid item xs={3}>
                            <Box mt={2} align={"center"}>
                                이메일
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box mt={1}>
                                <TextField value={user['email'] || ''} disabled fullWidth/>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container mt={8}>
                        <Grid item xs={3}>
                            <Box mt={2} align={"center"}>
                                이름
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box mt={1}>
                                <TextField value={user['username'] || ''} disabled fullWidth/>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container mt={8}>
                        <Grid item xs={3}>
                            <Box mt={2} align={"center"}>
                                역할
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box mt={1}>
                                <TextField value={role['name'] || ''} disabled fullWidth/>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container mt={8}>
                        <Grid item xs={3}>
                            <Box mt={2} align={"center"}>
                                권한
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box mt={0}>
                                <FormControlLabel control={<Checkbox checked={role['analysis']||false}/>}
                                                  label="분석"
                                />
                                <FormControlLabel control={<Checkbox checked={role['index']||false}/>}
                                                  label="인덱스"
                                />
                                <FormControlLabel control={<Checkbox checked={role['search']||false}/>}
                                                  label="검색"
                                />
                                <FormControlLabel control={<Checkbox checked={role['manage']||false}/>}
                                                  label="관리"
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider mt={10}/>

                    <Grid container mt={10}>
                        <Grid item xs={3}>
                            <Box mt={2} align={"center"}>
                                현재 비밀번호
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box mt={1}>
                                <TextField fullWidth
                                           type={"password"}
                                           value={password}
                                           onChange={event => setPassword(event.target.value)}
                                           autoFocus
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container mt={8}>
                        <Grid item xs={3}>
                            <Box mt={2} align={"center"}>
                                비밀번호 변경
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box mt={1}>
                                <TextField fullWidth
                                           type={"password"}
                                           value={updatePassword}
                                           onChange={event => setUpdatePassword(event.target.value)}
                                           error={inValid}
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container mt={8}>
                        <Grid item xs={3}>
                            <Box mt={2} align={"center"}>
                                비밀번호 변경 확인
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box mt={1}>
                                <TextField fullWidth
                                           type={"password"}
                                           value={updatePasswordConfirm}
                                           onChange={event => setUpdatePasswordConfirm(event.target.value)}
                                           error={inValid}
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    <Box align={"right"} mt={10}>
                        <Button variant={"contained"}
                                color={"secondary"}
                                onClick={handleChangePassword}
                        >비밀번호 변경</Button>
                    </Box>

                </CardContent>
            </Card>

        </React.Fragment>
    );
}

export default connect(store => ({...store.fastcatxReducers}))(EditUser);
