import React, {useState, useEffect, useRef} from "react";
import {Box, Card, CardContent, IconButton, InputBase,  Typography} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import { connect } from "react-redux";
import {setSettings, searchDictionaries} from "../../../redux/actions/dictionaryActions";

const useStyles = makeStyles((theme) => ({
    formControl: { minWidth: 150 },
    select: { minWidth: 80 },
    form: { padding: '2px 4px', display: 'flex', alignItems: 'center', width: 500 },
    input: { marginLeft: theme.spacing(1), flex: 1, borderBottom: "1px solid gray", '&:hover': { borderBottom: "2px solid black" } },
    iconButton: {padding: 5,},
    divider: { height: 28, margin: 4,},
    right: { textAlign: "right"}
}));

const DictionaryIndex = ".fastcatx_dict";

function SearchResultList({settings, result}){
    return (
        <> 
            {/* 사용자 사전 */}
            {settings.map((setting, idx) => {
                var flag = true;
                var str = "";
                
                for(var i in result.result){
                    if(setting.id == result.result[i].type){
                        if(flag) {
                            str = result.result[i].value; 
                            flag = false; 
                        } else {
                            str += ", " + result.result[i].value
                        }
                    }
                }
                if(flag) console.log(setting.name + " : " + str);
                return flag ? <></> : <li id={idx} key={idx}> {setting.name} {" : "} {str}</li>;
            })}
        </>
    );
}


function DictionarySearch ({dispatch, settings, result}) {
    const classes = useStyles()

    useEffect(() => {
        dispatch(setSettings())
    }, [])

    console.log(settings);
    console.log(result);
    const [showSearchInput, setShowSearchInput] = useState("")
    const searchInput = useRef("");

    const handleEnterPress = (event) => {
        if (event.key === 'Enter'){
            if(searchInput.current.value.length === 0) return;
            result = [];
            dispatch(searchDictionaries({index: DictionaryIndex , word:searchInput.current.value}))
            setShowSearchInput(searchInput.current.value);
        }
    }
    const handleSearchIcon = (event) => {
        if(searchInput.current.value.length === 0) return;
        result = [];
        dispatch(searchDictionaries({index: DictionaryIndex , word:searchInput.current.value}))
        setShowSearchInput(searchInput.current.value);
    }

    return (
        <React.Fragment>
            <br/>
            <Card>
                <CardContent>
                    <Box>
                        <InputBase
                            inputRef={searchInput}
                            className={classes.input}
                            placeholder="검색"
                            onKeyPress={handleEnterPress}
                        />
                        <IconButton type="submit"
                                    className={classes.iconButton}
                                    aria-label="search"
                                    onClick={handleSearchIcon}
                        >
                            <Search />
                        </IconButton>
                    </Box>
                    <br/>
                    <Box>
                        <Typography variant="h4">
                            {showSearchInput === "" ? "현재 입력된 내용이 없습니다." : showSearchInput}
                        </Typography>
                        
                        <ul>
                            {/* 기초 사전 */}
                            {result.result.length === 0 ? <li> N : 0 </li> : result.result.map((item) => {
                                if("SYSTEM" == item.type) return <li key={item.type}> {item.posTag} {" : "} {item.prob} </li>;
                                return <></>;
                            })}

                            {result.result.length === 0? <></> : <SearchResultList settings={settings} result={result} />}
                        </ul>
                    </Box>
                </CardContent>
            </Card>


        </React.Fragment>
    )
}

export default connect(store => ({ 
    settings: store.dictionaryReducers.settings,
    result: store.dictionaryReducers.searchResult
}))(DictionarySearch)