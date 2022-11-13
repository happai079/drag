import styled from 'styled-components';
import { useState } from 'react';

function App() {
	const [{ x, y }, setPosition] = useState({ x: 0, y: 0 });

	return (
		<AppContainer>
			<h1>DRAG BOX</h1>
			<DragBox>
				<Box
					// 이동한 거리만큼 translate
					style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
					// mousedown - 마우스 클릭 이벤트
					onMouseDown={(clickEvnet) => {
						const mouseMoveHandler = (moveEvent) => {
							// 클릭시 커서 위치 기준으로 이동한 거리 계산
							const moveX = moveEvent.pageX - clickEvnet.pageX;
							const moveY = moveEvent.pageY - clickEvnet.pageY;

							setPosition({ x: x + moveX, y: y + moveY });
						};

						const mouseUpHandler = () => {
							document.removeEventListener('mousemove', mouseMoveHandler);
						};

						// mousemove - 마우스 이동 이벤트
						document.addEventListener('mousemove', mouseMoveHandler);
						// mouseup - 마우스 클릭 해제 이벤트
						document.addEventListener('mouseup', mouseUpHandler, { once: true });
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
