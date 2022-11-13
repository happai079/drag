// 터치스크린 여부 확인
const isTouchScreen =
	typeof window !== 'undefined' &&
	window.matchMedia('(hover: none) and (pointer: coarse)').matches;

const registerDragEvent = ({ onDragStart, onDragEnd, stopPropagation }) => {
	if (isTouchScreen) {
		return {
			onTouchStart: (touchEvent) => {
				if (stopPropagation) touchEvent.stopPropagation();

				const initX = touchEvent.touches[0].pageX;
				const initY = touchEvent.touches[0].pageY;

				const touchMoveHandler = (moveEvent) => {
					const moveX = moveEvent.touches[0].pageX - initX;
					const moveY = moveEvent.touches[0].pageY - initY;
					onDragStart(moveX, moveY);
				};
				const touchEndHandler = (moveEvent) => {
					const moveX = moveEvent.touches[0].pageX - initX;
					const moveY = moveEvent.touches[0].pageY - initY;
					onDragEnd(moveX, moveY);
					document.removeEventListener('touchmove', touchMoveHandler);
				};

				document.addEventListener('touchmove', touchMoveHandler, {
					passive: false,
				});
				document.addEventListener('touchend', touchEndHandler, { once: true });
			},
		};
	}

	return {
		onMouseDown: (clickEvent) => {
			if (stopPropagation) clickEvent.stopPropagation();

			const initX = clickEvent.pageX;
			const initY = clickEvent.pageY;

			const mouseMoveHandler = (moveEvent) => {
				const moveX = moveEvent.pageX - initX;
				const moveY = moveEvent.pageY - initY;
				onDragStart(moveX, moveY);
			};

			const mouseUpHandler = (moveEvent) => {
				const moveX = moveEvent.pageX - initX;
				const moveY = moveEvent.pageY - initY;
				onDragEnd(moveX, moveY);
				document.removeEventListener('mousemove', mouseMoveHandler);
			};

			document.addEventListener('mousemove', mouseMoveHandler);
			document.addEventListener('mouseup', mouseUpHandler, { once: true });
		},
	};
};
export default registerDragEvent;
