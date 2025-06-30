from flask import Flask, request, jsonify

app = Flask(__name__)

def calc_distance(lat1, lon1, lat2, lon2):
    from math import radians, sin, cos, sqrt, atan2
    R = 6371  # Radius of the Earth in km
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = (sin(dlat / 2) ** 2 +
         cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2)
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c

@app.route('/predict', methods=['POST'])
def predict():
    print("Recieved a post request")
    data = request.get_json()
    # Do your ML logic here...
    print(data)
    



    recommendations = [
        {
            "location": "Mumbai",
            "product": "Tomatoes",
            "expectedPrice": 48,
            "profitPotential": "High",
            "distance": "120 km",
        }
    ]
    return jsonify({"recommendations": recommendations})

if __name__ == '__main__':
    app.run(port=8000)