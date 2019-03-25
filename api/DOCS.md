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
	- [Delete exercise](#delete-exercise)
	- [Retrieve exercise](#retrieve-exercise)
	- [Retrieve exercises](#retrieve-exercises)
	- [Update exercise](#update-exercise)
	
- [Gym](#gym)
	- [Create gym](#create-gym)
	- [Delete gym](#delete-gym)
	- [Retrieve gym](#retrieve-gym)
	- [Retrieve gyms](#retrieve-gyms)
	- [Update gym](#update-gym)
	
- [Training](#training)
	- [Create training](#create-training)
	- [Delete training](#delete-training)
	- [Retrieve training](#retrieve-training)
	- [Retrieve trainings](#retrieve-trainings)
	- [Update training](#update-training)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


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
| access_token			| String			|  <p>master access token.</p>							|
| name			| 			|  <p>Category's name.</p>							|

## Delete category



	DELETE /categories/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve categories



	GET /categories


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
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
| access_token			| String			|  <p>admin access token.</p>							|

## Update category



	PUT /categories/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| name			| 			|  <p>Category's name.</p>							|

# Exercise

## Create exercise



	POST /exercises


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Exercise's name.</p>							|
| categoryId			| 			|  <p>Exercise's categoryId.</p>							|
| series			| 			|  <p>Exercise's series.</p>							|
| repetitions			| 			|  <p>Exercise's repetitions.</p>							|
| finishTime			| 			|  <p>Exercise's finishTime.</p>							|
| restTime			| 			|  <p>Exercise's restTime.</p>							|
| gif			| 			|  <p>Exercise's gif.</p>							|

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
| name			| 			|  <p>Exercise's name.</p>							|
| categoryId			| 			|  <p>Exercise's categoryId.</p>							|
| series			| 			|  <p>Exercise's series.</p>							|
| repetitions			| 			|  <p>Exercise's repetitions.</p>							|
| finishTime			| 			|  <p>Exercise's finishTime.</p>							|
| restTime			| 			|  <p>Exercise's restTime.</p>							|
| gif			| 			|  <p>Exercise's gif.</p>							|

# Gym

## Create gym



	POST /gyms


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Gym's name.</p>							|
| address			| 			|  <p>Gym's address.</p>							|
| province			| 			|  <p>Gym's province.</p>							|
| city			| 			|  <p>Gym's city.</p>							|
| zipcode			| 			|  <p>Gym's zipcode.</p>							|
| position			| 			|  <p>Gym's position.</p>							|
| price			| 			|  <p>Gym's price.</p>							|
| description			| 			|  <p>Gym's description.</p>							|

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
| name			| 			|  <p>Gym's name.</p>							|
| address			| 			|  <p>Gym's address.</p>							|
| province			| 			|  <p>Gym's province.</p>							|
| city			| 			|  <p>Gym's city.</p>							|
| zipcode			| 			|  <p>Gym's zipcode.</p>							|
| position			| 			|  <p>Gym's position.</p>							|
| price			| 			|  <p>Gym's price.</p>							|
| description			| 			|  <p>Gym's description.</p>							|

# Training

## Create training



	POST /training


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Training's name.</p>							|
| description			| 			|  <p>Training's description.</p>							|
| target			| 			|  <p>Training's target.</p>							|
| time			| 			|  <p>Training's time.</p>							|
| picture			| 			|  <p>Training's picture.</p>							|

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
| name			| 			|  <p>Training's name.</p>							|
| description			| 			|  <p>Training's description.</p>							|
| target			| 			|  <p>Training's target.</p>							|
| time			| 			|  <p>Training's time.</p>							|
| picture			| 			|  <p>Training's picture.</p>							|

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

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
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


