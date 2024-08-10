# Spotify Demo API
This is a demo API for a code challenge at Universal Music Group.

## Getting Started
Make sure to create an .env file in root directory with the following values:
- API_PREFIX=http://localhost:5000/
- USERNAME={spotify_developer_client_id}
- PASSWORD={spotify_developer_client_secret}

1. Run `npm run create-db` to create a local database. Note that this demo app uses PostgresQL.
2. Run `npm run dev` to start the server. Tables will also be added to the database that was created by the command in the previous step.

## Endpoints
The three endpoints specified in the code challenge api details section of the assignment document are explained below. I recommend using Postman and Postico (or any visualization GUI) to montior requests.

`/tracks/{ISRC}`
Sample ISRC values (USVT10300001, USEE10001992, GBAYE0601498, USWB11403680, GBAYE0601477)

*POST*
This endpoint creates a track. More specifically it does the following:
- checks for a custom API key in query parameters before allowing access to the endpoint
- adds a track identified by ISRC to 'tracks' table if track does not exist
- adds artist to 'artists' table if artist does not exist
- creates reference key to 'artist' from 'track'
- sorts multiple tracks according to popularity and selects the most popular track to store in the database
- To access this endpoint, you must add an API key to complete the request via query parameter. (e.g. http://localhost:5000/tracks/GBAYE060147?apikey=qQG5jtHFEw7PylRBc9S53mtNyNzHKLZt) The API key in the parentheses was created to demonstrate an extra layer of security for demonstration purposes. Please use it to access this endpoint. You can refer to `./scripts/functions.js` to view the API key generation.
- The operation ID is `addTrackByISRC` and can be found in `./controller/track.controller.js`

*GET*
- Get a track through ISRC from the local database

-- 

`/artists/?name={query}`

*GET*
- This endpoint searches and retrieves artists that partially or exactly match artist `name` query parameter
- e.g. http://localhost:5000/artists/?name=van should return:
[
    {
        "id": 2,
        "artist_name": "Van Halen",
        "createdAt": "2021-08-23T14:42:49.000Z",
        "updatedAt": "2021-08-23T14:42:49.000Z"
    }
] 

-- 

`/artists/{id}`

*PUT*
Update an artist name. Simply specify the primary key id of the artist to be updated in the route parameter and a request body with the artist name.
Example request body:
{
    "artist_name": "The Who"
}

## Securing the API
Some things I would implement to secure the API in addition to the API key query parameter
- Adding a rate limit (https://www.npmjs.com/package/express-rate-limit)
- Adding backend security package like Helmet
- Specifically defining allowed origins in CORS
- Adding auth feature to authenticate and authorize users before allowing access to endpoints. This would remove the need for the API key query parameter
- Enabling HTTP only (prevent cross-script attacks)
https://app.swaggerhub.com/apis/jkim3360/spotifydb/1.0.0
