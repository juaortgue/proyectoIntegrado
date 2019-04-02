# fittrain v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	- [Authenticate with Facebook](#authenticate-with-facebook)
	- [Authenticate with Google](#authenticate-with-google)
	
- [Category](#category)
	- [Create category](#create-category)
	- [Delete category](#delete-category)
	- [Retrieve categories](#retrieve-categories)
	- [Retrieve category](#retrieve-category)
	- [Update category](#update-category)
	
- [Exercise](#exercise)
	- [Create exercise](#create-exercise)
	- [Create exercise with photo](#create-exercise-with-photo)
	- [Delete exercise](#delete-exercise)
	- [Retrieve exercise](#retrieve-exercise)
	- [Retrieve exercises](#retrieve-exercises)
	- [Update exercise](#update-exercise)
	- [Update exercise with photo](#update-exercise-with-photo)
	
- [Gym](#gym)
	- [Create gym](#create-gym)
	- [Create gym with photo](#create-gym-with-photo)
	- [Delete gym](#delete-gym)
	- [Retrieve gym](#retrieve-gym)
	- [Retrieve gyms](#retrieve-gyms)
	- [Update gym](#update-gym)
	- [Update gym With photo](#update-gym-with-photo)
	
- [Training](#training)
	- [Create training](#create-training)
	- [Create training with photo](#create-training-with-photo)
	- [Delete training](#delete-training)
	- [Retrieve training](#retrieve-training)
	- [Retrieve trainings](#retrieve-trainings)
	- [Update training](#update-training)
	- [Update training with photo](#update-training-with-photo)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	- [Update user&#39;s photo](#update-user&#39;s-photo)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

## Authenticate with Facebook



	POST /auth/facebook


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Facebook user accessToken.</p>							|

## Authenticate with Google



	POST /auth/google


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Google user accessToken.</p>							|

# Category

## Create category



	POST /categories


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Category's name.</p>							|

## Delete category



	DELETE /categories/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve categories



	GET /categories


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master  access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve category



	GET /categories/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master  access token.</p>							|

## Update category



	PUT /categories/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Category's name.</p>							|

# Exercise

## Create exercise



	POST /exercises


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| String			|  <p>Exercise's name.</p>							|
| categoryId			| String			|  <p>Exercise's categoryId.</p>							|
| series			| Number			|  <p>Exercise's series.</p>							|
| repetitions			| Number			|  <p>Exercise's repetitions.</p>							|
| finishTime			| String			|  <p>Exercise's finishTime.</p>							|
| restTime			| String			|  <p>Exercise's restTime.</p>							|
| gif			| String			|  <p>Exercise's gif.</p>							|
| description			| String			|  <p>Exercise's description.</p>							|

## Create exercise with photo



	POST /exercises/photo


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| String			|  <p>Exercise's name.</p>							|
| categoryId			| String			|  <p>Exercise's categoryId.</p>							|
| series			| Number			|  <p>Exercise's series.</p>							|
| repetitions			| Number			|  <p>Exercise's repetitions.</p>							|
| finishTime			| String			|  <p>Exercise's finishTime.</p>							|
| restTime			| String			|  <p>Exercise's restTime.</p>							|
| photo			| File			|  <p>Exercise's gif.</p>							|
| description			| String			|  <p>Exercise's description.</p>							|

## Delete exercise



	DELETE /exercises/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve exercise



	GET /exercises/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve exercises



	GET /exercises


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update exercise



	PUT /exercises/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| String			|  <p>Exercise's name.</p>							|
| categoryId			| String			|  <p>Exercise's categoryId.</p>							|
| series			| Number			|  <p>Exercise's series.</p>							|
| repetitions			| Number			|  <p>Exercise's repetitions.</p>							|
| finishTime			| String			|  <p>Exercise's finishTime.</p>							|
| restTime			| String			|  <p>Exercise's restTime.</p>							|
| gif			| String			|  <p>Exercise's gif.</p>							|

## Update exercise with photo



	PUT /exercises/:id/photo


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| String			|  <p>Exercise's name.</p>							|
| categoryId			| String			|  <p>Exercise's categoryId.</p>							|
| series			| Number			|  <p>Exercise's series.</p>							|
| repetitions			| Number			|  <p>Exercise's repetitions.</p>							|
| finishTime			| String			|  <p>Exercise's finishTime.</p>							|
| restTime			| String			|  <p>Exercise's restTime.</p>							|
| photo			| File			|  <p>Exercise's gif.</p>							|

# Gym

## Create gym



	POST /gyms


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| String			|  <p>Gym's name.</p>							|
| address			| String			|  <p>Gym's address.</p>							|
| province			| String			|  <p>Gym's province.</p>							|
| city			| String			|  <p>Gym's city.</p>							|
| zipcode			| String			|  <p>Gym's zipcode.</p>							|
| position			| String			|  <p>Gym's position.</p>							|
| price			| Number			|  <p>Gym's price.</p>							|
| picture			| String			|  <p>Gym's picture.</p>							|
| description			| String			|  <p>Gym's description.</p>							|

## Create gym with photo



	POST /gyms/photo


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| String			|  <p>Gym's name.</p>							|
| address			| String			|  <p>Gym's address.</p>							|
| province			| String			|  <p>Gym's province.</p>							|
| city			| String			|  <p>Gym's city.</p>							|
| zipcode			| String			|  <p>Gym's zipcode.</p>							|
| position			| String			|  <p>Gym's position.</p>							|
| price			| Number			|  <p>Gym's price.</p>							|
| photo			| File			|  <p>Gym's picture.</p>							|
| description			| String			|  <p>Gym's description.</p>							|

## Delete gym



	DELETE /gyms/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve gym



	GET /gyms/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve gyms



	GET /gyms


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update gym



	PUT /gyms/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| String			|  <p>Gym's name.</p>							|
| address			| String			|  <p>Gym's address.</p>							|
| province			| String			|  <p>Gym's province.</p>							|
| city			| String			|  <p>Gym's city.</p>							|
| zipcode			| String			|  <p>Gym's zipcode.</p>							|
| position			| String			|  <p>Gym's position.</p>							|
| price			| Number			|  <p>Gym's price.</p>							|
| description			| String			|  <p>Gym's description.</p>							|
| picture			| String			|  <p>Gym's picture.</p>							|

## Update gym With photo



	PUT /gyms/:id/photo


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| String			|  <p>Gym's name.</p>							|
| address			| String			|  <p>Gym's address.</p>							|
| province			| String			|  <p>Gym's province.</p>							|
| city			| String			|  <p>Gym's city.</p>							|
| zipcode			| String			|  <p>Gym's zipcode.</p>							|
| position			| String			|  <p>Gym's position.</p>							|
| price			| Number			|  <p>Gym's price.</p>							|
| description			| String			|  <p>Gym's description.</p>							|
| photo			| File			|  <p>Gym's picture.</p>							|

# Training

## Create training



	POST /training


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| String			|  <p>Training's name.</p>							|
| description			| String			|  <p>Training's description.</p>							|
| target			| String			|  <p>Training's target.</p>							|
| time			| String			|  <p>Training's time.</p>							|
| picture			| String			|  <p>Training's picture.</p>							|
| exercises			| String[]			|  <p>Training's exercises, like string array.</p>							|
| level			| Number			|  <p>Training's level.</p>							|

## Create training with photo



	POST /training/photo


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| String			|  <p>Training's name.</p>							|
| description			| String			|  <p>Training's description.</p>							|
| target			| String			|  <p>Training's target.</p>							|
| time			| String			|  <p>Training's time.</p>							|
| photo			| File			|  <p>Training's picture, like a file, not a string.</p>							|
| exercises			| String[]			|  <p>Training's exercises.</p>							|
| level			| Number			|  <p>Training's level.</p>							|

## Delete training



	DELETE /training/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve training



	GET /training/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve trainings



	GET /training


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update training



	PUT /training/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| String			|  <p>Training's name.</p>							|
| description			| String			|  <p>Training's description.</p>							|
| target			| String			|  <p>Training's target.</p>							|
| time			| String			|  <p>Training's time.</p>							|
| picture			| String			|  <p>Training's picture.</p>							|

## Update training with photo



	PUT /training/:id/photo


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| String			|  <p>Training's name.</p>							|
| description			| String			|  <p>Training's description.</p>							|
| target			| String			|  <p>Training's target.</p>							|
| time			| String			|  <p>Training's time.</p>							|
| photo			| File			|  <p>Training's picture.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|
| weight			| Number			|  <p>User's weight.</p>							|
| height			| Number			|  <p>User's height.</p>							|
| gender			| Boolean			|  <p>User's gender, true (male), false (female).</p>							|
| age			| Number			|  <p>User's age.</p>							|
| trainingYears			| Number			|  <p>User's trainingYears.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Admin access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access_token</p>							|

## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| weight			| Number			|  <p>User's weight.</p>							|
| height			| Number			|  <p>User's height.</p>							|
| gender			| Boolean			|  <p>User's gender, true (male), false (female).</p>							|
| age			| Number			|  <p>User's age.</p>							|
| trainingYears			| Number			|  <p>User's trainingYears.</p>							|

## Update user&#39;s photo



	PUT /users/:id/photo


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin, user access token.</p>							|
| photo			| File			|  <p>User's picture.</p>							|


