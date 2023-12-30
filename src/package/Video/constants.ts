import { createAction } from 'typesafe-actions';

import { CaptionLanguage } from './types';

export const PlayerActions = {
  onTimeUpdate: createAction('player/TIME_UPDATE')<number>(),
  initialize: createAction('player/INITIALIZE')(),
  canPlayThrough: createAction('player/CAN_PLAY_THROUGH')(),
  ended: createAction('player/ENDED')(),
  seek: createAction('player/SEEK')(),
  seeked: createAction('player/SEEKED')(),
  paused: createAction('player/PAUSED')(),
  play: createAction('player/PLAY')(),
  playing: createAction('player/PLAYING')(),
  stalled: createAction('player/STALLED')(),
  waiting: createAction('player/WAITING')(),
  ready: createAction('player/READY')(),
  captionLanguages: createAction('player/CAPTION_LANGUAGES')<CaptionLanguage[]>(),
};
