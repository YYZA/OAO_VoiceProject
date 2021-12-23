import React, { useEffect, useRef, useState } from "react";
import moment from "moment";

const StopWatch = ({
  _className,
  mode,
  setMode,
  runtime_memory,
  setRuntimeMemory,
  setControls,
  playerRef,
  has_audio,
}) => {
  const diff = -80; // audio file duration 길이와 스톱워치 타임 오차
  const timeRef = useRef(diff);
  const intervalRef = useRef(null);
  const [time, setTime] = useState("00:00:00");
  const [display_time, setDisplayTime] = useState("00:00:00");
  const [is_continue, setContinue] = useState(false);

  const handleStart = () => {
    console.log("시작 시 파일을 갖고있니?", has_audio);
    // 현재 오디오 파일이 있다면 일시정지 후 이어듣기 가능 상태를 true
    if (has_audio) {
      setContinue(true);
    } else {
      setContinue(false);
    }

    setDisplayTime("00:00:00");

    intervalRef.current = setInterval(() => {
      timeRef.current += 10;

      if (timeRef.current >= 0) {
        const timer_str = moment(timeRef.current).format("mm:ss:SS");
        setTime(timer_str);
        setDisplayTime(timer_str);
      }
    }, 10);
  };

  const handlePause = () => {
    console.log("정지 시 파일을 갖고있니?", has_audio);
    clearInterval(intervalRef.current);

    // 녹음 런타임 시간은 비어있을때만 저장한다.
    if (runtime_memory == null) {
      setRuntimeMemory(time);
    }

    // 녹음시에는 스톱워치 초기화
    if (!is_continue) {
      timeRef.current = 0;
      setTime("00:00:00");
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    timeRef.current = 0;
    setRuntimeMemory(null);
    setTime("00:00:00");
    setDisplayTime("00:00:00");
  };

  useEffect(() => {
    console.log("스톱워치 모드: ", mode);
    if (mode === "start") {
      handleStart();
    } else if (mode === "stop") {
      handlePause();
    } else if (mode === "play") {
      console.log("재생 시 메모리타임: ", runtime_memory);
      handleStart();
    } else {
      handleReset();
    }
  }, [mode]);

  useEffect(() => {
    if (runtime_memory === time) {
      clearInterval(intervalRef.current);
      timeRef.current = 0;
      setTime("00:00:00");

      setControls({
        record: false,
        pause: false,
        play: true,
      });

      // 오디오 태그 플레이 타임 초기화
      console.log("오디오 총 길이값: ", playerRef.current.duration);
      playerRef.current.currentTime = 0;
      playerRef.current.pause();

      setMode("stop");
    }
  }, [setRuntimeMemory, time]);

  return (
    <div className={_className}>
      <button type={"button"} onClick={handleStart}>
        시작
      </button>
      <button type={"button"} onClick={handlePause}>
        멈춤
      </button>
      <button type={"button"} onClick={handleReset}>
        초기화
      </button>
      <div>{display_time}</div>
    </div>
  );
};

export default StopWatch;
