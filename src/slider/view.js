/**
 * Internal dependencies
 */
import { Slider } from './Slider';

document.addEventListener('DOMContentLoaded', () => {
	const containers = document.querySelectorAll('.wp-block-pixelalbatross-slider');

	if (!containers.length) {
		return;
	}

	/**
	 * Setup sliders.
	 */
	containers.forEach((container) => {
		let options = {};
		try {
			options = JSON.parse(container.dataset.options);
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e);
			return;
		}

		Slider(container, options);
	});
});
