import React, { Component } from 'react';
import { Grid, Cell } from '@components';
import { Titlesection, Input } from '../../oldweddingcomponents/wirefragment';

export default class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            stayhotel: false,
            show: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.name === 'stayhotel' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }


    render() {
        return (

            <Grid>
                <Titlesection
                    key={"title"}
                    title={"Tempted to be part"}
                    subtitle={"OF THE PALACE RESORTS WEDDING FAMILY?"}
                />
                <Grid type="x" className="grid-margin-x">
					<Cell className="input-group" small="6" medium="6">
						<input
							placeholder="Jane"
							id="first_name"
							type="text"
							className="validate"
						/>
						<label htmlFor="first_name" className="active">
							First Name
						</label>
					</Cell>
					<Cell className="input-group" small="6" medium="6">
                        <input
                            placeholder="Smith"
                            id="last_name" 
                            type="text" 
                            className="validate"
                        />
						<label htmlFor="last_name" className="active">
                            Last Name
                        </label>
					</Cell>
                    <Cell className="input-group" small="12">
                        <input
                            placeholder="1 (222) 23 3456"
                            id="phone_number" 
                            type="text" 
                            className="validate"
                        />
						<label htmlFor="last_name" className="active">
                            Phone Number
                        </label>
					</Cell>
                    <Cell className="input-group" small="12">
                        <label>
                            Please, check here if you have stayed with us before
                            <input
                                name="stayhotel"
                                type="checkbox"
                                checked={this.state.stayhotel}
                                onChange={this.handleInputChange} />
                        </label>
                    </Cell>
                    <Cell className="input-group" small="12">
                        <textarea 
                            value={""} 
                            onChange={this.handleChange} 
                        />
                    </Cell>
                    <Cell className="input-group" small="12" medium="12">
                        <center>
                            <button className="button">SIGN IN</button>
                        </center>
                    </Cell>
                    <Cell className="input-group" small="12" medium="12">
                        <center>
                            <a href="/login">
                                Back to Login
                            </a>    
                        </center>
                     </Cell>
			    </Grid>
            </Grid>
        )
    }
}