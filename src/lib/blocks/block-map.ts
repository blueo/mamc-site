import MediaBlock from './MediaBlock/index.svelte';
import CallToActionBlock from './CallToActionBlock.svelte';
import CenteredMediaBlock from './CenteredMediaBlock.svelte';
import ContentBlock from './ContentBlock.svelte';
import TextBlock from './TextBlock.svelte';
import NotificationBlock from './NotificationBlock.svelte';

// mapping of forestry block types to components
export default {
	'media-block': MediaBlock,
	'call-to-action-block': CallToActionBlock,
	'centered-media-block': CenteredMediaBlock,
	'content-block': ContentBlock,
	'text-block': TextBlock,
	'notification-block': NotificationBlock
};
