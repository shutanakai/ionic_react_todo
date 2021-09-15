import { useContext } from 'react';
import { NavContext } from '@ionic/react';

//Hook to encapsulate navigation context
const useContextNavigation = () => {
    const navigation = useContext(NavContext);

    return navigation;
};

const useStackNavigation = () => {
    let stack = ['/current'];
    const navigation = useContextNavigation();

    function navigateTo(screen: string) {
        const indexOfScreenOnStack = stack.indexOf(screen);
        if (indexOfScreenOnStack !== -1) {
            // if (indexOfScreenOnStack === stack.length - 1) {
            //     return;
            // }

            stack = stack.slice(0, indexOfScreenOnStack);
            navigation.navigate(screen, 'back');
        } else {
            navigation.navigate(screen, 'forward');
        }
        stack.push(screen);
    }

    return navigateTo;
};

export default useStackNavigation;
