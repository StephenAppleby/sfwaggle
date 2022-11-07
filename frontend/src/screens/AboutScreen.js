import React from "react"

const AboutScreen = () => {
  return (
    <>
      <h1>About Sfwaggle.com</h1>
      <p>
        Sfwaggle.com is an educational project developed by me (Stephen Appleby)
        to expand my web development skills and toolset.
      </p>
      <p>
        As such, there is of course no real company called Sfwaggle selling
        second hand dogs behind this website. Sorry if you feel misled. Feel
        free to click around as much as you like, create an account (there is no
        email verification enabled, so anything works), check out the dogs and
        products and make an order of some chew toys.
      </p>
      <p>
        This project uses Django and the Django REST Framework with a postgresql
        server on the backend, and React and Redux powering the front end. I've
        set up the django admin to let admin users view and edit orders.
        Currently only users with orders that have been delivered can leave
        reviews, so you'll need to edit the order manually in the admin section
        in order to interact with the review system. Just set the order status
        to 'delivered'. If you've populated the database with the fixtures
        provided, there will be a superuser account already with the credentials
        email: "admin@email.com" and password: "testpass123".
      </p>
      <p>
        As my main focus as a web developer is the back end side of things, I
        have achieved my primary goal in this project of gaining a solid
        understanding of front end workflow fundamentals. If I were more
        concerned with digging deeper into the front end I would start by
        implementing a payment system and reworking the shipping details section
        (and brush up on styling), but as it is, I'm content.
      </p>
    </>
  )
}

export default AboutScreen
