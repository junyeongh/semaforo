pub mod app_control_buttons;
pub mod window_control_buttons;

use gpui::*;

pub fn menu_container(
    app_control_buttons: Stateful<Div>,
    window_control_buttons: Stateful<Div>,
) -> Stateful<Div> {
    div()
        .id("menu_container")
        .flex()
        .justify_between()
        .absolute()
        .top(Pixels::from(0u32))
        .w_full()
        .children([app_control_buttons, window_control_buttons])
        .window_control_area(WindowControlArea::Drag)
}
