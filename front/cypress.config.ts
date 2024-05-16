import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/',
  },
  chromeWebSecurity: false,
  projectId: 'wwcvzz',
  env: {
    jwtToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIzNDU4NzgzODI4Iiwic3ViIjoiYWNjZXNzVG9rZW4iLCJpYXQiOjE3MTQ2MzY5MjQsImV4cCI6MTcxNzIyODkyNH0.88Z91GZEPLlCzwPFfVVzD-mezasMF-tnG6gYsH2iAF8",
  },
})
