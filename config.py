from fastapi.templating import Jinja2Templates
from pathlib import Path

templates_dir = Path(__file__).parent / "templates"
templates = Jinja2Templates(directory=str(templates_dir))

templates_auth_dir = Path(__file__).parent / "templates_auth"
templates_auth = Jinja2Templates(directory=str(templates_auth_dir))