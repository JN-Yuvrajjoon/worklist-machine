import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


// Exercise component: a functional react component 
// Just need to accept props and return JSX
// This is small enough to be put in the exercises-list file and not its own
const Exercise = props => ( //Returns the row of a table
	<tr> 
		<td>{props.exercise.username}</td>
		<td>{props.exercise.description}</td>
		<td>{props.exercise.duration}</td>
		<td>{props.exercise.date.substring(0,10)}</td>
		<td>
			<Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
		</td>
	</tr>
)

// ExercisesList: A CLASS component
export default class ExercisesList extends Component {
	constructor(props) {
		super(props);

		this.deleteExercise = this.deleteExercise.bind(this);

		this.state = {exercises: []};
	}

	componentDidMount() {
		axios.get("http://localhost:5000/exercises/")
		.then(response => {
			this.setState({exercises: response.data}) // We want all the fields!
		})
		.catch((error) => {
			console.log(error);
		})
	}

	deleteExercise(id) {
		axios.delete("http://localhost:5000/exercises/"+id) //exact url
			.then(res => console.log(res.data)); //mongo response?

		this.setState({
			exercises: this.state.exercises.filter(el => el._id !== id) //React is filtering each element: Return el only if el._id is not id
		})
	}

	exerciseList() {
		return this.state.exercises.map(currentexercise => {
			return <Exercise exercise={currentexercise} deleteExercise ={this.deleteExercise} key={currentexercise._id}/>;
		}) // for every exercise, return a Component.
	}

	render() {
		return (
			<div>
				<h3>Logged Exercises</h3>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Username</th>
							<th>Description</th>
							<th>Duration</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
					{ this.exerciseList() }
					</tbody>
				</table>
			</div>
		)
	}
}