from flask import Flask, request, jsonify, make_response
import time



app = Flask(__name__)


    
@app.route("/")
def home():
    # return f"""
    # {site_body}
    # <button onClick ="{fetch_API}" >push for time</button>
    # <p id = 'bob'>click to get time</P>
    # {site_js}"""
    return '<p> yo</p>'

@app.route('/time/<name>')
def get_time(name):
    time.sleep(1)
    f = open('log.txt',"a")
    f.write(f"request came in \n {name}")
    f.close()
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()

    elif request.method == "GET": # The actual request following the preflight
        resp = {'time':time.time(),
                'name':name}
        return _corsify_actual_response(jsonify(resp))
    else:
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))
        
# check CORS pre release
def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

# adds required cross origin header to API responses
def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

f = open('log.txt',"w")
f.write("session started \n")
f.close()

if __name__== '__main__':
    app.run(debug = True)

