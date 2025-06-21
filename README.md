# Automated Superstore Sales Analysis Recommendation Web Platform

This project is a complete business intelligence and AI solution built to analyze sales data, extract actionable insights, segment customers, and provide personalized product recommendations — all integrated into an interactive web platform. It combines Python, Power BI, Machine Learning, and a full-stack web app to demonstrate the power of data-driven decision-making in retail.

## 🔍 Project Highlights
🧼 Data cleaning and preprocessing with pandas & NumPy

📊 Exploratory Data Analysis (EDA) using matplotlib and seaborn

📈 Dashboard development using Power BI

🤖 Customer segmentation via K-Means (scikit-learn)

🎯 Product recommendation based on customer clusters

🌐 Web deployment using Flask (Python backend) and React (frontend)

## 💡 Key Features
Upload and analyze Superstore-style CSV data

Generate automated analytics and business KPIs

Segment customers using unsupervised learning

Provide personalized product recommendations

Visualize sales, trends, and customer behavior using dashboards

Fully interactive web interface with a clean, modern design

## 🛠 Technology Stack
Layer	Tools Used
Programming Language	Python (Data + Backend), TypeScript (Frontend)
Data Analysis	pandas, NumPy
Data Visualization (EDA)	matplotlib, seaborn
Machine Learning	scikit-learn (KMeans, StandardScaler)
Dashboarding	Power BI
Backend	Flask
Frontend	React, Vite, Tailwind CSS, shadcn/ui, Lucide Icons
CSV Parsing	PapaParse
State Management	React Context API, TanStack Query
Mapping	React Simple Maps + TopoJSON

## 💻 How to Run the Project
🔹 Jupyter Notebook (Python - Data Analysis & ML)
Clone the repo:

bash
Copy
Edit
git clone https://github.com/your-username/superstore-analytics.git
cd notebooks/
Launch Jupyter Notebook:

bash
Copy
Edit
jupyter notebook
Run the notebooks in sequence:

01_Data_Cleaning.ipynb

02_EDA.ipynb

03_Clustering_and_Recommendation.ipynb

## 🔹 Power BI Dashboard
Open the Superstore_PowerBI.pbix file using Microsoft Power BI Desktop.

Refresh data and interact with:

Sales, profit, and discount trends

Region/state/category-based analysis

Customer segmentation overview

## 🔹 Web Application (React + Flask)
Backend Setup (Flask)

bash
Copy
Edit
cd backend/
pip install -r requirements.txt
python app.py
Frontend Setup (React + Vite)

bash
Copy
Edit
cd frontend/
npm install
npm run dev
Open in browser:

arduino
Copy
Edit
http://localhost:5173
## 🌐 Features of the Web Platform
Multi-step UI flow (User info → CSV upload → Dashboard → Recommendations)

Visual KPIs, pie charts, line graphs, and choropleth maps

Customer segment selection and recommendation cards

Fully responsive design with professional UX

## 📂 Required CSV Format
Your file must include the following 22 columns:

csv
Copy
Edit
order id, order date, ship date, ship mode, customer id, customer name, segment, country,
city, state, postal code, region, product id, category, sub-category, product name,
sales, quantity, discount, profit, days to ship, rating
📸 Screenshots
<insert dashboard screenshots, app UI, and sample charts here>

## 🚀 Deployment
The platform was deployed locally using a lightweight Flask server. Future enhancements include:

Hosting the web app with a cloud backend

Live database support

Exportable PDF reports

User authentication

## 📈 Project Structure
bash
Copy
Edit
superstore-analytics/
├── notebooks/                  # Jupyter notebooks for EDA, clustering, recommendation
├── powerbi/                    # Power BI file
├── backend/                    # Flask API for recommendation logic
├── frontend/                   # React + Vite frontend
└── README.md                   # This file
📫 Contact
Developed by Belal Abdelrhman
https://www.linkedin.com/in/belal-abdelrhman | Belal.A.Fikry@gmail.com
