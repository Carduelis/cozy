import React, { Component } from 'react';
import Place from './Place';

const data = [
	{
		id: 1,
		title: 'dipisicing elit',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
		visited: true
	},
	{
		id: 2,
		title: 'dipisicing elit',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
		visited: false
	},
	{
		id: 3,
		title: 'dipisicing elit',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
		visited: false
	},
	{
		id: 4,
		title: 'dipisicing elit',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
		visited: false
	},
	{
		id: 5,
		title: 'dipisicing elit',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
		visited: false
	}
];

class PlacesList extends Component {
	render() {
		return data.map(item => <Place key={item.id} {...item} />);
	}
}

export default PlacesList;
