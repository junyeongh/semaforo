use anyhow::anyhow;
use gpui::*;
use gpui_component::Icon;
use rust_embed::RustEmbed;
use std::borrow::Cow;

mod components;
mod constants;

use components::menu_container::{
    app_control_buttons::app_control_buttons, menu_container,
    window_control_buttons::window_control_buttons,
};
use components::progress_bar::progress_bar;
use components::timer::timer;
use components::traffic_light::traffic_light;

#[derive(RustEmbed)]
#[folder = "./assets"]
#[include = "icons/**/*.svg"]
pub struct Assets;

impl AssetSource for Assets {
    fn load(&self, path: &str) -> Result<Option<Cow<'static, [u8]>>> {
        if path.is_empty() {
            return Ok(None);
        }

        Self::get(path)
            .map(|f| Some(f.data))
            .ok_or_else(|| anyhow!("could not find asset at path \"{path}\""))
    }

    fn list(&self, path: &str) -> Result<Vec<SharedString>> {
        Ok(Self::iter()
            .filter_map(|p| p.starts_with(path).then(|| p.into()))
            .collect())
    }
}

fn icon_from_path(path: impl Into<SharedString>) -> Icon {
    Icon::new(Icon::empty()).path(path)
}

pub struct RootView {
    is_running: bool,
    is_folded: bool,
}

impl Render for RootView {
    fn render(&mut self, window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        let container = div()
            .id("container")
            .w(Pixels::from(288u32))
            .h(Pixels::from(288u32))
            .bg(white())
            .flex()
            .flex_col()
            .items_center()
            .justify_center();

        div().child(
            container
                .child(menu_container(
                    app_control_buttons(self, window, cx),
                    window_control_buttons(self, window, cx),
                ))
                .children([
                    timer().mt(Pixels::from(36u32)),
                    traffic_light()
                        .mt(Pixels::from(12u32))
                        .mb(Pixels::from(18u32)),
                    progress_bar().mb(Pixels::from(18u32)),
                ]),
        )
    }
}

fn main() {
    let app = Application::new().with_assets(Assets);
    app.run(move |app| {
        let window_options = WindowOptions {
            window_bounds: Some(WindowBounds::Windowed(Bounds::<Pixels> {
                // origin: Point {
                //     x: Pixels::from(72.0),
                //     y: Pixels::from(72.0),
                // },
                // size: Size {
                //     width: Pixels::from(288.0),
                //     height: Pixels::from(288.0),
                // },
                ..Default::default()
            })),
            titlebar: None,
            // titlebar: Some(TitlebarOptions {
            //     title: Some(SharedString::from("Hello")),
            //     appears_transparent: true,
            //     traffic_light_position: None,
            // }),
            // focus: true,
            // show: true,
            // kind: WindowKind::Normal,
            // is_movable: true,
            is_resizable: false,
            is_minimizable: false,
            // display_id: None,
            // window_background: WindowBackgroundAppearance::Transparent,
            // app_id: None,
            window_min_size: Some(Size {
                width: Pixels::from(288.0),
                height: Pixels::from(288.0),
            }),
            // window_decorations: None,
            // tabbing_identifier: None,
            ..Default::default()
        };

        app.open_window(window_options, |_window, app| {
            let root_view_entity = app.new(|_cx| RootView {
                is_running: false,
                is_folded: false,
            });
            return root_view_entity;
        })
        .unwrap();
    });
}
