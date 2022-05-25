from flask import Flask,request
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pandas import DataFrame
from sqlalchemy import false
app = Flask(__name__)

def clean_data(x):
    if isinstance(x, list):
        return [str.lower(i.replace(" ", "")) for i in x]
    else:
        if isinstance(x, str):
            return str.lower(x.replace(" ", ""))
        else:
            return ''

def create_soup(x):
    return x['Type'] + ' ' + ' '+ x['ProductName']

def get_recommendations(df,title):
    df = df.reset_index()
    count = CountVectorizer(stop_words= None)
    count_matrix = count.fit_transform(df['soup'])
    cosine_sim = cosine_similarity(count_matrix, count_matrix)
    indices = pd.Series(df.index, index=df['product'])
    # Get the index of the movie that matches the title
    idx = indices[title]

    # Get the pairwsie similarity scores of all movies with that movie
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Sort the movies based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the scores of the 10 most similar movies
    sim_scores = sim_scores[1:11]

    # Get the movie indices
    movie_indices = [i[0] for i in sim_scores]

    # Return the top 10 most similar movies

    name = df['product'].iloc[movie_indices]
    name = name.to_dict()
    dic = {}
    lst = []
    for key,value in name.items():
        lst.append(value)
    # Return the top 10 most similar movies
    dic.update({'item': lst})
    return dic
    #return df['product'].iloc[movie_indices].to_string()


@app.route('/cb')
def cb():
    dbname = get_database()
    collection_name = dbname["Product"]
    item_details = collection_name.find()
    df = DataFrame(item_details)

    column = ['_id', 'ProductName','Type', 'CategoryName']
    df = df[column]
    df['ProductName'] = df['ProductName'].drop_duplicates()
    df = df.dropna()

    df['ProductId'] = df['_id']
    df['product'] = df['ProductName']
    #df['keyword']= df['ProductName'].str.replace(r"\(.*\)","")
    df = df.drop('_id', 1)

    features = [ 'CategoryName', 'ProductName', "Type"]
    for feature in features:
        df[feature] = df[feature].apply(clean_data)

    df['soup'] = df.apply(create_soup, axis=1)

    productname = request.args.get('name')
    print(productname)
    res = get_recommendations(df, productname)
    return res



def get_database():
    from pymongo import MongoClient
    import pymongo

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://ToanDang:123@mobile.st5aw.mongodb.net/Gotech?retryWrites=true&w=majority"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['Gotech']

def getdata():
    dbname = get_database()
    collection_name = dbname["Product"]
    item_details = collection_name.find()
    items_df = DataFrame(item_details)
    items_df.to_csv('product.csv',index= False)
    return "done"

@app.route('/')
def index(): 
    return "index"


if __name__ == "__main__":   
    app.run(debug=True)