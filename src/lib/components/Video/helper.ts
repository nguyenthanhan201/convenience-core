import { createReducer } from 'typesafe-actions';
import { VideoJsPlayer } from 'video.js';

import { PlayerActions } from './constants';
import { PlayerActionsType, PlayerState } from './types';

export function getAvailableCaptionLanguages(player: VideoJsPlayer) {
  const textTracks = player.textTracks();
  const captions = Array.from(textTracks).filter((tr) => tr.kind === 'captions');
  const availableLanguages = captions.map(({ language, label, mode }) => ({
    language,
    label,
    mode: mode as string,
  }));
  return availableLanguages;
}

export const defaultPlayerState: PlayerState = {
  currentTime: 0,
  canPlayThrough: false,
  seeking: false,
  playing: false,
  aboutToPlay: false,
  paused: true,
  stalled: false,
  waiting: false,
  ready: false,
  ended: false,
  captionLanguages: [],
};
export const playerReducer = createReducer<PlayerState, PlayerActionsType>(defaultPlayerState)
  .handleAction(PlayerActions.onTimeUpdate, (state, { payload }) => ({
    ...state,
    currentTime: payload,
  }))
  .handleAction(PlayerActions.initialize, () => defaultPlayerState)
  .handleAction(PlayerActions.canPlayThrough, (state) => ({
    ...state,
    canPlayThrough: true,
  }))
  .handleAction(PlayerActions.ended, (state) => ({
    ...state,
    ended: true,
    seeking: false,
    playing: false,
    aboutToPlay: false,
  }))
  .handleAction(PlayerActions.seek, (state) => ({
    ...state,
    seeking: true,
    ended: false,
    canPlayThrough: false,
  }))
  .handleAction(PlayerActions.seeked, (state) => ({
    ...state,
    seeking: false,
  }))
  .handleAction(PlayerActions.paused, (state) => ({
    ...state,
    seeking: false,
    playing: false,
    aboutToPlay: false,
    paused: true,
  }))
  .handleAction(PlayerActions.play, (state) => ({
    ...state,
    seeking: false,
    playing: false,
    aboutToPlay: true,
    paused: false,
  }))
  .handleAction(PlayerActions.playing, (state) => ({
    ...state,
    playing: true,
    aboutToPlay: false,
    stalled: false,
    waiting: false,
    ended: false,
  }))
  .handleAction(PlayerActions.stalled, (state) => ({
    ...state,
    seeking: false,
    playing: false,
    stalled: true,
  }))
  .handleAction(PlayerActions.waiting, (state) => ({
    ...state,
    seeking: false,
    playing: false,
    waiting: true,
  }))
  .handleAction(PlayerActions.ready, (state) => ({
    ...state,
    ready: true,
  }))
  .handleAction(PlayerActions.captionLanguages, (state, { payload }) => ({
    ...state,
    captionLanguages: payload,
  }));
