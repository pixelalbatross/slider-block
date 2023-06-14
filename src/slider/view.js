/**
 * Internal dependencies
 */
import { initSlider } from './Slider';

document.addEventListener('DOMContentLoaded', () => {
	const containers = document.querySelectorAll('.wp-block-pixelalbatross-slider');

	if (!containers.length) {
		return;
	}

	/**
	 * Setup sliders.
	 */
	containers.forEach((container) => {
		let blockOptions = {};
		try {
			blockOptions = JSON.parse(container.dataset.options);
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e);
		}

		initSlider(container, blockOptions);
	});
});
