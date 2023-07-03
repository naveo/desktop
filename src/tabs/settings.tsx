import { useState, useEffect } from 'react';
import { readTextFile, BaseDirectory } from '@tauri-apps/api/fs';

interface ISettigns {
  vmlinuz: string;
  initrd: string;
  disk: string;
  vzUsers: string;
  vzVolumes: string;
  vzTmp: string;
  vzVar: string;
  vzPrivate: string;
  cpu: number;
  memory: number;
}

export default function Settings() {
  const [settings, setSettings] = useState<ISettigns>();

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    const contents = await readTextFile('configs/visorkit-config.json', {
      dir: BaseDirectory.Resource,
    });
    console.log(contents);
    setSettings(JSON.parse(contents));
  };

  return (
    <div className="w-full bg-gradient-to-b from-slate-700 to-slate-800 pl-6 pt-6">
      <div className=" font-thin text-slate-200">
        <p>GUI Setting editing unavailable in alpha build.</p>
        <table className="mt-6 w-full table-fixed text-left ">
          <thead>
            <tr>
              <th>vmlinuz</th>
              <td> {settings?.vmlinuz}</td>
            </tr>
            <tr>
              <th>initrd</th>
              <td> {settings?.initrd}</td>
            </tr>
            <tr>
              <th>Disk</th>
              <td> {settings?.disk}</td>
            </tr>
            <tr>
              <th>Users Mount</th>
              <td> {settings?.vzUsers}</td>
            </tr>
            <tr>
              <th>Volumes Mount</th>
              <td> {settings?.vzVolumes}</td>
            </tr>
            <tr>
              <th>Tmp Mount</th>
              <td> {settings?.vzTmp}</td>
            </tr>
            <tr>
              <th>Var Mount</th>
              <td> {settings?.vzVar}</td>
            </tr>
            <tr>
              <th>Private Mount</th>
              <td> {settings?.vzPrivate}</td>
            </tr>
            <tr>
              <th>CPU</th>
              <td> {settings?.cpu} Cores</td>
            </tr>
            <tr>
              <th>Memory</th>
              <td>{settings?.memory} GB</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
