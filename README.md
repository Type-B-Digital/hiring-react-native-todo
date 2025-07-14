<<<<<<< HEAD

# tasked - React Native TODO App

A simple TODO list app built with React Native.

# Features

- View list of TODOs
- Add new TODO
- Edit TODO title by long-pressing
- Toggle completed state
- Delete TODO item
- Light & dark mode toggle
- Data persisted locally on device (AsyncStorage)

# Local Persistence

Used AsyncStorage for local storage:

- Simple key-value store, easy to integrate in React Native.
- Suitable for small datasets like TODO lists.

##

- Not ideal for large datasets or complex queries.
- But for a TODO app, it’s fast, lightweight and perfect.

## State Management

Managed with React’s built-in:

- `useState` & `useEffect` hooks for local component state.
- No Redux needed — keeps code simple & easy to maintain.

## How to Run the App

npm install
npx react-native run-android

## Demo Video

https://drive.google.com/file/d/16YOCx1T7COc9EZRRuzUxhS3VpnlVA-9z/view?usp=sharing
