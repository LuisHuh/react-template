/**
 * @class Navbar
 * @version 1.0.0
 * @author alanjimenez
 * @summary Barra de navegación del sitio de bodas
 */
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import WithContext from '@app/ServiceContext';
import { Mainmenu, MenuMobile, MenuResorts, Topmenu } from '../index';
import { Iconwedd } from '../index';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
// JSON Data
import menus   from './menu';
import menusES from './menu_es';
import './style.scss';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			changeIcon: "1",
			iconmenu: "hamburguer-menu",
			iconmenu2: "alt-hamburguer-menu",
			iconmenuresorts: "chevron-down",
			colorresorts: "var(--light-melon)",
			menuMobile: [],
			menuOurResorts: [],
			topMenu: [],
			mainMenu: []
        };
        
		//this.handleFiles = this.handleFiles.bind(this);
		this.changeMenuHandler = this.changeMenuHandler.bind(this);
		this.changeIconEv = this.changeIconEv.bind(this);
		this.menuLi = React.createRef();
		this.menuLiTop = React.createRef();
		this.handle_001 = this.handle_001.bind(this);
		this.handle_002 = this.handle_002.bind(this);
		this.handle_003 = this.handle_003.bind(this);
	}
	menus = [];
	
	changeIconEv(change) {
		this.setState(prevState => { return { changeIcon: change } })
	}

	changeMenuHandler(menuRecive){        
		if(menuRecive==1){
			if(this.state.iconmenu=="hamburguer-menu"){
				disableBodyScroll(document.querySelector(".list-links"));
			}else{
				enableBodyScroll(document.querySelector(".list-links"));
				enableBodyScroll(document.querySelectorAll(".list-links")[1]);
				enableBodyScroll(document.querySelectorAll(".list-links")[2]);
			}
			let height1 = document.querySelector(".mask").clientHeight;
			let height2 = document.querySelector(".bg-top-menu-mobile").clientHeight;
			let height3 = document.querySelector(".floatingMenu").clientHeight;
			let height = innerHeight-height1-height2-height3+5;
			this.elElement.childNodes[0].lastChild.style="height:"+height+"px";

			if(this.elElement.style.top==""+(45/16)+"rem"){/*45px*/
				this.changeIconEv(1)
				this.elElement.style.top = "-"+((innerHeight+134)/16)+"rem";/*600px*///oculta1
			}else{
				this.elElement.style.top=""+(45/16)+"rem";/*45px*///descoulta1
				this.divElement.style.top = "-"+((innerHeight+1000)/16)+"rem";/*600px*/
			}
			
			this.setState( prevState => {
				return {
					iconmenu: prevState.iconmenu === "hamburguer-menu"? "close-menu": "hamburguer-menu",
					iconmenu2: prevState.iconmenu2 === ""? "": "",
					iconmenuresorts: prevState.iconmenuresorts === "chevron-up"? "chevron-down": "chevron-down",
					colorresorts: prevState.colorresorts === "var(--rosy-pink)" ? 'var(--rosy-pink)' : "var(--rosy-pink)",
				}
			})
		}else if(menuRecive==2){
			if(this.state.iconmenuresorts=="chevron-down"){
				disableBodyScroll(document.querySelectorAll(".list-links")[1]);
				disableBodyScroll(document.querySelectorAll(".list-links")[2]);
			}else{
				enableBodyScroll(document.querySelectorAll(".list-links")[1]);
				enableBodyScroll(document.querySelectorAll(".list-links")[2]);
				enableBodyScroll(document.querySelector(".list-links"));
			}
			this.changeIconEv(1)
			let scrlMovilOurResots=this.divElement.childNodes[0].childNodes[2]
			let height1 = document.querySelector(".mask").clientHeight;
			let height2 = document.querySelector(".bg-top-menu").clientHeight;
			let height3 = document.querySelector(".floatingMenu").clientHeight;
			let height = innerHeight-height1-height2-height3+5;
			scrlMovilOurResots.style="height:"+height+"px"
			let scrlMovilByDestination=this.divElement.childNodes[0].childNodes[1]
			scrlMovilByDestination.style="height:"+height+"px"
			
			if(this.divElement.style.top==""+(45/16)+"rem"){/*45px*/
				this.divElement.style.top = "-"+((innerHeight+134)/16)+"rem";/*600px*/
			}else{
				this.elElement.style.top="-"+((innerHeight+height)/16)+"rem";/*700px*/
				this.divElement.style.top=""+(45/16)+"rem";/*45px*///desoculta2
			}
			this.setState( prevState => {
				return {
					//menuChange:0,
					iconmenuresorts: prevState.iconmenuresorts === "chevron-down"? "chevron-up": "chevron-down",
					colorresorts: prevState.colorresorts === "var(--rosy-pink)" ? 'var(--rosy-pink)' : "var(--rosy-pink)",
					iconmenu: prevState.iconmenu === "close-menu"? "hamburguer-menu": "hamburguer-menu",/*Close-menu*/
					iconmenu2: prevState.iconmenu2 === ""? "": "",
				}
			})
		}else{
			document.getElementsByTagName("body")[0].style.overflow="";
			this.changeIconEv(1)
			this.setState( prevState => {
				return {
					//menuChange:0,
					iconmenuresorts: "chevron-down",
					colorresorts: "var(--rosy-pink)",
					iconmenu:"hamburguer-menu",/*Close-menu*/
					iconmenu2:"hamburguer-menu",
				}
			})
			this.elElement.style.top="-"+((innerHeight+134)/16)+"rem";/*700px*/
			this.divElement.style.top="-"+((innerHeight+134)/16)+"rem";/*700px*/
		}
		
	}


	componentDidUpdate() {
		/* let urlActual = window.location.pathname.split("/")
		let nav = this.menuLi.current.children
		let navTop = this.menuLiTop.current.children
		for (let i = 0; i < nav.length - 1; i++) {
			nav[i].children[0].className = "nav-link-weddings"
			if (urlActual.length > 2) {
				let posUrl = nav[i].children[0].attributes[1].value.split("/")
				let selec = posUrl.length > 2 ? posUrl[posUrl.length - 1] : "noneDataCharge"
				if (urlActual[2] == selec) {
				nav[i].children[0].className = "active"
				} else {
				nav[i].children[0].className = "nav-link-weddings"
				}
			}
		}
		for (let a = 0; a < navTop.length - 3; a++) {
			navTop[a].children[1].className = ""
			if (urlActual.length > 2) {
				let posUrl = navTop[a].children[1].attributes[0].value.split("/")
				let selec = posUrl[2] != null ? posUrl[2] : ""
				if (urlActual[2] == selec) {
				navTop[a].children[1].className = "active"
				} else {
				navTop[a].children[1].className = ""
				}
			}
		} */
		//menuLiTop
	}


	componentDidMount() {
		this.props.match
		
		
		//const { match: { params } } = this.props;
		/* switch (params.lang) {
			case "es":
				this.setState({
				menuChange:       Math.floor(Math.random() * 2),
				menuMobile:       menusES.menuMobile,
				menuOurResorts:   menusES.menuResorts,
				topMenu:          menusES.topMenu,
				mainMenu:         menusES.mainMenu
				});
				break;
			default:
				this.setState({
				menuChange:       Math.floor(Math.random() * 2),
				menuMobile:       menus.menuMobile,
				menuOurResorts:   menus.menuResorts,
				topMenu:          menus.topMenu,
				mainMenu:         menus.mainMenu
				});
				break;
		} */
		/* window.onresize = () => {
		if(document.activeElement.id == "emailnewsletter"){
			let height1 = document.querySelector(".mask").clientHeight;
			let height2 = document.querySelector(".bg-top-menu").clientHeight;
			let height3 = document.querySelector(".floatingMenu").clientHeight;
			let height = innerHeight-(height1+height2+height3+5);
			this.elElement.childNodes[0].lastChild.style="height:"+height+"px";
		}else if(document.activeElement.id == ""){
			let height1 = document.querySelector(".mask").clientHeight;
			let height2 = document.querySelector(".bg-top-menu").clientHeight;
			let height3 = document.querySelector(".floatingMenu").clientHeight;
			let height = innerHeight-(height1+height2+height3+5);
			this.elElement.childNodes[0].lastChild.style="height:"+height+"px";
			let scrlMovilOurResots=this.divElement.childNodes[0].childNodes[2]
			let height4 = document.querySelector(".mask").clientHeight;
			let height5 = document.querySelector(".bg-top-menu").clientHeight;
			let height6 = document.querySelector(".floatingMenu").clientHeight;
			let height7 = innerHeight-height4-height5-height6+5;
			scrlMovilOurResots.style="height:"+height7+"px"
			let scrlMovilByDestination=this.divElement.childNodes[0].childNodes[1]
			scrlMovilByDestination.style="height:"+height7+"px"
		}
		
		}; */
	}


	handle_001(){
		$('nav ul li > a:not(:only-child)').click(function(e) {
			$(this).siblings('.nav-dropdown').toggle();
			$('.nav-dropdown').not($(this).siblings()).hide();
			e.stopPropagation();
		});
		$('html').click(function() {
			$('.nav-dropdown').hide();
		});
	}
	handle_002(){
		document.querySelector('#nav-toggle').addEventListener('click', function() {
			this.classList.toggle('active');
		});
	}
	handle_003(){
		$('#nav-toggle').click(function() {
			$('nav ul').toggle();
		})
	}

	render() {
		{/* <section component="navbar" onClick={this.props.reference.bind(this, "")}>
		<div className="container">
			<div className="mask"></div>
			<Link onClick={this.changeMenuHandler.bind(this, 3)} className={this.state.menuChange == 0 ? "navbar-brand" : "navbar-brand2"} to={"/"+params.lang}>
				<Iconwedd icon="palace-weddings-logo"></Iconwedd>
			</Link>
			<a className={this.state.menuChange == 0 ? "ButtonToggler" : "ButtonToggler3"} onClick={this.changeMenuHandler.bind(this, 1)}>
				<div onClick={this.changeIconEv.bind(this, 1)}>
					<Iconwedd style={this.state.changeIcon == 1 ? { display: "none" } : { display: "" }} icon={"close-menu"} color={"pink"} />
				</div>
				<div onClick={this.changeIconEv.bind(this, 2)}>
					<Iconwedd style={this.state.changeIcon == 2 ? { display: "none" } : { display: "" }} icon={"hamburguer-menu"} color={"pink"} />
				</div>
			</a>
			<a className={this.state.menuChange == 0 ? "ButtonToggler2" : "ButtonToggler4"} onClick={this.changeMenuHandler.bind(this, 2)} ref={a2 => this.a2Element2 = a2} >
				<span style={{ color: this.state.colorresorts }}>{params.lang=="es"?"RESORTS":"OUR RESORTS"}</span>   &nbsp;
					<Iconwedd icon="chevron-up" style={this.state.iconmenuresorts == "chevron-up" ? { display: "" } : { display: "none" }} color={"pink"} />
				<Iconwedd icon="chevron-down" style={this.state.iconmenuresorts == "chevron-down" ? { display: "" } : { display: "none" }} color={"pink"} />
			</a>

			<div ref={ul => this.elElement = ul} className="menu_mobile d-none">
				<MenuMobile handler={this.changeMenuHandler} items={this.state.menuMobile} />
			</div>
			<div ref={div => this.divElement = div} className="menu_resorts d-none">
				<MenuResorts handler={this.changeMenuHandler} items={this.state.menuOurResorts} />
			</div>
			<div className="menu_actions">
				<Topmenu variable={this.props.variable} handleClick={this.props.reference} menuLiTop={this.menuLiTop} topmenu={this.state.topMenu} />
			</div>
			<div className="main-menu">
				<Mainmenu menuLi={this.menuLi} mainmenu={this.state.mainMenu} />
			</div>
		</div>
		</section> */}

		// const { match: { params } } = this.props;
		
		
		if (true) {
			return (
					<section component="navbar" style={{position: "absolute"}} onClick={this.props.reference.bind(this, "")}>
					<nav>
						<div id="logo">Your Logo here</div>

						<label for="drop" className="toggle">Menu</label>
						<input type="checkbox" id="drop" />
							<ul className="menu">
								<li><a href="#">Title 1</a></li>
								<li>
									{/* <!-- First Tier Drop Down --> */}
									<label for="drop-1" className="toggle">Title 2 +</label>
									<a href="#">Title 2</a>
									<input type="checkbox" id="drop-1"/>
									<ul>
										<li><a href="#">Sub title 1</a></li>
										<li><a href="#">Sub title 2</a></li>
										<li><a href="#">Sub title 3</a></li>
									</ul> 

								</li>
								<li>

								{/* <!-- First Tier Drop Down --> */}
								<label for="drop-2" className="toggle">Title 3 +</label>
								<a href="#">Title 3</a>
								<input type="checkbox" id="drop-2"/>
								<ul>
									<li><a href="#">Sub title 1</a></li>
									<li><a href="#">Sub title 2</a></li>
									<li>
									
									{/* <!-- Second Tier Drop Down --> */}        
									<label for="drop-3" className="toggle">Sub title 3 +</label>
									<a href="#">Sub title 3</a>         
									<input type="checkbox" id="drop-3"/>

									<ul>
										<li><a href="#">Sub sub title 1</a></li>
										<li><a href="#">Sub sub title 1</a></li>
										<li><a href="#">Sub sub title 1</a></li>
									</ul>
									</li>
								</ul>
								</li>
								<li><a href="#">Graphic Design</a></li>
								<li><a href="#">Inspiration</a></li>
								<li><a href="#">Contact</a></li>
								<li><a href="#">About</a></li>
							</ul>
						</nav>
					</section>
				);
			} else {
				return (<span></span>)
			}
		}
	}


// export default withRouter(WithContext(Navbar));