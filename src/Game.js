import React, { Component } from 'react';
import { Cells } from './Cells';
import './Game.css';


export class Game extends Component {
	gameOfLife() {
		let a = [];
		let b = [];
		for ( let i = 0; i < this.state.height * this.state.width; i++) {
			let status = document.getElementById(String(i)).className;
			a.push({id:i, status: status});
		}

		const getCount = td => {
			let max = this.state.width * this.state.height;
			let indices = [td+1, td-1, td+this.state.width, td-this.state.width, td+this.state.width+1, td+this.state.width-1, td-this.state.width+1, td-this.state.width-1]
			let count = 0;
			indices.map(element => {
				if (element >= 0 && element < max) {
					if (a[element].status === 'old' || a[element].status === 'young') { count++ };
				} 
				if (element < 0) {
					element = max+element;
					if (a[element].status === 'old' || a[element].status === 'young') { count++ };
				}
				if (element > max) {
					element = element-max;
					if (a[element].status === 'old' || a[element].status === 'young') { count++ };
				}
			});
			return count;
		}
		for (let i = 0; i < a.length; i++) {
			const counter = getCount(i);
			if (counter === 3 && a[i].status === 'dead') {
				b.push({id:i, status:'young'});
			}
			if ((counter === 2 || counter === 3) && a[i].status === 'young') {
				b.push({id:i, status:'old'});
			}
			if ((counter < 2 || counter > 3) && a[i].status !== 'dead') {
				b.push({id:i, status:'dead'});
			}
		}
		for (let i = 0; i < b.length; i++) {
			document.getElementById(b[i].id).className = b[i].status;
		}
	}

	runGame() {
		let count = 0;
		while (this.state.running === 1) {
			this.gameOfLife();
			count ++;
			if (count === 5) {
				this.setState({
					running: 0
				});
			}
		}
	}
	createCells() {
		let cells = [];
		for (let i = 0; i < this.state.height; i++) {
			let row = [];
			for (let j = 0; j < this.state.width; j++) {
				row.push({id:(j+(i*this.state.width)),status:'dead'});
			}
			cells.push(row);
		}
		return cells;
	}
	setDimensions(a, b) {
		this.setState({width:a, height:b});
	}
	clear() {
		const cells = document.getElementsByTagName('td');
		Array.prototype.map.call(cells, element => {
			element.className = 'dead';
		});
	}
	constructor(props) {
		super(props);
		this.state = {
			height: 30,
			width:50,
			board: [],
			cells: [],
			running:1
		}
		this.createCells = this.createCells.bind(this);
		this.runGame = this.runGame.bind(this);
		this.setDimensions = this.setDimensions.bind(this);
		this.clear = this.clear.bind(this);
		this.gameOfLife = this.gameOfLife.bind(this);
	}
	render() {
		return(
			<section>
				<div>
					<Button val="40x20" handleClick={() => {this.setDimensions(40,20);this.clear();}}/>
					<Button val="50x30" handleClick={() => {this.setDimensions(50,30);this.clear();}}/>
					<Button val="70x50" handleClick={() => {this.setDimensions(70,50);this.clear();}}/>
				</div>
				<Button val="Run" handleClick={this.gameOfLife}/>
				<Button val="Pause" />
				<Button val="Clear" handleClick={this.clear} />
				<Cells createCells={this.createCells}/>
			</section>
			)
	}
}

class Button extends Component {render() {return(<button onClick={this.props.handleClick}>{this.props.val}</button>)}}
