if __name__ == "__main__":
    import uvicorn
    import webbrowser
    webbrowser.open("http://localhost:8000/chat.html")
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000
    )
    exit()

import api

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


app = FastAPI(
    title="Chatbot",
    debug=True
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# API endpoint
app.mount("/api", api.app)

# Static endpoint
app.mount("/", StaticFiles(directory="static"))