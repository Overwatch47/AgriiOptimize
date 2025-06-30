import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

# Configurable parameters
markets = ["Pune APMC", "Lasalgaon", "Nashik", "Mumbai Market", "Nagpur", "Kolhapur", "Pimpri-Chinchwad","Sambhajinagar","Solapur"]

crop = "Tomatoes"
start_date = datetime(2025, 6, 1)
end_date = datetime(2025, 6, 26)


# Generate date range
date_range = pd.date_range(start=start_date, end=end_date)

# Create mock data
data = {"date": date_range}

for market in markets:
    # Randomize price with daily fluctuation
    base_price = random.uniform(20, 50)  # base price between Rs.20 and Rs.50
    prices = []
    price = base_price + random.uniform(-10, 10)  # initial market price
    for _ in range(len(date_range)):
        change = random.uniform(-3.0, 3.0)
        price = max(5, price + change)  # floor at Rs.5
        prices.append(round(price, 2))
    data[market] = prices

# Convert to DataFrame
df = pd.DataFrame(data)

# Save to CSV
csv_filename = f"./backend/data/{crop}.csv"
df.to_csv(csv_filename, index=False)

print(f"✅ Mock data saved to {csv_filename}")
