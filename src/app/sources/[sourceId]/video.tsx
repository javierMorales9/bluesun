'use client';
import { useEffect, useState } from 'react';
import { Timer } from './useTimer';
import { Image } from 'react-konva';

export default function Video({
  src,
  startTime = 0,
  timer: {
    length,
    setLength,
    currentTime,
    playing,
  }
}: {
  src: string,
  startTime: number,
  timer: Timer,
}) {
  const [movie, setMovie] = useState<HTMLVideoElement | null>(null);
  const [videoTimer, setVideoTimer] = useState<ReturnType<typeof setInterval> | null>(null);
  const [videoNode, setVideoNode] = useState<any>();

  useEffect(() => {
    const video = document.createElement('video');
    video.src = src;
    video.controls = false;
    video.autoplay = false;

    if (startTime)
      video.currentTime = startTime;
    else
      video.currentTime = 0;

    video.onloadedmetadata = () => {
      if (!length) {
        setLength(video.duration);
      }
    }

    setMovie(video);
  }, []);

  useEffect(() => {
    if (movie)
      movie.currentTime = startTime + toSeconds(currentTime);
  }, [currentTime]);

  useEffect(() => {
    if (playing)
      play();
    else
      pause();
  }, [playing]);

  function pause() {
    clearInterval(videoTimer!);
    setVideoTimer(null);

    movie?.pause();
  }

  function play() {
    const vidT = setInterval(() => {
      if (!movie) return;
      videoNode?.getLayer().batchDraw();
    }, 1000 / 30);


    setVideoTimer(vidT);

    movie?.play().catch(console.error);
  }

  function toSeconds(time: [number, number]): number {
    return time[0] * 60 + time[1];
  }

  return (
    <Image
      ref={(node) => {
        setVideoNode(node);
      }}
      width={960}
      height={540}
      image={movie!}
    />
  );
}

