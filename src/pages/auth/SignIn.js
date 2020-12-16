import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom"
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
import {setDsearchAuthUser, setDsearchServer, setDsearchSignIn} from "../../redux/actions/dsearchActions";
import {SET_DSEARCH_AUTH_USER, SET_DSEARCH_SERVER} from "../../redux/constants";

const Button = styled(MuiButton)(spacing);

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;

let authenticatedRoute = "/cluster"

function SignIn({dispatch}) {
    const history = useHistory()
    const [server, setServer] = useState("")
    const [serverError, setServerError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [inValid, setInValid] = useState(false)
    const [loginSave, setLoginSave] = useState(false)

    useEffect(() => {
        const dsearchServer = localStorage.getItem(SET_DSEARCH_SERVER)
        const hash = JSON.parse(localStorage.getItem(SET_DSEARCH_AUTH_USER) || "{}")
        // 서버의 세션 유무 체크.
        try {
            dispatch(setDsearchAuthUser())
                .then(response => {
                    console.log("authenticated")
                    sessionStorage.setItem(SET_DSEARCH_SERVER, localStorage.getItem(SET_DSEARCH_SERVER));
                    // location.replace(authenticatedRoute)
                    history.replace(authenticatedRoute)
                })

            // 자동로그인 (로컬 스토리지 정보 로그인 시도)
            if (hash['hash1']) {
                console.log("auto login")
                setLoginSave(hash['hash1'])
                signInProcess(atob(atob(atob(hash['hash2']))), atob(atob(atob(hash['hash3']))), atob(atob(atob(hash['hash4']))))
            }

            // 마지막 서버 접속 정보
            if (dsearchServer) {
                setServer(dsearchServer)
            }
        } catch(error) {
            console.error(error)
            sessionStorage.removeItem(SET_DSEARCH_SERVER);
            localStorage.removeItem(SET_DSEARCH_SERVER)
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
        dispatch(setDsearchServer(checkServer))
            .then(response => {
                response ? setServerError(false) : setServerError(true)
            })
            .catch(error => setServerError(true))
    }

    function handleSignIn() {
        // 자동로그인 (로컬 스토리지 정보 삭제)
        localStorage.removeItem(SET_DSEARCH_AUTH_USER)
        if (email.length === 0 || password.length === 0) {
            setInValid(true)
            return
        }
        setInValid(false)
        signInProcess(server, email, password)
    }

    function signInProcess(server, email, password) {
        if (!server.startsWith("https://") && !server.startsWith("http://")) {
            server = "http://" + server
        }
        sessionStorage.setItem(SET_DSEARCH_SERVER, server);
        dispatch(setDsearchSignIn({server, email, password}))
            .then(response => {
                console.log("sign in success")
                setInValid(false)
                if (loginSave) {
                    // 자동로그인 (로컬 스토리지 추가)
                    localStorage.setItem(SET_DSEARCH_AUTH_USER, JSON.stringify({
                        hash1: loginSave,
                        hash2: btoa(btoa(btoa(server))),
                        hash3: btoa(btoa(btoa(email))),
                        hash4: btoa(btoa(btoa(password)))
                    }))
                }
                history.location.replace(authenticatedRoute)
            })
            .catch(err => {
                setInValid(true);
                console.log(err)
            })
    }

    return (
        <React.Fragment>
            <Wrapper>
                <Helmet title="로그인"/>
                <Box align={"center"}>
                    <img alt="dsearch" src={"/static/img/dsearch/danawa_m_login.png"} />
                </Box>
                <Box style={{marginTop: "12px"}}>
                    <Typography style={{fontSize: "1.45rem"}} component="h1" variant="h4" align="center" gutterBottom>
                        로그인
                    </Typography>
                </Box>
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

                <Box style={{position: "relative", top: "60px", height: "0px", textAlign: "center", fontSize: "0.8em"}}>
                    © 2020. danawa Co., Ltd. All Rights Reserved.
                </Box>
            </Wrapper>
        </React.Fragment>
    );
}

export default connect(store => ({...store.dsearchReducers}))(SignIn);
