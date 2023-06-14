<?php
/**
 * Slider
 *
 * @var array     $attributes Block attributes.
 * @var string    $content    Block default content.
 * @var \WP_Block $block      Block instance.
 *
 * @package pixelalbatross/slider-block
 */

$options = wp_parse_args(
	$attributes,
	[
		'i18n' => [
			'prev'       => esc_html__( 'Previous slide', 'slider-block' ),
			'next'       => esc_html__( 'Next slide', 'slider-block' ),
			'first'      => esc_html__( 'This is the first slide', 'slider-block' ),
			'last'       => esc_html__( 'This is the last slide', 'slider-block' ),
			'slideX'     => esc_html__( 'Go to slide {{index}}', 'slider-block' ),
			'slideLabel' => esc_html__( '{{index}} / {{slidesLength}}', 'slider-block' ),
		],
	]
);

/**
 * Filters the slider options.
 *
 * @param array $options Array of slider options.
 */
$options = apply_filters( 'pixelalbatross_slider_block_options', $options );
$options = array_filter( $options );

$extra_attributes = [
	'class'        => 'swiper',
	'data-options' => wp_json_encode( $options ),
];

?>

<div <?php echo get_block_wrapper_attributes( $extra_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>

	<?php
	/**
	 * Fires before the slides.
	 *
	 * @param array $options Array of slider options.
	 */
	do_action( 'pixelalbatross_slider_block_before_slides', $options );
	?>

	<div class="swiper-wrapper wp-block-pixelalbatross-slider__wrapper">
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>

	<?php
	/**
	 * Fires after the slides.
	 *
	 * @hooked pixelalbatross_slider_block_show_navigation - 20
	 * @hooked pixelalbatross_slider_block_show_pagination - 30
	 *
	 * @param array $options Array of slider options.
	 */
	do_action( 'pixelalbatross_slider_block_after_slides', $options );
	?>

</div>
