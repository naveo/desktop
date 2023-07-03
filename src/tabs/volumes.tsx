import { useState, useEffect } from 'react';
import { Ping, VolumesEndpoint } from '../api';

interface IVolumes {
  Volumes: [IVolumesData];
}

interface IVolumesData {
  CreatedAt: number;
  Driver: string;
  Labels: null;
  Mountpoint: string;
  Name: string;
  Options: null;
  Scope: string;
}

export default function Volumes() {
  const [volumes, setVolumes] = useState<IVolumes>(Object);

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
      const data = await VolumesEndpoint();
      setVolumes(data);
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-slate-700 to-slate-800 pl-6 pt-6">
      <div className="text-2xl font-bold text-slate-200">Volumes</div>
      <table className="mt-6 w-full table-fixed text-left">
        <thead>
          <tr>
            <th>Name</th>
            <th>Driver</th>
            <th>Scope</th>
            <th>Created</th>
          </tr>
        </thead>
        {volumes.Volumes?.map((volume) => (
          <tbody key={volume.Name}>
            <tr>
              <td>{volume.Name}</td>
              <td>{volume.Driver}</td>
              <td>{volume.Scope}</td>
              <td>{volume.CreatedAt}</td>
              <td></td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
