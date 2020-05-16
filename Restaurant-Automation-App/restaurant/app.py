import json
import boto3
import requests
import decimal
from flask_lambda import FlaskLambda
from flask import jsonify
from flask import request
from flask import Response
from boto3.dynamodb.conditions import Key,Attr
from flask_cors import CORS

# import requests

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return str(o)
        return super(DecimalEncoder, self).default(o)

app = FlaskLambda(__name__)
CORS(app)
ddb = boto3.resource("dynamodb")
table = ddb.Table('restaurant-table')
logintable = ddb.Table('logintable')

#################################################################################################################
#---------------------------------RESTAURANT ADMIN side APIS-----------------------------------------------------
#################################################################################################################


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


#------------------------------------------MENU APIS---------------------------------------------------------------------------------------

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

@app.route('/restaurants/menu/dish/<string:resid>', methods=['PUT'])
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

@app.route('/restaurants/menu/dish/<string:resid>', methods=['DELETE'])
def del_dish(resid):
    dish = request.json
    did = dish["did"]
    recid = 'DISH_DETAIL#'+str(did)
    table.delete_item(
        Key={"ResId":resid,
             "RecordId":recid}
    )
    return (
        json.dumps({"message": "Dish deleted"}),
        200,
        {'Content-Type': "application/json"}
    )

@app.route('/restaurants/menu/dish/<string:resid>', methods=['POST'])
def update_dish(resid):
    dish = request.json
    dname = dish['dishname']
    ingredients = dish['ingredients']
    price = dish['price']
    quantity = dish['quantity']
    res = table.query(
        KeyConditionExpression=Key('ResId').eq(resid) & Key('RecordId').begins_with("DISH_DETAIL"),
        FilterExpression="Dishname = :d",
        ExpressionAttributeValues={
            ':d': dname
        },
        ProjectionExpression="RecordId"
    )
    recordid = res['Items'][0]['RecordId']
    if(quantity):
        table.update_item(
            Key={
                'ResId': resid,
                'RecordId': recordid
            },
            UpdateExpression="set quant = :q",
            ExpressionAttributeValues={
                ':q': quantity
            }
        )
    if(ingredients):
        table.update_item(
            Key={
                'ResId': resid,
                'RecordId': recordid
            },
            UpdateExpression="set ingredients = :i",
            ExpressionAttributeValues={
                ':i': ingredients
            }
        )
    if(price):
        table.update_item(
            Key={
                'ResId': resid,
                'RecordId': recordid
            },
            UpdateExpression="set price = :p",
            ExpressionAttributeValues={
                ':p': price
            }
        )
    return (
        json.dumps({"message": "Dish updated"}),
        200,
        {'Content-Type': "application/json"}
    )


#--------------------------------------------------TABLE APIS-----------------------------------------------------------------------------

@app.route('/restaurants/seating/<string:resid>', methods=['GET'])
def getseatingchart(resid):
    response = table.query(KeyConditionExpression=Key("ResId").eq(resid) & Key('RecordId').begins_with("TABLE_DETAIL"))
    if(response['Items'] == []):
        return(json.dumps("Seating Chart not updated"),200,{'Content-Type': "application/json"},{"Access-Control-Allow-Origin":"*"})
    else:
        return(json.dumps(response['Items'],cls=DecimalEncoder),200, {'Content-Type': "application/json"})
	
@app.route('/restaurants/seating/<string:resid>', methods=['PUT'])
def add_table(resid):
    seating = request.json
    number_of_seats = seating['seats']
    recordid = seating['tid']
    recordid="TABLE_DETAIL#T"+recordid
    table.put_item(Item={"ResId": resid, "RecordId": recordid,"seats":number_of_seats, "table_status":"V"})
    return (
        json.dumps({"message": "Table added"}),
        200,
        {'Content-Type': "application/json"}
    )


