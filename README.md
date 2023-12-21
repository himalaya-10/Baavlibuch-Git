# BaavliBuch


#Run Manually

Frontend:
1)cd baavlibuch
2)npm run start

Backend:
1)cd backend
2)nodemon index.js

Django:
1)cd django
2)python manage.py runserver 9000

(mongodb -  cd backend/db -- change mongodb url to const mongooseUrl="mongodb://localhost:27017")


# Docker compose

1)change mongodb url to const mongooseUrl="mongodb://mongodb:27017"
2)docker-compose build
3)docker-compose up
