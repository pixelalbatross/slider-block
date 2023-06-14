<?php
/**
 * Slide
 *
 * @var array     $attributes Block attributes.
 * @var string    $content    Block default content.
 * @var \WP_Block $block      Block instance.
 *
 * @package pixelalbatross/slider-block
 */

$extra_attributes = [
	'class' => 'swiper-slide',
];

if ( ! empty( $attributes['hash'] ) ) {
	$extra_attributes['data-hash'] = esc_attr( sanitize_title( $attributes['hash'] ) );
}

?>

<div <?php echo get_block_wrapper_attributes( $extra_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
