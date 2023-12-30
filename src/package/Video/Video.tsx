/* eslint-disable jsx-a11y/media-has-caption */
import 'video.js/dist/video-js.css';

import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import videojs, { VideoJsPlayer } from 'video.js';

import { omit } from '@/package/utils';

import { useValueRef } from '../useValueRef';
import { PlayerActions } from './constants';
import { defaultPlayerState, getAvailableCaptionLanguages, playerReducer } from './helper';
import { VideoProps } from './types';

const Video = (props: VideoProps) => {
  const { options, onPlayerStateChanged, captionLanguage, onCaptionLanguageChanged } = props;

  const [state, dispatch] = useReducer(playerReducer, defaultPlayerState);
  useEffect(() => {
    onPlayerStateChanged?.(state);
  }, [state, onPlayerStateChanged]);
  // this needs to be a mutableref as we meddle with it later
  const videoRef = useRef<HTMLVideoElement>();
  const parentRef = useRef<HTMLDivElement>(null);
  const { tracks, sources } = options;
  const VideoHtml = useCallback(() => {
    return (
      <div data-vjs-player>
        <video
          // set the mutableref using a callback ref
          className='video-js vjs-big-play-centered'
          crossOrigin='anonymous'
          ref={(e) => (videoRef.current = e ?? undefined)}
        >
          {sources?.map((s, index) => (
            <source key={index} {...s} />
          ))}
          {tracks?.map((s, index) => (
            <track key={index} {...s} />
          ))}
        </video>
      </div>
    );
  }, [tracks, sources]);
  const [player, setPlayer] = useState<VideoJsPlayer>();
  useEffect(() => {
    dispatch(PlayerActions.initialize());
    const videoElement = videoRef.current;

    // take a snapshot of the HTML nodes that VideoJS removes when it is disposed
    const playerHtml = videoRef.current?.parentElement?.cloneNode(true);
    let player: VideoJsPlayer;
    if (videoElement) {
      player = videojs(videoElement, omit(options, 'tracks', 'sources'));

      setPlayer(player);
    }
    return () => {
      if (player) {
        player.dispose();
        // during dispose, VideoJS removes elements that were
        // previously in the DOM. Above, we stored a snapshot
        // of the HTML node that VideoJS removes. Let's restore
        // it now and fix-up videoRef.current to point to the
        // correct, newly inserted DOM element. Crazy shit.
        if (playerHtml) {
          if (parentRef.current?.querySelector('div[data-vjs-player]') == null) {
            parentRef.current?.appendChild(playerHtml);
            videoRef.current = (playerHtml.firstChild as HTMLVideoElement) ?? undefined;
          }
        }
        setPlayer(undefined);
      }
    };
  }, [options]);

  const getPlayerOn = useCallback((player: VideoJsPlayer) => {
    const events: { type: string; handler: (...args: any[]) => void }[] = [];
    return {
      playerOn: (type: string, handler: (...args: any[]) => void) => {
        events.push({ type, handler });
        return player.on.call(player, type, handler);
      },
      disposeEvents: () => {
        events.forEach((e) => player.off(e.type, e.handler));
      },
    };
  }, []);

  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (player) {
      const { disposeEvents, playerOn } = getPlayerOn(player);

      //events.push("ready");
      playerOn('ready', () => {
        const availableLanguages = getAvailableCaptionLanguages(player);

        dispatch(PlayerActions.captionLanguages(availableLanguages));
        dispatch(PlayerActions.ready());
        setReady(true);
      });
      return () => {
        disposeEvents();
        setReady(false);
      };
    }
  }, [player, getPlayerOn]);

  const disableTexttrackchangeEvents = useValueRef(false);

  useEffect(() => {
    if (ready && player) {
      //player.load();
      //console.log(player.textTracks().length);
      const { disposeEvents, playerOn } = getPlayerOn(player);

      playerOn('texttrackchange', () => {
        if (disableTexttrackchangeEvents()) {
          return;
        }
        const availableLanguages = getAvailableCaptionLanguages(player);
        const [selectedLang] = availableLanguages.filter((l) => l.mode === 'showing');
        onCaptionLanguageChanged?.(selectedLang?.language);
        dispatch(PlayerActions.captionLanguages(availableLanguages));
      });
      playerOn('timeupdate', (_e) => dispatch(PlayerActions.onTimeUpdate(player.currentTime())));
      playerOn('canplaythrough', () => dispatch(PlayerActions.canPlayThrough()));
      playerOn('error', () => alert('error'));

      playerOn('ended', () => dispatch(PlayerActions.ended()));
      playerOn('pause', () => dispatch(PlayerActions.paused()));
      playerOn('play', () => dispatch(PlayerActions.play()));

      playerOn('playing', () => dispatch(PlayerActions.playing()));
      playerOn('seeking', () => dispatch(PlayerActions.seek()));
      playerOn('seeked', () => dispatch(PlayerActions.seeked()));
      playerOn('stalled', () => dispatch(PlayerActions.stalled()));
      playerOn('waiting', () => dispatch(PlayerActions.waiting()));
      return () => disposeEvents();
    }
  }, [ready, player, getPlayerOn]);

  const captionLanguages = state.captionLanguages;
  useEffect(() => {
    //console.log([captionLanguage, player, captionLanguages])
    disableTexttrackchangeEvents(true);
    if (player && captionLanguages) {
      Array.from(player.textTracks()).forEach(
        (t) => (t.mode = t.language === captionLanguage ? 'showing' : 'disabled'),
      );
    }
    disableTexttrackchangeEvents(false);
  }, [captionLanguage, player, captionLanguages, disableTexttrackchangeEvents]);

  return (
    <div ref={parentRef}>
      <VideoHtml />
    </div>
  );
};

export { Video };
