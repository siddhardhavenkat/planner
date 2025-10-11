import json
from datetime import datetime, timedelta

def generate_travel_plan(origin, destination, start_date, end_date, interests):
    """
    Generates a structured mock travel plan based on user input.
    """
    print(f"Generating travel plan from {origin} to {destination}...")

    # Convert dates
    try:
        start = datetime.strptime(start_date, "%Y-%m-%d")
        end = datetime.strptime(end_date, "%Y-%m-%d")
        num_days = (end - start).days + 1
    except ValueError:
        num_days = 5
        start = datetime.now()

    # Base structure
    plan = {
        "origin": origin,
        "destination": destination,
        "duration": f"{start_date} → {end_date}",
        "interests": interests,
        "generated_on": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "plan": []
    }

    # Generate daily plan
    for i in range(num_days):
        current_day = start + timedelta(days=i)
        date_str = current_day.strftime("%Y-%m-%d")
        activities = []

        if i == 0:
            activities.append({"time": "Morning", "description": f"Depart from {origin}"})
            activities.append({"time": "Afternoon", "description": f"Arrive in {destination} and check-in at hotel"})
            activities.append({"time": "Evening", "description": "Take a short walk and enjoy a local dinner"})
        elif i == num_days - 1:
            activities.append({"time": "Morning", "description": "Visit a final landmark or local market"})
            activities.append({"time": "Afternoon", "description": f"Depart from {destination} back to {origin}"})
        else:
            interest = interests[i % len(interests)] if interests else "sightseeing"
            activities.append({
                "time": "Morning",
                "description": f"Explore famous {interest} spots",
                "point_of_interest": {"name": f"{interest.title()} Museum", "type": interest}
            })
            activities.append({
                "time": "Afternoon",
                "description": f"Try a popular {interest}-themed restaurant",
                "point_of_interest": {"name": f"{interest.title()} Bistro", "type": "Restaurant"}
            })
            activities.append({
                "time": "Evening",
                "description": "Free time or optional tour"
            })

        plan["plan"].append({
            "day": i + 1,
            "date": date_str,
            "activities": activities
        })

    return plan


# === Example usage ===
if __name__ == "__main__":
    user_input = {
        "origin": "London",
        "destination": "Paris",
        "start_date": "2025-12-01",
        "end_date": "2025-12-05",
        "interests": ["art", "food", "history"]
    }

    travel_plan = generate_travel_plan(**user_input)

    # Save JSON output
    with open("travel_plan.json", "w") as f:
        json.dump(travel_plan, f, indent=4)

    print("✅ travel_plan.json generated successfully!")
