import React, {useEffect, useState} from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from "classnames";
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";


import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import Icon from '@material-ui/core/Icon';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import FacebookIcon from '@material-ui/icons/Facebook';


import tikiLogo from '../../image/tikiNavbarLogo.png'
import navImage from '../../image/navImage.png'
import tikiAssistant from '../../image/tiki_assistant.png'
import sprite from '../../image/sprite.png'
import tikiNow from '../../image/tiki-now.png'
import ticketBox from '../../image/ticketBox.png'
import zaloLogo from '../../image/Logo_Zalo.png'
import userStyles from '../../styles/NavbarStyles'
import TikiXu from '../../image/tiki-xu.svg'
import Bookcare from '../../image/bookcare.svg'
import Tikinow2 from '../../image/tiki-now2.png'
import {loadCSS} from 'fg-loadcss';
import ProductNavigation from "../UI/ProductNavigation";
import TransitionsModal from '../user/UserModal'
import {useDispatch, useSelector} from "react-redux";
import * as authActions from '../../store/actions/authActions'
import {message} from "antd";


const NavBar = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();

    // function to open and close modal
     const [open, setOpen] = useState(false);
     const [index, setIndex] = useState(0);

     const handleOpenModal=()=>{
         setOpen(true)
     };
     const handleCloseModal = ()=>{
         setOpen(false)
     };
     const handleOnClick=(event)=>{
         setIndex(event.currentTarget.name)
     };

    useEffect(() => {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
        setOpen(!!props.showForm);
        !!props.showForm && message.info("You need to be logged in!");
        props.checkIsAdmin !== undefined && props.checkIsAdmin && message.error("you to be logged in as an admin to access this route");
    }, []);

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [productModal, setProductModal] = useState(false);
    const [isLoginTip, setIsLoginTip] = useState(false);
    const [productNavigation, setProductNavigation] = useState(false);

    const cartQuantity = useSelector(state => Object.keys(state.cart.items).length);
    const isLoggedIn = useSelector(state => state.auth.isAuthenticated);



    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Link to={"/orders"} onClick={e => {
                    e.stopPropagation();
                    setOpen(props.showForm !== undefined ? props.showForm : false);
                }} className={classes.removeDefaultLink}>
                    <IconButton aria-label="track orders" color="inherit" className={classes.iconNav}>
                        <Icon className={"fas fa-shipping-fast"}
                              style={{fontSize: 20, paddingTop: "0.05em", width: "1.5em"}}/>
                    </IconButton>
                </Link>
                <p>Track Order</p>

            </MenuItem>
            <MenuItem>

                <IconButton aria-label="Notification" color="inherit" className={classes.iconNav}>
                    <Icon className={"fas fa-bell"}
                          style={{fontSize: 20, paddingTop: "0.05em", width: "1.5em"}}/>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleOpenModal}>
                <IconButton aria-label="Log In" color="inherit" className={classes.iconNav}>
                    <Icon className={"fas fa-user"}
                          style={{paddingTop: "0.05em"}}/>
                </IconButton>
                <p>Login</p>
            </MenuItem>
        </Menu>
    );

    const authLinks = isLoggedIn ? (
        <section className={classNames({[classes.loginToolTip]: isLoginTip})}
                 onMouseLeave={() => {
                     setIsLoginTip(false)
                 }}
                 style={{
                     width: "20em",
                     height: "30em",
                     textAlign: "center",
                     padding: "1.2em",
                     backgroundColor: "rgba(255,255,255,0.8)",
                     margin: 0,
                     zIndex: '999999',
                     display: "None"
                 }}>
            <Button
                variant="contained"
                size={"small"}
                style={{backgroundColor: "#FDDE54"}}
                startIcon={<PersonAddDisabledIcon/>}
                onClick={() => dispatch(authActions.logoutUser())}
            >
                Logout
            </Button>
            <Link to={'/dashboard/0'} onClick={(e) => e.stopPropagation()} className={classes.removeDefaultLink}>
                <Button
                    size={"small"}
                    variant="contained"
                    style={{backgroundColor: "#FDDE54",  width: "100%"}}
                    startIcon={<PersonIcon/>}
                >
                    My account
                </Button>
            </Link>

            <Link to={'/dashboard/5'} onClick={(e) => e.stopPropagation()} className={classes.removeDefaultLink}>
                <Button
                    size={"small"}
                    variant="contained"
                    className={classes.button}
                    style={{color: "black",  width: "100%", backgroundColor: "#D5D5D5" }}
                >
                    Review product purchased
                </Button>
            </Link>

            <Link to={'/dashboard/6'} onClick={(e) => e.stopPropagation()} className={classes.removeDefaultLink}>
                <Button
                    size={"small"}
                    variant="contained"
                    style={{color: "black",  width: "100%", backgroundColor: "#D5D5D5"}}
                >
                    Viewed Products
                </Button>
            </Link>

            <Link to={'/dashboard/7'} onClick={(e) => e.stopPropagation()} className={classes.removeDefaultLink}>
                <Button
                    size={"small"}
                    variant="contained"
                    style={{color: "black",  width: "100%", backgroundColor: "#D5D5D5"}}
                >
                    Favorite Products
                </Button>
            </Link>

            <Link to={'/dashboard/8'} onClick={(e) => e.stopPropagation()} className={classes.removeDefaultLink}>
                <Button
                    size={"small"}
                    variant="contained"
                    style={{color: "black",  width: "100%", backgroundColor: "#D5D5D5"}}
                >
                    Product to buy later
                </Button>
            </Link>

            <Link to={'/dashboard/9'} onClick={(e) => e.stopPropagation()} className={classes.removeDefaultLink}>

                <Button
                    size={"small"}

                    variant="contained"
                    style={{color: "black",  width: "100%", backgroundColor: "#D5D5D5"}}
                >
                    My comment
                </Button>
            </Link>
            <Link to={'/dashboard/11'} onClick={(e) => e.stopPropagation()} className={classes.removeDefaultLink}>
                <Button
                    size={"small"}
                    variant="contained"
                    style={{color: "black",  width: "100%",backgroundColor: "#D5D5D5"}}
                ><img src={Tikinow2} alt="ticketBox" style={{width: "10%", marginRight: "1em"}}/> <span>Tiki Now</span>
                </Button>
            </Link>

            <Link to={'/dashboard/12'} onClick={(e) => e.stopPropagation()} className={classes.removeDefaultLink}>
                <Button
                    size={"small"}
                    variant="contained"
                    style={{color: "black", width: "100%", backgroundColor: "#D5D5D5"}}
                ><img src={TikiXu} alt="ticketBox" style={{width: "10%", marginRight: "1em"}}/>
                    Tiki Xu
                </Button>
            </Link>

            <Link to={'/dashboard/13'} onClick={(e) => e.stopPropagation()} className={classes.removeDefaultLink}>
                <Button
                    size={"small"}
                    startIcon={<img src={Bookcare} alt="ticketBox" style={{width: "70%", margin: 0}}/>}
                    variant="contained"
                    style={{color: "black",  width: "100%", backgroundColor: "#D5D5D5"}}
                >
                    Bookcare
                </Button>
            </Link>
        </section>

    ):(
        <section  className={classNames({[classes.loginToolTip]: isLoginTip})}
                  onMouseLeave={()=>{setIsLoginTip(false)}}
                  style={{width: "20em", height:"17em",  textAlign: "center", padding: "1.2em",backgroundColor: "rgba(255,255,255,0.8)", margin: 0, display: "None"}} >


            <Button
                variant="contained"
                size={"small"}
                style={{backgroundColor: "#FDDE54"}}
                startIcon={<PersonIcon/>}
                name="0"
                onClick={(e)=>{handleOpenModal(); handleOnClick(e); setIsLoginTip(false)}}

            >
                Login
            </Button>
            <Button
                size={"small"}
                variant="contained"
                style={{backgroundColor: "#FDDE54"}}
                startIcon={<PersonAddIcon />}
                onClick={(e)=>{handleOpenModal(); handleOnClick(e); setIsLoginTip(false)}}
                name="1"
            >
                Create Account
            </Button>
            <Button
                size={"small"}
                variant="contained"
                className={classes.button}
                style={{backgroundColor: "#4267B2", color: "white"}}
                startIcon={<FacebookIcon/>}
            >
                Login with Facebook
            </Button>
            <Button
                size={"small"}
                variant="contained"
                style={{backgroundColor: "#DC4F42", color: "white"}}
                startIcon={<Icon className={"fab fa-google"}/>}
            >
                Sign in with Google
            </Button>
            <Button
                size={"small"}
                variant="contained"
                style={{backgroundColor: "#0180CE", color: "white"}}
                startIcon={<img src={zaloLogo} alt="zalo" style={{width: "1em"}}/>}
            >
                Login with Zalo
            </Button>
            <TransitionsModal open={open} onClose={handleCloseModal} piority={index}
                              closeModal={handleCloseModal} {...props} type={'authModal'} adminForm={!!props.adminForm}/>
        </section>
    );

    const NavSection1 = <Toolbar className={classNames(classes.toolbar, classes.sectionDesktop)}
                                 style={{paddingLeft: 0, paddingRight: 0, marginTop: "-0.1em", height: "1.8em"}}>
        <img src={navImage} alt="navbar promo" style={{height: "100%", width: "100%"}}/>
    </Toolbar>;
    const NavSection2 = <Toolbar className={classNames(classes.toolbar, classes.sectionDesktop)}
                                 style={{
                                     padding: "0 10%",
                                     backgroundColor: "#1D71AB",
                                     minHeight: "1.6em",
                                     height: "1.6em",
                                     marginTop: "-0.1em",
                                     justifyContent: "space-around",
                                     
                                 }}
                                 onMouseEnter={() => {
                                     setIsLoginTip(false)
                                 }}

    >
        <Typography className={classes.title} variant="subtitle2" noWrap  component={'p'}>
            <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0}}>
                <img src={ticketBox} alt="ticketBox" style={{height: "50%", width: "50%"}}/>
            </IconButton>
            ticketBox
        </Typography>
        <Typography className={classes.title} variant="subtitle2" noWrap  component={'p'}>
            <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0}}>
                <img src={tikiAssistant} alt="tikiAssistant" style={{height: "50%", width: "50%"}}/>
            </IconButton>
            Assistant Tiki
        </Typography>
        <Typography className={classes.title} variant="subtitle2" noWrap  component={'p'}>
            <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0}}>
                <i style={{
                    backgroundImage: `url(${sprite}?v=100000000)`,
                    backgroundPosition: "-219px -317px",
                    width: "18px",
                    height: "18px",
                    marginRight: "0.1em"
                }}/>
            </IconButton>
            partner Incentives
        </Typography>
        <Typography className={classes.title} variant="subtitle2" noWrap  component={'p'}>
            <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0}}>
                <i style={{
                    backgroundImage: `url(${sprite}?v=100000000)`,
                    backgroundPosition: "-40px -365px",
                    width: "16px",
                    height: "20px",
                    marginRight: "0.1em"
                }}/>
            </IconButton>
            Hotel reservations
        </Typography>
        <Typography className={classes.title} variant="subtitle2" noWrap  component={'p'}>
            <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0}}>
                <i style={{
                    backgroundImage: `url(${sprite}?v=100000000)`,
                    backgroundPosition: "-35px -317px",
                    width: "20px",
                    height: "20px",
                    marginRight: "0.1em"
                }}/>
            </IconButton>

            Ticket Booking
        </Typography>
        <Typography className={classes.title} variant="subtitle2" noWrap  component={'p'}>
            <IconButton aria-label="where do you want to shop to?" style={{padding: 0}}>
                <WhatshotIcon style={{color: "F2D33B"}}/>
            </IconButton>
            Hot Promotion
        </Typography>
        <Typography className={classes.title} variant="subtitle2" noWrap  component={'p'}>
            <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0}}>
                <i style={{
                    backgroundImage: `url(${sprite}?v=100000000)`,
                    backgroundPosition: "-304px -261px",
                    width: "20px",
                    height: "20px",
                    marginRight: "0.1em"
                }}/>
            </IconButton>
            International goods
        </Typography>
        <Typography className={classes.title} variant="subtitle2" noWrap  component={'p'}>
            <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0}}>
                <i style={{
                    backgroundImage: `url(${sprite}?v=100000000)`,
                    backgroundPosition: "-333px -228px",
                    width: "18px",
                    height: "19px",
                    marginRight: "0.1em"
                }}/>
            </IconButton>
            Sales with Tiki
            <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0}}>
                <Icon className={"fas fa-angle-down"}
                      style={{fontSize: 14, width: "1.5em"}}/>
            </IconButton>
        </Typography>
    </Toolbar>;

    const NavSection3 = <Toolbar className={classes.toolbar} style={{backgroundColor: "#189EFF", padding: '0 10%'}}
                                 onMouseEnter={() => {
                                     setProductModal(false);
                                     setProductNavigation(false)
                                 }}>
        
        <Link to={"/"} className={classes.removeDefaultLink} style={{marginLeft: '5%'}}>
            <Typography className={classes.title3} variant="h6" noWrap>
                TIKI
            </Typography>
        </Link>
        <Link to={"/"} className={classes.removeDefaultLink}>

            <img src={tikiLogo} alt={"logo"} className={classes.tikiLogo}/>
        </Link>
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon/>
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{'aria-label': 'search'}}
            />
        </div>
        <div className={classes.sectionDesktop2}>

            <IconButton aria-label="track orders" color="inherit" className={classes.iconNav}>
                <Icon className={"fas fa-shipping-fast"}
                      style={{fontSize: 20, paddingTop: "0.05em", width: "1.5em"}}/>
            </IconButton>
            <Typography component={'div'}>
                <Link to={"/orders"} onClick={
                    e => {
                        e.stopPropagation();
                        setOpen(props.showForm !== undefined ? props.showForm : false);
                        props.showForm !== undefined && props.showForm && message.info("You need to be logged in!")
                    }}
                      className={classes.removeDefaultLink}>

                    <span style={{width: "0.2em"}} className={classes.navText}>Track </span>

                    <Typography className={classes.navTypo} component={'div'}>
                        <span className={classes.navText}> orders</span>

                    </Typography>
                </Link>

            </Typography>
            <IconButton aria-label="Notification" color="inherit" className={classes.iconNav}>
                <Icon className={"fas fa-bell"}
                      style={{fontSize: 20, paddingTop: "0.05em", width: "1.5em"}}/>
            </IconButton>
            <Typography onMouseEnter={() => {
                setIsLoginTip(false)
            }} component={'div'}>
                <span className={classes.navText}>Your </span>

                <Typography className={classes.navTypo} component={'div'}>
                    <span className={classes.navText}> notification</span>

                </Typography>

            </Typography>
            <IconButton aria-label="Log In" color="inherit" className={classes.iconNav} onMouseEnter={() => {
                setIsLoginTip(true)
            }}>
                <Icon className={"fas fa-user"}
                      style={{paddingTop: "0.05em"}}/>
            </IconButton>

            <Typography component={'div'}>
                <Link to={"#"} onMouseEnter={() => {
                    setIsLoginTip(true)
                }} className={classes.removeDefaultLink}>
                    {isLoggedIn ?
                        <span className={classes.navText}>Logout </span>
                        :
                        <span className={classes.navText}>Login </span>
                    }


                    <Typography className={classes.navTypo} component={'div'}>
                        <span className={classes.navText}> account</span>

                    </Typography>
                </Link>

            </Typography>
            {/* number of products */}
            <Link to={"/cart"} onClick={e => {
                e.stopPropagation();
                setOpen(props.showForm !== undefined ? props.showForm : false);
                props.showForm !== undefined && props.showForm && message.info("You need to be logged in!")
            }} className={classes.removeDefaultLink}>

                <Typography className={classes.navText2}>
                    <Badge badgeContent={cartQuantity} color="error" className={classes.iconNav2}>
                        <ShoppingCartIcon style={{paddingLeft: "20%"}}/>
                    </Badge>
                    Cart
                </Typography>
            </Link>


        </div>
        <div className={classes.sectionMobile}>
            <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
            >
                <MoreIcon/>
            </IconButton>
        </div>
    </Toolbar>;

    const NavSection4 = <Toolbar className={classNames(classes.toolbar, classes.sectionDesktop)}
                                 onMouseEnter={() => {
                                     setIsLoginTip(false)
                                 }}
                                 style={{backgroundColor: "#189EFF", padding: '0 15%'}}>
        <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onMouseEnter={() => {
                setProductNavigation(true)
            }}
        >
            <MenuIcon/>
        </IconButton>

        <Typography className={classes.title2} noWrap>
            PRODUCT CATEGORY
        </Typography>
        <section style={{
            display: "flex",
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: "80%",
            alignItems: "center"
        }}>
            <Typography className={classes.title2} noWrap>
                <IconButton aria-label="where do you want to shop to?" color="inherit"
                            style={{paddingRight: 0}}>
                    <Icon className={"fas fa-map-marker-alt"}
                          style={{fontSize: 20, width: "1.5em"}}/>
                </IconButton>
                Where do you want to shop to?
            </Typography>
            <Typography className={classes.title2} component={'span'} noWrap onMouseEnter={() => {
                setProductModal(true)
            }}>
                <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0}}>
                    <Icon className={"fas fa-angle-down"}
                          style={{fontSize: 20, width: "1.5em"}}/>
                </IconButton>
                Products you have viewed
                <div className={classNames(classes.customModal, {[classes.productModal]: productModal})}
                     style={{display: "none"}}>
                    <div className={classes.customSubModal} onMouseLeave={() => {
                        setProductModal(false)
                    }}>
                        <br/><br/><br/>You have not viewed any products. <br/> keep exploring tiki, the
                        product you viewed will show up here!
                    </div>
                </div>
            </Typography>
            <section style={{alignItems: "center", flexDirection: 'row', display: 'flex'}}>
                <IconButton aria-label="where do you want to shop to?" color="inherit"
                            style={{padding: 0, marginRight: "0.53em"}}>
                    <img src={tikiNow} alt="tikiNow" style={{
                        height: "100%",
                        width: "100%",
                        backgroundColor: "white",
                        padding: "0.28em",
                        borderRadius: "30%",
                    }}/>
                </IconButton>
                <Typography className={classes.title2} noWrap>

                    TIKInow fast delivery Hundreds <br/>of thousands of products
                </Typography>
            </section>
            <section style={{alignItems: "center", flexDirection: 'row', display: 'flex'}}>

                <IconButton aria-label="All products are 100% genuine" color="inherit"
                            style={{padding: "0.3em"}}>
                    <Icon className={"fas fa-medal"}
                          style={{fontSize: 20, width: "1.5em", color: "#F2D33B"}}/>
                </IconButton>
                <Typography className={classes.title2} noWrap>

                    All products are <br/>100% genuine
                </Typography>
            </section>
            <section style={{alignItems: "center", flexDirection: 'row', display: 'flex'}}>

                <IconButton aria-label="All products are 100% genuine" color="inherit"
                            style={{padding: "0.3em"}}>
                    <Icon className={"fas fa-box-open"}
                          style={{fontSize: 20, width: "1.5em", color: "#F2D33B"}}/>
                </IconButton>
                <Typography className={classes.title2} noWrap>
                    30 days exchange<br/> easily
                </Typography>
            </section>
        </section>

    </Toolbar>;

    return (
        <section>
            <div className={classes.grow}>
                <AppBar position="static">
                    {NavSection1}
                    {NavSection2}
                    {NavSection3}
                    {NavSection4}
                </AppBar>
                {renderMobileMenu}
            </div>
            {productNavigation && <ProductNavigation
                // style={{paddingBottom: "2em"}}
                toggleDrawer={() => {
                    setProductNavigation(false)
                }}
            />}
            {authLinks}
        </section>
    );
};

export default NavBar


