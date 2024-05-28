from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_weather', methods=['POST'])
def get_weather():
    city = request.form.get('city')
    api_key = 'your_api_key_here'  # Replace with your OpenWeatherMap API key
    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric'
    response = requests.get(url)
    data = response.json()

    if response.status_code == 200:
        weather = {
            'temperature': data['main']['temp'],
            'description': data['weather'][0]['description'],
            'icon': data['weather'][0]['icon'],
            'location': data['name']
        }
        return jsonify(weather)
    else:
        return jsonify({'error': 'City not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
