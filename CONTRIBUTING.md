# Contributing

You should look at the `src` folder an you'll understand everything


# Responses

We use HTTP status codes to respond to the client.

## Most used responses

### 200: OK

If everything is OK, then you get: `{ statusCode: 200 }`.

### 417: Expectation Failed

If the routers wants some parameters and the client doesn't sent them, then you
will probably get something like this:
`{ statusCode: 417, requirement: 'example' }`.

### 404: Not Found

If something that you're looking for doesn't exist on the database or somewhere
else, you'll get this response: `{ statusCode: 404, entity: 'example' }` and the
entity is the thing that doesn't exist.

### 520: Unknown Error

If the server doesn't know specifically what the error is, you'll get this
error. **Note:** you will always get an error with this status code.
For example: `{ statusCode: 520, error: 'Unable to do something.' }`.
And you, as the client, should send this error to the developers of this
project. They will check this and fix it.

### 498: Invalid Token

When the client tries to log in, but the token is wrong.
For example: `{ statusCode: 498, entity: 'code' }`.

### 429: Too Many Requests

When the user sends too many requests in a short period of time.
For example, if you consider social networking applications like Telegram,
they will only allow you to submit the code for 5 times. For more than 5,
the client must wait for some hours to send the request again.

### 422: Unprocessable Entity

When the parameters sent by the client are not valid. Suppose the client sends
something with an email, and email is like this: `test@example`. It's obviously
wrong, so after the validation process in the server, the server will respond
like this: `{ statusCode: 422, entity: 'email' }`.
