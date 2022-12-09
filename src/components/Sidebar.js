import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {darken, rgba} from "polished";

import {title} from "../title.json";

import {NavLink as RouterNavLink, withRouter} from "react-router-dom";

import PerfectScrollbar from "react-perfect-scrollbar";
import "../vendor/perfect-scrollbar.css";

import {spacing} from "@material-ui/system";

import {
    Box as MuiBox,
    Chip,
    Collapse,
    Drawer as MuiDrawer,
    List as MuiList,
    ListItem,
    ListItemText,
    Typography
} from "@material-ui/core";

import {ExpandLess, ExpandMore, Launch} from "@material-ui/icons";

// import {green} from "@material-ui/core/colors";
import {dashboard as dashboardRoutes, intro as introRoutes} from "../routes/index";

const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Box = styled(MuiBox)(spacing);

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Scrollbar = styled(PerfectScrollbar)`
  background-color: ${props => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const List = styled(MuiList)`
  background-color: ${props => props.theme.sidebar.background};
`;

const Items = styled.div`
  padding-top: ${props => props.theme.spacing(2.5)}px;
  padding-bottom: ${props => props.theme.spacing(2.5)}px;
`;

const Brand = styled(ListItem)`
  font-size: ${props => props.theme.typography.h5.fontSize};
  font-weight: ${props => props.theme.typography.fontWeightMedium};
  color: ${props => props.theme.sidebar.header.color};
  background-color: ${props => props.theme.sidebar.header.background};
  font-family: ${props => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${props => props.theme.spacing(6)}px;
  padding-right: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }
`;

// const BrandChip = styled(Chip)`
//   background-color: ${green[700]};
//   border-radius: 5px;
//   color: ${props => props.theme.palette.common.white};
//   font-size: 60%;
//   height: 20px;
//   margin-left: 2px;
//   margin-bottom: 1px;
//   padding: 4px 0;
//
//   span {
//     padding-left: ${props => props.theme.spacing(1.5)}px;
//     padding-right: ${props => props.theme.spacing(1.5)}px;
//   }
// `;

const Category = styled(ListItem)`
  padding-top: ${props => props.theme.spacing(3)}px;
  padding-bottom: ${props => props.theme.spacing(3)}px;
  padding-left: ${props => props.theme.spacing(6)}px;
  padding-right: ${props => props.theme.spacing(5)}px;
  font-weight: ${props => props.theme.typography.fontWeightRegular};

  svg {
    color: ${props => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  &.${props => props.activeClassName} {
    background-color: ${props => darken(0.05, props.theme.sidebar.background)};

    span {
      color: ${props => props.theme.sidebar.color};
    }
  }
`;

const CategoryText = styled(ListItemText)`
  margin: 0;
  span {
    color: ${props => props.theme.sidebar.color};
    font-size: ${props => props.theme.typography.body1.fontSize}px;
    font-weight: ${props => props.theme.sidebar.category.fontWeight};
    padding: 0 ${props => props.theme.spacing(4)}px;
  }
`;

const CategoryIconLess = styled(ExpandLess)`
  color: ${props => rgba(props.theme.sidebar.color, 0.5)};
`;

const CategoryIconMore = styled(ExpandMore)`
  color: ${props => rgba(props.theme.sidebar.color, 0.5)};
`;

const Link = styled(ListItem)`
  padding-left: ${props => props.theme.spacing(14)}px;
  padding-top: ${props => props.theme.spacing(2)}px;
  padding-bottom: ${props => props.theme.spacing(2)}px;

  span {
    color: ${props => rgba(props.theme.sidebar.color, 0.7)};
  }

  &:hover span {
    color: ${props => rgba(props.theme.sidebar.color, 0.9)};
  }

  &.${props => props.activeClassName} {
    background-color: ${props => darken(0.06, props.theme.sidebar.background)};

    span {
      color: ${props => props.theme.sidebar.color};
    }
  }
`;

const LinkText = styled(ListItemText)`
  color: ${props => props.theme.sidebar.color};
  span {
    font-size: ${props => props.theme.typography.body1.fontSize}px;
  }
  margin-top: 0;
  margin-bottom: 0;
`;

const LinkBadge = styled(Chip)`
  font-size: 11px;
  font-weight: ${props => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 12px;
  top: 8px;
  background: ${props => props.theme.sidebar.badge.background};

  span.MuiChip-label,
  span.MuiChip-label:hover {
    cursor: pointer;
    color: ${props => props.theme.sidebar.badge.color};
    padding-left: ${props => props.theme.spacing(2)}px;
    padding-right: ${props => props.theme.spacing(2)}px;
  }
`;

const CategoryBadge = styled(LinkBadge)`
  top: 12px;
`;

const SidebarSection = styled(Typography)`
  color: ${props => props.theme.sidebar.color};
  padding: ${props => props.theme.spacing(4)}px
    ${props => props.theme.spacing(6)}px ${props => props.theme.spacing(1)}px;
  opacity: 0.9;
  display: block;
`;

// const SidebarFooter = styled.div`
//   background-color: ${props =>
//     props.theme.sidebar.footer.background} !important;
//   padding: ${props => props.theme.spacing(2.75)}px
//     ${props => props.theme.spacing(4)}px;
//   border-right: 1px solid rgba(0, 0, 0, 0.12);
// `;
//
// const SidebarFooterText = styled(Typography)`
//   color: ${props => props.theme.sidebar.footer.color};
// `;
//
// const SidebarFooterSubText = styled(Typography)`
//   color: ${props => props.theme.sidebar.footer.color};
//   font-size: .725rem;
//   display: block;
//   padding: 1px;
// `;
//
// const StyledBadge = styled(Badge)`
//   margin-right: ${props => props.theme.spacing(1)}px;
//
//   span {
//     background-color: ${props => props.theme.sidebar.footer.online.background};
//     border: 1.5px solid ${props => props.theme.palette.common.white};
//     height: 12px;
//     width: 12px;
//     border-radius: 50%;
//   }
// `;

