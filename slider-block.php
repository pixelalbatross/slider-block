<?php
/**
 * Plugin Name:       Slider Block
 * Description:       Display a slider.
 * Plugin URI:        https://pixelalbatross.pt/?utm_source=wp-plugins&utm_medium=slider-block&utm_campaign=plugin-uri
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           0.3.0
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

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'PIXELALBATROSS_SLIDER_BLOCK_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function pixelalbatross_slider_block_init() {

	$block_json_files = glob( PIXELALBATROSS_SLIDER_BLOCK_PLUGIN_PATH . 'build/*/block.json' );

	foreach ( $block_json_files as $filename ) {

		$block_folder = dirname( $filename );
		$block_type   = register_block_type_from_metadata( $block_folder );

		if ( ! empty( $block_type->editor_script_handles ) ) {
			foreach ( $block_type->editor_script_handles as $handle ) {
				wp_set_script_translations(
					$handle,
					'slider-block',
					PIXELALBATROSS_SLIDER_BLOCK_PLUGIN_PATH . 'languages'
				);
			}
		}
	}
}
add_action( 'init', 'pixelalbatross_slider_block_init' );

/**
 * Registers the block textdomain.
 *
 * @return void
 */
function pixelalbatross_slider_block_i18n() {
	load_plugin_textdomain( 'slider-block', false, plugin_basename( PIXELALBATROSS_SLIDER_BLOCK_PLUGIN_PATH ) . '/languages' );
}
add_action( 'plugins_loaded', 'pixelalbatross_slider_block_i18n' );

/**
 * Handles JavaScript detection.
 *
 * Adds a `js` class to the root `<html>` element when JavaScript is detected.
 */
function pixelalbatross_slider_block_js_detection() {
	echo "<script>!function(s){s.classList.contains('js')?s.classList:s.classList.add('js')}(document.documentElement);</script>\n";
}
add_action( 'wp_head', 'pixelalbatross_slider_block_js_detection', 0 );
