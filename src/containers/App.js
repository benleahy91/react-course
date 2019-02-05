import React, { PureComponent } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends PureComponent {
	constructor(props) {
		super(props);
		console.log('[App.js] Inside Constructor', props);
		this.state = {
			persons: [
				{ id: 'aa', name: 'Ben', age: 27 },
				{ id: 'bb', name: 'Karl', age: 22 },
				{ id: 'cc', name: 'Barl', age: 31 }
			],
			otherState: 'something else',
			showPersons: false,
		};
	};

	componentWillMount() {
		console.log('[App.js] Inside componentWillMount()',);
	};

	componentDidMount() {
		console.log('[App.js] Inside componentDidMount()');
	};

	// shouldComponentUpdate(nextProps, nextState) {
	// 	console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
	// 	return nextState.persons !== this.state.persons || nextState.showPersons !== this.state.showPersons;
	// };

	componentWillUpdate(nextProps, nextState) {
		console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
	};

	componentDidlUpdate() {
		console.log('[UPDATE App.js] Inside componentDidUpdate');
	};

	// state = {
	// 	persons: [
	// 		{ id: 'aa', name: 'Ben', age: 27 },
	// 		{ id: 'bb', name: 'Karl', age: 22 },
	// 		{ id: 'cc', name: 'Barl', age: 31 }
	// 	],
	// 	otherState: 'something else',
	// 	showPersons: false,
	// };

	nameChangedHandler = (event, id) => {
		const personIndex = this.state.persons.findIndex(p => {
			return p.id === id;
		});
		const person = {
			...this.state.persons[personIndex]
		};
		person.name = event.target.value;
		const persons = [...this.state.persons];
		persons[personIndex] = person
		this.setState({ persons: persons });
	};

	deletePersonHandler = (personIndex) => {
		// const persons = this.state.persons.slice();
		const persons = [...this.state.persons];
		persons.splice(personIndex, 1);
		this.setState({ persons: persons });
	};

	togglePersonsHandler = () => {
		const doesShow = this.state.showPersons;
		this.setState({ showPersons: !doesShow });
	};

	render() {
		console.log('[App.js] Inside Render()');
		let persons = null;

		if (this.state.showPersons === true) {
			persons = <Persons
				persons={ this.state.persons }
				clicked={ this.deletePersonHandler }
				changed={ this.nameChangedHandler }
			/>
		};
    return (
      <div className={ classes.App }>
				<button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
				<Cockpit
					appTitle={ this.props.title }
					showPersons={ this.state.showPersons }
					persons={ this.state.persons }
					clicked={ this.togglePersonsHandler }
				/>
				{ persons }
      </div>
		);
  };
};

export default App;