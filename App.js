import React, {Fragment} from 'react';
import {mapping, light as lightTheme} from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from 'react-native-ui-kitten';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import TabNavigator from './navigation/TabNavigator';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store';
import {Provider} from 'react-redux';

const App = () => (
  <Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TabNavigator />
        </PersistGate>
      </Provider>
    </ApplicationProvider>
  </Fragment>
);

export default App;
