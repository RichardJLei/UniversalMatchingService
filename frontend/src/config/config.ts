export const config = {
    firebase: {
        apiKey: "your-api-key",
        authDomain: "your-project.firebaseapp.com",
        projectId: "your-project-id",
        storageBucket: "your-project.appspot.com",
        messagingSenderId: "your-messaging-sender-id",
        appId: "your-app-id"
    },
    apiUrl: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000'
        : 'https://your-production-api.com'
}; 