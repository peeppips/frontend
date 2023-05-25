
# PEEPPIPS OFFICIAL FRONTEND DOCUMENTATION
![Alt text](./images/official.png)

We, as developers, used React to build the frontend of our web application and integrated it with Firebase. By doing so, we were able to create an interactive user interface that seamlessly connected to the backend API and provided users with a smooth navigation experience based on their authorization levels. Throughout this process, we are transforming our application into a full-stack web application.

## Defining the skeleton application frontend
To enhance our base application, we added the following user interface components:

1. Home page: This view greeted users and served as the initial landing page when they accessed the root URL of the web application.
2. Sign-up page: This view contained a form that allowed new users to sign up and create a user account. Upon successful registration, users were redirected to the sign-in page.
3. Sign-in page: Existing users could sign in through this view, which presented them with a sign-in form. Upon successful authentication, users gained access to protected views and actions within the application.
4. User list page: This view fetched and displayed a list of all the users stored in the Firebase database. Additionally, it provided links to individual user profiles for further exploration.
5. Profile page: This component fetched and presented detailed information about an individual user. Only signed-in users could access this page, and it also included options for editing and deleting the user's own profile. The edit and delete functionalities were only visible when the signed-in user viewed their own profile.
6. Edit profile page: This view featured a form that retrieved the user's information and prefilled the form fields. Users could modify their information, and access to this form was restricted to logged-in users who wished to edit their own profiles.
7. Delete user component: This option allowed signed-in users to delete their own profiles after confirming their intent. This functionality was integrated within the Profile view.
8. Menu navigation bar: This component was present across all views and provided a centralized menu listing all available and relevant views to the user. It also helped indicate the user's current location within the application.

App.tsx will be the main React component. This contains all the other custom
React views in the application. Home, Signup, Signin, Users, Profile, and EditProfile
will render at individual routes declared with React Router, whereas the Menu
component will render across all these views. DeleteUser will be a part of the Profile
view

## Folder and file structure
The following folder structure shows the new folders and files to be added to the
skeleton project we started implementing in the previous chapter, in order to
complete it with a React frontend:

    | -- frontend/
        | --- assets/
            | ---- images/
        | --- src/
            | --- actions/
                | --- projectActions.tsx
                | --- userActions.tsx
            | --- components/
                | --- CardComponent.tsx
                | --- Footer.tsx
                | --- FormContainer.tsx
                | --- Header.tsx
                | --- Loader.tsx
                | --- Message.tsx
                | --- Meta.tsx
                | --- Sidebar.tsx
            | --- constants/
                | --- userConsants.tsx
                | --- projectConsants.tsx
                | --- referralConsants.tsx
                | --- userConsants.tsx
            | --- reducers/
                | ---- userReducer.tsx
                | ---- projectReducer.tsx
                | ---- referralReducer.tsx
                | ---- userReducer.tsx
            | --- screens/
                | --- HostBotScreen.tsx
                | --- LoginScreen.tsx
                | --- RegisterScreen.tsx
            | --- App.tsx
            | --- firebase.tsx
            | --- main.tsx
            | --- store.tsx
            | --- types.tsx
            | --- firebase.json
            | --- package.json

This file structure represents a typical frontend application using React. Each folder and file has a specific purpose:

    assets/: Contains static assets such as images used in the application.
    src/actions/: Contains action creators for different functionality (e.g., projects, users).
    src/components/: Contains reusable UI components used throughout the application.
    src/constants/: Holds constants related to different functionality (e.g., projects, users).
    src/reducers/: Contains reducers that handle state updates for different functionality.
    src/screens/: Contains screen components representing different pages/views in the application.
    src/App.tsx: Main component that renders the application and sets up routing.
    src/firebase.tsx: Configuration file for initializing Firebase services.
    src/main.tsx: Entry point for the application.
    src/store.tsx: Configures the Redux store for state management.
    src/types.tsx: Contains type definitions used throughout the application.
    src/firebase.json: Configuration file for
    src/package.json : Is a crucial part of a Node.js project. It contains metadata about the project, as well as the project's dependencies, scripts, and other configurations.
    

## Setup for development



The package.json file provided includes the project's dependencies and devDependencies. Here's a breakdown of the packages and their purposes:

### Dependencies:

