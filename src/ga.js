import ReactGA from 'react-ga'



export const initGA = () => {
    ReactGA.initialize('UA-157157616-2');
}

export const GApageView = (page) => {
    // console.log(page)
    ReactGA.pageview(page);
}