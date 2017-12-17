import diagonal from './diagonal';
import uniqId from './uniqId';
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */

// const FAKED_ZERO = 1e-6;
const FAKED_ZERO = 0;

function appendGroup(node, source) {
	return node
		.enter()
		.append('g')
		.attr('class', 'node')
		.attr('transform', d => `translate(${source.old_y},${source.old_x})`);
}
function circleAdder(nodeEnter, options) {
	// Add Circle for the nodes
	return nodeEnter
		.append('circle')
		.attr('r', FAKED_ZERO)
		.style('fill', d => (d._children ? 'lightsteelblue' : '#fff'));
}
function labelsAdder(nodeEnter, options) {
	// Add labels for the nodes
	const { UNIT, LINE_HEIGHT, CIRCLE_RADIUS, FONT_SIZE } = options;
	return (
		nodeEnter
			.append('text')
			.style('fill-opacity', FAKED_ZERO)
			.style('font-size', FAKED_ZERO)
			.attr('dy', `${LINE_HEIGHT / 4}${UNIT}`)
			// .attr('x', d => (d.children || d._children ? -13 : 13))
			.attr('x', `${-CIRCLE_RADIUS * 1.5 / FONT_SIZE}${UNIT}`)
			// .attr('text-anchor', d => (d.children || d._children ? 'end' : 'start'))
			.attr('text-anchor', 'end')
			.text(d => d.data.name)
	);
}

function nodeUpdater(nodeUpdate, options) {
	// Transition to the proper position for the node
	const { DURATION_TIME } = options;
	return nodeUpdate
		.transition()
		.duration(DURATION_TIME)
		.attr('transform', d => `translate(${d.y},${d.x})`);
}
function circleUpdater(nodeUpdate, options) {
	const { CIRCLE_RADIUS, UNIT, DURATION_TIME } = options;
	// Update the node attributes and style
	return nodeUpdate
		.select('circle')
		.transition()
		.duration(DURATION_TIME)
		.attr('r', `${CIRCLE_RADIUS}${UNIT}`)
		.style('fill', d => (d._children ? 'lightsteelblue' : '#fff'))
		.attr('cursor', 'pointer');
}
function labelUpdater(nodeUpdate, options) {
	const { CIRCLE_RADIUS, UNIT, DURATION_TIME, FONT_SIZE } = options;
	// Update the node attributes and style
	return nodeUpdate
		.select('text')
		.transition()
		.duration(DURATION_TIME)
		.style('fill-opacity', 1)
		.style('font-size', `${FONT_SIZE}${UNIT}`);
}

function onExit(node, source, options) {
	const { DURATION_TIME, UNIT } = options;
	// Remove any exiting nodes
	const nodeExit = node
		.exit()
		.transition()
		.duration(DURATION_TIME)
		.attr('transform', d => `translate(${source.y},${source.x})`)
		.remove();

	// On exit reduce the node circles size to 0
	nodeExit.select('circle').attr('r', `${FAKED_ZERO}${UNIT}`);

	// On exit reduce the opacity of text labels
	nodeExit.select('text').style('fill-opacity', FAKED_ZERO);
	nodeExit.select('text').style('font-size', `${FAKED_ZERO}${UNIT}`);
}

function update({ svg, root, source, treemap, options }) {
	// Assigns the x and y position for the nodes
	const { UNIT, LINE_HEIGHT, CIRCLE_RADIUS, DURATION_TIME, HORIZONTAL_DISTANCE } = options;
	const treeData = treemap(root);

	// Compute the new tree layout.
	const nodes = treeData.descendants();
	const links = treeData.descendants().slice(1);

	// Normalize for fixed-depth.
	nodes.forEach(d => {
		d.y = d.depth * HORIZONTAL_DISTANCE;
	});

	// ****************** Nodes section ***************************
	// Update the nodes...
	const node = svg.selectAll('g.node').data(nodes, d => d.id || (d.id = uniqId()));

	// Enter any new nodes at the parent's previous position.
	const nodeEnter = appendGroup(node, source);
	nodeEnter.on('click', click);
	circleAdder(nodeEnter, options);
	labelsAdder(nodeEnter, options);

	// UPDATE
	const nodeUpdate = nodeEnter.merge(node);
	nodeUpdater(nodeUpdate, options);
	labelUpdater(nodeUpdate, options);
	circleUpdater(nodeUpdate, options);

	onExit(node, source, options);

	// ****************** links section ***************************

	// Update the links...
	const link = svg.selectAll('path.link').data(links, d => d.id);

	// Enter any new links at the parent's previous position.
	const linkEnter = link
		.enter()
		.insert('path', 'g')
		.attr('class', 'link')
		.attr('d', d => {
			const o = { x: source.old_x, y: source.old_y };
			return diagonal(o, o);
		});

	// UPDATE
	const linkUpdate = linkEnter.merge(link);

	// Transition back to the parent element position
	linkUpdate
		.transition()
		.duration(DURATION_TIME)
		.attr('d', d => diagonal(d, d.parent));

	// Remove any exiting links
	link
		.exit()
		.transition()
		.duration(DURATION_TIME)
		.attr('d', d => {
			const o = { x: source.x, y: source.y };
			return diagonal(o, o);
		})
		.remove();

	// Store the old positions for transition.
	nodes.forEach(d => {
		d.old_x = d.x;
		d.old_y = d.y;
	});

	// Toggle children on click.
	function click(d, a, k) {
		console.log(d, a, k);
		const HAS_CHILDREN = d.children instanceof Array && d.children.length > 0;
		if (HAS_CHILDREN) {
			d._children = d.children;
			d.children = null;
		} else {
			d.children = d._children;
			d._children = null;
		}
		update({ source: d, options, root, svg, treemap });
	}
}
export default update;
