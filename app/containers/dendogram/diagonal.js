// Creates a curved (diagonal) path from parent to the child nodes
export default (s, d) => {
	const path = `M ${s.y} ${s.x}
        C ${(s.y + d.y) / 2} ${s.x},
          ${(s.y + d.y) / 2} ${d.x},
          ${d.y} ${d.x}`;

	return path;
};
