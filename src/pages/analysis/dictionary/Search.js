import React, {useEffect, useRef, useState} from "react";
import {Box, Card, CardContent, IconButton, InputBase, Typography} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {searchDictionaries, setSettings} from "../../../redux/actions/dictionaryActions";

const useStyles = makeStyles((theme) => ({
    formControl: { minWidth: 150 },
    select: { minWidth: 80 },
    form: { padding: '2px 4px', display: 'flex', alignItems: 'center', width: 500 },
    input: { marginLeft: theme.spacing(1), flex: 1, borderBottom: "1px solid gray", '&:hover': { borderBottom: "2px solid black" } },
    iconButton: {padding: 5,},
    divider: { height: 28, margin: 4,},
    right: { textAlign: "right"}
}));


function SearchResultList({settings, searchResult}){

    return (
        <> 
            {/* 사용자 사전 */}
            {settings.map((setting, idx) => {
                let flag = true;
                let str = "";
                
                for(let i in searchResult.result){
                    if(setting.id === searchResult.result[i].type){
                        if(flag) {
                            if(searchResult.result[i].keyword){
                                if(searchResult.result[i].value){
                                    str = searchResult.result[i].keyword + ", " + searchResult.result[i].value; 
                                }else{
                                    str = searchResult.result[i].keyword; 
                                }
                            }else{
                                str = searchResult.result[i].value; 
                            }
                            flag = false; 
                        } else {
                            str += ", " + searchResult.result[i].value
                        }
                    }
                }
                return flag ? <React.Fragment key={idx}></React.Fragment> : <li id={idx} key={idx}> {setting.name} {" : "} {str}</li>;
            })}
        </>
    );
}


function DictionarySearch ({dispatch, settings, searchResult}) {
    const classes = useStyles()

    useEffect(() => {
        dispatch(setSettings())
        searchResult.result = []
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps
    
    const [showSearchInput, setShowSearchInput] = useState("")
    const searchInput = useRef("");

    // console.log("result", searchResult);
    const handleEnterPress = (event) => {
        if (event.key === 'Enter'){
            if(searchInput.current.value.length === 0) return;
            searchResult.result = [ {type: "SYSTEM", posTag: "N", prob: "0"} ];
            let json = { word:searchInput.current.value };
            dispatch(searchDictionaries(JSON.stringify(json)))
            setShowSearchInput(searchInput.current.value);
        }
    }

    const handleSearchIcon = (event) => {
        if(searchInput.current.value.length === 0) return;
        searchResult.result = [ {type: "SYSTEM", posTag: "N", prob: "0"} ];
        // dispatch(searchDictionaries({word: searchInput.current.value}))
        let json = { word:searchInput.current.value };
        dispatch(searchDictionaries(JSON.stringify(json)))
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
                            {searchResult.result.length === 0 ? <li> 현재 입력된 내용이 없습니다. </li> : searchResult.result.map((item) => {
                                if("SYSTEM" === item.type) return <li key={item.type}> {item.posTag} {" : "} {item.prob} </li>;
                                return <></>;
                            })}

                            {searchResult.result.length === 0? <React.Fragment key={99999}></React.Fragment> : <SearchResultList settings={settings} searchResult={searchResult} />}
                        </ul>
                    </Box>
                </CardContent>
            </Card>


        </React.Fragment>
    )
}

export default connect(store => ({ 
    settings: store.dictionaryReducers.settings,
    searchResult: store.dictionaryReducers.searchResult
}))(DictionarySearch)