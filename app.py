from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

# Rota GLOBAL: Ela serve QUALQUER arquivo dentro da pasta static e suas subpastas
@app.route('/static/<path:filename>')
def serve_static(filename):
    # Isso permite carregar: /static/img, /static/certificados, /static/logofacul, etc.
    return send_from_directory(os.path.join(app.root_path, 'static'), filename)

if __name__ == "__main__":
    # Mantendo suas configurações de host e porta
    app.run(debug=True, host="0.0.0.0", port=5000)