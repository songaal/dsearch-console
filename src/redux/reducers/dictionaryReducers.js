import * as types from '../constants';

let initState = {
    user: {},
    userList: [
        "dacco테스트",
        "테스트dacco",
        "fff테스트",
        "ff테스트",
        "테스트fff",
        "테스트ff",
        "장혁준667",
        "장혁준fe",
        "장혁준ffe",
        "장혁준ffef",
        "단어",
        "123장혁준",
        "장혁준123",
        "테스트123",
        "1234테스트",
        "테스트1234",
        "테스트abcd",
        "abcd테스트",
        "o2cool",
        "yb맘",
        "jul7me",
        "단어",
        "u자형",
        "앤젯",
        "엔젯",
        "the살림",
        "안텔로프",
        "아포칼립스",
        "니보나",
        "캐시카이",
        "톨로디",
        "비포드",
        "단어",
        "토리버",
        "벤토사",
        "파르베",
        "팍스콘",
        "비세오",
        "콘트렉스",
        "마카우",
        "팅크쳐",
        "마리에토르프",
        "모슬란다"
    ],
    synonyms: {},
    synonymsList: [],
    stopword: {},
    stopwordList: [],
    separator: {},
    separatorList: [],
}

export default function reducer(state= initState, actions) {
    switch (actions.type) {
        case types.SET_DICTIONARY_USER_LIST:
            return {
                ...state,
                userDictionary: actions.payload
            }
        default:
            return state
    }
}
