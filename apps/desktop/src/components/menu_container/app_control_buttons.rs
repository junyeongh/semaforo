use gpui::*;

use crate::{icon_from_path, RootView};

pub fn app_control_buttons(
    root_view: &mut RootView,
    _window: &mut Window,
    cx: &mut Context<RootView>,
) -> Stateful<Div> {
    let start_button = div()
        .id("start_button")
        // .h_8()
        // .w_8()
        .items_center()
        .justify_center()
        .flex()
        .justify_center()
        .items_center()
        .on_mouse_down(
            MouseButton::Left,
            cx.listener(|view, _event, _window, _cx| {
                println!("is_running: {}", view.is_running);
                view.is_running = !view.is_running;
            }),
        )
        .child(icon_from_path("icons/play.svg"));

    let pause_button = div()
        .id("pause_button")
        // .h_8()
        // .w_8()
        .items_center()
        .justify_center()
        .flex()
        .justify_center()
        .items_center()
        .on_mouse_down(
            MouseButton::Left,
            cx.listener(|view, _event, _window, _cx| {
                println!("is_running: {}", view.is_running);
                view.is_running = !view.is_running;
            }),
        )
        .child(icon_from_path("icons/pause.svg"));

    let reset_button = div()
        .id("reset_button")
        // .h_8()
        // .w_8()
        .flex()
        .justify_center()
        .items_center()
        .on_mouse_down(MouseButton::Left, |_mouse_down_event, _window, _app| {
            println!("Pressed reset_button")
        })
        .child(icon_from_path("icons/rotate-cw.svg"));

    div()
        .id("app_control_buttons")
        .flex()
        .m_4()
        .gap_2()
        .children([
            if root_view.is_running {
                pause_button
            } else {
                start_button
            },
            reset_button,
        ])
}
