# React + Vite Project
This project is a React application built with Vite. It demonstrates various features and components, including lazy loading of components and images, fetching data from an API directly and via cache, and basic HTML structure.
## Installation
To install this project, clone the repository:
```
git clone https://github.com/saksham-malhotra-27/React_Optimization.git
```
and then install node packages, after going in the directory.
## Components
### App Component
The App component is the main entry point of the application. It lazy loads the CompText and Comp components using React's Suspense component.
Which also Uses Lazy loading of these components as well to optimize the performance.
### CompText Component
The CompText component fetches data from an API directly and via cache. It contains two buttons, one for fetching data directly from the API and another for fetching data via cache. It utilizes React's useEffect hook to manage side effects such as fetching data and updating the DOM.

### Comp Component
The Comp component displays images fetched directly and lazily. It demonstrates lazy loading of images using the Intersection Observer API. This component also utilizes React's useEffect hook for managing side effects related to fetching and rendering images.

## HTML File
The index.html file contains the basic HTML structure of the application. It includes a <nav> element for navigation and a <div> with the id all, where the React application is rendered.

## main File
The main.jsx file is the entry point of the React application. It renders the App component into the root HTML element with the id all.
