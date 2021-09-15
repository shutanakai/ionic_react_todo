import React from 'react';
import {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
} from '@ionic/react';

const SideBar: React.FC = () => {
    return (
        <IonMenu side="start" contentId="main-content">
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem
                        button
                        routerLink={'/current'}
                        routerDirection="none"
                    >
                        <IonLabel>現在のTODO</IonLabel>
                    </IonItem>
                    <IonItem button routerLink={'/done'} routerDirection="none">
                        <IonLabel>完了済のTODO</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default SideBar;
