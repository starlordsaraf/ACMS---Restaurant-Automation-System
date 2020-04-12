import json
import boto3
from flask_lambda import FlaskLambda
from flask import request
# import requests

app = FlaskLambda(__name__)
ddb = boto3.resource("dynamodb")
table = ddb.Table('restaurants')

@app.route('/')
def index():
    """Sample pure Lambda function

    Parameters
    ----------
    event: dict, required
        API Gateway Lambda Proxy Input Format

        Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format

    context: object, required
        Lambda Context runtime methods and attributes

        Context doc: https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html

    Returns
    ------
    API Gateway Lambda Proxy Output Format: dict

        Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
    """

    # try:
    #     ip = requests.get("http://checkip.amazonaws.com/")
    # except requests.RequestException as e:
    #     # Send some context about this error to Lambda Logs
    #     print(e)

    #     raise e

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
