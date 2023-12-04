<?php
/**
 * Plugin Name:       Content List
 * Description:       A Gutenberg Block that lets you show a table of your website&#39;s contents with various controls
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Yousof K.
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       content-list
 *
 * @package           yk-content-list
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function content_list_content_list_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'content_list_content_list_block_init' );
