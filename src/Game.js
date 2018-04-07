import React, { Component } from 'react';
import { Cells } from './Cells';
import './Game.css';


export class Game extends Component {
	gameOfLife() {
		let a = this.state.cells;
		let cells = [];
		const getCount = td => {
			let max = this.state.width * this.state.height;
			let indices = [td+1, td-1, td+this.state.height, td-this.state.height, td+this.state.height+1, td+this.state.height-1, td-this.state.height+1, td-this.state.height-1]
			let count = 0;
			if (a[td].status === 'young') console.log(td, indices);
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
		for (let c = 0; c < this.state.cells.length; c++) {
			const counter = getCount(c);
			if (counter === 3 && a[c].status === 'dead') {
				cells.push({id:c, status:'young'});
			}
			if ((counter === 2 || counter === 3) && (a[c].status === 'young' || a[c].status === 'old')) {
				cells.push({id:c, status:'old'});
			}
			if (counter === 2 && a[c].status === 'dead') {
				cells.push({id:c, status:'dead'})
			}
			if ((counter < 2 || counter > 3)) {
				cells.push({id:c, status:'dead'});
			}
		}
		//console.log(a);
		//console.log(cells);
		this.setState({
			cells,
			generation:this.state.generation+1
		});
	}
	
	createCells() {
		let cells = [];
		for (let i = 0; i < this.state.height*this.state.width; i++) {
			cells.push({id:i,status:'dead'});
		}
		for (let i = 0; i < cells.length/3; i++) {
			cells[Math.floor(Math.random()*cells.length)].status = 'young';
		}
		this.setState({
			cells,
			generation:0
		});
	}
	componentWillMount() {
		this.createCells();
	}
	setDimensions(a, b) {
		this.setState({width:b, height:a,activeButton:String(a + 'x' + b)}, () => {
			this.createCells();
		});
	}
	handleCellClick(e) {
		const myself = document.getElementById(e.target.id);
		myself.className === 'dead' ? myself.className = 'young' : myself.className = 'dead';
		let cells = Array.prototype.map.call(document.getElementsByTagName('td'), element => {
			return {id:element.id, status: element.className}
		});
		this.setState({
			cells
		});
	}
	clear() {
		let cells = [];
		for (let i = 0; i < this.state.height*this.state.width; i++) {
			cells.push({id:i,status:'dead'});
		}
		this.setState({
			cells
		});
	}
	constructor(props) {
		super(props);
		this.state = {
			height: 50,
			width:30,
			cells: [],
			running:1,
			activeButton:'40x20',
			generation: 0
		}
		this.handleCellClick = this.handleCellClick.bind(this);
		this.createCells = this.createCells.bind(this);
		this.setDimensions = this.setDimensions.bind(this);
		this.gameOfLife = this.gameOfLife.bind(this);
		this.clear = this.clear.bind(this);
	}
	render() {
		return(
			<section className="gameBoard">
				<h3>Generation: {this.state.generation}</h3>
				<div>
					<Button val="40x20" className={this.state.activeButton === '40x20' ? 'active' : ''} handleClick={() => {this.setDimensions(40,20);}}/>
					<Button val="50x30" className={this.state.activeButton === '50x30' ? 'active' : ''} handleClick={() => {this.setDimensions(50,30);}}/>
					<Button val="70x50" className={this.state.activeButton === '70x50' ? 'active' : ''} handleClick={() => {this.setDimensions(70,50);}}/>
				</div>
				<Button val="Run" handleClick={this.gameOfLife}/>
				<Button val="Pause" />
				<Button val="Clear" handleClick={this.clear} />
				<Cells height={this.state.height} width={this.state.height} cells={this.state.cells} handleClick={this.handleCellClick}/>
			</section>
			)
	}
}

class Button extends Component {render() {return(<button className={this.props.className} onClick={this.props.handleClick}>{this.props.val}</button>)}}
