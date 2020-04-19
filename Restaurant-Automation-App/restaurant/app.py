import json
import boto3
from flask_lambda import FlaskLambda
from flask import jsonify
from flask import request
from flask import Response
from boto3.dynamodb.conditions import Key
# import requests

app = FlaskLambda(__name__)
ddb = boto3.resource("dynamodb")
table = ddb.Table('restaurants')

@app.route('/')
def index():

    data = {
        "message": "Welcome to Restaurant Automation"
    }
    return json.dumps(data)


@app.route('/restaurants', methods=['GET','POST'])
def put_or_list_restuarants():
    if(request.method == 'GET'):
        res = table.scan()['Items']
        return(
            json.dumps(res),
            200,
            {'Content-Type': "application/json"}
        )
    else:
        table.put_item(Item=request.json)
        return(
            json.dumps({"message": "entry made"}),
            200,
            {'Content-Type': "application/json"}
        )



@app.route('/restaurants/seating/<string:resid>', methods=['GET'])
def getseatingchart(resid):
    response = table.query(IndexName="seatingGSI",KeyConditionExpression=Key("Resid").eq(resid))
    if(response['Items'][0]["Seating"]==[]):
        return(json.dumps("Seating Chart not updated"),204,{'Content-Type': "application/json"})
    else:
        return(jsonify(response['Items'][0]['Seating']),200, {'Content-Type': "application/json"})



@app.route('/restaurants/menu/<string:resid>', methods=['GET','POST'])
def menu(resid):
    if(request.method == 'GET'):
        res = table.scan()['Items']
        for restaurants in res:
            if(restaurants['Resid']==resid):
                menu=restaurants['Menu']
                return(
                    json.dumps(menu),
                    200,
                    {'Content-Type': "application/json"}
                )
            else:
                return(json.dumps("Restaurant doesnt exist"),200,{'Content-Type': "application/json"})
