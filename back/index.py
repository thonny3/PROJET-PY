from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import os
import datetime
app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'static/uploads'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'stock'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
mysql = MySQL(app)

ALLOWED_EXTENSIONS  = set(['png','jpg','jpeg','gif'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS
############################## GERER  UTULISATEUR ########################################################
@app.route('/api/utilisateur',methods=["GET"])
def getUtilisateur():
    cur = mysql.connection.cursor()
    cur.execute("SELECT *  FROM utulisateur")
    rows  = cur.fetchall()
    cur.close()
    users = []
    for row in  rows :
        user = {'idUtil':row[0],'nom':row[1],'prenom':row[2],'email':row[3],'pwd':row[4],'phone':row[5]}
        users.append(user)
    return jsonify(users)

@app.route('/api/user',methods=['POST'])
def insertUtilisateur():
    data = request.get_json()
    pseudo = data["pseudo"]
    fonction = data["fonction"]
    email = data["email"]
    password = data["password"]

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO user(email,pseudo,password,fonction) VALUES(%s,%s,%s,%s)",(email,pseudo,password,fonction))
    mysql.connection.commit()
    cur.close()
    return jsonify(message = "utilisateur a bine enregistrer ")

@app.route('/api/user/<int:idUtil>',methods=["PUT"])
def updateUtilisateur(idUtil):
    data = request.get_json()
    pseudo = data["pseudo"]
    email = data["email"]
    password = data["password"]
    cur = mysql.connection.cursor()
    cur.execute("UPDATE user SET email=%s,pseudo=%s,password=%s WHERE id=%s",(email,pseudo,password,idUtil))
    mysql.connection.commit()
    cur.close()
    return jsonify(message = "utilisateur a bien modifier  ")



#

@app.route('/api/produit',methods=['GET','POST'])
def product():
    if request.method == 'GET':
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM produit ")
        rows  = cur.fetchall()
        products = []
        for row in  rows :
            product = {'numProduit':row[0],'design':row[1],'stock':row[2],'prix':row[3]}
            products.append(product)
        cur.close()
        return jsonify(products)
    elif request.method =='POST':
        data = request.get_json()
        numProduit = data["numProduit"]
        design = data["design"]
        prix = data["prix"]
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO produit(numProduit,design,prix) VALUES(%s,%s,%s)",(numProduit,design,prix))
        mysql.connection.commit()
        cur.close()
        return jsonify("method POST")


@app.route('/api/produit/<numProduit>',methods=['PUT','DELETE','GET'])
def getProduct(numProduit):

    if request.method =='GET':
        cur = mysql.connection.cursor()
        cur.execute("SELECT *  FROM produit WHERE numProduit=%s",(numProduit,))
        rows  = cur.fetchall()
        products = []
        for row in  rows :
            product = {'numProduit':row[0],'design':row[1],'stock':row[2],'prix':row[3]}
            products.append(product)
        cur.close()
        return jsonify(products)
    
    elif request.method =='PUT':
        data = request.get_json()
        design = data["design"]
        prix  = data["prix"]
        cur = mysql.connection.cursor()
        cur.execute("UPDATE produit SET design=%s,prix=%s WHERE numProduit=%s",(design,prix,numProduit))
        mysql.connection.commit()
        cur.close()
        return jsonify("method put ")
    
    elif request.method =='DELETE':
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM produit WHERE numProduit=%s",(numProduit,))
        mysql.connection.commit()
        cur.close()
        return jsonify("method  delete ")
    

@app.route('/api/bondeEntree',methods = ['GET','POST'])
def bondeEntree():
    if request.method =='GET':
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM bondeentree")
        rows  = cur.fetchall()
        bonEntrees = []
        for row in  rows :
            bonEntree = {'numBonEntree':row[0],'numProduit':row[1],'qteEntree':row[2],'dateEntree':row[3]}
            bonEntrees.append(bonEntree)
        cur.close()
        return jsonify(bonEntrees)
    elif request.method =='POST':
        data = request.get_json()
        numProduit = data["numProduit"]
        numBonEntree = data["numBonEntree"]
        qteEntree = data["qteEntree"]
        dateEntree = data["dateEntree"]
        cur = mysql.connection.cursor()
        cur.execute("SELECT stock FROM produit WHERE numProduit=%s",(numProduit,))
        rows  = cur.fetchall()
        stock_dispo = []
        for row in  rows :
            bonEntree = {'stock':row[0]}
            stock_dispo.append(bonEntree)

        stock_dispo = stock_dispo[0]["stock"]
        stock = stock_dispo + int(qteEntree)
        cur.execute("INSERT INTO bondeentree(numBonEntree,numProduit,qteEntree,dateEntree) VALUES(%s,%s,%s,%s)",(numBonEntree,numProduit,qteEntree,dateEntree))
        cur.execute("UPDATE produit SET stock=%s WHERE numProduit=%s",(stock,numProduit))
        mysql.connection.commit()
        cur.close()
        return jsonify(stock_dispo)

@app.route('/api/bondeEntree/<numBonEntree>',methods=['PUT','DELETE','GET'])
def getBonEntre(numBonEntree):

    if request.method =='GET':
        cur = mysql.connection.cursor()
        cur.execute("SELECT *  FROM bondeentree WHERE numBonEntree=%s",(numBonEntree,))
        rows  = cur.fetchall()
        bonEntrees = []
        for row in  rows :
            bonEntree = {'numBonEntree':row[0],'numProduit':row[1],'qteEntree':row[2],'dateEntree':row[3]}
            bonEntrees.append(bonEntree)
        cur.close()
        return jsonify(bonEntrees)
    
    elif request.method =='PUT':
        data = request.get_json()
        numProduit = data["numProduit"]
        qteEntree = data["qteEntree"]
        dateEntree = data["dateEntree"]
        cur = mysql.connection.cursor()
        cur.execute("UPDATE bondeentree SET numProduit=%s,qteEntree=%s,dateEntree=%s WHERE numBonEntree=%s",(numProduit,qteEntree,dateEntree,numBonEntree))
        mysql.connection.commit()
        cur.close()
        return jsonify(dateEntree)
    
    elif request.method =='DELETE':
        cur = mysql.connection.cursor()
        cur.execute("SELECT qteEntree,numProduit FROM bondeentree WHERE numBonEntree =%s",(numBonEntree,))
        rows  = cur.fetchall()
        stock_dispo = []
        for row in  rows :
            bonEntree = {'stock':row[0],'numProduit':row[1]}
            stock_dispo.append(bonEntree)

        qtEntre = stock_dispo[0]["stock"]
        numProduit = stock_dispo[0]['numProduit']
        cur.execute("UPDATE produit SET stock=stock-%s WHERE numProduit=%s",(qtEntre,numProduit))
        cur.execute("DELETE FROM bondeentree WHERE numBonEntree=%s",(numBonEntree,))
        mysql.connection.commit()
        cur.close()
        
        return jsonify("method  delete ")
# TABLE BON SORTIE 

@app.route('/api/bondeSortie',methods = ['GET','POST'])
def bondeSortie():
    if request.method =='GET':
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM bondesortie")
        rows  = cur.fetchall()
        bonSorties = []
        for row in  rows :
            bondeSortie = {'numBonSortie':row[0],'numProduit':row[1],'qteSortie':row[2],'dateSortie':row[3]}
            bonSorties.append(bondeSortie)
        cur.close()
        return jsonify(bonSorties)
    elif request.method =='POST':
        data = request.get_json()
        numProduit = data["numProduit"]
        numBonSortie = data["numBonSortie"]
        qteSortie = data["qteSortie"]
        dateSortie = data["dateSortie"]
        cur = mysql.connection.cursor()
        cur.execute("SELECT stock FROM produit WHERE numProduit=%s",(numProduit,))
        rows  = cur.fetchall()
        stock_dispo = []
        for row in  rows :
            bonEntree = {'stock':row[0]}
            stock_dispo.append(bonEntree)

        stock_dispo = stock_dispo[0]["stock"]
        qteSortie =int(qteSortie)
        if(int(qteSortie)<=stock_dispo):
            stock = stock_dispo - qteSortie
            cur.execute("INSERT INTO bondesortie(numBonSortie,numProduit,qteSortie,dateSortie) VALUES(%s,%s,%s,%s)",(numBonSortie,numProduit,qteSortie,dateSortie))
            cur.execute("UPDATE produit SET stock=%s WHERE numProduit=%s",(stock,numProduit))
            mysql.connection.commit()
            cur.close()
            return jsonify(stock)
        else:
            
            return jsonify("stock  insuffisant")
     
@app.route('/api/bondeSortie/<numBonSortie>',methods=['PUT','DELETE','GET'])
def getBonSortie(numBonSortie):

    if request.method =='GET':
        cur = mysql.connection.cursor()
        cur.execute("SELECT *  FROM bondesortie WHERE numBonSortie=%s",(numBonSortie,))
        rows  = cur.fetchall()
        bonSorties = []
        for row in  rows :
            bondeSortie = {'numBonSortie':row[0],'numProduit':row[1],'qteSortie':row[2],'dateSortie':row[3]}
            bonSorties.append(bondeSortie)
        cur.close()
        return jsonify(bonSorties)
        
    
    elif request.method =='PUT':
        data = request.get_json()
        numProduit = data["numProduit"]
        qteSortie = data["qteSortie"]
        dateSortie = data["dateSortie"]
        cur = mysql.connection.cursor()
        cur.execute("UPDATE bondesortie SET numProduit=%s,qteSortie=%s,dateSortie=%s WHERE numBonSortie=%s",(numProduit,qteSortie,dateSortie,numBonSortie))
        mysql.connection.commit()
        cur.close()
        return jsonify(numBonSortie)
    
    elif request.method =='DELETE':
        cur = mysql.connection.cursor()
        cur.execute("SELECT qteSortie,numProduit FROM bondesortie WHERE numBonSortie =%s",(numBonSortie,))
        rows  = cur.fetchall()
        stock_dispo = []
        for row in  rows :
            bonEntree = {'stock':row[0],'numProduit':row[1]}
            stock_dispo.append(bonEntree)

        qtEntre = stock_dispo[0]["stock"]
        numProduit = stock_dispo[0]['numProduit']
        cur.execute("UPDATE produit SET stock=stock+%s WHERE numProduit=%s",(qtEntre,numProduit))
        cur.execute("DELETE FROM bondesortie WHERE numBonSortie=%s",(numBonSortie,))
        mysql.connection.commit()
        cur.close()
        
        return jsonify("method  delete ")  
          
@app.route('/api/resultProduit',methods=['GET'])
def resultProduit():
    cur = mysql.connection.cursor()
    cur.execute("SELECT SUM(stock) AS stock FROM produit")
    rows  = cur.fetchall()
    stock = []
    for row in  rows :
        stocks = {'stock':row[0]}
        stock.append(stocks)
    cur.close()
    return jsonify(stock)

@app.route('/api/resultSortie',methods=['GET'])
def resultEntre():
    cur = mysql.connection.cursor()
    cur.execute("SELECT SUM(qteSortie) AS stock FROM bondesortie")
    rows  = cur.fetchall()
    stock = []
    for row in  rows :
        stocks = {'stock':row[0]}
        stock.append(stocks)
    cur.close()
    return jsonify(stock)

if __name__ == '__main__':
    app.run(debug=True)