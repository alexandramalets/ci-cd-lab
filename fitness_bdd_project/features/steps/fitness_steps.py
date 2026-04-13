import requests
from behave import given, when, then

BASE_URL = "http://localhost:5000"


@given("user with id {user_id:d}")
def step_get_user_activity(context, user_id):

    response = requests.get(f"{BASE_URL}/api/fitness/activity/{user_id}")

    context.activity = response.json()

    context.steps = context.activity.get("steps")
    context.pulse = context.activity.get("pulse")


@when("I request activity data")
def step_request_activity(context):
    pass


@then("I receive steps and pulse")
def step_check_activity(context):

    assert context.steps is not None
    assert context.pulse is not None


@when("I calculate calories with weight {weight:d}")
def step_calculate_calories(context, weight):

    payload = {
        "weight": weight,
        "steps": getattr(context, "steps", 1000),
        "pulse": getattr(context, "pulse", 80)
    }

    context.response = requests.post(
        f"{BASE_URL}/api/fitness/calories",
        json=payload
    )


@then("calories should be calculated correctly")
def step_check_calories(context):

    data = context.response.json()

    assert context.response.status_code == 200

    coefficient = 0.08 if context.pulse > 160 else 0.04

    assert data["coefficient_used"] == coefficient


@then("I receive weight validation error")
def step_weight_error(context):

    assert context.response.status_code == 400