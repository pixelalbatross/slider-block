/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

/**
 * Regular expression matching invalid hash characters for replacement.
 *
 * @type {RegExp}
 */
const HASH_REGEX = /[\s#]/g;

// eslint-disable-next-line jsdoc/require-param
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, context }) {
	const { hash } = attributes;

	/**
	 * Filters the list of allowed blocks.
	 */
	const allowedBlocks = applyFilters('pixelalbatross.sliderBlock.allowedBlocks', [
		'core/button',
		'core/buttons',
		'core/columns',
		'core/cover',
		'core/group',
		'core/heading',
		'core/image',
		'core/list-item',
		'core/list',
		'core/media-text',
		'core/paragraph',
		'core/separator',
		'core/table',
	]);

	const blockProps = useBlockProps({ className: 'swiper-slide' });
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'wp-block-pixelalbatross-slide__wrapper' },
		{
			allowedBlocks,
			template: [
				[
					'core/heading',
					{
						placeholder: __('Heading', 'slider-block'),
						level: 2,
					},
				],
				['core/paragraph'],
			],
		},
	);

	return (
		<>
			<div {...blockProps}>
				<div {...innerBlocksProps} />
			</div>

			<InspectorControls>
				{context['pixelalbatross/slider/hashNavigation'] && (
					<PanelBody title={__('Settings', 'slider-block')}>
						<PanelRow>
							<TextControl
								label={__('URL Hash', 'slider-block')}
								help={__(
									'A URL hash is used to link to a specific slide that allows you to load the page with that slide open.',
									'slider-block',
								)}
								value={hash}
								onChange={(value) => {
									value = value.replace(HASH_REGEX, '-');
									setAttributes({
										hash: value,
									});
								}}
							/>
						</PanelRow>
					</PanelBody>
				)}
			</InspectorControls>
		</>
	);
}
