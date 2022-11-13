import styled from 'styled-components';
import { useRef, useState } from 'react';
import { inrange } from './utils';

function App() {
	const boundaryRef = useRef();
	const boxRef = useRef();

	const [{ x, y }, setPosition] = useState({ x: 0, y: 0 });

	const onDragEvent = (moveX, moveY) => {
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
		<AppContainer>
			<h1>DRAG BOX</h1>
			<DragBox ref={boundaryRef}>
				<Box
					ref={boxRef}
					style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
					// 마우스 클릭 이벤트
					onMouseDown={(clickEvnet) => {
						const initX = clickEvnet.pageX;
						const initY = clickEvnet.pageY;

						const mouseMoveHandler = (moveEvent) => {
							if (boundaryRef.current && boxRef.current) {
								// 클릭시 커서 위치 기준으로 이동한 거리 계산
								const moveX = moveEvent.pageX - initX;
								const moveY = moveEvent.pageY - initY;
								onDragEvent(moveX, moveY);
							}
						};

						const mouseUpHandler = () => {
							document.removeEventListener('mousemove', mouseMoveHandler);
						};

						document.addEventListener('mousemove', mouseMoveHandler);
						document.addEventListener('mouseup', mouseUpHandler, { once: true });
					}}
					// 모바일 터치 이벤트
					onTouchStart={(touchEvent) => {
						const initX = touchEvent.touches[0].pageX;
						const initY = touchEvent.touches[0].pageY;

						const touchMoveHandler = (moveEvent) => {
							const moveX = moveEvent.touches[0].pageX - initX;
							const moveY = moveEvent.touches[0].pageY - initY;
							onDragEvent(moveX, moveY);
						};
						const touchEndHandler = () => {
							document.removeEventListener('touchmove', touchMoveHandler);
						};

						document.addEventListener('touchmove', touchMoveHandler);
						document.addEventListener('touchend', touchEndHandler, { once: true });
					}}
				/>
			</DragBox>
		</AppContainer>
	);
}

const AppContainer = styled.div`
	height: 100vh;
	margin: 0 auto;
`;

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

export default App;