@app.route('/restaurants/seating/<string:resid>', methods=['DELETE'])
def del_table(resid):
    seating = request.json
    tid = seating["tid"]
    recid = 'TABLE_DETAIL#T'+tid
    table.delete_item(
        Key={"ResId":resid,
             "RecordId":recid}
    )
    return (
        json.dumps({"message": "Table deleted"}),
        200,
        {'Content-Type': "application/json"}
    )
	
@app.route('/restaurants/seating/block/<string:resid>', methods=['POST'])
def block_table(resid):
    seating = request.json
    recordid = seating['tid']
    recordid="TABLE_DETAIL#T"+recordid
    response = table.update_item(
    Key={
        'ResId': resid,
        'RecordId': recordid
    },
    UpdateExpression="set table_status = :r",
    ExpressionAttributeValues={
        ':r': "O"
       
    }
    )
    return (
        json.dumps({"message": "Table "+seating['tid']+"has been blocked"}),
        200,
        {'Content-Type': "application/json"}
    )

@app.route('/restaurants/seating/unblock/<string:resid>', methods=['POST'])
def unblock_table(resid):
    seating = request.json
    recordid = seating['tid']
    recordid="TABLE_DETAIL#T"+recordid
    response = table.update_item(
    Key={
        'ResId': resid,
        'RecordId': recordid
    },
    UpdateExpression="set table_status = :r",
    ExpressionAttributeValues={
        ':r': "V"
       
    }
    )
    return (
        json.dumps({"message": "Table "+seating['tid']+"has been unblocked"}),
        200,
        {'Content-Type': "application/json"}
    )


#--------------------------------------------RESTAURANT LOGIN/DETAILS APIS--------------------------------------------------------------------

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
    res=table.put_item(Item={"ResId":resid,"RecordId":"RES_DETAIL","Resname":name,"Resnum":num,"Resaddr":addr})
    #return(res)
    return(
        json.dumps({"message": "entry made"}),
        200,
        {'Content-Type': "application/json"}
    )
    
#{"Resid":"1","Username":"PizHut","Password":"1234"}
@app.route('/restaurants/login', methods=['POST'])
def login():
    req=request.get_json()
    #resid=req["Resid"]
    uname=req["Username"]
    pwd=req["Password"]
    
    res = logintable.scan()['Items']
    for restaurants in res:
        if(restaurants['Username']==uname):
            chk=1
            if restaurants['Password']==pwd:
                rid=restaurants['Resid']
                return(
                    json.dumps({"message": "login successful","resid":rid}),
                    200,
                    {'Content-Type': "application/json"}
                )        
    return(
        json.dumps({"message": "Invalid credentials!"}),
        200,
        {'Content-Type': "application/json"}
    )


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

#--------------------------------------------------API for OFFERS----------------------------------------------------------------

#{"Resid":"2","OfferName":"FamilyFun","OfferDes":"Rs.400 off on bill amounts for 5 or more people!","OfferExp":"20/12/20"}
@app.route('/restaurants/offer', methods=['POST'])
def restoffers():
    req=request.get_json()
    oname=req['OfferName']
    odes=req['OfferDes']
    odate=req['OfferExp']
    resid=req['Resid']
    res=table.put_item(Item={"ResId":resid,"RecordId":"OFFER_DETAIL","OfferName":oname,"OfferDesc":odes,"OfferExp":odate})
    #return res
    return (
            json.dumps({'message':'Offer added'}),
            200,
            {'Content-Type': "application/json"}
        )


#################################################################################################################################
#--------------------------------------------CUSTOMER SIDE APIS------------------------------------------------------------------
#################################################################################################################################
#API to fetch the resid given the resname
@app.route('/customer/fetchid', methods=['POST'])
def fetchid():
    req=request.get_json()
    resname=req['ResName']
    resbranch=req['ResBranch'] 

    try:
        response = table.query( IndexName='resGSI',KeyConditionExpression=Key("Resname").eq(resname) & Key("Resbranch").eq(resbranch)  )
    except:
        return (
                json.dumps({'message':'Wrong query!'}),
                200,
                {'Content-Type': "application/json"}
            )
 
    if(response['Items']==[]):  
        responseData={"message":"NO SUCH RESTAURANT"}    
    else:
        resid=response["Items"][0]["ResId"]
        #responseData=response["Items"]
        #responseData={"message":"Fetch ID successful","resid":resid}
        count=response["Items"][0]["Rescount"]          
        responseData={"message":"Fetch ID successful","resid":resid,"rescount":str(count)}
    return (
            json.dumps(responseData),
            200,
            {'Content-Type': "application/json"}
        )

