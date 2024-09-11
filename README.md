Flatiron Phase 5/Capstone Project

by Charles Jarvis

This app is intended to be a sort of fitness tracking application, with a specific focus on cardio-centric exercises.
This idea was born out of a personal need for something like this, as right now I really just use a whiteboard calendar on my wall, and adding some more measurements/categories I think would be very useful.
The main idea behind this app is for a user to be able to come with some statistics about their workout, and have the app provide them with some statistics, and keep track of their progress over the last week/month/year.
One note about this project is that it is more of an "after the fact" type of project, and thus will not be dealing with GPS data or other active monitoring tech.

User Stories -- before development:

    *A user comes to the site having just completed a run/bike/swim/etc and has tracked both the distance and time of their exercise. They can submit a new workout to the app, which will store the data and display it for the user.
        The app will also provide the user some more detailed statistics about their session. At this point in time I am thinking calories, distance/time, personal records.

    *User wants to see their past week/month of activity, the app will have some way of displaying the stored data about the users activity history in an organized and sleek manner.
        At this moment in time I see this as a calendar, but depending on how implementing that goes it might be in a different format. Will also likely be the homepage

    *A user wants to see their activities broken down by category. The app will be able to serve the user the data about their exercise sessions, based on what activity they are doing, along with some relevant data about those sessions.
        Currently I plan to include running, biking, hiking, swimming, and skiing, simply based on myself. **Possible stretch goal - add more activity types

    *A user wants to see their streak for completing activities, the app will be able to serve them data about different types of streaks, whether its daily streaks, weekly streaks, or same type activity streaks. 
        This is planned to be a prominent feature on the homepage.

Feature Stories -- after implementation:

    *Login/signup:
        User comes to the site and either logs in to their existing account, or creates a new account
        The user will have some sort of authentication that will stick with them, no need to log in multiple times
        Will likely be the landing page to the site
        Activities will be filtered by user, one user will not be able to see another's data

    *Session submit:
        User comes to the site with the time/distance from their last session, fills out that info to a form
        On form submit, that data is POSTed to the backend, and tied to the user that submitted it
        The user is then redirected to either a summary of that session, or that week (will be decided on later)

    *Activity Summary:
        User is likely taken here as their homepage
        Plan is to implement as a calendar, with each day showing a summary of what the user did on that day
        User can choose between a weekly calendar and a monthly calendar
        User can click on a session to go to a detail page show that session's activities/statistics

    *Day View:
        User can click on a day from the calendar to be taken into detail mode
        Once in detail mode the user can see all of their activities from that day, along with their stats
        From here, the user can update/delete activites as they see fit

    *Calorie Calculator:
        User wants to see how many calories they burned
        They can enter a few details into the calculator to get the desired info
        Once they have the info, they can move straight to posting a new activity

    *Top Activity View:
        User wants to see their personal bests
        They can go to the top section, and choose what exercises they want and how to sort them
        App then shows the user their records in whatever category they chose



The above user stories I think is a good place to start in terms of goals for this project. Because this is supposed to be a clean and polished app, I feel as though it is better to lock down a core set of features, and improve on them after reaching MVP.
I think I can reach MVP status for this project within about a week and a half, and afterwards, can start working on some stretch goals:

Stretch Goals:

    *A section that allows the user to also keep track of their meals/calorie intake. I think this fits right in with the theme of my project.
        If this ends up getting included, I could revamp the session/daily statistics to include a calorie intake/expendature model to help the user keep track of that

    *Incude a section about trails, allowing users to submit their favorite trails and allowing others inspiration for where to go next.
        Could have a browsing page, reviews, top rated, etc. 