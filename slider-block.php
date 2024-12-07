<?php
/**
 * Plugin Name:       Slider Block
 * Description:       Display a slider.
 * Plugin URI:        https://pixelalbatross.pt/?utm_source=wp-plugins&utm_medium=slider-block&utm_campaign=plugin-uri
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           0.6.1
 * Author:            Pixel Albatross
 * Author URI:        https://pixelalbatross.pt/?utm_source=wp-plugins&utm_medium=slider-block&utm_campaign=author-uri
 * License:           GPL-3.0-or-later
 * License URI:       https://spdx.org/licenses/GPL-3.0-or-later.html
 * Update URI:        https://pixelalbatross.pt/
 * GitHub Plugin URI: https://github.com/pixelalbatross/slider-block
 * Text Domain:       slider-block
 *
 * @package           pixelalbatross/slider-block
 */

namespace PixelAlbatross\WP\AccordionBlock;

use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'PIXALB_SLIDER_BLOCK_PATH', plugin_dir_path( __FILE__ ) );

if ( file_exists( PIXALB_SLIDER_BLOCK_PATH . 'vendor/autoload.php' ) ) {
	require_once PIXALB_SLIDER_BLOCK_PATH . 'vendor/autoload.php';
}

PucFactory::buildUpdateChecker(
	'https://github.com/pixelalbatross/slider-block/',
	__FILE__,
	'slider-block'
)->setBranch( 'main' );

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function init() {

	$block_json_files = glob( PIXALB_SLIDER_BLOCK_PATH . 'build/*/block.json' );

	foreach ( $block_json_files as $filename ) {

		$block_folder = dirname( $filename );
		$block_type   = register_block_type_from_metadata( $block_folder );

		if ( ! empty( $block_type->editor_script_handles ) ) {
			foreach ( $block_type->editor_script_handles as $handle ) {
				wp_set_script_translations(
					$handle,
					'slider-block',
					PIXALB_SLIDER_BLOCK_PATH . 'languages'
				);
			}
		}
	}
}
add_action( 'init', __NAMESPACE__ . '\init' );

/**
 * Registers the block textdomain.
 *
 * @return void
 */
function i18n() {
	load_plugin_textdomain( 'slider-block', false, plugin_basename( PIXALB_SLIDER_BLOCK_PATH ) . '/languages' );
}
add_action( 'init', __NAMESPACE__ . '\i18n' );

/**
 * Handles JavaScript detection.
 *
 * Adds a `js` class to the root `<html>` element when JavaScript is detected.
 */
function js_detection() {
	echo "<script>!function(s){s.classList.contains('js')?s.classList:s.classList.add('js')}(document.documentElement);</script>\n";
}
add_action( 'wp_head', __NAMESPACE__ . '\js_detection', 0 );
