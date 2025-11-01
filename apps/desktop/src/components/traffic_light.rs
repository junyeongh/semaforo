use crate::constants::colors::Colors;
use gpui::*;

pub fn traffic_light() -> Stateful<Div> {
    div()
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
        ])
}
