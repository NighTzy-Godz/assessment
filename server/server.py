from flask import Flask

app = Flask(__name__)
app.config['SECRET_KEY'] = 'SECRET_KEY'


@app.route('/')
def home():
    return 'Heello world - assessment'

if __name__ == '__main__':
    app.run(debug=True, port=8080)
