import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import ContextProvider from './ContextProvider';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import SideBar from './components/SideBar';
import TodoListScreen from './screens/TodoListScreen';
import DoneListScreen from './screens/DoneListScreen';
import AddTodoScreen from './screens/AddTodoScreen';
import EditTodoScreen from './screens/EditTodoScreen';

const App: React.FC = () => {
    return (
        <ContextProvider>
            <IonApp>
                <IonReactRouter>
                    <SideBar />
                    <IonRouterOutlet id="main-content">
                        <Route
                            path="/current"
                            component={TodoListScreen}
                            exact
                        />
                        <Route path="/done" component={DoneListScreen} exact />
                        <Route path="/add" component={AddTodoScreen} exact />
                        <Route
                            path="/edit/:title"
                            component={EditTodoScreen}
                            exact
                        />
                        <Route
                            exact
                            path="/"
                            render={() => <Redirect to="current" />}
                        />
                    </IonRouterOutlet>
                </IonReactRouter>
            </IonApp>
        </ContextProvider>
    );
};

export default App;
