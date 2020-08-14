import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import styled, {withTheme} from "styled-components";
import {darken} from "polished";
import {Autocomplete } from '@material-ui/lab';

import {
    AppBar as MuiAppBar,
    ButtonBase,
    Grid,
    Hidden,
    IconButton as MuiIconButton,
    InputBase,
    Menu,
    MenuItem,
    Toolbar,
    TextField
} from "@material-ui/core";

import {ArrowDropDown, Menu as MenuIcon} from "@material-ui/icons";

import {Home, Search as SearchIcon} from "react-feather";
import {setReferenceResultAll, setReferenceSearchKeyword} from "../redux/actions/referenceSearchActions";
import { setFastcatxSignOut } from "../redux/actions/fastcatxActions";
import { setAutoCompleteAction, setAutoCompleteStoreAction, getAutoCompleteURLAction } from "../redux/actions/dsearchPluginActions";

import {SET_FASTCATX_AUTH_USER} from "../redux/constants";
import {setClusterList} from "../redux/actions/clusterActions";
import { textAlign, maxHeight, height, width } from "@material-ui/system";

const AppBar = styled(MuiAppBar)`
  background: ${props => props.theme.header.background};
  color: ${props => props.theme.header.color};
  box-shadow: ${props => props.theme.shadows[1]};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Search = styled.div`
  border-radius: 2px;
  background-color: ${props => props.theme.header.background};
  display: none;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${props => darken(0.05, props.theme.header.background)};
  }

  ${props => props.theme.breakpoints.up("md")} {
    display: block;
  }
`;

const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${props => props.theme.header.search.color};
    padding-top: ${props => props.theme.spacing(2.5)}px;
    padding-right: ${props => props.theme.spacing(2.5)}px;
    padding-bottom: ${props => props.theme.spacing(2.5)}px;
    padding-left: ${props => props.theme.spacing(12)}px;
  }
`;

const Button = styled(ButtonBase)`
  color: ${props => props.theme.header.search.color};
  padding-left: ${props => props.theme.spacing(2)}px;
  padding-right: ${props => props.theme.spacing(2)}px;
`


