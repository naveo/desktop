// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
    AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem,
};

fn broadcast(app: &AppHandle, event: &str) {
    app.emit_all(event, {}).unwrap();
    let window = app.get_window("main");
    window
        .expect("error while getting main window")
        .set_focus()
        .unwrap();
}

fn system_tray_event(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => {
                // std::process::exit(0);
                app.exit(0);
            }
            "containers" => broadcast(app, "SystemTrayEventContainers"),
            "images" => broadcast(app, "SystemTrayEventImages"),
            "volumes" => broadcast(app, "SystemTrayEventVolumes"),
            "settings" => broadcast(app, "SystemTrayEventSettings"),
            _ => {}
        },
        _ => {}
    }
}

fn main() {
    // tauri::Builder::default()
    //     .invoke_handler(tauri::generate_handler![greet])
    //     .run(tauri::generate_context!())
    //     .expect("error while running tauri application");
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let containers = CustomMenuItem::new("containers".to_string(), "Containers");
    let images = CustomMenuItem::new("images".to_string(), "Images");
    let volumes = CustomMenuItem::new("volumes".to_string(), "Volumes");
    let settings = CustomMenuItem::new("settings".to_string(), "Settings");
    let tray_menu = SystemTrayMenu::new()
        .add_item(containers)
        .add_item(images)
        .add_item(volumes)
        .add_item(settings)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);
    let system_tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        .setup(|app| {
            #[cfg(target_os = "macos")]
            app.set_activation_policy(tauri::ActivationPolicy::Accessory);
            Ok(())
        })
        .system_tray(system_tray)
        .on_system_tray_event(system_tray_event)
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                event.window().hide().unwrap();
                api.prevent_close();
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
