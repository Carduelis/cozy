const getDepth = ({ children }) => 1 + (children ? Math.max(...children.map(getDepth)) : 0);
export default getDepth;
