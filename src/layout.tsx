import { Outlet, NavLink } from 'react-router-dom';
import { ContainerIcon, ImageIcon, VolumeIcon, SettingsIcon } from './icons';

export default function Layout() {
  return (
    <div className="flex h-screen flex-col text-slate-400 antialiased">
      <div
        data-tauri-drag-region
        className="flex h-10 cursor-default select-none items-center justify-center bg-slate-900"
      >
        naveo
      </div>
      <div className="flex h-full">
        <div className="w-60 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="flex flex-col gap-2 pt-4">
            <NavLink
              to={`containers`}
              className={({ isActive }) =>
                isActive
                  ? 'flex w-full gap-2 rounded-sm bg-slate-900 px-4 py-2 text-start text-slate-200'
                  : 'flex w-full gap-2 rounded-sm px-4 py-2 text-start hover:bg-slate-900 hover:text-slate-200'
              }
            >
              <ContainerIcon />
              Containers
            </NavLink>
            <NavLink
              to={`images`}
              className={({ isActive }) =>
                isActive
                  ? 'flex w-full gap-2 rounded-sm bg-slate-900 px-4 py-2 text-start text-slate-200'
                  : 'flex w-full gap-2 rounded-sm px-4 py-2 text-start hover:bg-slate-900 hover:text-slate-200'
              }
            >
              <ImageIcon />
              Images
            </NavLink>
            <NavLink
              to={`volumes`}
              className={({ isActive }) =>
                isActive
                  ? 'flex w-full gap-2 rounded-sm bg-slate-900 px-4 py-2 text-start text-slate-200'
                  : 'flex w-full gap-2 rounded-sm px-4 py-2 text-start hover:bg-slate-900 hover:text-slate-200'
              }
            >
              <VolumeIcon />
              Volumes
            </NavLink>
            <NavLink
              to={`settings`}
              className={({ isActive }) =>
                isActive
                  ? 'flex w-full gap-2 rounded-sm bg-slate-900 px-4 py-2 text-start text-slate-200'
                  : 'flex w-full gap-2 rounded-sm px-4 py-2 text-start hover:bg-slate-900 hover:text-slate-200'
              }
            >
              <SettingsIcon />
              Settings
            </NavLink>
          </div>
        </div>
        <Outlet />
      </div>
      <div className="flex h-6 w-full cursor-default select-none  bg-slate-900">
        <div className="w-10 bg-cyan-400"></div>
      </div>
    </div>
  );
}
