import { createServer } from 'http'; // Import the http module

// Create a server object
const server = createServer((request, response) => {
    console.log(request.method); // Log the request method

    response.writeHead(200, {'Content-Type': 'text/html'}); // Set the response HTTP header with HTTP status and Content type
    response.write('<h1>Hello World!</h1>'); // Write the response to the client
    response.end(); // End the response
});

server.listen(8000, () => { // The server object listens on port 8000
    console.log('Server is running on http://localhost:8000');
});
