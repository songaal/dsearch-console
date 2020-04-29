import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

import Helmet from 'react-helmet';

import {
    Button as MuiButton,
    Checkbox,
    FormControl,
    FormControlLabel,
    Input,
    InputLabel,
    Paper,
    Typography,
    Grid
} from "@material-ui/core";
import {spacing} from "@material-ui/system";

const Button = styled(MuiButton)(spacing);

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;

function SignIn() {
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
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="server">아이디</InputLabel>
                    <Input id="id"
                           name="id"
                           autoComplete="id"
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">비밀번호</InputLabel>
                    <Input
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                </FormControl>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="로그인 저장"
                />
                <Grid container>
                    <Grid item xs={6}>
                        <Button
                            component={Link}
                            to="/"
                            fullWidth
                            variant="contained"
                            color="primary"
                            mb={2}
                        >
                            로그인
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            component={Link}
                            to="/"
                            fullWidth
                            color="primary"
                        >
                            취소
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Wrapper>
    );
}

export default SignIn;
