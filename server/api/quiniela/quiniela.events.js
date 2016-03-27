/**
 * Quiniela model events
 */

'use strict';

import {EventEmitter} from 'events';
import Quiniela from './quiniela.model';
var QuinielaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
QuinielaEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Quiniela.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    QuinielaEvents.emit(event + ':' + doc._id, doc);
    QuinielaEvents.emit(event, doc);
  }
}

export default QuinielaEvents;
