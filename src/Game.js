import React, { Component } from 'react';
import './Game.css';


export class Game extends Component {
	gameOfLife() {
		let a = [];
		let b = [];
		for ( let i = 0; i < this.state.height * this.state.width; i++) {
			a.push({id:i, status: document.getElementById(String(i)).className.indexOf('alive') === -1 ? 'dead' : 'alive'});
		}

		const getCount = td => {
			let max = this.state.width * this.state.height;
			let indices = [td+1, td-1, td+this.state.width, td-this.state.width, td+this.state.width+1, td+this.state.width-1, td-this.state.width+1, td-this.state.width-1]
			let count = 0;
			indices.map(element => {
				if (element >= 0 && element < max) {
					if (a[element].status === 'alive' || a[element].status === 'young') { count++ };
					return a[element].status;
				} else {
					return 'null';
				}
			});
			return count;
		}
		for (let i = 0; i < a.length; i++) {
			const counter = getCount(i);
			(counter > 3 || counter < 2) ? b.push({ id: i, status: 'dead'}) : (a[i].status == 'alive') ? b.push({id:i, status:'alive'}) : (counter === 3) ? b.push({id:i, status:'alive'}) : b.push({id:i, status:'dead'});
		}
		for (let i = 0; i < b.length; i++) {
			document.getElementById(String(i)).className = b[i].status + ' cell';
		}

	}


	createCells(d) {
		let cells = [];
		for (let i = 0; i < d.y; i++) {
			let row = [];
			for (let j = 0; j < d.x; j++) {
				row.push([]);
			}
			cells.push(row);
		}
		return cells;
	}
	setDimensions(a, b) {
		this.setState({width:a, height:b});
	}
	clear() {
		const cells = document.getElementsByClassName('cell');
		Array.prototype.map.call(cells, element => {
			element.className = 'dead cell';
		});
	}
	constructor(props) {
		super(props);
		this.state = {
			height: 30,
			width:50,
			cells: []
		}
		this.createCells = this.createCells.bind(this);
		this.setDimensions = this.setDimensions.bind(this);
		this.clear = this.clear.bind(this);
		this.gameOfLife = this.gameOfLife.bind(this);
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
		const height = Math.floor(400/(this.props.handlers.cells.y));
		const theseCells = this.props.handlers.createCells(this.props.handlers.cells);
		let tC = [];
		return(
				<table className="gameBoard">
					<tbody>
					{theseCells.map(element => <tr className="row" style={{height:height}}>{element
							.map(e => <Cell id={(theseCells.indexOf(element))*this.props.handlers.cells.x +
							 (theseCells[theseCells.indexOf(element)].indexOf(e))} className='cell' dimension={{height:height}}/>)}</tr>)}
					</tbody>
				</table>
		)
	}
}

class Cell extends Component {
	handleClick() { this.state.life == 'alive' ? this.setState({ life: 'dead' }) : this.setState({ life: 'alive' }); } 
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
			<td id={this.props.id} className={this.state.life + ' cell'} style={{height:this.props.dimension.height+'px', width:this.props.dimension.height+'px'}} onClick={this.handleClick}></td>
			)
	}
}

class Button extends Component {render() {return(<button onClick={this.props.handleClick}>{this.props.val}</button>)}}
