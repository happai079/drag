import React, { useState } from 'react';
import styled from 'styled-components';
import { inrange } from '../utils';
import registerDragEvent from './../utils/registerDragEvent';

const SLIDER_WIDTH = 400;
const SLIDER_HEIGHT = 400;

const imageList = [
	'https://blog.kakaocdn.net/dn/dpxiAT/btqUBv6Fvpn/E8xUMncq7AVuDeOim0LrMk/img.jpg',
	'https://blog.kakaocdn.net/dn/BGT7X/btqUzvTqi5h/flp39GdJH0GU6mo7cTbbhk/img.jpg',
	'https://blog.kakaocdn.net/dn/bWnmfv/btqUBwqZvwA/3CiXGt3SR0TXoOveRJxV91/img.jpg',
	'https://blog.kakaocdn.net/dn/XsLCO/btqUL8PQLwp/NZWCU2jAYKkKSXwcohBKTK/img.jpg',
	'https://blog.kakaocdn.net/dn/bG3iVL/btqUvCZPaRL/ofIjkNWJP1mj2bOG9fie51/img.jpg',
];

const Carousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [transX, setTransX] = useState(0);

	return (
		<div>
			<h1>CAROUSEL</h1>
			<Viewer>
				<Slider
					style={{
						transform: `translateX(${-currentIndex * SLIDER_WIDTH + transX}px)`,
						transition: `transform ${transX ? 0 : 300}ms ease-in-out 0s`,
					}}
					// 드레그 이벤트
					{...registerDragEvent({
						onDragStart: (moveX) => {
							setTransX(inrange(moveX, -SLIDER_WIDTH, SLIDER_WIDTH));
						},
						onDragEnd: (moveX) => {
							const maxIndex = imageList.length - 1;

							if (moveX < -100)
								setCurrentIndex(inrange(currentIndex + 1, 0, maxIndex));
							if (moveX > 100) setCurrentIndex(inrange(currentIndex - 1, 0, maxIndex));

							setTransX(0);
						},
					})}
				>
					{imageList.map((url, idx) => (
						<Slide key={idx}>
							<SlideImage src={url} alt="img" draggable={false} />
						</Slide>
					))}
				</Slider>
				<Bullets>
					{imageList.map((url, idx) => (
						<span key={idx} className={currentIndex === idx ? 'current' : ''}>
							●
						</span>
					))}
				</Bullets>
			</Viewer>
		</div>
	);
};

const Viewer = styled.div`
	width: ${SLIDER_WIDTH}px;
	height: ${SLIDER_HEIGHT + 30}px;
	overflow: hidden;
`;

const Slider = styled.div`
	display: flex;
`;

const Slide = styled.div`
	flex-shrink: 0;
`;

const SlideImage = styled.img`
	width: ${SLIDER_WIDTH}px;
	cursor: pointer;
`;

const Bullets = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	span {
		font-size: 15px;
		margin: 0 5px;
		color: lightgray;

		&.current {
			color: black;
		}
	}
`;

export default Carousel;
