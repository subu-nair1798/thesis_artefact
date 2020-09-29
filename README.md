# Thesis Artefact Guide

Dataset : insurance_claims.csv ([Link to the Dataset](https://www.kaggle.com/buntyshah/insurance-fraud-claims-detection
))

The artefact is divided into two different components:
- application : Contains code for the Ethereum-Flask application
- python_code : Contains code for implementing Machine Learning models

## Ethereum-Flask app (application)

### Requirements
- You need a node package manager : ```npm``` or ```yarn``` (This research was conducted using ```npm```)
- Metamask need to be configured in the browser
- Stable & Compatible node version : This research was conducted on ```node v10.20.1```
- Python : This search was conducted on ```python 3.7.4```

### Files and Folder Structure
- app.py : Python script for deploying a Flask server
- components : Contains React.JS components for the layout and repeated components of the application
- ethereum :
    * build : Contains Smart Contract data in the form of .JSON files
    * compile.js : Running this script creates the build folder containing compiled Smart Contract .JSON files
    ```bash
        node compile.js
    ```
    * contracts : Contains a single Solidity file Insurance.sol. This file contains the actual Smart Contract code
    * deploy.js : Running this script deploys the contract on the Rinkeby Ethereum test network. The address of the deployed is returned on the terminal window. This address is used to fetch the contract and create a web app
    ```bash
        node deploy.js
    ```
    * factory.js & insurance .js : Fetches the deployed contract data. These two files are accessed in the web app to fetch data from the Ethereum network
    * web3.js : Creates an environment that connects our application to Metamask 

- node_modules : Contains all the package and library data
- package.json : Please refer this document for the dependencies and install the respoective versions for compatibility
- routes.js : Contains code for dynamic routing using Next.JS
- server.js : Contains code for Node.JS server
- pages : This sub-directory contains JS pages written using React.JS. Next.JS automatically adds nested folders to the URL  path. 
- test : Contains a single file Insurance.test.js for performing a mocha test. Configured in package.JSON "scripts" 
```bash
    npm run test
```

### Deployment

- For deploying the application, run these two scripts simultaneously on different terminal windows

```bash
    python app.py
```
```bash
    npm run dev
```

## Python Code (python_code)

- Contains 3 Jupyter notebooks (.ipynb) along with their compiled HTML files.

- Please refer the ```import``` statements in each file for package dependencies.

    * machine_learning_models : Contains code for Data pre-processing, Exploratory Data Analysis, Under-sampling Modelling and Evaluation of Random Forest, Logistic Regression, Decision Tree and SVM

    * h2o_deep_learning : Contains code for implementing H2O.ai Deep Learning. Please note that the pre-processed under-sampled dataset was exported to h2o_undersampled.csv

    * shap_values : Contains code for interpreting and evaluating the Random Forest Classifier

### NOTE: Please contact the author before deploying this code (Email: subunair17@gmail.com)
