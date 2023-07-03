import { Command } from '@tauri-apps/api/shell';
import { resolveResource, resourceDir } from '@tauri-apps/api/path';
import { exists, BaseDirectory } from '@tauri-apps/api/fs';
import { Ping } from './api';

async function createStorage() {
  const resourceDirPath = await resourceDir();

  const command = await new Command('run-dd-command', [
    'if=/dev/zero',
    `of=${resourceDirPath}/vms/storage.img`,
    'bs=1M',
    'seek=10G',
    'count=0',
  ]).execute();
}

async function visorkit() {
  const configPath = await resolveResource('configs/visorkit-config.json');
  let storagePath = await exists('vms/storage.img', {
    dir: BaseDirectory.Resource,
  });
  if (storagePath === false) {
    await createStorage();
  }

  const command = Command.sidecar('binaries/visorkit', [configPath]);
  await command.execute();
}

async function portkit() {
  const configPath = await resolveResource('configs/portkit-config.json');
  const command = Command.sidecar('binaries/portkit', ['-config', configPath]);
  await command.execute();
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
