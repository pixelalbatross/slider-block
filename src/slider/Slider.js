/* eslint-disable import/no-extraneous-dependencies */
/**
 * External dependencies
 */
import Swiper, {
	A11y,
	Keyboard,
	HashNavigation,
	Autoplay,
	Navigation,
	Pagination,
	FreeMode,
} from 'swiper';

/**
 * Parses a quantity and unit from a raw string value.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/packages/components/src/unit-control/utils.ts#L177
 *
 * @param {string} rawValue The raw value as a string (may or may not contain the unit).
 * @return {Array} The extracted quantity and unit.
 */
const parseQuantityAndUnitFromRawValue = (rawValue) => {
	const allowedUnits = ['px', '%', 'em', 'rem', 'vw', 'vh'];

	let trimmedValue;
	let quantityToReturn;

	if (typeof rawValue !== 'undefined' || rawValue === null) {
		trimmedValue = `${rawValue}`.trim();
		const parsedQuantity = parseFloat(trimmedValue);
		quantityToReturn = !isFinite(parsedQuantity) ? undefined : parsedQuantity;
	}

	const unitMatch = trimmedValue?.match(/[\d.\-\+]*\s*(.*)/);
	const matchedUnit = unitMatch?.[1]?.toLowerCase();
	const match = allowedUnits.find((item) => item === matchedUnit);
	const unitToReturn = match?.value;

	return [quantityToReturn, unitToReturn];
};

export function Slider(container, options = {}) {
	const totalSlides = container.querySelectorAll('.wp-block-pixelalbatross-slide').length;

	const parameters = {
		modules: [A11y, Keyboard, HashNavigation],
		direction: 'horizontal',
		speed: options?.speed || 300,
		loop: options?.loop || false,
		rewind: options?.rewind || false,
		autoHeight: options?.autoHeight || false,
		slidesPerView: options?.perView || 1,
		centeredSlides: options?.centeredSlides || false,
		grabCursor: true,
		autoplay: false,
		navigation: false,
		pagination: false,
		freeMode: false,
		keyboard: true,
		hashNavigation: true,
		a11y: {
			containerRoleDescriptionMessage: 'carousel',
			itemRoleDescriptionMessage: 'slide',
			containerMessage: options?.ariaLabel || null,
			firstSlideMessage: options?.i18n?.first || 'This is the first slide',
			lastSlideMessage: options?.i18n?.last || 'This is the last slide',
			nextSlideMessage: options?.i18n?.next || 'Next slide',
			paginationBulletMessage: options?.i18n?.slideX || 'Go to slide {{index}}',
			prevSlideMessage: options?.i18n?.prev || 'Previous slide',
			slideLabelMessage: options?.i18n?.slideLabel || '{{index}} / {{slidesLength}}',
		},
	};

	if (options?.width) {
		const [parsedQuantity] = parseQuantityAndUnitFromRawValue(options?.width);
		parameters.width = parsedQuantity;
	}

	if (options?.height) {
		const [parsedQuantity] = parseQuantityAndUnitFromRawValue(options?.height);
		parameters.height = parsedQuantity;
	}

	if (options?.spaceBetween) {
		const [parsedQuantity] = parseQuantityAndUnitFromRawValue(options?.spaceBetween);
		parameters.spaceBetween = parsedQuantity;
	}

	// Autoplay parameters.
	if (options?.autoplay) {
		parameters.modules.push(Autoplay);
		parameters.autoplay = {
			delay: options?.autoplayInterval || 3000,
			pauseOnMouseEnter: options?.autoplayPauseOnHover || false,
		};
	}

	// Navigation parameters.
	if (options?.navigation) {
		parameters.modules.push(Navigation);
		parameters.navigation = {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		};
	}

	// Pagination parameters.
	if (options?.pagination) {
		parameters.modules.push(Pagination);
		parameters.pagination = {
			el: '.swiper-pagination',
			type: options?.paginationType || 'bullets',
			dynamicBullets: totalSlides > 5,
			clickable: false,
		};

		if ('bullets' === parameters.pagination.type) {
			parameters.pagination.clickable = true;
		}
	}

	// Free Mode parameters.
	if (options?.freeMode) {
		parameters.modules.push(FreeMode);
		parameters.freeMode = true;
	}

	return new Swiper(container, parameters);
}
