export const hasMoreThanOneNodeWithoutAncestors = (nodes, edges) => {
    const nodeIds = nodes.map(node => node.id);
    const targetNodeIds = edges.map(edge => edge.target);
  
    // Find nodes that are not targets in any edge
    const nodesWithoutAncestors = nodeIds.filter(nodeId => !targetNodeIds.includes(nodeId));
  
    return nodesWithoutAncestors.length > 1;
  };