use actix_web::{web, App, HttpServer};
use data::{index, AppState};
mod data;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Note: web::Data created _outside_ HttpServer::new closure
    let app_state = web::Data::new(AppState {
        app_name: String::from("Actix "),
    });

    HttpServer::new(move || {
        // move counter into the closure
        App::new().app_data(app_state.clone()).service(index)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
