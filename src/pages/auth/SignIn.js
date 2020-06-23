import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import styled from "styled-components";

import Helmet from 'react-helmet';

import {
    Box,
    Button as MuiButton,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    Input,
    InputLabel,
    Paper,
    Typography
} from "@material-ui/core";
import {spacing} from "@material-ui/system";
import {setFastcatxAuthUser, setFastcatxServer, setFastcatxSignIn} from "../../redux/actions/fastcatxActions";
import {SET_FASTCATX_AUTH_USER, SET_FASTCATX_SERVER} from "../../redux/constants";

const Button = styled(MuiButton)(spacing);

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;

let authenticatedRoute = "/cluster"

function SignIn({dispatch}) {
    const [server, setServer] = useState("")
    const [serverError, setServerError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [inValid, setInValid] = useState(false)
    const [loginSave, setLoginSave] = useState(false)

    useEffect(() => {
        const fastcatxServer = localStorage.getItem(SET_FASTCATX_SERVER)
        const hash = JSON.parse(localStorage.getItem(SET_FASTCATX_AUTH_USER) || "{}")
        // 세선이 있을 경우
        dispatch(setFastcatxAuthUser())
            .then(response => {
                console.log("authenticated")
                sessionStorage.setItem(SET_FASTCATX_SERVER, localStorage.getItem(SET_FASTCATX_SERVER));
                location.replace(authenticatedRoute)
            })

        // 자동로그인 (로컬 스토리지 정보 로그인 시도)
        if (hash['hash1']) {
            console.log("auto login")
            setLoginSave(hash['hash1'])
            signInProcess(atob(atob(atob(hash['hash2']))), atob(atob(atob(hash['hash3']))), atob(atob(atob(hash['hash4']))))
        }

        // 마지막 서버 접속 정보
        if (fastcatxServer) {
            setServer(fastcatxServer)
        }
    }, [])

    function checkServer() {
        if (server.length === 0) {
            setServerError(true)
            return
        }
        let checkServer = server
        if (!server.startsWith("http")) {
            checkServer = "http://" + server
        }
        dispatch(setFastcatxServer(checkServer))
            .then(response => {
                response ? setServerError(false) : setServerError(true)
            })
            .catch(error => setServerError(true))
    }

    function handleSignIn() {
        // 자동로그인 (로컬 스토리지 정보 삭제)
        localStorage.removeItem(SET_FASTCATX_AUTH_USER)
        if (email.length === 0 || password.length === 0) {
            setInValid(true)
            return
        }
        setInValid(false)
        signInProcess(server, email, password)
    }

    function signInProcess(server, email, password) {
        sessionStorage.setItem(SET_FASTCATX_SERVER, localStorage.getItem(SET_FASTCATX_SERVER));
        dispatch(setFastcatxSignIn({server, email, password}))
            .then(response => {
                console.log("sign in success")
                setInValid(false)
                if (loginSave) {
                    // 자동로그인 (로컬 스토리지 추가)
                    localStorage.setItem(SET_FASTCATX_AUTH_USER, JSON.stringify({
                        hash1: loginSave,
                        hash2: btoa(btoa(btoa(server))),
                        hash3: btoa(btoa(btoa(email))),
                        hash4: btoa(btoa(btoa(password)))
                    }))
                }
                location.replace(authenticatedRoute)
            })
            .catch(err => {
                setInValid(true);
                console.log(err)
            })
    }

    return (
        <Wrapper>
            <Helmet title="로그인"/>

            <Typography component="h1" variant="h4" align="center" gutterBottom>
                로그인
            </Typography>
            {/*<Typography component="h2" variant="body1" align="center">*/}
            {/*    Sign in to your account to continue*/}
            {/*</Typography>*/}
            <form>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="server">서버</InputLabel>
                    <Input id="server"
                           name="server"
                           autoComplete="server"
                           autoFocus
                           value={server}
                           onChange={event => setServer(event.target.value)}
                           onBlur={checkServer}
                           error={serverError}
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="server">이메일</InputLabel>
                    <Input id="email"
                           name="email"
                           autoComplete="email"
                           value={email}
                           onChange={event => setEmail(event.target.value)}
                           error={inValid}
                           onKeyUp={event => event.keyCode === 13 ? handleSignIn() : null}
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">비밀번호</InputLabel>
                    <Input
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        error={inValid}
                        onKeyUp={event => event.keyCode === 13 ? handleSignIn() : null}
                    />
                </FormControl>
                <FormControlLabel
                    control={<Checkbox color="primary"
                                       checked={loginSave}
                                       onChange={() => setLoginSave(!loginSave)}
                    />}
                    label="로그인 저장"
                />
                <Grid container>
                    <Grid item xs={12}>
                        <Box>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                mb={2}
                                onClick={handleSignIn}
                            >
                                로그인
                            </Button>
                        </Box>
                    </Grid>
                    {/*<Grid item xs={6}>*/}
                    {/*    <Button*/}
                    {/*        fullWidth*/}
                    {/*        variant="contained"*/}
                    {/*        color="primary"*/}
                    {/*        mb={2}*/}
                    {/*        onClick={handleSignIn}*/}
                    {/*    >*/}
                    {/*        로그인*/}
                    {/*    </Button>*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={6}>*/}
                    {/*    <Button*/}
                    {/*        fullWidth*/}
                    {/*        color="primary"*/}
                    {/*    >*/}
                    {/*        취소*/}
                    {/*    </Button>*/}
                    {/*</Grid>*/}
                </Grid>
            </form>
        </Wrapper>
    );
}

export default connect(store => ({...store.fastcatxReducers}))(SignIn);
