from flask import Flask, request, jsonify, make_response
import json
import time
import psycopg2

# make api _data fit this profile
# api_data = {"contributor":"bob", "number":5, "URL":test_url, "time":1432344.23456789}


app = Flask(__name__)

   
@app.route("/")
def home():
    return '<p> yo</p>'



@app.route('/pp', methods = ['GET','POST'])
def get_time():
    time.sleep(1)
    # f = open('log.txt',"a")
    # f.write(f"request came in \n {name} sent {url} \n")
    # f.close()

    if request.method == 'POST':
        f = open('log.txt',"w")
        f.write("post request came in \n")
        try:
            f.write(f"contained {request.data} ready to go\n")
           
            status = call_db(request.data)
            #used to bypass status for debugging
            #status = 5
            f.write('got status \n')
            response = {'status':f"{status}"}
            f.write('prepared status \n')
        except:
            f.write('failed \n')
            response = {'status':f"failed to use {request.data}"}
            
        f.close()
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")

    return response


def call_db(api_data):
    f = open('apitesting.txt', 'w')
    f.write(f'test at {time.time()} \n')

    conn = psycopg2.connect(database = "tfalrovx", 
        user = "tfalrovx", 
        host= 'rogue.db.elephantsql.com',
        password = "9h9Cz-Nruy-4mBR9AMVTEOoGAQwGGYh1",
        )
    
    f.write('db connection established \n')

    api_data = json.loads(api_data)
    f.write(f'data transformed \n\n {api_data} \n')

    api_query = f"""
    INSERT INTO numbers(contributor,number, URL, time)
    VALUES ('{api_data["contributor"]}', {api_data["number"]}, '{str(api_data["url"])}', {time.time()});
    """
    f.write (f'Query assembled: \n {api_query}')
    try:
        with conn.cursor() as cur:
            cur.execute(api_query)
            f.write('query attempted \n')
            #res = cur.fetchall()

            conn.commit()
            status =  'completed sent to db'
    except:
        status = 'query failed'

    f.write(f'query status is {status}')
    return status


    

if __name__ == '__main__':
    app.run(debug = True)

# 123