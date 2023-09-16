import { ActionType } from 'typesafe-actions';
import { VideoJsPlayerOptions } from 'video.js';

import { PlayerActions } from './constants';

export type VideoProps = {
  options: VideoJsPlayerOptions;
  onPlayerStateChanged?: (s: PlayerState) => void;
  onCaptionLanguageChanged?: (lang: string | undefined) => void;
  captionLanguage?: string;
};

export interface CaptionLanguage {
  language: string;
  label: string;
  mode: string;
}

export interface PlayerState {
  currentTime: number;
  canPlayThrough: boolean;
  seeking: boolean;
  playing: boolean;
  aboutToPlay: boolean;
  paused: boolean;
  stalled: boolean;
  waiting: boolean;
  ready: boolean;
  ended: boolean;
  captionLanguages: CaptionLanguage[];
}

export type PlayerActionsType = ActionType<typeof PlayerActions>;

export type VideoSourcesAndTracksOptions = Pick<VideoJsPlayerOptions, 'sources' | 'tracks'>;

export type VideoJsBaseOptions = Omit<VideoJsPlayerOptions, 'sources' | 'tracks'>;

export type VideoOptions = VideoJsBaseOptions & VideoSourcesAndTracksOptions;
