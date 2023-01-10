import React, { useMemo, useState } from 'react';
import { render } from 'react-dom';

const App = () => {
  const WORK_TIME = 1200;
  const REST_TIME = 20;

  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return `${minutes}:${seconds}`;
  };

  const memoizedTime = useMemo(() => formatTime(time, [time]));

  const startTimer = () => {
    setStatus('work');
    setTime(WORK_TIME);
    setTimer(
      setInterval(() => {
        setTime((time) => time - 1);
      }, 1000)
    );
  };

  const stopTimer = () => {
    setStatus('off');
    setTime(0);
    clearInterval(timer);
  };

  const closeApp = () => {
    window.close();
  };

  const playBell = () => {
    const audioElement = new Audio('./sounds/bell.wav');
    audioElement.play();
  };

  if (time < 0) {
    playBell();
    if (status === 'work') {
      setStatus('rest');
      setTime(REST_TIME);
    }
    if (status === 'rest') {
      setStatus('work');
      setTime(WORK_TIME);
    }
  }

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' && (
        <div>
          <p>
            According to optometrists in order to save your eyes, you should
            follow the 20/20/20. It means you should to rest your eyes every 20
            minutes for 20 seconds by looking more than 20 feet away.
          </p>
          <p>
            This app will help you track your time and inform you when it's time
            to rest.
          </p>
        </div>
      )}
      {status === 'work' && <img src='./images/work.png' />}
      {status === 'rest' && <img src='./images/rest.png' />}
      {status !== 'off' && <div className='timer'>{memoizedTime}</div>}
      {status === 'off' && (
        <button className='btn' onClick={startTimer}>
          Start
        </button>
      )}
      {status !== 'off' && (
        <button className='btn' onClick={stopTimer}>
          Stop
        </button>
      )}
      <button className='btn btn-close' onClick={closeApp}>
        X
      </button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
