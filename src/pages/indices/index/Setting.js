import React from "react";
import styled from "styled-components";

import {
    Box as MuiBox,
    Button as MuiButton,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextareaAutosize,
    Typography as MuiTypography,
    Table,
    TableBody,
    TableRow,
    TableCell, TableHead,
    Grid,
} from "@material-ui/core";

import {makeStyles} from '@material-ui/core/styles';
import {palette, positions, spacing} from "@material-ui/system";
import AddIcon from "@material-ui/icons/Add";
import Json2html from "~/components/Json2Html"

const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 250,
    },
    root: {
        flexGrow: 1,
        width: '100%',
        // backgroundColor: theme.palette.background.paper,
    },
    edit: {
        width: '100%'
    },
    addIcon: {
        verticalAlign: "top"
    },
    table: {
        padding: '10px'
    },
}));

const Divider = styled(MuiDivider)(spacing);
const Box = styled(MuiBox)(spacing, positions);
const Card = styled(MuiCard)(spacing);
const Typography = styled(MuiTypography)(spacing, positions);
const Button = styled(MuiButton)(spacing, positions, palette);


const json = {
    "settings": {
        "index": {
            "creation_date": "1593422489216",
            "number_of_shards": "1",
            "number_of_replicas": "0",
            "uuid": "lFkkkgDYQZWWLSg_k-hTFQ",
            "version": {
                "created": "7080099"
            },
            "provided_name": ".fastcatx_dict_setting"
        }
    },
    "defaults": {
        "index": {
            "flush_after_merge": "512mb",
            "final_pipeline": "_none",
            "max_inner_result_window": "100",
            "unassigned": {
                "node_left": {
                    "delayed_timeout": "1m"
                }
            },
            "max_terms_count": "65536",
            "force_memory_id_terms_dictionary": "false",
            "lifecycle": {
                "name": "",
                "parse_origination_date": "false",
                "indexing_complete": "false",
                "rollover_alias": "",
                "origination_date": "-1"
            },
            "routing_partition_size": "1",
            "force_memory_term_dictionary": "false",
            "max_docvalue_fields_search": "100",
            "merge": {
                "scheduler": {
                    "max_thread_count": "1",
                    "auto_throttle": "true",
                    "max_merge_count": "6"
                },
                "policy": {
                    "reclaim_deletes_weight": "2.0",
                    "floor_segment": "2mb",
                    "max_merge_at_once_explicit": "30",
                    "max_merge_at_once": "10",
                    "max_merged_segment": "5gb",
                    "expunge_deletes_allowed": "10.0",
                    "segments_per_tier": "10.0",
                    "deletes_pct_allowed": "33.0"
                }
            },
            "max_refresh_listeners": "1000",
            "max_regex_length": "1000",
            "load_fixed_bitset_filters_eagerly": "true",
            "number_of_routing_shards": "1",
            "write": {
                "wait_for_active_shards": "1"
            },
            "verified_before_close": "false",
            "mapping": {
                "coerce": "false",
                "nested_fields": {
                    "limit": "50"
                },
                "depth": {
                    "limit": "20"
                },
                "field_name_length": {
                    "limit": "9223372036854775807"
                },
                "total_fields": {
                    "limit": "1000"
                },
                "nested_objects": {
                    "limit": "10000"
                },
                "ignore_malformed": "false"
            },
            "source_only": "false",
            "soft_deletes": {
                "enabled": "false",
                "retention": {
                    "operations": "0"
                },
                "retention_lease": {
                    "period": "12h"
                }
            },
            "max_script_fields": "32",
            "query": {
                "default_field": [
                    "*"
                ],
                "parse": {
                    "allow_unmapped_fields": "true"
                }
            },
            "format": "0",
            "frozen": "false",
            "sort": {
                "missing": [],
                "mode": [],
                "field": [],
                "order": []
            },
            "priority": "1",
            "codec": "default",
            "max_rescore_window": "10000",
            "max_adjacency_matrix_filters": "100",
            "analyze": {
                "max_token_count": "10000"
            },
            "gc_deletes": "60s",
            "top_metrics_max_size": "10",
            "optimize_auto_generated_id": "true",
            "max_ngram_diff": "1",
            "hidden": "false",
            "translog": {
                "generation_threshold_size": "64mb",
                "flush_threshold_size": "512mb",
                "sync_interval": "5s",
                "retention": {
                    "size": "512MB",
                    "age": "12h"
                },
                "durability": "REQUEST"
            },
            "auto_expand_replicas": "false",
            "mapper": {
                "dynamic": "true"
            },
            "requests": {
                "cache": {
                    "enable": "true"
                }
            },
            "data_path": "",
            "highlight": {
                "max_analyzed_offset": "1000000"
            },
            "routing": {
                "rebalance": {
                    "enable": "all"
                },
                "allocation": {
                    "enable": "all",
                    "total_shards_per_node": "-1"
                }
            },
            "search": {
                "slowlog": {
                    "level": "TRACE",
                    "threshold": {
                        "fetch": {
                            "warn": "-1",
                            "trace": "-1",
                            "debug": "-1",
                            "info": "-1"
                        },
                        "query": {
                            "warn": "-1",
                            "trace": "-1",
                            "debug": "-1",
                            "info": "-1"
                        }
                    }
                },
                "idle": {
                    "after": "30s"
                },
                "throttled": "false"
            },
            "fielddata": {
                "cache": "node"
            },
            "default_pipeline": "_none",
            "max_slices_per_scroll": "1024",
            "shard": {
                "check_on_startup": "false"
            },
            "xpack": {
                "watcher": {
                    "template": {
                        "version": ""
                    }
                },
                "version": "",
                "ccr": {
                    "following_index": "false"
                }
            },
            "percolator": {
                "map_unmapped_fields_as_text": "false"
            },
            "allocation": {
                "max_retries": "5",
                "existing_shards_allocator": "gateway_allocator"
            },
            "refresh_interval": "1s",
            "indexing": {
                "slowlog": {
                    "reformat": "true",
                    "threshold": {
                        "index": {
                            "warn": "-1",
                            "trace": "-1",
                            "debug": "-1",
                            "info": "-1"
                        }
                    },
                    "source": "1000",
                    "level": "TRACE"
                }
            },
            "compound_format": "0.1",
            "blocks": {
                "metadata": "false",
                "read": "false",
                "read_only_allow_delete": "false",
                "read_only": "false",
                "write": "false"
            },
            "max_result_window": "10000",
            "store": {
                "stats_refresh_interval": "10s",
                "type": "",
                "fs": {
                    "fs_lock": "native"
                },
                "preload": []
            },
            "queries": {
                "cache": {
                    "enabled": "true"
                }
            },
            "warmer": {
                "enabled": "true"
            },
            "max_shingle_diff": "3",
            "query_string": {
                "lenient": "false"
            }
        }
    }
}

