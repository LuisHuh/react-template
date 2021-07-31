import React,{Component} from 'react';

import { Grid, Cell, Button } from '../../../components';
import { Currency } from '@components';

class ViewDetail extends Component {
    componentDidUpdate(){
        if(this.props.data.title!=null){
            //document.querySelectorAll(".FormNewsletter")[2].style.display = "none"
            //document.querySelector(".commonlinks").style.display = "none"
            //document.querySelector(".slider").style.display = "none"
            document.querySelector(".titlesection").style.display = "none"
            //document.querySelector(".GradientBar").style.display = "none"
            document.querySelector(".tabcategoriescake").style.display = "none"
            document.querySelector(".push").style.display = "none"
            document.querySelector(".paginator")!=null?document.querySelector(".paginator").style.display = "none":null
            document.querySelector(".selectresorts").style.display = "none"
            document.querySelector(".show").style.display = "none"
            //document.querySelector("#replace-size")!=null?document.querySelector("#replace-size").style.display = "none":null
        }else{
            //document.querySelectorAll(".FormNewsletter")[2].style.display = ""
            //document.querySelector(".commonlinks").style.display = ""
            //document.querySelector(".slider").style.display = ""
            document.querySelector(".titlesection").style.display = ""
            document.querySelector(".GradientBar").style.display = ""
            //document.querySelector(".tabcategoriescake").style.display = ""
            document.querySelector(".push").style.display = ""
            document.querySelector(".selectresorts").style.display = ""
            document.querySelector(".show").style.display = ""
            document.querySelector(".paginator")!=null?document.querySelector(".paginator").style.display = "":null
            //document.querySelector("#replace-size")!=null?document.querySelector("#replace-size").style.display = "":null
        }
    }

    componentWillUnmount(){
        //document.querySelectorAll(".FormNewsletter")[2].style.display = ""
        //document.querySelector(".commonlinks").style.display = ""
        //document.querySelector(".slider").style.display = ""
        document.querySelector(".titlesection").style.display = ""
        document.querySelector(".GradientBar").style.display = ""
        //document.querySelector(".tabcategoriescake").style.display = ""
        document.querySelector(".push").style.display = ""
        document.querySelector(".paginator")!=null?document.querySelector(".paginator").style.display = "":null
        document.querySelector(".selectresorts").style.display = ""
        document.querySelector(".show").style.display = ""
    }
    

    render(){
        return (
            <section component="cakeDetail" className="show">
                <Grid type="x">
                    <Cell medium="1" large="3"></Cell>
                        <Cell small="12" medium="10" large="6">
                            <Grid type="x">
								<Cell small="2" medium="2" large="2" className="border-color">
									<a onClick={this.props.onBack } onClickCapture={()=>{localStorage.isBackTabs=true}}>
                                        <i className="prs pr-chevron-left pr-lg"></i>
									</a>
								</Cell>
								<Cell small="10" medium="10" large="10" className={"grid-flex-20-20-f2f2f2"}>
                                </Cell>
							</Grid>
                            <Grid type="x" className={"border-20-20-f2f2f2 bor-top"}  >
                                <Cell small="6" medium="6" large="6">
									<div className="_media_detail">
										<div className="_card_detail">        
                                            <img className="_photo_left img" src={ this.props.data.src } alt="placeholder"/>
										</div>
									</div>
								</Cell>
                                <Cell small="6" medium="6" large="6">
                                    <div className="_content_detail">
                                    {this.props.data.logo?
										<div className="_logo_detail">
											<img src={this.props.data.logo} alt="placeholder"/>
										</div>:null}
                                        {/* <Titlesection
                                            key={"title"}
                                            subtitle={ this.props.data.hasOwnProperty('title') ? this.props.data.title : ""}
                                            // subtitle={ props.data.hasOwnProperty('subtitle') ? props.data.title : "" }
                                            description={ this.props.data.hasOwnProperty('description') ? this.props.data.description : "" }
                                        /> */}
                                        <span className="subtitle-3">{ this.props.data.hasOwnProperty('title') ? this.props.data.title : ""}</span>
									</div>
                                    {
                                            this.props.data.hasOwnProperty('price') ? 
                                            <div className="_description_detail">
                                                <Currency isDefault={true} value={this.props.data.price} region={'usa'} />
                                            </div> 
                                            : null
                                    }  
									<div>
										<hr className="divider"></hr>
									</div>
                                    {
                                       this.props.data.hasOwnProperty('detail') ? 
                                       <div className="_description_detail">
                                               { this.props.data.detail }
                                       </div> 
                                       : null
                                    }        
                                    <Button onClick={  this.props.onAdd } className="primary" href="#" > {`${ this.props.onSelected ? "  PAY NOW" : "  ADD TO CART"} `}</Button>
                                </Cell>
                            </Grid>
                        </Cell>
                    <Cell medium="1" large="3"></Cell>
                </Grid>
            </section>
        );
    }
}

ViewDetail.defaultProps = { 
    data: {},
    onBack : () => {},
    onAdd : () => {},
    onClick : () => {},
    onSelected : false

};

export default ViewDetail;