1. @emotion/react and @emotion/styled: Emotion is a library for styling React components using CSS-in-JS.
2. @mui/material: Material-UI is a popular UI component library for React applications.
3. http-server: A simple command-line HTTP server for serving static files.
4. react and react-dom: React is a JavaScript library for building user interfaces.
5. react-redux: Official React bindings for Redux, a predictable state container for JavaScript apps.
5. react-router-bootstrap: Integrates React Router with React Bootstrap for navigation components.
6. react-router-dom: Provides routing and navigation functionalities for React applications.
7. redux: A predictable state container for JavaScript apps.
8. redux-devtools-extension: Enables the use of Redux DevTools browser extension for debugging Redux state changes.
9. redux-thunk: A middleware for Redux that allows asynchronous actions.

### DevDependencies:

1. @types/react and @types/react-dom: TypeScript type definitions for React and React DOM.
2. @types/react-helmet: TypeScript type definitions for React Helmet, a library for managing the document head in React.
3. @types/react-router-bootstrap: TypeScript type definitions for React Router Bootstrap.
4. @typescript-eslint/eslint-plugin and @typescript-eslint/parser: ESLint plugins and parser for TypeScript projects.
5. eslint: A pluggable linting utility for JavaScript and TypeScript.
6. eslint-plugin-react-hooks: ESLint plugin for enforcing React Hooks rules.
7. eslint-plugin-react-refresh: ESLint plugin for enabling React Fast Refresh in development.
8. file-loader: A file loader module for webpack.
9. typescript: A superset of JavaScript that adds static types to the language.
10. vite: A fast and opinionated build tool for modern web applications.
11. @vitejs/plugin-react: React plugin for Vite, an innovative web development build tool.

This package.json file suggests that the project is a React application using Redux for state management, React Router for routing, Material-UI for UI components, and TypeScript for static typing. It also includes various development tools and configurations for linting, type checking, and building the project.

Please note that the versions specified in the package.json file may be subject to change as new versions of the packages are released. It's important to regularly update the packages to ensure compatibility and security.
            
## Entry point at main.tsx
The src/main.txs file in the client folder will be the entry point to render the
complete React app, as already indicated in the client-side Webpack configuration
object.

    import ReactDOM from 'react-dom/client';
    import store from './store';
    import App from './App.tsx';

    import './styles/css2.css';
    import './styles/custom.css';
    import './styles/glightbox.css';
    import './styles/style.css';
    import './styles/tiny-slider.css';
    import './bootstrap.min.css';

    import { Provider } from 'react-redux';

    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <App />
    </Provider>
    );

In this script:

ReactDOM is imported from 'react-dom/client' to provide rendering capabilities.
The Redux store is imported from './store'. It's assumed that the store is properly configured and initialized.
The root component App is imported from './App.tsx'. It represents the top-level component of the application.
Several CSS stylesheets are imported. These stylesheets define the styling for various components and elements used in the application.
The Provider component from 'react-redux' is imported. It allows the Redux store to be accessible to all components in the component tree.
ReactDOM.createRoot is used to create a root-level component container and render the application.
The Provider component wraps the App component, providing access to the Redux store via the store prop.

## Adding a Routes to MainRouter in App.tsx

    import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
    import Header from './components/Header';
    import Footer from './components/Footer';
    import LoginScreen from './screens/LoginScreen';
    import RegisterScreen from './screens/RegisterScreen';
    import './App.css';
    import HostBotScreen from './screens/HostBotScreen';
    import NewProjectScreen from './screens/NewProjectScreen';

    function App() {
    return (
        <>
        <Router>
            <Header />
            <main className='py-3'>
            <Routes>
                <Route path='/' element={<LoginScreen />} />
                <Route path='/register' element={<RegisterScreen />} />
                <Route path='/host-bots' element={<HostBotScreen />} />
                <Route path='/my-project/new' element={<NewProjectScreen />} />
            </Routes>
            </main>
            <Footer />
        </Router>
        </>
    );
    }

        export default App;


The BrowserRouter component from react-router-dom is used to provide the routing functionality.
The Header component is rendered at the top of the application.
The main content is wrapped in a <main> element with a py-3 CSS class for styling.
Inside the <Routes> component, different routes are defined using the <Route> component.
The / route renders the LoginScreen component.
The /register route renders the RegisterScreen component.
The /host-bots route renders the HostBotScreen component.
The /my-project/new route renders the NewProjectScreen component.
The Footer component is rendered at the bottom of the application.