function FormCard({json}) {
    return (
        <React.Fragment>
            <Card>
                <CardContent>
                    <Typography variant={"h5"} mt={5}>
                        주요항목
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>샤드 갯수</TableCell>
                                <TableCell>레플리카 갯수</TableCell>
                                <TableCell>리프레쉬 간격</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>5</TableCell>
                                <TableCell>3</TableCell>
                                <TableCell>1s</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <br/>
            <Card>
                <CardContent>
                    <Typography variant={"h5"} mt={5}>
                        기타항목
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>키</TableCell>
                                <TableCell>값</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>index.shard.check_on_startup</TableCell>
                                <TableCell>false</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>index.codec</TableCell>
                                <TableCell>bast_compression</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>index.hidden</TableCell>
                                <TableCell>true</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}
function JsonCard({json}) {
    const classes = useStyles();

    return (<div>
        <Card>
            <CardContent>
                <Box>
                    <TextareaAutosize rowsMin={50}
                                      className={classes.edit}
                                      placeholder=""
                                      value={JSON.stringify(json, null, 4)}
                    />
                </Box>
            </CardContent>
        </Card>
    </div>)
}

function Setting() {
    const classes = useStyles();
    const [chk, setChk] = React.useState('form');

    function handleRadioChange(e) {
        setChk(e.target.value)
    }

    return (
        <React.Fragment>

            <Grid container>
                <Grid item xs={10}>
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                            <FormControlLabel value="form" checked={chk === "form"} onChange={handleRadioChange} control={<Radio color="primary" />} label="폼" />
                            <FormControlLabel value="json" checked={chk === "json"} onChange={handleRadioChange} control={<Radio color="primary" />} label="json" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Box align={"right"} mt={2}>
                        <Button size={"small"} variant={"contained"} color={"primary"}>동적변경</Button>
                    </Box>
                </Grid>
            </Grid>

            <Box mt={2}>
                {
                    chk === "form" ? <FormCard json={json} /> : <JsonCard json={json} />
                }
            </Box>


        </React.Fragment>
    );
}

export default Setting;
