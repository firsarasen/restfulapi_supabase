import os

class Config:
    SECRET_KEY = os.getenv('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6b3BudnhhaHJpZ2FqZXV2bHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzOTkxNjAsImV4cCI6MjA5NTk3NTE2MH0.GLlkx4jTeUJHEbJ6QGiLuGEVA7J9Q-ib9TAtMv7T08k')
    SQLALCHEMY_DATABASE_URI = os.getenv('https://bzopnvxahrigajeuvlqw.supabase.co')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('++JHXxgyDHQCi146IwqT5Q0LM/WM7rkPPv3dyyb6XY1OeXsUEhAiqrGYZh6jXXD1IEtwS3IjQ7rcAjN8oWuk6w==')
    # Supabase JWT secret (set this in your environment; do NOT commit)
    SUPABASE_JWT_SECRET = os.getenv('++JHXxgyDHQCi146IwqT5Q0LM/WM7rkPPv3dyyb6XY1OeXsUEhAiqrGYZh6jXXD1IEtwS3IjQ7rcAjN8oWuk6w==')
