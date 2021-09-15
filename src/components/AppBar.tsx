import React from 'react';
import {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonIcon,
    IonButton,
    IonTitle,
    IonMenuButton,
} from '@ionic/react';
import { addSharp, arrowBackSharp } from 'ionicons/icons';

import useStackNavigation from '../hooks/useStackNavigation';
import { useHistory } from 'react-router-dom';

const AppBar = ({ goBack = false }: { goBack?: boolean }) => {
    const navigateTo = useStackNavigation();
    const history = useHistory();
    return (
        <IonHeader>
            <IonToolbar color="primary">
                <IonButtons slot="start">
                    {goBack ? (
                        <IonButton onClick={() => history.goBack()}>
                            <IonIcon slot="icon-only" icon={arrowBackSharp} />
                        </IonButton>
                    ) : (
                        <IonMenuButton />
                    )}
                </IonButtons>
                <IonButtons slot="primary">
                    <IonButton onClick={() => navigateTo('/add')}>
                        <IonIcon slot="icon-only" icon={addSharp} />
                    </IonButton>
                </IonButtons>
                <IonTitle className="ion-text-left">TODOLIST</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default AppBar;
