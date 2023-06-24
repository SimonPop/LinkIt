from typing import Optional
from fastapi import FastAPI
from .MysteryMaker import MysteryMaker
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
# import uvicorn

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mm = MysteryMaker()

@app.get("/question/{input}")
def question(page_name, question):
    return mm.answer_question(page_name, question)

@app.get("/init/")
def init():
    return jsonable_encoder({"evidence_pages": list(mm.evidence_pages.keys())})

@app.get("/graph/")
def get_graph():
    return mm.get_graph()

@app.get("/replay/")
def replay():
    return mm.replay()