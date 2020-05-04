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
table = ddb.Table('restaurant-table')
logintable = ddb.Table('logintable')

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


#API to get all seats for seating chart
@app.route('/restaurants/seating/<string:resid>', methods=['GET'])
def getseatingchart(resid):
    response = table.query(KeyConditionExpression=Key("ResId").eq(resid) & Key('RecordId').begins_with("TABLE_DETAIL"))
    if(response['Items'] == []):
        return(json.dumps("Seating Chart not updated"),200,{'Content-Type': "application/json"})
    else:
        return(jsonify(response['Items']),200, {'Content-Type': "application/json"})



@app.route('/restaurants/menu/<string:resid>', methods=['GET'])
def get_menu(resid):
    response = table.query(KeyConditionExpression=Key("ResId").eq(resid) & Key('RecordId').begins_with("DISH_DETAIL"))
    menu = response['Items']
    if (menu):
        return (
            jsonify(menu),
            200,
            {'Content-Type': "application/json"}
        )
    return (json.dumps("Restaurant doesn't exist"), 200, {'Content-Type': "application/json"})

@app.route('/restaurants/menu/<string:resid>', methods=['PUT'])
def add_dish(resid):
    dish = request.json
    dname = dish['dishname']
    category = dish['category']
    ingredients = dish['ingredients']
    price = dish['price']
    quantity = dish['quantity']
    recordid = dish['did']
    table.put_item(Item={"ResId": resid, "RecordId": recordid, "Dishname": dname, "category": category, "ingredients": ingredients,
                         "quant": quantity, "price": price})
    return (
        json.dumps({"message": "Dish added"}),
        200,
        {'Content-Type': "application/json"}
    )

@app.route('/restaurants/menu/<string:resid>', methods=['DELETE'])
def del_dish(resid):
    dish = request.json
    dname = dish["dname"]
    table.delete_item(
        Key={"ResId":resid},
        ConditionExpression= "#Dishname = :dname",
        ExpressionAttributeNames={"#Dishname": "Dishname"},
        ExpressionAttributeValues={":dname": dname}
    )
    return (
        json.dumps({"message": "Dish deleted"}),
        200,
        {'Content-Type': "application/json"}
    )

@app.route('/restaurants/menu/<string:resid>', methods=['POST'])
def update_dish(resid):
    dish = request.json
    return (
        json.dumps({"message": "Dish updated"}),
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

@app.route('/restaurants/update', methods=['POST'])
def updateres():
    req=request.get_json()
    try:
        resid=req["Resid"] 
        resaddr=req["Resaddr"]
        resnum=req["Resnum"]
        resname=req["Resname"]

        table.update_item(
            Key={
                'ResId': resid,
                'RecordId': "RES_DETAIL"
            },
            UpdateExpression="set Resname = :r, Resaddr=:a, Resnum=:n",
            ExpressionAttributeValues={
                ':r': resname,
                ':a': resaddr,
                ':n': resnum 
            }
        )
        
        return (
            json.dumps({"message": "Restaurant details have been updated"}),
            200,
            {'Content-Type': "application/json"}
        )

    except:
        return (
            json.dumps({"message": "Update Failed"}),
            200,
            {'Content-Type': "application/json"}
        )

@app.route('/restaurants/delete', methods=['DELETE'])
def deleteres():
    req=request.get_json()
    try:
        resid=req["Resid"]      
        logintable.delete_item(
            Key={
                "Resid":resid
            }
        )
        table.delete_item(
            Key={
                "ResId":resid,
                "RecordId":"RES_DETAIL"
            }
        )
        return (
            json.dumps({"message": "Restaurant has been removed"}),
            200,
            {'Content-Type': "application/json"}
        )

    except:
        return (
            json.dumps({"message": "Delete Failed"}),
            200,
            {'Content-Type': "application/json"}
        )
    
# {"Resname":"Pizza hut","Resaddr":"Banashkari,98/4","Resnum":"23316745","Resid":"1","Username":"PizHut","Password":"1234"}
@app.route('/restaurants/signup', methods=['POST'])
def signup():
    req=request.get_json()
    uname=req["Username"]
    pwd=req["Password"]
    resid=req["Resid"]
    
    name=req["Resname"]
    num=req["Resnum"]
    addr=req["Resaddr"]
    
    logintable.put_item(Item={"Resid":resid,"Username":uname,"Password":pwd})
    table.put_item(Item={"ResId":resid,"RecordId":"RES_DETAIL","Resname":name,"Resnum":num,"Resaddr":addr})
    return(
        json.dumps({"message": "entry made"}),
        200,
        {'Content-Type': "application/json"}
    )

    
#{"Resid":"1","Username":"PizHut","Password":"1234"}
@app.route('/restaurants/login', methods=['POST'])
def login():
    req=request.get_json()
    resid=req["Resid"]
    uname=req["Username"]
    pwd=req["Password"]
    
    res = logintable.scan()['Items']
    for restaurants in res:
        if(restaurants['Username']==uname):
            chk=1
            if restaurants['Password']==pwd:
                return(
                    json.dumps({"message": "login successful"}),
                    200,
                    {'Content-Type': "application/json"}
                )        
    return(
        json.dumps({"message": "Invalid credentials!"}),
        200,
        {'Content-Type': "application/json"}
    )
