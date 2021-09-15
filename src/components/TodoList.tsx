import React, { useContext, useState, useEffect } from 'react';
import {
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonCheckbox,
    IonIcon,
    useIonAlert,
    IonPage,
    IonContent,
    IonToast,
} from '@ionic/react';
import { createSharp, trashSharp } from 'ionicons/icons';

import { ListContext, StatusContext } from '../ContextProvider';
import AppBar from './AppBar';
import useStackNavigation from '../hooks/useStackNavigation';

interface CurrentList {
    title: string;
    isCompleted: boolean;
}

interface TodoListProps {
    completedFlag: boolean;
    name: string;
}

const TodoList = ({ completedFlag, name }: TodoListProps) => {
    const { list, setList } = useContext(ListContext);
    const { status, setStatus } = useContext(StatusContext);
    const [currentList, setCurrentList] = useState<CurrentList[]>([]);
    const [present] = useIonAlert();
    const navigateTo = useStackNavigation();

    useEffect(() => {
        const targetList = list.filter((l) => l.isCompleted === completedFlag);
        setCurrentList(targetList);
    }, [list, completedFlag]);

    const handleDelete = (title: string) => {
        const tempList = list.filter((item) => item.title !== title);
        setList(tempList);
        setStatus({
            state: true,
            statement: `${title}を削除しました`,
        });
    };

    const handleStatusChange = (title: string) => {
        const tempList = list.map((item) => {
            return item.title !== title
                ? item
                : {
                      ...item,
                      isCompleted: !item.isCompleted,
                  };
        });
        setList(tempList);
    };

    return (
        <>
            <IonPage>
                <AppBar />
                <IonContent>
                    <IonToast
                        position="top"
                        isOpen={status.state}
                        message={status.statement}
                        color="success"
                        buttons={[
                            {
                                text: '閉じる',
                                handler: () =>
                                    setStatus({
                                        state: false,
                                        statement: '',
                                    }),
                            },
                        ]}
                    />

                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonText color="primary">
                                    <h2>{name}</h2>
                                </IonText>
                            </IonCol>
                        </IonRow>

                        {currentList.length > 0 ? (
                            currentList.map(
                                (
                                    item: {
                                        title: string;
                                        isCompleted: boolean;
                                    },
                                    itemIndex
                                ) => (
                                    <IonRow
                                        key={item.title + itemIndex.toString()}
                                        className="ion-justify-content-between"
                                    >
                                        <IonCol>
                                            <IonCheckbox
                                                checked={item.isCompleted}
                                                onIonChange={() =>
                                                    handleStatusChange(
                                                        item.title
                                                    )
                                                }
                                                value={item.title}
                                            />
                                            <IonText>{item.title}</IonText>
                                        </IonCol>
                                        <IonCol size="4">
                                            {!completedFlag && (
                                                <button
                                                    onClick={() =>
                                                        navigateTo(
                                                            `/edit/${item.title}`
                                                        )
                                                    }
                                                >
                                                    <IonIcon
                                                        icon={createSharp}
                                                    />
                                                </button>
                                            )}
                                            <button
                                                onClick={() =>
                                                    present({
                                                        header: '削除します',
                                                        message: `${item.title}を削除してよろしいでしょうか`,
                                                        buttons: [
                                                            'キャンセル',
                                                            {
                                                                text: 'OK',
                                                                handler: () =>
                                                                    handleDelete(
                                                                        item.title
                                                                    ),
                                                            },
                                                        ],
                                                    })
                                                }
                                            >
                                                <IonIcon icon={trashSharp} />
                                            </button>
                                        </IonCol>
                                    </IonRow>
                                )
                            )
                        ) : (
                            <IonCol>
                                <IonText>対象のTODOがありません</IonText>
                            </IonCol>
                        )}
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    );
};

export default TodoList;
