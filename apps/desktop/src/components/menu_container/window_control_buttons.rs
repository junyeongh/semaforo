use gpui::*;
use gpui_component::Sizable;

use crate::{icon_from_path, RootView};

pub fn window_control_buttons(
    root_view: &mut RootView,
    _window: &mut Window,
    cx: &mut Context<RootView>,
) -> Stateful<Div> {
    let fold_button = div()
        .id("fold_button")
        .h_8()
        .w_8()
        .flex()
        .justify_center()
        .items_center()
        .on_mouse_down(
            MouseButton::Left,
            cx.listener(|view, _event, _window, _cx| {
                println!("is_folded: {}", view.is_folded);
                view.is_folded = !view.is_folded;
                println!("Pressed fold_button");
            }),
        )
        .child(icon_from_path("icons/chevron-up.svg").small());

    let unfold_button = div()
        .id("unfold_button")
        .h_8()
        .w_8()
        .flex()
        .justify_center()
        .items_center()
        .on_mouse_down(
            MouseButton::Left,
            cx.listener(|view, _event, _window, _cx| {
                println!("is_folded: {}", view.is_folded);
                view.is_folded = !view.is_folded;
                println!("Pressed unfold_button");
            }),
        )
        .child(icon_from_path("icons/chevron-down.svg").small());

    let minimize_button = div()
        .id("minimize_button")
        .h_8()
        .w_8()
        .flex()
        .justify_center()
        .items_center()
        .on_mouse_down(MouseButton::Left, |_mouse_down_event, _window, _app| {
            println!("Pressed minimize_button")
        })
        .child(icon_from_path("icons/minus.svg").small());

    let close_button = div()
        .id("control_buttons")
        .h_8()
        .w_8()
        .flex()
        .justify_center()
        .items_center()
        .on_mouse_down(MouseButton::Left, |_mouse_down_event, window, _app| {
            window.remove_window();
        })
        .child(icon_from_path("icons/x.svg").small());

    div().id("control_buttons").flex().children([
        if root_view.is_folded {
            fold_button
        } else {
            unfold_button
        },
        minimize_button,
        close_button,
    ])
}
