from __future__ import print_function # Python 2/3 compatibility
import boto3
import json
import base64
from botocore.vendored import requests
from base64 import b64encode
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError
from urlparse import urlparse



def lambda_handler(event, context):
    print(event);
    id = event['dataObject']['source'];
    print('id :{}'.format(id));
    item = getItem(int(id));
    image_url = getImagePresignedURL(item['imagepath']);
    text = getText(item['raw_text']);
    metadata = item['metadata']
    response = {
        "taskInput": {
            "image_url" : image_url,
            "text"  : text,
            "metadata": metadata
        }
    };

    #print(response);
    return response;




def getItem(id):

    dynamodb = boto3.resource("dynamodb");
    table = dynamodb.Table('annotation');

    try:
        response = table.get_item(
            Key={"id": id}
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
        return None;
    else:
        item = response['Item'];
        #print(item);
        return item;


def getImagePresignedURL(s3uri):

    o = urlparse(s3uri)
    bucket = o.netloc
    key = o.path.lstrip('/')

    s3 = boto3.client('s3')

    url = s3.generate_presigned_url(
    ClientMethod='get_object',
    Params={
        'Bucket': bucket,
        'Key': key
        }
    )

    return url;


def getText(s3uri):

    o = urlparse(s3uri)
    bucket = o.netloc
    key = o.path.lstrip('/')

    boto3.client('s3')

    s3 = boto3.resource('s3')
    try:
        obj = s3.Object(bucket,key);
        text = obj.get()['Body'].read().decode('utf8')
        #print(text);
        return text;
    except ClientError as e:
        if e.response['Error']['Code'] == "404":
            print("The object does not exist.")
        else:
            raise
    vent
