from fastapi import FastAPI, HTTPException
from studybuddy import generate_questions
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
handler = Mangum(app)
MAX_INPUT_LENGTH = 32


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/generate_questions")
async def generate_questions_api(subject: str, exam_board: str, qualification: str):
    # validate_input_length(prompt)
    questions = generate_questions(subject: str, exam_board: str, qualification: str)
    return {"The generated exam questions": questions}

# def validate_input_length(prompt: str):
#     if len(prompt) >= MAX_INPUT_LENGTH:
#         raise HTTPException(
#             status_code=400,
#             detail=f"Input length is too long. Must be under {MAX_INPUT_LENGTH} characters.",
#         )