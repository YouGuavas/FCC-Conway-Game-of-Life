import React, { Component } from 'react';

export class Cells extends Component {
	render() {
		const cells = this.props.cells;
		let rows = [];
		let dim = 620;
		for (let i = 0; i < cells.length; i++) {
			const e = cells[i];
			if (i%this.props.width === 0) rows.push( <tr className="row"></tr>)
				rows.push(<td id={e.id} style={{height:Math.floor(dim/this.props.width)+'px', width:Math.floor(dim/this.props.width) + 'px'}} className={e.status} onClick={this.props.handleClick}></td>)}	 		
		return(
			<section className="gameContainer">
				<table>
					{rows}
				</table>
			</section>
		)
	}
}