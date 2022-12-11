import os
from typing import List
import openai
import argparse
import re

MAX_INPUT_LENGTH = 32


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--subject", "-s", type=str, required=True)
    parser.add_argument("--exam_board", "-e", type=str, required=True)
    parser.add_argument("--qualification", "-q", type=str, required=True)
    args = parser.parse_args()
    user_input = [ args.subject, args.exam_board, args.qualification ]

    print(f"User input: {user_input}")
    generate_questions(user_input[0], user_input[1], user_input[2])
    #     generate_keywords(user_input)
    # else:
    #     raise ValueError(
    #         f"Input length is too long. Must be under {MAX_INPUT_LENGTH}. Submitted input is {user_input}"
    #     )


# def validate_length(prompt: str) -> bool:
#     return len(prompt) <= MAX_INPUT_LENGTH


def generate_questions(subject: str, exam_board: str, qualification: str):
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")
    enriched_prompt = f"Generate 5 multiple choice questions for {subject} {exam_board} {qualification} in the style of previous past-paper questions including an answer to each question"
    print(enriched_prompt)

    response = openai.Completion.create(
        engine="davinci-instruct-beta-v3", prompt=enriched_prompt, max_tokens=500
    )

    # Extract output text.
    questions: str = response["choices"][0]["text"]

    # Strip whitespace.
    questions_text = questions.strip()
    # questions_array = re.split(",|\n|;|-", questions)
    # questionsn_array = [k.lower().strip() for k in questions]
    # questions_array = [k for k in questions if len(k) > 0]

    print(f"Exam Question: {questions}")
    # return questions



if __name__ == "__main__":
    main()