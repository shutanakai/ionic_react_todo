import React, { useContext, useState } from 'react';
import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonText,
    IonInput,
    IonCol,
    IonToast,
} from '@ionic/react';

import { ListContext, StatusContext } from '../ContextProvider';
import AppBar from './AppBar';
import useStackNavigation from '../hooks/useStackNavigation';

const Editor = ({
    name,
    item,
}: {
    name: string;
    item?: { title: string; isCompleted: boolean };
}) => {
    const navigateTo = useStackNavigation();
    const initialError = {
        state: false,
        statement: '',
    };

    const initialValue = item ? item.title : '';

    const [inputValue, setInputValue] = useState(initialValue);
    const [hasError, setHasError] = useState(initialError);

    const { list, setList } = useContext(ListContext);
    const { setStatus } = useContext(StatusContext);

    const sameTitleError = () => {
        setHasError({
            state: true,
            statement:
                '同じTODOは追加できません(完了済みからも削除してください)',
        });
        setTimeout(
            () =>
                setHasError({
                    state: false,
                    statement: '',
                }),
            4000
        );
    };

    const emptyTitleError = () => {
        setHasError({
            state: true,
            statement: 'TODOが設定されていません',
        });
        setTimeout(
            () =>
                setHasError({
                    state: false,
                    statement: '',
                }),
            4000
        );
    };

    const doProcess = (
        title: string,
        e: React.KeyboardEvent<HTMLIonInputElement>
    ) => {
        if (e.key === 'Enter') {
            const hasSameTitle = list.some(
                (l: { title: string; isCompleted: boolean }) =>
                    l.title === title
            );
            const isEmptyTitile = title === '';
            if (!hasSameTitle && !isEmptyTitile) {
                item ? editTodo(title) : addTodo(title);
                setStatus(
                    item
                        ? {
                              state: true,
                              statement: 'TODOが編集されました',
                          }
                        : {
                              state: true,
                              statement: 'TODOが追加されました',
                          }
                );
                setInputValue('');
                console.log('test');
                navigateTo('/current');
            } else if (hasSameTitle) {
                console.log('hasSameTitle');
                sameTitleError();
            } else if (isEmptyTitile) {
                console.log('isEmptyTitle');
                emptyTitleError();
            }
        }
    };

    const addTodo = (title: string) => {
        setList([
            ...list,
            {
                title: title,
                isCompleted: false,
            },
        ]);
    };

    const editTodo = (title: string) => {
        const tempList = list.slice();
        const index = tempList.findIndex((l) => l.title === item!.title);
        tempList[index].title = title;
        setList(tempList);
    };

    return (
        <IonPage>
            <AppBar goBack={true} />
            <IonContent>
                <IonToast
                    position="top"
                    isOpen={hasError.state}
                    message={hasError.statement}
                    color="danger"
                    buttons={[
                        {
                            text: '閉じる',
                            handler: () =>
                                setHasError({ state: false, statement: '' }),
                        },
                    ]}
                />
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonText>
                                <h2>{name}</h2>
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonInput
                                onKeyDown={(e) => {
                                    doProcess(inputValue, e);
                                }}
                                onIonChange={(e) =>
                                    setInputValue(e.detail.value!)
                                }
                                value={inputValue}
                                placeholder="Todoを追加"
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Editor;
