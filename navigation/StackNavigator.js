import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Feed from './../screens/Feed';
import Comments from './../screens/Comments';

export const FeedNavigator = createAppContainer(
  createStackNavigator({
    Feed: {
      screen: Feed,
    },
    Comments: {
      screen: Comments,
    },
  }),
);