This structure allows for easy navigation between different screens based on the defined routes.


## Sreen Components
### Login Screen

Located at src/screens/LoginScreen.tsx

    const LoginScreen: React.FC = () => {

    // const [ contextHolder] = notification.useNotification();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector((state: RootState): UserLoginState => state.userLogin as UserLoginState);  
    
    // Destructure the properties with their types
    const { loading, error, userInfo } = userLogin;
    useEffect(() => {
        if (userInfo) {
        console.log(userInfo)
        
        }
    }, [userInfo]);

    // const openNotification = () => {
    //   api.open({
    //     message: 'Login Successfull',
    //     description:
    //       'Welcome To Our',
    //     className: 'custom-class',
    //     style: {
    //       width: 600,
    //     },
    //   });
    // };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        (dispatch as ThunkDispatch<any, any, AnyAction>)(login({ email, password }));
        // openNotification()

    };
    



    return (
    <>
    {/* {contextHolder} */}
    {userInfo ? (
    <Homescreen/>):
    (
        <FormContainer>
        <h1>Sign In</h1>


        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </Form.Group>

            <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </Form.Group>

            <Button type='submit' variant='primary'>
            Sign In
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
            New Customer?{' '}
            <Link to='/register'>
                Register
            </Link>
            </Col>
        </Row>
        </FormContainer>
    )};
    </>)
    };

    export default LoginScreen;

The component renders a sign-in form using react-bootstrap components.
The component utilizes React hooks such as useState and useEffect to manage state and side effects.
It uses the useDispatch and useSelector hooks from react-redux to dispatch actions and access the Redux store.
The submitHandler function handles the form submission and dispatches the login action.
The component conditionally renders a Message component for displaying errors and a Loader component for indicating loading state.
The component checks for userInfo in the Redux store and conditionally renders a Homescreen component when the user is logged

### Register Screen

