'use client';

import { useTransform, useScroll, motion } from 'framer-motion';
import { useRef } from 'react';

const NUM_SECTIONS = 25;
const PADDING = `${100 / NUM_SECTIONS / 2}vmin`;

const TrippyScroll = () => {
	const targetRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: targetRef
	});

	const scale = useTransform(
		scrollYProgress,
		[0, 0.65, 0.8, 1],
		[1, 1, 0.9, 1.25]
	);

	const rotate = useTransform(
		scrollYProgress,
		[0, 1],
		['0deg', '60deg']
	);

	const opacity = useTransform(scrollYProgress, [0.92, 1], [0, 1]);

	return (
		<div
			ref={targetRef}
			className='relative z-0 h-[800vh] bg-neutral-200'>
			<div className='sticky top-0 h-screen bg-white'>
				<Trippy scale={scale} rotate={rotate} />
				<motion.div
					className='absolute left-1/2 top-1/2 transform translate-x-[-50%] translate-y-[-50%]'
					style={{
						opacity
					}}>
					<h1 className='text-5xl'>You reached the end :)</h1>
				</motion.div>
			</div>
		</div>
	);
};

const generateSections = (count, color, scale, rotate) => {
	if (count === NUM_SECTIONS) {
		return <></>;
	}

	const nextColor = color === 'black' ? 'white' : 'black';

	return (
		<Section rotate={rotate} scale={scale} background={color}>
			{generateSections(count + 1, nextColor, scale, rotate)}
		</Section>
	);
};

const Trippy = ({ scale, rotate }) => {
	return (
		<motion.div className='absolute inset-0 overflow-hidden bg-black'>
			{generateSections(0, 'black', scale, rotate)}
		</motion.div>
	);
};

const Section = ({ background, children, scale, rotate }) => {
	return (
		<motion.div
			className='relative h-full w-full origin-center'
			style={{
				background,
				rotate,
				scale,
				padding: PADDING
			}}>
			{children}
		</motion.div>
	);
};

export default TrippyScroll;
