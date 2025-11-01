use gpui::Rgba;

const fn rgba(r: u8, g: u8, b: u8, a: f32) -> Rgba {
    Rgba {
        r: r as f32 / 255.0,
        g: g as f32 / 255.0,
        b: b as f32 / 255.0,
        a,
    }
}

pub struct Colors;

#[allow(dead_code)]
#[allow(non_upper_case_globals)]
impl Colors {
    pub const light_gray: Rgba = rgba(209, 209, 209, 1.0);
    // green
    pub const green: Rgba = rgba(9, 219, 48, 1.0);
    pub const green_border: Rgba = rgba(0, 192, 35, 1.0);
    pub const green_disabled: Rgba = rgba(0, 255, 0, 0.25);
    // yellow
    pub const yellow: Rgba = rgba(255, 255, 0, 1.0);
    pub const yellow_border: Rgba = rgba(229, 229, 0, 1.0);
    pub const yellow_disabled: Rgba = rgba(255, 255, 0, 0.25);
    // red
    pub const red: Rgba = rgba(255, 0, 0, 1.0);
    pub const red_border: Rgba = rgba(213, 0, 0, 1.0);
    pub const red_disabled: Rgba = rgba(255, 0, 0, 0.25);
}
