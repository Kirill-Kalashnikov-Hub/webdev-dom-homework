import { renderComments } from './commentRenderer.js';
import { initializeEventHandlers } from './eventHandlers.js';
import { comments } from './data.js';

renderComments(comments);
initializeEventHandlers(comments, renderComments);