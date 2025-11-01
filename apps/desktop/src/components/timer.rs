use gpui::*;

pub fn timer() -> Stateful<Div> {
    div()
        .id("timer")
        .h_24()
        .text_size(Pixels::from(80u32))
        .text_align(TextAlign::Center)
        .text_color(black())
        .font_weight(FontWeight::BOLD)
        .child("25:00")
}