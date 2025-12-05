
To run frontend:

cd frontend
npm install
npm run dev

To run server:

cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

To run the messaging feature:

cd backend/messaging
npm install
node index.js