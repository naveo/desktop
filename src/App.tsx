import { useState, useEffect } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';
import './App.css';
import Layout from './layout';
import Loading from './loading';
import { Ping } from './api';
import { listen } from '@tauri-apps/api/event';

function App() {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const [rootPath] = useState(useMatch('/'));

  useEffect(() => {
    check();

    if (rootPath) {
      navigate('containers');
    }

    listen('SystemTrayEventContainers', (event) => {
      navigate('containers');
    });
    listen('SystemTrayEventImages', (event) => {
      navigate('images');
    });
    listen('SystemTrayEventVolumes', (event) => {
      navigate('volumes');
    });
    listen('SystemTrayEventSettings', (event) => {
      navigate('settings');
    });
  }, []);

  const check = () => {
    const interval = setInterval(async () => {
      const ping = await Ping();
      if (ping == 200) {
        setStatus(true);
        clearInterval(interval);
      }
    }, 3000);
  };

  return status ? <Layout /> : <Loading />;
}

export default App;
