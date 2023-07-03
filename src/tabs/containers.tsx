import { useState, useEffect } from 'react';
import { Ping, ContainersEndpoint } from '../api';
import { open } from '@tauri-apps/api/shell';

interface IContainer {
  Id: string;
  Names: [string];
  Image: string;
  Command: string;
  Created: number;
  Ports: [IPort];
  State: string;
  Status: string;
}

interface IPort {
  IP: string;
  PrivatePort: number;
  PublicPort: number;
  Type: string;
}

export default function Containers() {
  const [containers, setContainers] = useState<IContainer[]>([]);

  useEffect(() => {
    // Get containers data then periodically fetch every 5 seconds
    check();

    const interval = setInterval(() => {
      check();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const check = async () => {
    const status = await Ping();
    if (status == 200) {
      const data = await ContainersEndpoint();
      setContainers(data);
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-slate-700 to-slate-800 pl-6 pt-6">
      <div className="text-2xl font-bold text-slate-200">Containers</div>
      <table className="mt-6 w-full table-fixed text-left">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Status</th>
            <th>Port(s)</th>
            <th>Last started</th>
          </tr>
        </thead>
        {containers.map((container) => (
          <tbody key={container.Id}>
            <tr>
              <td>
                <div>{container.Names[0].split('/')[1]}</div>
                <div className=" font-thin">{container.Id.slice(0, 12)}</div>
              </td>
              <td>{container.Image}</td>
              <td>{container.State}</td>
              <td>
                <a
                  href="#"
                  className=" text-cyan-400 underline"
                  onClick={() =>
                    open(`http://localhost:${container.Ports[0].PublicPort}`)
                  }
                >
                  {container.Ports[0].PublicPort}:
                  {container.Ports[0].PrivatePort}
                </a>
              </td>
              <td>{container.Status}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
