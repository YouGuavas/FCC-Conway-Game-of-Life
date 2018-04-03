import React, { Component } from 'react';
import './Game.css';


export class Game extends Component {
	createCells(d) {
		let cells = [];
		for (let i = 0; i < d.y; i++) {
			let row = [];
			for (let j = 0; j < d.x; j++) {row.push([]);}
			cells.push(row);
		}
		return cells;
	}
	gameOfLife() {
		let getCount = (arr, instance) => {
			let count = 0;
			arr.map(g => {
				if (g === instance) {count++;}
				return null;
				});
			return count;
		}
		let getStatus = (c) => {
			const max = this.state.height * this.state.width;
			const indices = [c-1, c+1, c-this.state.width, c+this.state.width, c-this.state.width, c-this.state.width, c+this.state.width, c+this.state.width];
			let statuses = indices.map(e => {
				if(e>=0 && e<max) {return pseudoCells[e].status;} else {
					if (e < 0) {return pseudoCells[max+e-1].status;} else {
						return pseudoCells[(e-max)+1].status}}});
			let counter = getCount(statuses, 'alive cell');
			if (counter > 3 || counter < 2) {
				if(pseudoCells[c].status === 'alive cell') {pseudoCells[c].status = 'dead cell';} else {
					if (counter === 3) {
						if (pseudoCells[c].status === 'dead cell') {pseudoCells[c].status = 'alive cell';
					}}}}
				}

		let cells = document.getElementsByClassName('cell');
		let newCells = [];
		let pseudoCells = Array.prototype.map.call(cells, element => {return{status: element.className};});
		let p = new Promise((resolve, reject) => {
			pseudoCells.map(element => {
				let myInd = pseudoCells.indexOf(element);
				newCells.push(getStatus(myInd));
			});
			resolve();
		});
		p.then(() => {
			Array.prototype.map.call(cells, element => {
				const thisInd = Array.prototype.indexOf.call(cells, element);
				element.className = newCells[thisInd].status;
		});
	});}
	setDimensions(a, b) {
		this.setState({height:b, width:a});
	}
	clear() {
		let cells = document.getElementsByClassName('cell');
		Array.prototype.map.call(cells, element => {
			element.className = 'dead cell';
		});
	}
	constructor(props) {
		super(props);
		this.state = {
			height: 30,
			width:50
		}
		this.createCells = this.createCells.bind(this);
		this.gameOfLife = this.gameOfLife.bind(this);
		this.setDimensions = this.setDimensions.bind(this);
		this.clear = this.clear.bind(this);
	}
	render() {
		return(
			<section>
				<div>
					<Button val="50x30" handleClick={() => {this.setDimensions(50,30);this.clear();}}/>
					<Button val="70x50" handleClick={() => {this.setDimensions(70,50);this.clear();}}/>
					<Button val="100x80" handleClick={() => {this.setDimensions(100,80);this.clear();}}/>
				</div>
				<Button val="Run" handleClick={this.gameOfLife}/>
				<Button val="Pause" />
				<Button val="Clear" handleClick={this.clear} />
				<Cells handlers={{createCells: this.createCells, cells:{x:this.state.width, y:this.state.height}}}/>
			</section>
			)
	}
}

class Cells extends Component {
	render() {
		let height = Math.floor(400/(this.props.handlers.cells.y));
		return(
				<table className="gameBoard">
					<tbody>
					{this.props.handlers.createCells(this.props.handlers.cells)
						.map(element => <tr className="row" style={{height:height}}>{element
							.map(() => <Cell className='cell' dimension={{height:height, width:height}}/>)}</tr>)}
					</tbody>
				</table>
					)
			}
}

class Cell extends Component {
	handleClick() {
		if (this.state.life === 'dead') {
			this.setState({life: 'alive'});
		} else {
			this.setState({life: 'dead'});
		}
	}
	constructor(props) {
		super(props);
		this.state = {life:'dead'}
		this.handleClick = this.handleClick.bind(this);
	}
	render() {
		let classes = this.state.life + ' cell'
		return(
			<td className={classes} style={{height:this.props.dimension.height+'px', width:this.props.dimension.width+'px'}} onClick={this.handleClick}></td>
			)
	}
}
class Button extends Component {render() {return(<button onClick={this.props.handleClick}>{this.props.val}</button>)}}
