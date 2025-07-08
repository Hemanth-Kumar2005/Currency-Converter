# Realtime Currency Converter

A beautiful, intuitive, and fully responsive realtime currency converter built using **HTML**, **CSS**, and **JavaScript**. This project lets users convert between over 100 world currencies instantly, using up-to-date exchange rates via a public API.

## ✨ Features

- **Live Conversion:** Get real-time exchange rates for 100+ currencies.
- **Custom Dropdowns:** Searchable, flag-illustrated dropdown selectors for both source and target currencies.
- **Instant Swap:** Quickly swap your "from" and "to" currencies with one click.
- **User-Friendly UI:** Clean, modern, and mobile-friendly design.
- **Error Handling:** Input validation and clear error feedback for invalid entries.
- **Currency Symbols & Flags:** Visual aid with national flags and currency symbols for easy identification.

## 🚀 Quick Start

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/currency-converter.git
    cd currency-converter
    ```

2. **Get a Free API Key:**
    - Visit [ExchangeRate-API](https://www.exchangerate-api.com/) and sign up for a free API key.
    - Replace the value of `api` in `currencyCodes.js` with your own key:
      ```js
      export const api = "YOUR_API_KEY_HERE";
      ```

3. **Run Locally:**
    - Simply open `index.html` in your browser!

## 🛠️ Project Structure

```
currency-converter/
│
├── index.html          # Main HTML file
├── style.css           # CSS styles
├── script.js           # JavaScript logic
├── currencyCodes.js    # List of supported currencies & API key
├── new_currency_image 2.png  # Favicon & coin image
└── README.md           # You are here!
```

## ⚙️ How It Works

- **Currency List:** All supported currencies are listed in `currencyCodes.js`, each with its code, full name, flag country code, and symbol.
- **Dropdowns:** Custom dropdowns show flags, currency codes, full names, and symbols. You can search by code, country, or currency name.
- **Conversion:** On clicking "Convert," the app fetches the latest exchange rates, calculates the result, and displays it along with the current rate.
- **Swapping:** Click the 🔁 button to instantly swap your selected currencies.

## 🧑‍💻 Contributing

Contributions are welcome! Please open issues or submit pull requests for features, UI enhancements, or bugfixes.

## 📸 Screenshots

### 1. UI Example

<img width="1767" height="857" alt="Image" src="https://github.com/user-attachments/assets/e7a382ee-dfec-4de8-b15f-6d51543ddd1c" />

### 2. Conversion

<img width="979" height="857" alt="Image" src="https://github.com/user-attachments/assets/f88ae407-dbf9-45d2-b78f-1309be5ccb97" />
<img width="989" height="858" alt="Image" src="https://github.com/user-attachments/assets/fa61c31d-8c18-472a-86e9-40719a674cc9" />

## 📄 License

This project is open source and free to use under the [MIT License](LICENSE).

---

> **Made by Hemanth Kumar**
