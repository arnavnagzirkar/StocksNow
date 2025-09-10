import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt

tickers = ["AAPL", "MSFT", "GOOG"]

# Loop through each ticker and fetch data
for ticker in tickers:
    data = yf.download(ticker, start="2019-01-01", end="2024-12-03")
    print(f"Data for {ticker}:")
    print(data.head())

    # Plot the closing price
    data['Close'].plot(title=f"{ticker} Closing Prices", figsize=(10, 6))
    plt.xlabel("Date")
    plt.ylabel("Price (USD)")
    plt.grid()
    plt.show()  
