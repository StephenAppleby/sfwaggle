# Sfwaggle
Ecommerce web app

### About

Sfwaggle.com is an educational project developed by me (Stephen Appleby)
to expand my web development skills and toolset.

As such, there is of course no real company called Sfwaggle selling second hand dogs behind this website. Sorry if you feel misled. Feel free to click around as much as you like, create an account (there is no email verification enabled, so anything works), check out the dogs and products and make an order of some chew toys.

This project uses Django and the Django REST Framework with a postgresql server on the backend, and React and Redux powering the front end. I've set up the django admin to let admin users view and edit orders. Currently only users with orders that have been delivered can leave reviews, so you'll need to edit the order manually in the admin section in order to interact with the review system. Just set the order status to 'delivered'. If you've populated the database with the fixtures provided, there will be a superuser account already with the credentials email: "admin@email.com" and password: "testpass123".

As my main focus as a web developer is the back end side of things, I have achieved my primary goal in this project of gaining a solid understanding of front end workflow fundamentals. If I were more concerned with digging deeper into the front end I would start by implementing a payment system and reworking the shipping details section (and brush up on styling), but as it is, I'm content.

### Setup

Currently Sfwaggle is not deployed on the internet. In order to view the site, clone the repository and run the project in development mode. You will need git, docker-compose and npm installed.

    $ git clone https://github.com/StephenAppleby/sfwaggle.git
    $ cd sfwaggle

Start the docker containers and initialise the database. The reset_db command will delete all objects created in the database and repopulate with fixture data.

    $ cd backend
    $ docker-compose up --build -d
    $ docker-compose exec django python manage.py migrate
    $ docker-compose exec django python manage.py reset_db

Start up the front end server in development mode

    $ cd ./frontend
    $ npm start

You can now access the website from your browser at `http://localhost:3000/
