/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	useBlockEditContext,
	store as blockEditorStore,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	PanelBody,
	PanelRow,
	SelectControl,
	ToggleControl,
	TextControl,
	RangeControl,
	__experimentalNumberControl as NumberControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { memo } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { applyFilters } from '@wordpress/hooks';


/**
 * Slider controls.
 */
const SliderControls = memo(({ clientId }) => {
	const { insertBlock, selectBlock } = useDispatch(blockEditorStore);
	const innerBlocks = useSelect(
		(select) => select(blockEditorStore).getBlock(clientId).innerBlocks,
	);

	const addSlide = () => {
		const block = createBlock('pixelalbatross/slide');
		insertBlock(block, innerBlocks.length, clientId, false);
		selectBlock(block.clientId);
	};

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton icon="plus" onClick={addSlide}>
					{__('Add slide', 'slider-block')}
				</ToolbarButton>
			</ToolbarGroup>
		</BlockControls>
	);
});

// eslint-disable-next-line jsdoc/require-param
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		speed,
		loop,
		rewind,
		autoHeight,
		perView,
		autoplay,
		autoplayInterval,
		autoplayPauseOnHover,
		navigation,
		hashNavigation,
		pagination,
		paginationType,
		freeMode,
		centerSlides,
		width,
		height,
		spaceBetween,
		ariaLabel,
	} = attributes;
	const { clientId } = useBlockEditContext();
	const blockProps = useBlockProps({
		className: 'swiper',
	});
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'swiper-wrapper wp-block-pixelalbatross-slider__wrapper',
		},
		{
			allowedBlocks: ['pixelalbatross/slide'],
			template: [['pixelalbatross/slide'], ['pixelalbatross/slide']],
			renderAppender: false,
			orientation: 'horizontal',
		},
	);

	const enableAutoHeight = applyFilters('pixelalbatross.sliderBlock.enableAutoHeight', false);
	const minSpeed = applyFilters('pixelalbatross.sliderBlock.minSpeed', 100);
	const maxSpeed = applyFilters('pixelalbatross.sliderBlock.maxSpeed', 2000);
	const minPerView = applyFilters('pixelalbatross.sliderBlock.minPerView', 1);
	const maxPerView = applyFilters('pixelalbatross.sliderBlock.maxPerView', 5);

	return (
		<>
			<div {...blockProps}>
				<div {...innerBlocksProps} />

				{navigation && (
					<>
						<div className="swiper-button-next wp-block-pixelalbatross-slider__button-next"></div>
						<div className="swiper-button-prev wp-block-pixelalbatross-slider__button-prev"></div>
					</>
				)}

				{pagination && (
					<div className="swiper-pagination wp-block-pixelalbatross-slider__pagination"></div>
				)}
			</div>

			<SliderControls clientId={clientId} />

			<InspectorControls>
				<PanelBody title={__('Settings', 'slider-block')}>
					<PanelRow>
						<ToggleControl
							label={__('Loop', 'slider-block')}
							help={__(
								'When enabled, the slider will behave as a carousel.',
								'slider-block',
							)}
							checked={loop}
							onChange={(value) => setAttributes({ loop: value, rewind: false })}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Rewind', 'slider-block')}
							help={__(
								'When enabled, clicking the "next" navigation button on the last slide will take you back to the first slide. When you click the "previous" navigation button on the first slide, it will take you to the last slide.',
								'slider-block',
							)}
							checked={rewind}
							onChange={(value) => setAttributes({ rewind: value, loop: false })}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Autoplay', 'slider-block')}
							checked={autoplay}
							onChange={(value) => setAttributes({ autoplay: value })}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Free Mode', 'slider-block')}
							checked={freeMode}
							onChange={(value) => setAttributes({ freeMode: value })}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Navigation', 'slider-block')}
							checked={navigation}
							onChange={(value) => setAttributes({ navigation: value })}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Pagination', 'slider-block')}
							checked={pagination}
							onChange={(value) => setAttributes({ pagination: value })}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Hash Navigation', 'slider-block')}
							help={__(
								'When enabled, you can load a page with a specific slide open. Each slide requires a "URL Hash", which can be set on each slide block.',
								'slider-block',
							)}
							checked={hashNavigation}
							onChange={(value) => setAttributes({ hashNavigation: value })}
						/>
					</PanelRow>
					<PanelRow>
						<RangeControl
							label={__('Speed', 'slider-block')}
							help={__(
								'Duration of transition between slides (in milliseconds).',
								'slider-block',
							)}
							value={speed}
							onChange={(value) => setAttributes({ speed: value })}
							min={minSpeed}
							max={maxSpeed}
						/>
					</PanelRow>
					<PanelRow>
						<UnitControl
							label={__('Width', 'slider-block')}
							help={__(
								'The slider will not be responsive if this parameter is set.',
								'slider-block',
							)}
							value={width}
							onChange={(value) => setAttributes({ width: value })}
							units={[{ value: 'px', label: 'px' }]}
						/>
					</PanelRow>
					<PanelRow>
						<UnitControl
							label={__('Height', 'slider-block')}
							help={__(
								'The slider will not be responsive if this parameter is set.',
								'slider-block',
							)}
							value={height}
							onChange={(value) => setAttributes({ height: value })}
							units={[{ value: 'px', label: 'px' }]}
						/>
					</PanelRow>
					{enableAutoHeight && (
						<PanelRow>
							<ToggleControl
								label={__('Auto Height', 'slider-block')}
								help={__(
									'When enabled, the slider will adjust its height to match the height of the currently active slide.',
									'slider-block',
								)}
								checked={autoHeight}
								onChange={(value) => setAttributes({ autoHeight: value })}
							/>
						</PanelRow>
					)}
					<PanelRow>
						<RangeControl
							label={__('Per View', 'slider-block')}
							help={__(
								'Number of slides per view (slides visible at the same time).',
								'slider-block',
							)}
							value={perView}
							onChange={(value) => setAttributes({ perView: value })}
							min={minPerView}
							max={maxPerView}
						/>
					</PanelRow>
					<PanelRow>
						<UnitControl
							label={__('Space Between Slides', 'slider-block')}
							help={__('The distance between slides.', 'slider-block')}
							value={spaceBetween}
							onChange={(value) => setAttributes({ spaceBetween: value })}
							units={[{ value: 'px', label: 'px' }]}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Centered Slides', 'slider-block')}
							help={__(
								'When enabled, the active slide will be centered.',
								'slider-block',
							)}
							checked={centerSlides}
							onChange={(value) => setAttributes({ centerSlides: value })}
							disabled={perView < 1}
						/>
					</PanelRow>
				</PanelBody>

				{autoplay && (
					<PanelBody title={__('Autoplay', 'slider-block')} initialOpen={false}>
						<PanelRow>
							<NumberControl
								label={__('Delay', 'slider-block')}
								help={__(
									'Delay between transitions (in milliseconds).',
									'slider-block',
								)}
								value={autoplayInterval}
								onChange={(value) => setAttributes({ autoplayInterval: value })}
								step={100}
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={__('Pause on Hover', 'slider-block')}
								help={__(
									'When enabled autoplay will be paused on pointer (mouse) enter over the slider.',
									'slider-block',
								)}
								checked={autoplayPauseOnHover}
								onChange={(value) => setAttributes({ autoplayPauseOnHover: value })}
							/>
						</PanelRow>
					</PanelBody>
				)}

				{pagination && (
					<PanelBody title={__('Pagination', 'slider-block')} initialOpen={false}>
						<PanelRow>
							<SelectControl
								label={__('Type', 'slider-block')}
								value={paginationType}
								onChange={(value) => setAttributes({ paginationType: value })}
								options={[
									{
										value: 'bullets',
										label: __('Bullets', 'slider-block'),
									},
									{ value: 'fraction', label: __('Fraction', 'slider-block') },
									{
										value: 'progressbar',
										label: __('Progress Bar', 'slider-block'),
									},
								]}
							/>
						</PanelRow>
					</PanelBody>
				)}

				<PanelBody title={__('Accessibility', 'slider-block')} initialOpen={false}>
					<PanelRow>
						<TextControl
							label={__('Aria Label', 'slider-block')}
							help={__(
								'Sets an aria-label attribute to the root element.',
								'slider-block',
							)}
							value={ariaLabel}
							onChange={(value) => setAttributes({ ariaLabel: value })}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
