import React, { Component } from 'react';
import { Grid, Cell } from "@components";
import UseText from '@app/UseText';
export default class DetailCatalog extends Component {
    constructor(props){
       super(props)
       this.state = {
         pastel1:{},
         pastel2:{},
         pastel3:{},
       };
    }
    componentDidMount(){
        const gallery_data=this.props.gallery_data || {}
        const random=function(gallery_data){
            let keys=Object.keys(gallery_data);
            return gallery_data[keys[keys.length*Math.random()<<0]];
        }
     const pastel1 = random(gallery_data) || ""
     const pastel2 = random(gallery_data) || ""
     const pastel3 = random(gallery_data) || ""
     const name1 = this.nameLetter(pastel1);
     const name2 = this.nameLetter(pastel2);
     const name3 = this.nameLetter(pastel3);
     const subtitle1 = this.subtitleLetter(pastel1);
     const subtitle2 = this.subtitleLetter(pastel2);
     const subtitle3 = this.subtitleLetter(pastel3);
     
     this.setState({ pastel1, pastel2, pastel3, name1, name2, name3, subtitle1, subtitle2, subtitle3});
    }
    
    nameLetter(pastel){
        const rawName = pastel.label.split(" ", 1);
        const name = rawName[0].toLowerCase().charAt(0).toUpperCase() + rawName[0].toLowerCase().slice(1);
        return name;
    }
    subtitleLetter(pastel){
        const rawSubtitle = pastel.label.substring(pastel.label.split(" ", 1)[0].length + 1);
        const subtitle = (rawSubtitle.toLowerCase()).charAt(0).toUpperCase() + rawSubtitle.toLowerCase().slice(1);
        return subtitle;
    }
    
    render() {

      return (
        <div>
                <p style={{ textAlign:'center',marginTop:'100px'}} className="texto-description subtitle subtitle-2">
                    <UseText i18n="MAY_INTEREST" />
                </p>
            <section component="cakeDetail" style={{ textAlign:'center', border:"solid 1px #FEDFD9"}} >
                <Grid type="x"  >
                    <Cell small="4" medium="4" large="4" className={"border-20-20-f2f2f2 bor-top"}>
                            <div>        
                                <img src={ this.state.pastel1.src } alt="placeholder"/>
                                <h5 style={{ textAlign:'center' }}> {this.state.name1}<br></br>{this.state.subtitle1 }</h5>     
                            </div>
                    </Cell>
                    <Cell small="4" medium="4" large="4" className={"border-20-20-f2f2f2 bor-top"}>
                            <div>        
                                <img src={ this.state.pastel2.src } alt="placeholder"/>
                                <h5 style={{ textAlign:'center' }}> {this.state.name2}<br></br>{this.state.subtitle2 }</h5> 

                            </div>
                    </Cell>
                    <Cell small="4" medium="4" large="4" className={"border-20-20-f2f2f2 bor-top"}>
                            <div>        
                                <img src={ this.state.pastel3.src } alt="placeholder"/>
                                <h5 style={{ textAlign:'center' }}> {this.state.name3}<br></br>{this.state.subtitle3 }</h5> 
                            </div>
                    </Cell>
                </Grid>
            </section>
         </div>
      )
   }
}
