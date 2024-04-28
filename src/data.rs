use actix_web::{
    get, post,
    web::{self, post},
    App, HttpServer, Result,
};
use serde::Deserialize;
use std::vec::Vec;

// This struct represents state
pub struct AppState {
    pub app_name: String,
}

#[derive(Deserialize)]
struct Info {
    name: String,
}

#[get("/")]
pub async fn index(data: web::Data<AppState>) -> String {
    let app_name = &data.app_name; // <- get app_name
    let mut vec = Vec::new();
    vec.push([1, 2]);

    for x in &vec {
        println!("{:?}", x)
    }
    println!("{:?}", vec[0][1]);

    format!("Hello {app_name}! ") // <- response with app_name
}

#[post("/")]
pub async fn matrix(data: web::Json<Info>) -> Result<String> {
    Ok(format!("kjasd {}!", data.name))
}
