import { createBrowserRouter } from 'react-router-dom';
import Homepage from "./pages/Homepage";

export default createBrowserRouter ([
    {
        path: '/',
        element: <Homepage />
    }
])