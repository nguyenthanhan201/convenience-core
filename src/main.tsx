import './index.css';

import { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';

import {
  PlayerState,
  VideoJsBaseOptions,
  VideoOptions,
  VideoSourcesAndTracksOptions,
} from './lib/components/Video/types';
import VideoPlayer from './lib/components/Video/Video';

function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function App() {
  const [videoState, setVideoState] = useState<PlayerState>();
  const [uid, setUid] = useState(uuid());
  const sourceAndTrackOptions: VideoSourcesAndTracksOptions = useMemo(
    () => ({
      sources: [
        {
          src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
          type: 'application/x-mpegURL',
        },
        {
          src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
          type: 'application/x-mpegURL',
        },
      ],
      tracks: [
        {
          src: 'https://gist.githubusercontent.com/samdutton/ca37f3adaf4e23679957b8083e061177/raw/e19399fbccbc069a2af4266e5120ae6bad62699a/sample.vtt',
          language: 'no',
          srcLang: 'no',
          label: 'Norwegian',
          kind: 'captions',
        },
        {
          src: 'https://gist.githubusercontent.com/samdutton/ca37f3adaf4e23679957b8083e061177/raw/e19399fbccbc069a2af4266e5120ae6bad62699a/sample.vtt',
          language: 'en',
          srcLang: 'en',
          label: 'English',
          kind: 'captions',
        },
      ],
    }),
    [],
  );
  const videoJsBaseOptions: VideoJsBaseOptions = useMemo(() => {
    const opts: VideoJsBaseOptions = {
      poster: 'https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg',
      preload: 'auto',
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      //defaultVolume: 0,
      controlBar: {
        pictureInPictureToggle: false,
      },
      muted: true,
    };
    return opts;
  }, []);

  const videoJsOptions: VideoOptions = useMemo(
    () => ({
      ...videoJsBaseOptions,
      ...sourceAndTrackOptions,
    }),
    [videoJsBaseOptions, sourceAndTrackOptions, uid],
  );

  const [captionLanguage, setCaptionLanguage] = useState<string>();

  return (
    <>
      <h1>VideoJS Test</h1>
      <div style={{ maxWidth: '700px' }}>
        <VideoPlayer
          options={videoJsOptions}
          onPlayerStateChanged={(state: PlayerState): void => setVideoState(state)}
          onCaptionLanguageChanged={(lang) => setCaptionLanguage(lang)}
          captionLanguage={captionLanguage}
        />
      </div>
      <button type='button' onClick={() => setUid(uuid())}>
        reset options
      </button>
      <button
        type='button'
        onClick={() => {
          return setCaptionLanguage(
            captionLanguage === 'en' ? undefined : captionLanguage === 'no' ? 'en' : 'no',
          );
        }}
      >
        toggle lang
      </button>
      <pre>{JSON.stringify(videoState, null, 2)}</pre>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);
