# CONFIG
crops = ["Tomatoes", "Carrots", "Potatoes", "Onions", "Cabbage"]
import pandas as pd
from prophet import Prophet
import os
import json

# Initialize master list for all predictions
all_predictions = []

for crop in crops:
    print(f"🌱 Processing crop: {crop}")
    # CONFIG
    csv_file = f"./data/{crop}.csv"
    forecast_days = 7
    output_folder = "forecast_json"
    os.makedirs(output_folder, exist_ok=True)
    print("Looking for data at:",os.path.abspath(csv_file))

    # Load crop price data
    df = pd.read_csv(csv_file, parse_dates=["date"])

    # Loop through each market column (skip 'date')
    for market in df.columns[1:]:
        print(f"⏳ Forecasting for: {market}")

        market_df = df[["date", market]].rename(columns={"date": "ds", market: "y"}).dropna()
        model = Prophet()
        model.fit(market_df)
        future = model.make_future_dataframe(periods=forecast_days)
        forecast = model.predict(future)
        future_data = forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]].tail(forecast_days)

        # Append forecast for this market
        all_predictions.append({
            "crop": crop,
            "market": market,
            "forecast": [
                {
                    "date": row["ds"].strftime("%Y-%m-%d"),
                    "predicted_price": round(row["yhat"], 2),
                    "lower_bound": round(row["yhat_lower"], 2),
                    "upper_bound": round(row["yhat_upper"], 2)
                }
                for _, row in future_data.iterrows()
            ]
        })

    # Save all predictions to a single JSON file
    filename = f"{output_folder}_all_markets_forecast.json"
    with open(filename, "w") as f:
        json.dump({ "predictions": all_predictions }, f, indent=2)

print(f"🎉 All forecasts saved to: {filename}")
