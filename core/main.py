from typing import Union
from dto_api import DataInput
from load_graph import main_solve
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI
app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/")
def solve(data:DataInput):
    return main_solve(data)