function SidebarCategory({
                             name,
                             icon,
                             classes,
                             isOpen,
                             isCollapsable,
                             badge,
                             ...rest
                         }) {
    let flag = false;
    if(name === '키바나로 이동') flag = true;
    return (
        <Category {...rest}>
            {icon}
            <CategoryText>{name}</CategoryText>
            {isCollapsable ? (
                isOpen ? (
                    <CategoryIconMore/>
                ) : (
                    <CategoryIconLess/>
                )
            ) : null}
            {badge ? <CategoryBadge label={badge}/> : ""}
            {flag ? <Launch /> : <></>}
        </Category>
    );
}

function SidebarLink({name, to, badge, icon2}) {
    
    return (
        <Link
            button
            dense
            component={NavLink}
            exact
            to={to}
            activeClassName="active"
        >
            <LinkText>{name}</LinkText>
            {badge ? <LinkBadge label={badge}/> : ""}
        </Link>
    );
}

function Sidebar(props) {
    const [active, setActive] = useState({})

    useEffect(() => {
        /* Open collapse element that matches current url */
        const pathName = props.location.pathname;
        const {layout} = props;
        let routes = [];
        if (layout === 'dashboard') {
            routes = dashboardRoutes
        } else {
            routes = introRoutes
        }

        routes.forEach((route, index) => {
            const isActive = pathName.indexOf(route.path) === 0;
            const isOpen = route.open;
            const isHome = route.containsHome && pathName === "/" ? true : false;

            setActive({
                [index]: isActive || isOpen || isHome
            })
            // this.setState(() => ({
            //     [index]: isActive || isOpen || isHome
            // }));
        });
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function toggle(index) {
        // Collapse all elements
        Object.keys(active).forEach(
            item =>
                active[index] ||
                setActive({
                    ...active,
                    [item]: false
                })
        );

        // Toggle selected element
        setActive({
            [index]: !active[index]
        })
        // this.setState(state => ({
        //     [index]: !state[index]
        // }));
    }

    const {classes, layout, staticContext, ...other} = props;
    let routes = [];
    if (layout === 'dashboard') {
        routes = dashboardRoutes
    } else {
        routes = introRoutes
    }
    

    routes = routes.filter(route => route.hidden === undefined || route.hidden === null || route.hidden === false)
    return (
        <Drawer variant="permanent" {...other}>
            <Brand>
                {/*<BrandIcon/>*/}
                <img src={"/static/img/dsearch/danawa_m.png"} alt={"danawa_m.png"} />
                <Box style={{marginLeft: "12px"}}>
                    {title}
                    {/* <BrandChip label="X" /> */}
                </Box>
            </Brand>
            <Scrollbar>
                <List disablePadding>
                    <Items>
                        {routes.map((category, index) => (
                            <React.Fragment key={index}>
                                {category.header ? (
                                    <SidebarSection>{category.header}</SidebarSection>
                                ) : null}

                                {category.children && category.children.filter(c => c.hidden !== true).length > 0 ? (
                                    <React.Fragment key={index}>
                                        <SidebarCategory
                                            isOpen={!active[index]}
                                            isCollapsable={true}
                                            name={category.id}
                                            icon={category.icon}
                                            button={true}
                                            onClick={() => toggle(index)}
                                        />

                                        <Collapse
                                            in={active[index]}
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            {category.children.filter(c => c.hidden !== true).map((route, index) => (
                                                <SidebarLink
                                                    key={index}
                                                    name={route.name}
                                                    to={route.path}
                                                    icon={route.icon}
                                                    badge={route.badge}
                                                />
                                            ))}
                                        </Collapse>
                                    </React.Fragment>
                                ) : (
                                    <SidebarCategory
                                        isCollapsable={false}
                                        name={category.id}
                                        to={category.path}
                                        activeClassName="active"
                                        component={NavLink}
                                        icon={category.icon}
                                        // exact
                                        badge={category.badge}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </Items>
                </List>
            </Scrollbar>
            {/*<SidebarFooter>*/}
            {/*    <Grid container spacing={2}>*/}
            {/*        <Grid item>*/}
            {/*            <StyledBadge*/}
            {/*                overlap="circle"*/}
            {/*                anchorOrigin={{*/}
            {/*                    vertical: 'bottom',*/}
            {/*                    horizontal: 'right',*/}
            {/*                }}*/}
            {/*                variant="dot"*/}
            {/*            >*/}
            {/*                <Avatar alt="Lucy Lavender" src="/static/img/avatars/avatar-1.jpg"/>*/}
            {/*            </StyledBadge>*/}
            {/*        </Grid>*/}
            {/*        <Grid item>*/}
            {/*            <SidebarFooterText variant="body2">*/}
            {/*                Lucy Lavender*/}
            {/*            </SidebarFooterText>*/}
            {/*            <SidebarFooterSubText variant="caption">*/}
            {/*                UX Designer*/}
            {/*            </SidebarFooterSubText>*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</SidebarFooter>*/}
        </Drawer>
    )
}

export default withRouter(Sidebar);
