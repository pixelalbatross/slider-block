<?php
/**
 * Plugin Name:       Slider Block
 * Description:       Display a slider.
 * Plugin URI:        https://pixelalbatross.pt/?utm_source=wp-plugins&utm_medium=slider-block&utm_campaign=plugin-uri
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           0.2.0
 * Author:            Pixel Albatross
 * Author URI:        https://pixelalbatross.pt/?utm_source=wp-plugins&utm_medium=slider-block&utm_campaign=author-uri
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        https://pixelalbatross.pt/
 * GitHub Plugin URI: https://github.com/pixelalbatross/slider-block
 * Text Domain:       slider-block
 *
 * @package           pixelalbatross/slider-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function pixelalbatross_slider_block_init() {

	$blocks = [
		'slider',
		'slide',
	];

	foreach ( $blocks as $block ) {
		$folder = sprintf( '%s/build/%s', __DIR__, $block );
		register_block_type( $folder );
	}
}
add_action( 'init', 'pixelalbatross_slider_block_init' );

/**
 * Handles JavaScript detection.
 *
 * Adds a `js` class to the root `<html>` element when JavaScript is detected.
 */
function pixelalbatross_slider_block_js_detection() {
	echo "<script>!function(s){s.classList.contains('js')?s.classList:s.classList.add('js')}(document.documentElement);</script>\n";
}
add_action( 'wp_head', 'pixelalbatross_slider_block_js_detection', 0 );
