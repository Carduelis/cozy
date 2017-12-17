import React, { Component } from 'react';
import D3Tree from './D3Tree';

class Page extends Component {
	render() {
		return (
			<div className="dendogram">
				<D3Tree treeData={json} />
			</div>
		);
	}
}
const json = {
	name: 'flare',
	children: [
		{
			name: 'analytics',
			children: [
				{
					name: 'cluster',
					children: [
						{ name: 'AgglomerativeCluster', size: 3938 },
						{ name: 'CommunityStructure', size: 3812 },
						{ name: 'HierarchicalCluster', size: 6714 },
						{ name: 'MergeEdge', size: 743 }
					]
				},
				{
					name: 'graph',
					children: [
						{ name: 'BetweennessCentrality', size: 3534 },
						{ name: 'LinkDistance', size: 5731 },
						{ name: 'MaxFlowMinCut', size: 7840 },
						{ name: 'ShortestPaths', size: 5914 },
						{ name: 'SpanningTree', size: 3416 }
					]
				},
				{
					name: 'optimization',
					children: [{ name: 'AspectRatioBanker', size: 7074 }]
				}
			]
		},
		{
			name: 'data',
			children: [
				{
					name: 'converters',
					children: [
						{ name: 'Converters', size: 721 },
						{ name: 'DelimitedTextConverter', size: 4294 },
						{ name: 'GraphMLConverter', size: 9800 },
						{ name: 'IDataConverter', size: 1314 },
						{ name: 'JSONConverter', size: 2220 }
					]
				},
				{ name: 'DataField', size: 1759 },
				{ name: 'DataSchema', size: 2165 },
				{ name: 'DataSet', size: 586 },
				{ name: 'DataSource', size: 3331 },
				{ name: 'DataTable', size: 772 },
				{ name: 'DataUtil', size: 3322 }
			]
		},
		{
			name: 'display',
			children: [
				{ name: 'DirtySprite', size: 8833 },
				{ name: 'LineSprite', size: 1732 },
				{ name: 'RectSprite', size: 3623 },
				{ name: 'TextSprite', size: 10066 }
			]
		}
	]
};
export default Page;
