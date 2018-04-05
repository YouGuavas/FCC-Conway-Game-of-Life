import React, { Component } from 'react';
export class Cells extends Component {
	render() {
		const theseCells = this.props.createCells();
		return(
				<table className="gameBoard">
					<tbody>
					{theseCells.map((element, i) => <tr className="row" key={i}>{element
							.map((e, j) => <Cell id={e.id} key={j} className={e.status}/>)}</tr>)}
					</tbody>
				</table>
		)
	}
}

class Cell extends Component {
	handleClick() { this.state.life === 'young' ? this.setState({ life: 'dead' }) : this.setState({ life: 'young' }); } 
	//If cell is alive, kill it. Otherwise, bring it to life.
	constructor(props) {
		super(props);
		this.state = {
			life:'dead'
		}
		this.handleClick = this.handleClick.bind(this);
	}
	render() {
		return(
			<td id={this.props.id} className={this.state.life} onClick={this.handleClick}></td>
			)
	}
}