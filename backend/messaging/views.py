from django.http import JsonResponse
from .models import Messaging, QueueMessage
import json
from django.views.decorators.csrf import csrf_exempt

def get_messages(request, senderID, receiverID):
    messages = (Messaging.objects.filter(senderID=senderID, receiverID=receiverID) 
    | Messaging.objects.filter(senderID = receiverID, receiverID = senderID))

    messages = messages.order_by('timestamp')

    return JsonResponse(list(messages.values()), safe=False)

@csrf_exempt
def send_messages(request):
    if request.method == "POST":
        data = json.loads(request.body) 

        msg = Messaging.objects.create(
            senderID = data['senderID'],
            receiverID = data['receiverID'],
            content = data['content']
        )

        QueueMessage.objects.update_or_create(
            senderID = data['senderID'],
            receiverID = data['receiverID'],
            defaults={"lastMessageID": msg.messageID}
        )

        QueueMessage.objects.update_or_create(
            senderID = data['receiverID'],
            receiverID = data['senderID'],
            defaults={"lastMessageID": msg.messageID}
        )

        returnData = {
            'id' : msg.messageID,
            'senderID': msg.senderID,
            'receiverID': msg.receiverID,
            'content': msg.content,
            'timestamp': msg.timestamp.isoformat()
        }

        return JsonResponse(returnData)
