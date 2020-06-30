import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {Box, Button} from "@material-ui/core";

function QueryTest({authUser}) {
    const history = useHistory()

    let kibana = (authUser['cluster'] || {})['kibana']
    if (kibana && kibana !== "") {
        if(!kibana.startsWith("http")) {
            kibana = "http://" + kibana
        }
        open(kibana, '_blank', "menubar=no,addressbar=no,statusbar=no")
        history.go(-1)
        return null
    } else {
        return (
            <React.Fragment>
                <Box align={"center"}>
                    <p>
                        등록되어 있는 키바나 주소가 없습니다. <br />
                        <Button variant={"text"} color={"primary"}
                                onClick={() => history.push("/cluster")}
                        >클러스터 관리 이동하기</Button>
                    </p>
                </Box>

            </React.Fragment>
        )
    }
}

export default connect(store => ({...store.fastcatxReducers}))(QueryTest);
