import {
  exists,
  BaseDirectory,
  readTextFile,
  writeTextFile,
} from '@tauri-apps/api/fs';
import { Command } from '@tauri-apps/api/shell';
import { homeDir, resourceDir } from '@tauri-apps/api/path';
import { IProps } from './models';

export function FormatDate(props: IProps) {
  const date = new Date(props.epoch * 1000);
  return (
    <>
      {date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      })}
    </>
  );
}

export async function InstallDockerCli() {
  const resourceDirPath = await resourceDir();
  const dockerCliPath = await exists('/usr/local/bin/docker');
  const dockerComposeCliPath = await exists('/usr/local/bin/docker-compose');

  if (!dockerCliPath) {
    const dockerSymlink = await new Command('run-ln-command', [
      '-s',
      `${resourceDirPath}bin/docker`,
      '/usr/local/bin/docker',
    ]).execute();
  }

  if (!dockerComposeCliPath) {
    const dockerComposeSymlink = await new Command('run-ln-command', [
      '-s',
      `${resourceDirPath}bin/docker-compose`,
      '/usr/local/bin/docker-compose',
    ]).execute();
  }
}

export async function InstallNaveoContext() {
  const naveoContext = await new Command('run-docker-command', [
    'context',
    'inspect',
    'naveo',
  ]).execute();

  console.log(naveoContext.code);

  if (naveoContext.code !== 0) {
    const naveoContext = await new Command('run-docker-command', [
      'context',
      'create',
      'naveo',
      '--docker',
      'host=tcp://naveo.local:2376',
    ]).execute();
    console.log(naveoContext);
  }
}

export async function CheckContextNaveo() {
  const naveoContext = await new Command('run-docker-command', [
    'context',
    'ls',
    '--format=\'{{if eq .Name "naveo"}}{{.Current}}{{end}}\'',
  ]).execute();

  console.log(naveoContext);

  if (naveoContext.stdout.includes('false')) {
    return false;
  } else {
    return true;
  }
}

export async function SwitchContextNaveo() {
  const naveoContext = await new Command('run-docker-command', [
    'context',
    'use',
    'naveo',
  ]).execute();

  console.log(naveoContext.code);
}

export async function CreateStorage() {
  const homeDirPath = await homeDir();

  const mkdirCommand = await new Command('run-mkdir-command', [
    '-p',
    `${homeDirPath}naveo/vms/`,
  ]).execute();
  console.log(mkdirCommand);

  // Create a thin provisioned disk image in user home directory
  const ddCommand = await new Command('run-dd-command', [
    'if=/dev/zero',
    `of=${homeDirPath}naveo/vms/naveo.img`,
    'bs=1',
    'seek=60G',
    'count=0',
  ]).execute();
  console.log(ddCommand);
}

export async function UpdateStoragePath() {
  const homeDirPath = await homeDir();
  const storagePath = `${homeDirPath}naveo/vms/naveo.img`;

  const content = await readTextFile('configs/visorkit-config.json', {
    dir: BaseDirectory.Resource,
  });

  const visorkitConfig = JSON.parse(content);
  visorkitConfig.disk = storagePath;

  await writeTextFile(
    'configs/visorkit-config.json',
    JSON.stringify(visorkitConfig),
    {
      dir: BaseDirectory.Resource,
    }
  );
}
