# React + TypeScript + Vite

Create a web application that meets the requirements:
- consists of 2 pages
- where you need to show the loader

Main page:

Header: the name of the apk in the center (any)

Main content:
- a right-aligned dropdown with a list of users (loaded from АРИ)
- by default, 10 random posts from different users are shown under the dropdown
- if you select a user from the dropdown, all his posts will be shown below. You can choose only one user. You can also reset the selected user and a list of 10 random posts will be loaded immediately
- if you click on a post, a page with comments on the selected post will be displayed in a new way

Comments page:

Header: on the left there is a back button, which returns the user to the main page. In the center, a text in the format: “Comments for post #{postID}”

Main content:
- display all comments related to the selected post

