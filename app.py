from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask import Flask

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
# import pickle
import pandas as pd 
import numpy as np

app = Flask(__name__)
app.config["CORS_HEADERS"] = "Content-Type"

cors = CORS(app)

@app.route("/")
@cross_origin()
def home():  
    df = pd.read_csv("insurance_claims.csv")
    df = df.replace("?", np.NaN)

    df["collision_type"].fillna("No Collision", inplace = True)
    df["property_damage"].fillna("NO", inplace = True)
    df["police_report_available"].fillna("NO", inplace = True)

    df["fraud_reported"] = df["fraud_reported"].replace(("Y", "N"), (1, 0))
    df["insured_sex"] = df["insured_sex"].replace(("MALE", "FEMALE"), (1, 0))
    df["police_report_available"] = df["police_report_available"].replace(("YES", "NO"), (1, 0))
    df["property_damage"] = df["property_damage"].replace(("YES", "NO"), (1, 0))

    le1 = LabelEncoder()
    df["auto_make"] = le1.fit_transform(df["auto_make"])

    le2 = LabelEncoder()
    df["authorities_contacted"] = le2.fit_transform(df["authorities_contacted"])

    le3 = LabelEncoder()
    df["incident_severity"] = le3.fit_transform(df["incident_severity"])

    le4 = LabelEncoder()
    df["incident_type"] = le4.fit_transform(df["incident_type"])

    le5 = LabelEncoder()
    df["collision_type"] = le5.fit_transform(df["collision_type"])

    le6 = LabelEncoder()
    df["policy_csl"] = le6.fit_transform(df["policy_csl"])

    df1 = df.drop(["policy_number", "policy_bind_date", "policy_state", "insured_zip", "insured_education_level",
                   "insured_occupation", "insured_hobbies", "insured_relationship", "incident_date", "incident_state", 
                   "incident_city","incident_location", "auto_model", "_c39", "capital-gains", "capital-loss"], 
                   axis = 1)

    x = df1.drop(["fraud_reported"], axis = 1)
    y = df1["fraud_reported"]

    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size = 0.33, random_state = 0)

    rf = RandomForestClassifier(n_estimators = 1000, random_state = 0)
    rf.fit(x_train, y_train)

    request_obj = request.args
    
    predictedProbability = rf.predict_proba([[
        int(request_obj.get("monthsAsCustomer")),
        int(request_obj.get("age")),
        le6.transform([pd.Series(request_obj.get("policyCsl"))])[0],
        int(request_obj.get("policyDeductable")),
        float(request_obj.get("annualPremium")),
        int(request_obj.get("umbrellaLimit")),
        int(request_obj.get("sex")),
        le4.transform([request_obj.get("incidentType")])[0],
        le5.transform([request_obj.get("collisionType")])[0],
        le3.transform([request_obj.get("incidentSeverity")])[0],
        le2.transform([request_obj.get("authoritiesContacted")])[0],
        int(request_obj.get("incidentHour")),
        int(request_obj.get("vehiclesInvolved")),
        int(request_obj.get("propertyDamage")),
        int(request_obj.get("bodilyInjuries")),
        int(request_obj.get("witnesses")),
        int(request_obj.get("policeReportAvailable")),
        int(request_obj.get("totalClaimAmount")),
        int(request_obj.get("injuryClaim")),
        int(request_obj.get("propertyClaim")),
        int(request_obj.get("vehicleClaim")),
        le1.transform([request_obj.get("autoMake")])[0],
        int(request_obj.get("autoYear"))
    ]]) 

    return str((predictedProbability[0][1]*100))


if __name__ == "__main__":
    app.run(debug = True)