Located at src/screens/RegisterScreen.tsx

    import React, { useState, useEffect } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import {  Row, Col } from 'react-bootstrap';
    import { useSelector } from 'react-redux';
    import Message from '../components/Message';
    import Loader from '../components/Loader';
    import FormContainer from '../components/FormContainer';
    import { RootState } from '../store';
    import StepComponent from '../components/StepComponent';
    import type { NotificationPlacement } from 'antd/es/notification/interface';
    import {notification } from 'antd';


    const RegisterScreen: React.FC = () => {
    const [api, contextHolder] = notification.useNotification();


    const [message, ] = useState<null | string>(null);

    const userRegister = useSelector((state: RootState) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const openErrorNotification = (placement: NotificationPlacement,description:String) => {
        api.info({
        message: `Error`,
        description,
        placement,
        });
    };
    if(error){
        openErrorNotification('topLeft', error);

    }
    const navigate = useNavigate();
    useEffect(() => {
        if (userInfo) {
        // document.location.href = '/';
        navigate("/")
        // history.push(redirect)
        }
    }, [userInfo]);


    return (
        <>
        {contextHolder}
        <FormContainer>
        <h1>Sign Up</h1>

        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

    <StepComponent/>


            <Row className='py-3'>
            <Col>
                Have an Account?{' '}
                <Link to={'/'}>
                Login
                </Link>
            </Col>
            </Row>
        </FormContainer>
        </>

        );
    };

    export default RegisterScreen;


This component is responsible for capturing and managing user details, including their first name, last name, email, password, and authentication status.The component starts by importing necessary dependencies such as React, Bootstrap, and Ant Design's notification module.Inside the component, there are several state variables defined using the useState hook. These variables include firstName, secondName, email, password, confirmPassword, and authEmail. They are initialized with values obtained from the userInfo object stored in the browser's local storage.The component also utilizes the notification module from Ant Design to display success and error notifications.The useEffect hook is used to populate the state variables with the values from userInfo when the component mounts.The component defines two functions: submitHandler and authenticate. The submitHandler function is triggered when the user submits the form. It checks if the entered passwords match and, if they do, saves the user details to the local storage and displays a success notification. If the passwords do not match, an error notification is displayed.

The authenticate function is called when the user clicks the "Authenticate Email" button. It is currently incomplete and presumably used for email authentication purposes.The component renders a form that allows the user to input their details. The form includes input fields for first name, last name, email, password, and confirm password. When the user clicks the "Authenticate Email" button, the authenticate function is called. If the email authentication is successful, the rest of the form fields become enabled, allowing the user to enter their details. Once all required fields are filled, the user can submit the form by clicking the submit button.Overall, the UserDetails component provides functionality for capturing and managing user details, including authentication. It utilizes various React hooks and external modules for form handling and displaying notifications.

### HomeScreen

Located at src/screens/HomeScreen.tsx

    const Homescreen = () => {
    const userLogin = useSelector((state: RootState) => state.userLogin);

    const { userInfo } = userLogin;


    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    return(
        <main>

        <Container className={styles.container}>

        <Modal title="Bot Details" open={isModalOpen}  onCancel={handleCancel}>
            <BotForm/>
        </Modal>
        
            <Grid container spacing={4}>
            
            
            {userInfo && <> {userInfo['isAdmin'] ? <> 
            <Grid item sm={12} xs={12} md={6}>
                    <Link to={'/research'}>
                    <Cardcomponent image={`https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/03/28214113/Types-of-Research-Design.jpg`} title={`Research`} description={`/research`}/>
                    </Link>
                </Grid>
                <Grid item sm={12} xs={12} md={6}>
                <Link to={'/business'}>
                    
                    <Cardcomponent image={`https://www.xero.com/content/dam/xero/pilot-images/guides/how-to-start-an-online-business-guide/htsob-guide-hero.1648510683285.png`} title={`Business`} description={`/business`}/>

                    </Link>
                </Grid>
            </>: <></>} </>}
            
                
                <Grid item sm={12} xs={12} md={6}>
                <Link to={'/free-bots'}> 
                <Cardcomponent image={`https://www.addtelegrammember.com/wp-content/webpc-passthru.php?src=https://www.addtelegrammember.com/wp-content/uploads/2020/12/Telegram-Bot-1200x600.jpg&nocache=1`} title={`Free Bots`} description={`/free-bots`}/>

                    </Link>
                </Grid>
                <Grid item sm={12} xs={12} md={6}>

                <Link to={'/newsletter'}> 
                <Cardcomponent image={`https://kinsta.com/wp-content/uploads/2021/12/newsletter-examples.png`} title={`Subscribe To Our NewsLetter`} description={`/newsletter`}/>

                    </Link>

                    </Grid>
                    <Grid item sm={12} xs={12} md={6}>
                    <Link to={'https://docs.google.com/forms/d/1BNnPyTXVw46JIhJoUNjq2wU07nYR6hRIrFV858xqweg/edit?usp=forms_home&ths=true'} target="_blank" rel="noopener noreferrer"> 
                <Cardcomponent image={`https://kinsta.com/wp-content/uploads/2021/12/newsletter-examples.png`} title={`I want you to create a trading bot for me`} description={`Fill the Form`}/>

                    </Link>
                    </Grid>

                    <Grid onClick={showModal} item sm={12} xs={12} md={6}>
                
                <Cardcomponent  image={`https://kinsta.com/wp-content/uploads/2021/12/newsletter-examples.png`} title={`I have a trading bot that I want you to host and to help me  resell (Host Bot)`} description={`Fill the Form`}/>
                
                </Grid>

            </Grid>


        </Container>
    </main>

    )
    }

 This component represents the main screen or homepage of your application. It displays various sections or cards that provide different functionalities or options to the user.The component starts by importing necessary dependencies such as React, Redux's useSelector hook, and the Modal component from the 'antd' library.Inside the component, the userLogin object is fetched from the Redux store using the useSelector hook. It extracts the userInfo property from the userLogin object.The component defines a state variable called isModalOpen using the useState hook. This variable manages the visibility of the modal component.

Two helper functions are defined: showModal and handleCancel. The showModal function is called to open the modal by setting the isModalOpen state to true, while the handleCancel function is used to close the modal by setting the isModalOpen state to false.The component's JSX code includes a <main> element and a <Container> component from the Material-UI library, which provides a grid system for layout purposes.Inside the container, a modal component is rendered using the Modal component from 'antd'. It displays the title "Bot Details" and includes a custom component called BotForm as its content. The modal is conditionally rendered based on the value of the isModalOpen state variable.Next, a <Grid> component is used to display a grid layout. Inside the grid, several <Cardcomponent> components are rendered. Each card represents a different section or option available to the user.

The cards are conditionally rendered based on the value of the userInfo object. If the userInfo is present and the user is an admin, additional cards related to research and business are rendered. Otherwise, only the "Free Bots" and "Subscribe To Our NewsLetter" cards are displayed.The cards are implemented using the Cardcomponent custom component. Each card has an image, title, and description, along with a link to a specific route or an external link.One of the cards has an onClick event attached to it, triggering the showModal function when clicked. This card is used to open the modal for capturing bot details.Overall, the Homescreen component provides a visually appealing and functional homepage for your application. It displays different sections or options based on the user's authentication status and role. The modal component adds an interactive element for capturing bot details.

## Components

### Header

    import { useDispatch, useSelector } from 'react-redux'
    import { LinkContainer } from 'react-router-bootstrap'
    import { Navbar, Nav, Container } from 'react-bootstrap'

    import { logout } from '../actions/userActions'
    import { RootState } from '../store';
    import { notification } from 'antd';

    const Header = () => {

    const [api] = notification.useNotification();

    const userLogin = useSelector((state: RootState) => state.userLogin);

    const { userInfo } = userLogin;

    const openNotification = () => {
        api.open({
        message: 'LogoOut Successfull',
        description:
            'See You Soon',
        className: 'custom-class',
        style: {
            width: 600,
        },
        });
    };

    const dispatch = useDispatch();
    const logoutHandler = () => {
        console.log('logout');
        dispatch(logout());
        openNotification()
    };

    return (
        <header>
        <Navbar  expand='lg' collapseOnSelect>
            <Container>
            <LinkContainer to='/'>
                <Navbar.Brand> peeppips ltd</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ml-auto'>
                
            
                
                {userInfo ? (
    <>



    <Nav.Link onClick={logoutHandler}>
    Log Out
    </Nav.Link>

                    </>
                ) : (
    <>


                    <LinkContainer to='/'>
                    <Nav.Link>
                        <i className='fas fa-user'></i> Sign In
                    </Nav.Link>
                    </LinkContainer>
                    </>
                )
            
                }


            
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        </header>
    )
    }

    export default Header


The component imports various dependencies such as React Redux's useDispatch and useSelector hooks, LinkContainer from 'react-router-bootstrap', and components from the 'react-bootstrap' library. It also imports the notification object from the 'antd' library for displaying notifications.

Inside the component, the useSelector hook is used to fetch the userLogin object from the Redux store. The userInfo property is extracted from the userLogin object.

The openNotification function is defined to display a notification using the api.open method from the notification object. This function is called when the user logs out successfully. The notification shows a message "Logout Successful" and a description "See You Soon".

The useDispatch hook is used to access the Redux store's dispatch function. The logoutHandler function dispatches the logout action, which triggers the logout process. After dispatching the action, the openNotification function is called to display the logout success notification.

The component's JSX code includes a <header> element and a <Navbar> component from 'react-bootstrap'. The <Navbar> component contains a <Container> component for layout purposes.

Inside the <Container>, a <LinkContainer> component wraps the application logo or brand name, which is rendered as a <Navbar.Brand>. Clicking on the brand name will navigate the user to the home route (/).

The <Navbar.Toggle> component and <Navbar.Collapse> component are used to create a responsive navigation menu that collapses on smaller screens.

Inside the <Navbar.Collapse>, a <Nav> component is used to contain the navigation links. The links are conditionally rendered based on the userInfo object. If the userInfo is present, it means the user is logged in, and a "Log Out" link is rendered. Clicking on this link triggers the logoutHandler function, which logs out the user and displays the logout success notification.

If the userInfo is not present, indicating that the user is not logged in, a "Sign In" link is rendered, which navigates the user to the home route (/) when clicked.

Overall, the Header component provides a responsive navigation header for your application. It displays different navigation options based on the user's authentication status. When the user logs out, a success notification is shown.


### Loader 

    import { Spinner } from 'react-bootstrap'

    const Loader = () => {
    return (
        <Spinner
        animation='border'
        role='status'
        style={{
            width: '100px',
            height: '100px',
            margin: 'auto',
            display: 'block',
        }}
        >
        <span className='sr-only'>Loading...</span>
        </Spinner>
    )
    }

    export default Loader

The provided code defines a React functional component called Loader. This component renders a spinning loader or spinner animation, typically used to indicate that content is being loaded or processed.

The component imports the Spinner component from the 'react-bootstrap' library.

Inside the component, the JSX code consists of a <Spinner> component with the following props:

animation='border': Specifies the type of animation for the spinner, which in this case is a border-based animation.

role='status': Specifies the role of the spinner for accessibility purposes.

style: An inline style object that sets the width, height, margin, and display properties of the spinner.

<span className='sr-only'>Loading...</span>: This is a visually hidden span element that provides an accessibility text for screen readers. It reads "Loading..." to inform users with visual impairments about the loading state.

When the Loader component is rendered, it displays the spinner animation in the center of its container. The spinner's appearance is controlled through the inline styles defined in the style prop.

This Loader component can be used in various parts of your application where loading indicators are needed, such as when fetching data from an API or when waiting for a time-consuming operation to complete. It provides a visual cue to users that some process is underway and helps improve the user experience by indicating that the application is not unresponsive.

### Message

    import React from 'react';
    import { Alert, AlertProps } from 'react-bootstrap';

    interface MessageProps {
    variant?: AlertProps['variant'];
    children: React.ReactNode;
    }

    const Message: React.FC<MessageProps> = ({ variant = 'info', children }) => {
    return <Alert variant={variant}>{children}</Alert>;
    };

    export default Message;


The provided code defines a React functional component called Message. This component is a wrapper around the Alert component from the 'react-bootstrap' library and provides a convenient way to display different types of messages or alerts.

The component imports the Alert component and defines an interface called MessageProps to specify the prop types expected by the Message component.

The Message component is a functional component defined using the arrow function syntax and accepts the following props:

variant?: AlertProps['variant']: An optional prop that specifies the variant of the alert, such as "info", "success", "warning", or "danger". This prop is passed to the variant prop of the underlying Alert component. If no variant is provided, it defaults to "info".

children: React.ReactNode: The content of the message or alert, which can be any valid React node.

Inside the component, the JSX code consists of a single Alert component, where the variant prop is set to the value of the variant prop received from the component's props. The children prop is passed as the content of the Alert component, which represents the actual message or alert text.

By using the Message component, you can easily display different types of messages or alerts by specifying the desired variant and providing the content as children. This component helps to standardize the appearance of messages throughout your application and provides a reusable way to show informative, success, warning, or error messages to the users.

### Meta

    import React from 'react';
    import { HelmetProps } from 'react-helmet';
    import { Helmet } from 'react-helmet';

    interface MetaProps extends HelmetProps {
    title?: string;
    description?: string;
    keywords?: string;
    }

    const Meta: React.FC<MetaProps> = ({
    title = 'Welcome To Peeppips',
    description = 'We create bots',
    keywords = 'peeppips',
    }) => {
    return (
        <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keyword' content={keywords} />
        </Helmet>
    );
    };

    export default Meta;


 This component is a wrapper around the Helmet component from the 'react-helmet' library and provides an easy way to manage the metadata (title, description, keywords) for a web page.

The component imports the Helmet component and defines an interface called MetaProps to specify the prop types expected by the Meta component. The Meta component is a functional component defined using the arrow function syntax.

The Meta component accepts the following props:

title?: string: An optional prop that specifies the title of the web page. If no title is provided, it defaults to 'Welcome To Peeppips'.

description?: string: An optional prop that specifies the description of the web page. If no description is provided, it defaults to 'We create bots'.

keywords?: string: An optional prop that specifies the keywords for the web page. If no keywords are provided, it defaults to 'peeppips'.

Inside the component, the JSX code consists of a Helmet component, where the title prop is set to the value of the title prop received from the component's props. The meta tags are used to set the description and keywords for the web page. The name attribute is set to 'description' or 'keyword' accordingly, and the content attribute is set to the respective values received from the component's props.

By using the Meta component, you can easily manage the metadata for different pages in your application. You can specify custom titles, descriptions, and keywords for each page by passing the respective props to the Meta component. This component helps improve SEO (Search Engine Optimization) and provides a standardized way to set metadata for your web pages.