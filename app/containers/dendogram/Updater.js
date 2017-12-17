import * as d3 from 'd3';
import collapse from './collapse';
import diagonal from './diagonal';
import uniqId from './uniqId';
import getDepth from './depth';
// const FAKED_ZERO = 1e-6;
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */

const FAKED_ZERO = 0;

const DEFAULTS = {
	SVG_WIDTH: 960,
	SVG_HEIGHT: 500,
	LETTER_SIZE: 10,
	UNIT: 'em',
	CIRCLE_RADIUS: 0.5,
	DURATION_TIME: 750,
	LINE_HEIGHT: 1,
	FONT_SIZE: 0.8,
	HORIZONTAL_DISTANCE: 180
};

const DEFAULT_TREE_JSON = {
	name: 'Top Level',
	children: [
		{
			name: 'Level 2: A',
			children: [{ name: 'Son of A' }, { name: 'Daughter of A' }]
		},
		{ name: 'Level 2: B' }
	]
};
class Updater {
	constructor(svgDomNode, treeJSON = DEFAULT_TREE_JSON, couplings = {}, options = DEFAULTS) {
		this.options = Object.assign(DEFAULTS, options, {
			LEFT_MARGIN: treeJSON.name.length * options.LETTER_SIZE,
			SVG_WIDTH: getDepth(treeJSON) * options.HORIZONTAL_DISTANCE
		});
		this.svgDomNode = svgDomNode;
		this.treeJSON = treeJSON;
		this.couplings = couplings;
		this.initialize();
	}
	initialize() {
		const { SVG_WIDTH, SVG_HEIGHT, LEFT_MARGIN } = this.options;
		this.svg = d3
			.select(this.svgDomNode)
			.attr('width', SVG_WIDTH)
			.attr('height', SVG_HEIGHT)
			.append('g')
			.attr('transform', `translate(${LEFT_MARGIN}, 0)`);

		// declares a tree layout and assigns the size
		this.treemap = d3.tree().size([SVG_HEIGHT, SVG_WIDTH - LEFT_MARGIN]);

		// Assigns parent, children, height, depth
		this.root = d3.hierarchy(this.treeJSON, d => d.children);
		this.treeData = this.treemap(this.root);
		this.root.old_x = SVG_HEIGHT / 2;
		this.root.old_y = 0;

		// Collapse after the second level
		this.root.children.forEach(collapse);
		this.update(this.root);
	}
	setInitialNodes(source) {
		this.treeData = this.treemap(this.root);
		// Compute the new tree layout.
		this.nodes = this.treeData.descendants();
		this.links = this.treeData.descendants().slice(1);
		// Normalize for fixed-depth.
		this.nodes.forEach(d => {
			d.y = d.depth * this.options.HORIZONTAL_DISTANCE;
		});

		this.node = this.svg.selectAll('g.node').data(this.nodes, d => d.id || (d.id = uniqId()));
		// Enter any new nodes at the parent's previous position.
		this.nodeEnter = this.appendGroup(this.node, source);

		this.nodeEnter.on('click', (...rest) => this.onClick(...rest));
		this.circleAdder();
		this.labelsAdder();
	}

	appendGroup(node, source) {
		return node
			.enter()
			.append('g')
			.attr('class', 'node')
			.attr('transform', d => `translate(${source.old_y},${source.old_x})`);
	}

	circleAdder() {
		// Add Circle for the nodes
		return this.nodeEnter
			.append('circle')
			.attr('r', FAKED_ZERO)
			.attr('class', d => (d._children ? 'clickable' : 'endpoint'));
	}

	labelsAdder() {
		// Add labels for the nodes
		const { LINE_HEIGHT, CIRCLE_RADIUS, FONT_SIZE, UNIT } = this.options;
		return (
			this.nodeEnter
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

	updateNodes() {
		const nodeUpdate = this.nodeEnter.merge(this.node);
		this.nodeUpdater(nodeUpdate);
		this.labelUpdater(nodeUpdate);
		this.circleUpdater(nodeUpdate);
	}
	update(source) {
		this.setInitialNodes(source);
		this.updateNodes();
		this.onExit(source);
		this.setLinks(source);
		this.storeOldNodePotisions();
	}

	setLinks(source) {
		const { DURATION_TIME } = this.options;

		// Update the links...
		const link = this.svg.selectAll('path.link').data(this.links, d => (d ? d.id : uniqId()));
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
	}
	storeOldNodePotisions() {
		// Store the old positions for transition.
		this.nodes.forEach(d => {
			d.old_x = d.x;
			d.old_y = d.y;
		});
	}
	onClick(d, a, k) {
		const HAS_CHILDREN = d.children instanceof Array && d.children.length > 0;
		if (HAS_CHILDREN) {
			d._children = d.children;
			d.children = null;
		} else {
			d.children = d._children;
			d._children = null;
		}
		this.update(d);
	}
	nodeUpdater(nodeUpdate) {
		// Transition to the proper position for the node
		const { DURATION_TIME } = this.options;
		return nodeUpdate
			.transition()
			.duration(DURATION_TIME)
			.attr('transform', d => `translate(${d.y},${d.x})`);
	}
	circleUpdater(nodeUpdate) {
		const { CIRCLE_RADIUS, UNIT, DURATION_TIME } = this.options;
		// Update the node attributes and style
		return nodeUpdate
			.select('circle')
			.transition()
			.duration(DURATION_TIME)
			.attr('r', `${CIRCLE_RADIUS}${UNIT}`)
			.attr('class', d => (d._children ? 'clickable' : 'endpoint'))
			.attr('cursor', 'pointer');
	}
	labelUpdater(nodeUpdate) {
		const { CIRCLE_RADIUS, UNIT, DURATION_TIME, FONT_SIZE } = this.options;
		// Update the node attributes and style
		return nodeUpdate
			.select('text')
			.transition()
			.duration(DURATION_TIME)
			.style('fill-opacity', 1)
			.style('font-size', `${FONT_SIZE}${UNIT}`);
	}

	onExit(source) {
		const { DURATION_TIME, UNIT } = this.options;
		// Remove any exiting nodes
		const nodeExit = this.node
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
}
export default Updater;
