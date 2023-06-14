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

export function initSlider(container, settings = {}) {
	const totalSlides = container.querySelectorAll('.wp-block-pixelalbatross-slide').length;

	const options = {
		modules: [A11y, Keyboard, HashNavigation],
		direction: 'horizontal',
		speed: settings?.speed || 300,
		loop: settings?.loop || false,
		rewind: settings?.rewind || false,
		autoHeight: settings?.autoHeight || false,
		slidesPerView: settings?.perView || 1,
		centeredSlides: settings?.centeredSlides || false,
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
			containerMessage: settings?.ariaLabel || null,
			firstSlideMessage: settings?.i18n?.first || 'This is the first slide',
			lastSlideMessage: settings?.i18n?.last || 'This is the last slide',
			nextSlideMessage: settings?.i18n?.next || 'Next slide',
			paginationBulletMessage: settings?.i18n?.slideX || 'Go to slide {{index}}',
			prevSlideMessage: settings?.i18n?.prev || 'Previous slide',
			slideLabelMessage: settings?.i18n?.slideLabel || '{{index}} / {{slidesLength}}',
		},
	};

	if (settings?.width) {
		const [parsedQuantity] = parseQuantityAndUnitFromRawValue(settings?.width);
		options.width = parsedQuantity;
	}

	if (settings?.height) {
		const [parsedQuantity] = parseQuantityAndUnitFromRawValue(settings?.height);
		options.height = parsedQuantity;
	}

	if (settings?.spaceBetween) {
		const [parsedQuantity] = parseQuantityAndUnitFromRawValue(settings?.spaceBetween);
		options.spaceBetween = parsedQuantity;
	}

	// Autoplay parameters.
	if (settings?.autoplay) {
		options.modules.push(Autoplay);
		options.autoplay = {
			delay: settings?.autoplayInterval || 3000,
			pauseOnMouseEnter: settings?.autoplayPauseOnHover || false,
		};
	}

	// Navigation parameters.
	if (settings?.navigation) {
		options.modules.push(Navigation);
		options.navigation = {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		};
	}

	// Pagination parameters.
	if (settings?.pagination) {
		options.modules.push(Pagination);
		options.pagination = {
			el: '.swiper-pagination',
			type: settings?.paginationType || 'bullets',
			dynamicBullets: totalSlides > 5,
			clickable: false,
		};

		if ('bullets' === options.pagination.type) {
			options.pagination.clickable = true;
		}
	}

	// Free Mode parameters.
	if (settings?.freeMode) {
		options.modules.push(FreeMode);
		options.freeMode = true;
	}

	return new Swiper(container, options);
}
