import React, {Component} from 'react';
import {View} from 'react-native';
import {Text, Layout, List, withStyles, Avatar} from 'react-native-ui-kitten';
import axios from 'axios';

class Comments extends Component {
  state = {
    DATA: [],
  };
  componentDidMount() {
    this.endReached();
  }
  endReached() {
    axios.get(`http://cookbookrecipes.in/test.php`).then((res) => {
      const DATA = res.data;
      this.setState({DATA: DATA.concat(DATA)});
    });
  }
  render() {
    const renderItem = ({item}) => (
      <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 10}}>
        <Avatar
          source={{
            uri:
              'https://media-exp1.licdn.com/dms/image/C510BAQHwFXNBL8UrlA/company-logo_200_200/0/1557710294482?e=2159024400&v=beta&t=trmBkHVDIJY9NMuFhutBPQYKN7uCZxBpPwfgk67Xeyc',
          }}
          size="small"
          style={{...this.props.themedStyle.cardAvatar, marginLeft: 5}}
        />
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{...this.props.themedStyle.cardTitle, fontWeight: 'bold'}}>
            {item.username}
          </Text>
        </View>
        <View style={{justifyContent: 'center', flex: 1}}>
          <Text category="p2">
            {'   '}
            {item.comments}
          </Text>
        </View>
      </View>
    );
    return (
      <List
        style={this.props.themedStyle.container}
        data={this.state.DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
  }
}

export default Comments = withStyles(Comments, (theme) => ({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: theme['color-basic-100'],
    marginBottom: 25,
  },
  cardImage: {
    width: '100%',
    height: 300,
  },
  cardHeader: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: theme['color-basic-1000'],
  },
  cardAvatar: {
    marginRight: 16,
  },
  cardContent: {
    padding: 10,
    borderWidth: 0.25,
    borderColor: theme['color-basic-600'],
  },
}));
