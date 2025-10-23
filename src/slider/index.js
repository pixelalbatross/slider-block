/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { Icon } from './icon';
import Edit from './edit';
import Save from './save';
import './style.css';

registerBlockType(metadata.name, {
	icon: Icon,
	edit: Edit,
	save: Save,
});
