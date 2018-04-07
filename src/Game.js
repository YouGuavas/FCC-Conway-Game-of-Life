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
			indices.map(element => {
				//Count living neighbor cells
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
				//If a dead cell has exactly 3 neighbors, bring it to life
				cells.push({id:c, status:'young'});
			}
			if ((counter === 2 || counter === 3) && (a[c].status === 'young' || a[c].status === 'old')) {
				//If a living cell has 2 or 3 neighbors, advance its age
				cells.push({id:c, status:'old'});
			}
			if (counter === 2 && a[c].status === 'dead') {
				//If a status is dead, stay dead. This seems redundant, but I did some silliness that makes this necessary.
				cells.push({id:c, status:'dead'})
			}
			if ((counter < 2 || counter > 3)) {
				//If too many or too few living neighbors, die
				cells.push({id:c, status:'dead'});
			}
		}
		let check = 0;
		for (let i = 0; i < cells.length; i++) {
			if (cells[i].status === 'dead') {check++}
				//Check if whole board has died
		};
		if (check !== a.length) {
			this.setState({
				cells,
				generation:this.state.generation+1
			});
		} else {
			this.setState({
				cells,
				generation:0,
				running:0
			});
		}
	}
	createCells() {
		let cells = [];
		for (let i = 0; i < this.state.height*this.state.width; i++) {
			cells.push({id:i,status:'dead'});
		}
		for (let i = 0; i < cells.length/3; i++) {
			cells[Math.floor(Math.random()*cells.length)].status = 'young';
			//Randomly populate 33% of the board with young living cells
		}
		this.setState({
			cells,
			generation:0
		});
	}
	componentWillMount() {
		this.createCells();
	}
	componentDidMount() {
		this.start();
		//Automatically start the game
	}
	handleCellClick(e) {
		const myself = document.getElementById(e.target.id);
		myself.className === 'dead' ? myself.className = 'young' : myself.className = 'dead';
		//If cell is dead, bring it to life, and vice versa
		let cells = Array.prototype.map.call(document.getElementsByTagName('td'), element => {
			return {id:element.id, status: element.className}
		});
		//Update state to reflect new cell status
		this.setState({
			cells
		});
	}

	//Button Functions
	setDimensions(a, b) {
		this.setState({width:b, height:a,activeButton:String(a + 'x' + b)}, () => {
			this.createCells();
		});
	}
	clear() {
		let cells = [];
		for (let i = 0; i < this.state.height*this.state.width; i++) {
			cells.push({id:i,status:'dead'});
		}
		this.state.running === 1 ? clearInterval(this.timer) : '';
		this.setState({
			cells,
			running:0,
			generation:0
		});
	}
	pause() {
		this.setState({
			running:0
		})
	}
	timer() {
		setTimeout(() => {
			this.gameOfLife();
			if(this.state.running === 1) {
				this.timer();
				//If we're still running, repeat the process
			}
		}, this.state.speed);
	}
	start() {
		this.setState({
			running:1
		}, () => {this.timer();});
	}
	setTime(d) {
		this.setState({
			running:0,
			speed:d
		}, () => {
			this.setState({
				running:1
			})
		})
	}
	constructor(props) {
		super(props);
		this.state = {
			height: 50,
			width:30,
			cells: [],
			running:0,
			activeButton:'40x20',
			speed:300,
			generation: 0
		}
		//Game Functions
		this.handleCellClick = this.handleCellClick.bind(this);
		this.createCells = this.createCells.bind(this);
		this.gameOfLife = this.gameOfLife.bind(this);
		//Button Functions
		this.setDimensions = this.setDimensions.bind(this);
		this.clear = this.clear.bind(this);
		this.start = this.start.bind(this);
		this.timer = this.timer.bind(this);
		this.pause = this.pause.bind(this);
	}
	render() {
		return(
			<section className="gameBoard">
				<h3>Generation: {this.state.generation}</h3>
				<section className="buttonRow">
					<section>
						<Button val="40x20" className={this.state.activeButton === '40x20' ? 'active' : ''} handleClick={() => {this.setDimensions(40,20);}}/>
						<Button val="50x30" className={this.state.activeButton === '50x30' ? 'active' : ''} handleClick={() => {this.setDimensions(50,30);}}/>
						<Button val="70x50" className={this.state.activeButton === '70x50' ? 'active' : ''} handleClick={() => {this.setDimensions(70,50);}}/>
					</section>
					<Button val="Run" handleClick={this.start} className={this.state.running === 1 ? 'active' : ''}/>
					<Button val="Pause" handleClick={this.pause} className={this.state.running === 0 ? 'active' : ''}/>
					<Button val="Clear" handleClick={this.clear} />
				</section>
				<Cells height={this.state.height} width={this.state.height} cells={this.state.cells} handleClick={this.handleCellClick}/>
				<section>
				 <Button val="Slow" className={this.state.speed=== 300 ? 'active' : ''} handleClick={() => {this.setTime(300)}}/>
				 <Button val="Fast" className={this.state.speed=== 5 ? 'active' : ''} handleClick={() => {this.setTime(5)}}/>
				</section>
			</section>
			)
	}
}

class Button extends Component {render() {return(<button className={this.props.className} onClick={this.props.handleClick}>{this.props.val}</button>)}}
