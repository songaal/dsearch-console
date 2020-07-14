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
            {settings.map((setting) => {
                var flag = true;
                var str = "Not Found";
                for(var i in result.result){
                    if(setting.id == result.result[i].type){
                        if(result.result[i].keyword === undefined) continue;

                        if(flag) {
                            str = result.result[i].keyword; 
                            flag = false; 
                        } else {
                            str += ", " + result.result[i].keyword
                        }
                    }
                }
                return <li key={setting.id}> {setting.name} {" : "} {str}</li>;
            })}
        </>
    );
}


function DictionarySearch ({dispatch, settings, result}) {
    const classes = useStyles()

    useEffect(() => {
        dispatch(setSettings())
    }, [])

    const [showSearchInput, setShowSearchInput] = useState("")
    const searchInput = useRef("");

    const handleEnterPress = (event) => {
        if (event.key === 'Enter'){
            dispatch(searchDictionaries({index: DictionaryIndex , word:searchInput.current.value}))
            setShowSearchInput(searchInput.current.value);
        }
    }
    const handleSearchIcon = (event) => {
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
                            {result.result.map((item) => {
                                if("SYSTEM" == item.type) return <li key={item.type}> {item.posTag} {" : "} {item.prob} </li>;
                                return <></>;
                            })}

                            <SearchResultList settings={settings} result={result} />
                        </ul>
                        {/* <ul>
                            <li>N[-5.0]</li>
                            <li>사용자사전: FOUND</li>
                            <li>유사어사전: notebook, laptop, 랩탑, 노트북용</li>
                            <li>카테고리키워드사전: FOUND</li>
                        </ul> */}
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