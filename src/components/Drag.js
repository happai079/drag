import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { inrange } from '../utils';
import registerDragEvent from '../utils/registerDragEvent';

const Drag = () => {
	const boundaryRef = useRef();
	const boxRef = useRef();

	const [{ x, y }, setPosition] = useState({ x: 0, y: 0 });

	const onBoundaryDragEvent = (moveX, moveY) => {
		const boundary = boundaryRef.current.getBoundingClientRect();
		const box = boxRef.current.getBoundingClientRect();
		const BOUNDARY_MARGIN = 12;

		setPosition({
			x: inrange(
				x + moveX,
				Math.floor(-boundary.width / 2 + box.width / 2 + BOUNDARY_MARGIN),
				Math.floor(boundary.width / 2 - box.width / 2 - BOUNDARY_MARGIN)
			),
			y: inrange(
				y + moveY,
				Math.floor(-boundary.height / 2 + box.height / 2 + BOUNDARY_MARGIN),
				Math.floor(boundary.height / 2 - box.height / 2 - BOUNDARY_MARGIN)
			),
		});
	};

	return (
		<div>
			<h1>DRAG BOX</h1>
			<DragBox ref={boundaryRef}>
				<Box
					ref={boxRef}
					style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
					// 드레그 이벤트트
					{...registerDragEvent({
						onDragStart: (moveX, moveY) => {
							onBoundaryDragEvent(moveX, moveY);
						},
					})}
				/>
			</DragBox>
		</div>
	);
};

const DragBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 300px;
	background-color: lightgray;
	border-radius: 10px;
`;

const Box = styled.div`
	width: 100px;
	height: 100px;
	background-color: white;
	box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
	border-radius: 20px;
	cursor: move;
`;

export default Drag;
