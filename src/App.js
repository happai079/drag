import styled from 'styled-components';

function App() {
	return (
		<AppContainer>
			<h1>DRAG BOX</h1>
			<DragBox
				onMouseDown={() => {
					const mouseMoveHandler = (e) => {
						console.log(`mouse move x: ${e.screenX} y: ${e.screenY}`);
					};

					const mouseUpHandler = (e) => {
						console.warn(`>>>> mouse up x: ${e.screenX} y: ${e.screenY}`);
						document.removeEventListener('mousemove', mouseMoveHandler);
					};

					document.addEventListener('mousemove', mouseMoveHandler);
					document.addEventListener('mouseup', mouseUpHandler, { once: true });
				}}
			/>
		</AppContainer>
	);
}

const AppContainer = styled.div`
	height: 100vh;
	margin: 0 auto;
`;

const DragBox = styled.div`
	width: 100%;
	height: 300px;
	background-color: lightgray;
	border-radius: 10px;
`;

export default App;
