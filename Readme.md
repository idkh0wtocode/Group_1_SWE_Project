frontend:

cd frontend
npm install 
npm run dev

database:
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

messaging:
cd backend/messaging
npm install 
node index.js