#API to allocate Table
@app.route('/customer/allocatetable', methods=['POST'])
def allocate_table():
    req = request.get_json()
    members = int(req['members'])
    resid = req['resid']
    count=int(req['rescount']) + 1
    response = table.query(KeyConditionExpression=Key("ResId").eq(resid) & Key('RecordId').begins_with("TABLE_DETAIL"), FilterExpression=Attr('seats').gte(members) & Attr('seats').lte(members+2) & Attr('table_status').eq('V'))
    print(response['Items'])
    if(response['Items']==[]):
        return(json.dumps({"message":"No table is available for the requested number"}),200,{'Content-Type': "application/json"})
    else:
        available = sorted(response['Items'], key= lambda x: x['seats'] )
        table_no = available[0]["RecordId"].split('#')[1][1:]
        print(table_no)
        data = {"tid":table_no}
        requests.post("https://u4gkjhxoe5.execute-api.us-east-2.amazonaws.com/Prod/restaurants/seating/block/"+resid,json=data)
        table.update_item(
            Key={
                'ResId': resid,
                'RecordId': "RES_DETAIL"
            },
            UpdateExpression="set Rescount = :q",
            ExpressionAttributeValues={
                ':q': count
            }
        )
        
        
        return(json.dumps({"message":"Table allocated!","table":table_no,"rescount":count},cls=DecimalEncoder),200,{'Content-Type': "application/json"})
        
        #return(json.dumps({"message":"Your Table Number: "+table_no,"rescount":str(count)}),200,{'Content-Type': "application/json"})


#API to put orders in the database
@app.route('/customer/order/<string:resid>', methods=['POST'])
def place_order(resid):
    req = request.json
    i=1
    orderid = "O1"  # this needs to be changed to auto increment
    with table.batch_writer() as batch:
        for order in req:
            dname = order['Dishname']
            quantity = order['quantity']
            price = order['price']
            custid = order['custid']
            tableid = order['tableid']
            available = order['available']
            dishid = "D"+str(i)
            recordid = "ORDER_DETAIL#"+custid+"#"+tableid+"#"+orderid+"#"+dishid
            batch.put_item(Item={"ResId": resid,"RecordId": recordid,"Dishname": dname,"quant": quantity,"price": price})
            new_quant = int(available)-int(quantity)
            data = {'dishname':dname,'ingredients':'','quantity':str(new_quant),'price':''}
            requests.post("https://u4gkjhxoe5.execute-api.us-east-2.amazonaws.com/Prod/restaurants/menu/dish/" + resid, json=data)
            i+=1
    return (
        json.dumps({"message": "Order received","orderid":orderid}),
        200,
        {'Content-Type': "application/json"}
    )

#API to fetch order
@app.route('/customer/getorder/<string:resid>', methods=['POST'])
def get_order(resid):
    req = request.json
    custid = req['custid']
    recordid = "ORDER_DETAIL#"+custid
    response = table.query(KeyConditionExpression=Key("ResId").eq(resid) & Key('RecordId').begins_with(recordid),
                           ProjectionExpression="Dishname,quant,price")
    order = response['Items']
    bill = {}
    total = 0
    if (order):
        for i in order:
            total = total + (int(i["quant"]) * int(i["price"]))
        bill["Dishname"] = ""
        bill["quant"] = ""
        bill["price"] = str(total)
        order.append(bill)
        return (
            jsonify(order),
            200,
            {'Content-Type': "application/json"}
        )
    return (json.dumps("Restaurant doesn't exist"), 200, {'Content-Type': "application/json"})







