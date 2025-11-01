use anyhow::anyhow;
use gpui::{prelude::FluentBuilder, *};
use gpui_component::{Icon, IconName, Sizable};
use rust_embed::RustEmbed;
use std::borrow::Cow;

mod constants;
use crate::constants::colors::Colors;

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

struct RootView {
    is_running: bool,
}

impl Render for RootView {
    fn render(&mut self, _window: &mut Window, _cx: &mut Context<Self>) -> impl IntoElement {
        let container = div()
            .id("container")
            .w(Pixels::from(288u32))
            .h(Pixels::from(288u32))
            .bg(white())
            .flex()
            .flex_col()
            .items_center()
            .justify_center()
            .rounded_2xl()
            .window_control_area(WindowControlArea::Drag);

        let start_pause_button = div()
            .id("start_pause_button")
            .h_8()
            .w_8()
            .items_center()
            .justify_center()
            // .bg(Colors::light_gray)
            // .rounded_sm()
            .flex()
            .justify_center()
            .items_center()
            .on_mouse_down(MouseButton::Left, |_mouse_down_event, _window, _app| {
                println!("Pressed start_pause_button");
            })
            .child(
                Icon::new(Icon::empty())
                    .path("icons/play.svg")
                    .large()
                    .when(self.is_running, |_icon| {
                        Icon::new(Icon::empty()).path("icons/pause.svg").large()
                    }),
            );

        let reset_button = div()
            .id("reset_button")
            .h_8()
            .w_8()
            // .bg(Colors::light_gray)
            // .rounded_sm()
            .flex()
            .justify_center()
            .items_center()
            .on_mouse_down(MouseButton::Left, |_mouse_down_event, _window, _app| {
                println!("Pressed reset_button")
            })
            .child(Icon::new(Icon::empty()).path("icons/rotate-cw.svg").large());

        let app_control_buttons = div()
            .id("app_control_buttons")
            .flex()
            .absolute()
            .left(Pixels::from(16u32))
            .top(Pixels::from(16u32))
            .gap(Pixels::from(8u32))
            .children([start_pause_button, reset_button]);

        let minimize_button = div()
            .id("minimize_button")
            .h_8()
            .w_8()
            // .bg(Colors::light_gray)
            // .rounded_sm()
            .flex()
            .justify_center()
            .items_center()
            .on_mouse_down(MouseButton::Left, |_mouse_down_event, _window, _app| {
                println!("Pressed minimize_button")
            })
            .child(Icon::new(IconName::Minimize).large());

        let close_button = div()
            .id("control_buttons")
            .h_8()
            .w_8()
            // .bg(Colors::light_gray)
            // .rounded_sm()
            .flex()
            .justify_center()
            .items_center()
            .on_mouse_down(MouseButton::Left, |_mouse_down_event, window, _app| {
                window.remove_window();
            })
            .child(Icon::new(IconName::WindowClose).large());

        let window_control_buttons = div()
            .id("control_buttons")
            .flex()
            .absolute()
            .right(Pixels::from(16u32))
            .top(Pixels::from(16u32))
            .gap(Pixels::from(8u32))
            .children([minimize_button, close_button]);

        let timer = div()
            .id("timer")
            .h_24()
            .text_size(Pixels::from(80u32))
            .text_align(TextAlign::Center)
            .text_color(black())
            .font_weight(FontWeight::BOLD)
            .child("25:00");

        let traffic_light = div()
            .id("traffic_light")
            .gap(Pixels::from(16u32))
            .justify_center()
            .flex()
            .flex_row()
            .children([
                div()
                    .id("green")
                    .size(Pixels::from(48u32))
                    .bg(Colors::green)
                    .border_3()
                    .border_color(Colors::green_border)
                    .rounded_full(),
                div()
                    .id("yellow")
                    .size(Pixels::from(48u32))
                    .bg(Colors::yellow_disabled)
                    .border_3()
                    .border_color(Colors::yellow_border)
                    .rounded_full(),
                div()
                    .id("red")
                    .size(Pixels::from(48u32))
                    .bg(Colors::red_disabled)
                    .border_3()
                    .border_color(Colors::red_border)
                    .rounded_full(),
            ]);

        let progress_bar = div()
            .id("progress_bar")
            .w(Pixels::from(256u32))
            .h(Pixels::from(32u32))
            .rounded_3xl()
            .border_3()
            .border_color(Colors::green_border)
            .justify_center()
            .items_center()
            .bg(Colors::green);

        div().child(
            container
                .children([app_control_buttons, window_control_buttons])
                .children([
                    timer,
                    traffic_light
                        .pt(Pixels::from(24u32))
                        .pb(Pixels::from(24u32)),
                    progress_bar,
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
                size: Size {
                    width: Pixels::from(288.0),
                    height: Pixels::from(288.0),
                },
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
            // window_min_size: None,
            // window_decorations: None,
            // tabbing_identifier: None,
            ..Default::default()
        };

        app.open_window(window_options, |window, app| {
            println!("{:?}", window.bounds());

            let root_view_entity = app.new(|_cx| RootView { is_running: false });
            root_view_entity
        })
        .unwrap();
    });
}
