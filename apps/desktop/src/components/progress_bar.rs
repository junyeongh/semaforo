use crate::constants::colors::Colors;
use gpui::*;

pub fn progress_bar() -> Stateful<Div> {
    div()
        .id("progress_bar")
        .w(Pixels::from(256u32))
        .h(Pixels::from(32u32))
        .rounded_3xl()
        .border_3()
        .border_color(Colors::green_border)
        .justify_center()
        .items_center()
        .bg(Colors::green)
}
