/**
 * Internal dependencies
 */
import { initSlider } from './utils';

document.addEventListener('DOMContentLoaded', () => {
	const containers = document.querySelectorAll('.wp-block-pixelalbatross-slider');

	if (!containers.length) {
		return;
	}

	containers.forEach((element) => {
		let options = {};
		try {
			options = JSON.parse(element.dataset.options);
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e);
			return;
		}

		const slides = element.querySelectorAll('.wp-block-pixelalbatross-slide');
		options.totalSlides = slides.length;

		initSlider(element, options);
	});
});
