from flask import Flask, request, jsonify

app = Flask(__name__)

users_activity = {
    1: {"steps": 10000, "pulse": 90},
    2: {"steps": 5000, "pulse": 170},
    3: {"steps": 2000, "pulse": 70}
}


@app.route("/api/fitness/activity/<int:user_id>", methods=["GET"])
def get_activity(user_id):

    if user_id not in users_activity:
        return jsonify({"error": "User not found"}), 404

    return jsonify(users_activity[user_id]), 200


@app.route("/api/fitness/calories", methods=["POST"])
def calculate_calories():

    data = request.get_json()

    if not data:
        return jsonify({"error": "No JSON data"}), 400

    try:
        weight = float(data.get("weight"))
        steps = int(data.get("steps"))
        pulse = int(data.get("pulse"))
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid data"}), 400

    if weight < 5:
        return jsonify({"error": "Minimum weight is 5 kg"}), 400

    coefficient = 0.04

    if pulse > 160:
        coefficient *= 2

    calories = steps * weight * coefficient / 1000

    return jsonify({
        "status": "success",
        "calories": round(calories, 2),
        "coefficient_used": coefficient
    }), 200


if __name__ == "__main__":
    app.run(port=5000, debug=True)