function ClusterMenu() {
    const dispatch = useDispatch()
    const authUser = useSelector(store => store.fastcatxReducers)['authUser']
    const clusterStore = useSelector(store => store.clusterReducers)
    const [clusterListMenu, setClusterListMenu] = useState(null);

    useEffect(() => {
        dispatch(setClusterList())
    }, [])

    function toggleMenu(event) {
        setClusterListMenu(event.currentTarget)
    }
    function closeMenu() {
        setClusterListMenu(null)
    }

    function changeCluster(clusterId) {
        closeMenu()
        if (authUser['cluster']['id'] === clusterId) {
            return false
        }
        // eslint-disable-next-line no-restricted-globals
        location.href = `/${clusterId }/dashboard`
    }

    const open = Boolean(clusterListMenu);
    return (
        <React.Fragment>
            <Button aria-owns={open ? "menu-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={toggleMenu}
                    variant={"outlined"}
            >
                {authUser['cluster']['name']}
                <ArrowDropDown/>
            </Button>
            <Menu
                anchorEl={clusterListMenu}
                open={open}
                onClose={closeMenu}
            >
                {
                    (clusterStore['clusterList']||[]).map(cluster => {
                        return (
                            <MenuItem key={cluster['cluster']['id']}
                                      onClick={() => changeCluster(cluster['cluster']['id'])}
                            >
                                {cluster['cluster']['name']}
                            </MenuItem>
                        )
                    })
                }
            </Menu>
        </React.Fragment>
    )
}

function UserMenu({ signOutClose = false }) {
    const dispatch = useDispatch()
    const authUser = useSelector(store => store.fastcatxReducers.authUser)
    const [anchorMenu, setAnchorMenu] = useState(null)
    const open = Boolean(anchorMenu);

    function toggleMenu(event) {
        setAnchorMenu(event.currentTarget)
    }

    function closeMenu() {
        setAnchorMenu(null)
    }

    function signOut() {
        localStorage.removeItem(SET_FASTCATX_AUTH_USER)
        dispatch(setFastcatxSignOut()).then(response => {
            if (signOutClose) {
                try {
                    // eslint-disable-next-line no-restricted-globals
                    opener.location.href="/"
                } catch(error) {
                    // ignore
                }
                window.close()
            }
        }).catch(error => {
            console.error('error', error)
            if (signOutClose) {
                try {
                    // eslint-disable-next-line no-restricted-globals
                    opener.location.href="/"
                } catch(error) {
                    // ignore
                }
                window.close()
            }
        })
    }

    return (
        <React.Fragment>
            <Button aria-owns={open ? "menu-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={toggleMenu}
                    variant={"outlined"}
            >
                {/*{(authUser['userManagement'] || {})['username']}*/}
                {(authUser['user'] || {})['email']}
                <ArrowDropDown/>
            </Button>

            <Menu
                id="menu-appbar"
                anchorEl={anchorMenu}
                open={open}
                onClose={closeMenu}
            >
                <MenuItem
                    component={Link}
                    to={"/my"}
                >
                    정보수정
                </MenuItem>
                <MenuItem
                    component={Link}
                    onClick={signOut}
                    to={"/"}
                >
                    로그아웃
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}


const MainHeader = ({theme, onDrawerToggle}) => (
    <React.Fragment>
        <AppBar position="sticky" elevation={0}>
            <Toolbar>
                <Grid container alignItems="center">
                    <Hidden mdUp>
                        <Grid item>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={onDrawerToggle}
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Grid>
                    </Hidden>
                    <Grid item/>
                    <Grid item xs/>

                    <Grid item>
                        {/*<ClusterMenu theme={theme}/>*/}
                        <UserMenu theme={theme}/>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    </React.Fragment>)


const options = ['Option 1', 'Option 2'];

const DashBoardHeader = ({theme, onDrawerToggle}) => {
    const references = useSelector(store => ({...store.referenceSearchReducers}))
    const authUserStore = useSelector(store => ({...store.fastcatxReducers}))['authUser']
    const autoCompleteUrl = useSelector(store => ({...store.dsearchPluginReducers}))['autoCompleteUrl']
    
    const [keyword, setKeyword] = useState(references.keyword)
    const [itemList, setItemList] = useState([])
    const [inputCache, setInputCache] = useState({});
    // eslint-disable-next-line no-restricted-globals
    const qs = new URLSearchParams(location.search)
    const dispatch = useDispatch()
    const history = useHistory()

    
    function handleCache(k, val){
        setItemList(val);
        let cache = {};
        cache[k] = val;
        Object.keys(inputCache).forEach(key =>{
            cache[key] = inputCache[key];
        })
        setInputCache(cache);
    }

    function handleSearch() {
        dispatch(setReferenceSearchKeyword(keyword))
        dispatch(setReferenceResultAll(keyword))
        dispatch(setAutoCompleteStoreAction(keyword))
        history.push(`/${authUserStore['cluster']['id']}/search`)
    }

    function handleKeyEvent(event, val) {
        if (event.keyCode === 13) {
            handleSearch()
        }
    }

    function handleKeyword(event, val) {
        let value = event.target.value;
        if(value === 0){
            setKeyword(val);
        }else{
            setKeyword(value);
        }
        
        if (event.keyCode === 13) {
            handleSearch()
        }else{
            if (value.length > 0 && (inputCache[value] === undefined || inputCache[value] === null)) {
                /* 비동기 방식으로 보냄 */
                // 등록된 url로 !

                    dispatch(setAutoCompleteAction(value)).then((data) => {
                        let payload = data.data;
                        if(payload.q !== undefined && payload.result !== undefined && payload.q !== null && payload.result !== null) {
                            handleCache(payload.q, payload.result)
                        }
                    }).catch(err => { console.log(err) });
            }else if(value.length > 0){
                setItemList(inputCache[value])
            }
        }
    }

    if (qs.get("keyword") !== null && qs.get("keyword") !== keyword) {
        setKeyword(qs.get("keyword"))
        handleSearch()
    }
    return (
        <React.Fragment>
            <AppBar position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container alignItems="center">
                        <Hidden mdUp>
                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    aria-label="Open drawer"
                                    onClick={onDrawerToggle}
                                >
                                    <MenuIcon/>
                                </IconButton>
                            </Grid>
                        </Hidden>

                        <Grid item xs>

                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon/>
                                </SearchIconWrapper>

                                <Autocomplete 
                                    onChange={handleKeyword}
                                    options={itemList}
                                    renderInput={(params) => (
                                        <div ref={params.InputProps.ref}>
                                            <Input 
                                                {...params.inputProps} 
                                                style={{ width: "100%" }} 
                                                placeholder="검색 (Enter 입력)" 
                                                value={keyword} 
                                                onChange={handleKeyword} 
                                                onKeyUp={handleKeyEvent}
                                            />
                                        </div>
                                    )}
                                />
                            </Search>
                        </Grid>

                        <Grid item xs={1}/>

                        <Grid item>
                            <IconButton color="inherit"
                                        onClick={() => {
                                            try {
                                                // eslint-disable-next-line no-restricted-globals
                                                if (opener.document === document) {
                                                    history.push("/cluster")
                                                    return
                                                }
                                                const link = document.createElement('a');
                                                link.href = "/cluster"
                                                // eslint-disable-next-line no-restricted-globals
                                                opener.document.body.appendChild(link);
                                                link.click()
                                                window.close()
                                            } catch (error) {
                                                history.push("/cluster")
                                            }
                                        } }>
                                <Home/>
                            </IconButton>
                            <ClusterMenu theme={theme}/>
                            <UserMenu theme={theme} signOutClose={true}/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}


const Header = ({theme, layout, onDrawerToggle}) => {
    return layout === "main" ?
        <MainHeader theme={theme} onDrawerToggle={onDrawerToggle}/>
        :
        <DashBoardHeader theme={theme} onDrawerToggle={onDrawerToggle}/>
}

export default connect()(withTheme(Header));
