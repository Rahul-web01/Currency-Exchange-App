<div align="center">

  # 💱 Real-Time Currency Converter
  
  <h3><b>A Fast & Responsive Currency Exchange Application</b></h3>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  </p>

  <p>
    <a href="https://real-time-currencyconverter.vercel.app/" target="_blank">
      <img src="https://img.shields.io/badge/View_Live_Demo-FF5722?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
    </a>
    <a href="https://github.com/Rahul-web01/currency-converter/issues">
      <img src="https://img.shields.io/badge/Report_Bug-red?style=for-the-badge" alt="Bug Report" />
    </a>
  </p>
</div>

---

## 📖 Project Overview

**Currency Converter** is a modern React application that allows users to perform real-time currency exchanges. By leveraging custom hooks and API integration, the app provides accurate rates instantly. 

The UI is built with **Tailwind CSS**, ensuring a sleek, mobile-responsive experience that mimics professional financial tools.

### 🌟 Why this project?
This project demonstrates proficiency in:
* **API Integration:** Fetching live data from external endpoints.
* **React Hooks:** Creating custom hooks (`useCurrencyInfo`) for logic separation.
* **State Management:** Handling complex state for currency swapping and calculations.

---

## 📸 Application Demo

<div align="center"> 
  <img width="100%" alt="Currency Converter Interface" src="https://github.com/user-attachments/assets/2c87e6f5-fa6d-4ea5-9a1d-2cf57155148f" />
</div>

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 🚀 **Live Conversion** | Fetches the latest exchange rates instantly via API. |
| 🔄 **Smart Swap** | "Flip" button to instantly reverse source and target currencies. |
| 📱 **Responsive UI** | Beautifully styled with Tailwind CSS for all device sizes. |
| 🧩 **Modular Components** | Clean code architecture using reusable `InputBox` components. |
| ⚡ **Optimized Performance** | Uses `useCallback` and `useEffect` for efficient rendering. |

---

## 📂 Project Structure

A clean folder structure ensuring scalability and maintainability.

```text
currency-converter/
│
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   └── InputBox.jsx    # Reusable UI component for input fields
│   ├── hooks/
│   │   └── useCurrencyInfo.js  # Custom hook to fetch API data
│   ├── App.jsx             # Main application logic
│   ├── main.jsx            # Entry point
│   └── index.css           # Tailwind directives
├── package.json            # Dependencies
└── README.md               # Documentation