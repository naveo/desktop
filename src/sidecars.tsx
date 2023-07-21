import { Command } from '@tauri-apps/api/shell';
import { homeDir, resolveResource } from '@tauri-apps/api/path';
import { exists } from '@tauri-apps/api/fs';
import { Ping } from './api';
import { CreateStorage, InstallNaveoContext } from './utilities';

async function visorkit() {
  const homeDirPath = await homeDir();
  const configPath = await resolveResource('configs/visorkit-config.json');

  let storagePath = await exists(`${homeDirPath}naveo/vms/naveo.img`);
  if (!storagePath) {
    await CreateStorage();
  }

  const command = await Command.sidecar('binaries/visorkit', [
    configPath,
  ]).execute();
  console.log(command);
}

async function portkit() {
  const configPath = await resolveResource('configs/portkit-config.json');

  const command = await Command.sidecar('binaries/portkit', [
    '-config',
    configPath,
  ]).execute();
  console.log(command);
}

export function StartSidecars() {
  visorkit();

  const intID = setInterval(async () => {
    const ping = await Ping();
    if (ping == 200) {
      portkit();
      clearInterval(intID);
    }
  }, 3000);
}
