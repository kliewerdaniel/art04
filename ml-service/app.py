from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3
import json
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import torch
import torch.nn as nn
from typing import Dict, List, Optional
import joblib
import os

app = FastAPI(title="Art01 ML Service", version="1.0.0")

# ML Models
scaler = StandardScaler()
model = None

class MLService:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()

    def train(self, data_path: str, target_col: str) -> Dict:
        """Train model on data from SQLite or CSV"""
        df = self._load_data(data_path)

        X = df.drop(columns=[target_col, 'id'])
        y = df[target_col]

        X_scaled = self.scaler.fit_transform(X)
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.model.fit(X_scaled, y)

        # Save model
        joblib.dump(self.model, 'models/art01_model.pkl')
        joblib.dump(self.scaler, 'models/scaler.pkl')

        return {
            "feature_importances": dict(zip(X.columns, self.model.feature_importances_)),
            "accuracy": self.model.score(X_scaled, y)
        }

    def score(self, features: Dict) -> Dict:
        """Predict success probability for new allocation"""
        if not self.model:
            raise HTTPException(status_code=400, detail="Model not trained")

        df = pd.DataFrame([features])
        X_scaled = self.scaler.transform(df)

        probability = self.model.predict_proba(X_scaled)[0][1]
        return {"success_probability": probability}

    def explain(self, features: Dict) -> Dict:
        """Explain feature contributions"""
        if not self.model:
            raise HTTPException(status_code=400, detail="Model not trained")

        df = pd.DataFrame([features])
        X_scaled = self.scaler.transform(df)

        # Waterfall plot data
        predictions = self.model.predict_proba(X_scaled)[0]
        return {"predictions": predictions.tolist(), "features": list(features.keys())}

    def _load_data(self, data_path: str) -> pd.DataFrame:
        """Load data from SQLite or CSV"""
        if data_path.endswith('.csv'):
            return pd.read_csv(data_path)
        elif data_path.endswith('.sqlite') or 'sqlite' in data_path:
            conn = sqlite3.connect(data_path)
            # Load relevant tables and merge
            # For simplicity, assuming data is pre-processed
            return pd.read_sql("SELECT * FROM allocations", conn)
        else:
            raise ValueError("Unsupported data format")

ml_service = MLService()

# Pydantic models
class TrainRequest(BaseModel):
    data_path: str
    target_col: str = "outcome"

class ScoreRequest(BaseModel):
    features: Dict[str, float]

@app.post("/train")
async def train(request: TrainRequest):
    try:
        result = ml_service.train(request.data_path, request.target_col)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/score")
async def score(request: ScoreRequest):
    try:
        result = ml_service.score(request.features)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/explain")
async def explain(request: ScoreRequest):
    try:
        result = ml_service.explain(request.features)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/export-model")
async def export_model():
    # Export model for deployment
    return {"model_path": "models/art01_model.pkl"}

@app.on_event("startup")
async def startup_event():
    # Load existing model if available
    os.makedirs("models", exist_ok=True)
    if os.path.exists("models/art01_model.pkl"):
        ml_service.model = joblib.load("models/art01_model.pkl")
        ml_service.scaler = joblib.load("models/scaler.pkl")
