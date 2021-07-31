import React from "react";
import { Cell, Grid } from "@components";
import Api from "@app/Api";
import UseText from "@app/UseText";
import WithContext from '@app/ServiceContext';


const todoRowRight = {
	background: 'linear-gradient(86deg, rgba(252,222,215,1) 91%, rgba(255,255,255,1) 100%)',
};
const todoRowLeft = {
	background: 'linear-gradient(86deg, rgba(255,255,255,1) 0%, rgba(252,222,215,1) 15%)',
};

class TODOView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
		this._isMounted = false;
    }

	componentDidMount() {
		this._isMounted = true;
		this.getData();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	componentDidUpdate(prevProps) {
		if(prevProps.app.languageId != this.props.app.languageId) this.getData();
	}

	getData = async() => {
		const lang = (this.props.app.languageId) ? this.props.app.languageId : 1 ;
		const r = await Api.getTODO(lang);
		if(this._isMounted) this.setState({data: r.data || r || {} });
	}

	render() {
		return <Grid className="todo-list">
			<Cell large="12">
				<h1 className="todo-header"><UseText i18n="YOUR_WEDDING_TIMELINE"/></h1>
				<p className="todo-description"><UseText i18n="SAVE_THESE_DATES"/></p>
			</Cell>
			<Cell large="12">
				{this.state.data.map((data, k) => {
					let number = (k+1);
					let isLeft = ((number % 2) == 0);
					return <Grid key={k} type="x" className="grid-padding-x todo-card" style={!isLeft ? todoRowLeft : todoRowRight}>
						<Cell large="6" className={`todo-content ${isLeft ? 'large-offset-6' : ''}`}>
							<Grid className="text-center">
									<h2 className="todo-subtitle">
										<span className="todo-circle">{number}</span>
										{data.title}
									</h2>
							</Grid>
							<Cell large="12" className="todo-text">
								<ul>{data.details && data.details.map((v, i) => <li key={i}><p>{v}</p></li>)}</ul>
							</Cell>
						</Cell>
					</Grid>
				})}
			</Cell>
		</Grid>;
	}
}
export default WithContext(TODOView);