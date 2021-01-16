import React, {Component, useState} from 'react';
import {Image, View, TouchableOpacity, Dimensions} from 'react-native';
import {Text, Avatar, withStyles, List, Icon} from 'react-native-ui-kitten';
import axios from 'axios';
const Header = () => (
  <View
    style={{justifyContent: 'space-between', flex: 1, flexDirection: 'row'}}>
    <Icon name="camera-outline" width={30} height={30} fill={'#111'} />
    <Image source={require('./i.png')} style={{width: 100, height: 30}} />
    <Icon name="message-circle-outline" width={30} height={30} fill={'#111'} />
  </View>
);
class Feed extends Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: <Header />,
  };
  state = {
    DATA: [],
  };
  componentDidMount() {
    this.endReached();
  }
  endReached() {
    if (this.state.DATA.length < 30)
      axios
        .get(
          `https://hiit.ria.rocks/videos_api/cdn/com.rstream.crafts?versionCode=40&lurl=Canvas%20painting%20ideas`,
        )
        .then((res) => {
          const DATA = res.data;
          this.setState({DATA: DATA.concat(DATA).splice(0, 30)});
        });
  }
  render() {
    const renderItem = ({item}) => (
      <View style={this.props.themedStyle.card}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile')}>
            <Avatar
              source={{uri: item['low thumbnail']}}
              size="small"
              style={{...this.props.themedStyle.cardAvatar, marginLeft: 5}}
            />
          </TouchableOpacity>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{...this.props.themedStyle.cardTitle, fontWeight: 'bold'}}>
              {item.channelname}
            </Text>
          </View>
          <View
            style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
            <Icon
              name="more-vertical-outline"
              width={15}
              height={15}
              fill={'#111'}
            />
          </View>
        </View>
        <ImageFn uri={item['high thumbnail']} />
        <View
          style={{flex: 1, flexDirection: 'row', marginLeft: 5, marginTop: 5}}>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.3,
            }}>
            <Icon
              name="heart-outline"
              width={25}
              height={25}
              fill={'#111'}
              style={{marginRight: 15}}
            />
            <Icon
              name="message-circle-outline"
              width={25}
              height={25}
              fill={'#111'}
              style={{marginRight: 12}}
            />
            <Icon
              name="navigation-2-outline"
              width={25}
              height={25}
              fill={'#111'}
            />
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
            <Icon
              name="bookmark-outline"
              width={25}
              height={25}
              fill={'#111'}
            />
          </View>
        </View>

        <View
          style={{
            margin: 5,
            flexDirection: 'row',
            flex: 1,
          }}>
          <View
            style={{justifyContent: 'center', flexDirection: 'row', flex: 1}}>
            <Text
              style={{...this.props.themedStyle.cardTitle, fontWeight: 'bold'}}>
              {item.channelname + ' '}
            </Text>
            {<Status title={item.title} />}
          </View>
        </View>
      </View>
    );
    return (
      <List
        style={this.props.themedStyle.container}
        onEndReached={() => this.endReached()}
        onEndReachedThreshold={0.7}
        data={this.state.DATA}
        renderItem={renderItem}
        keyExtractor={this.state.DATA.id}
      />
    );
  }
}
const ImageFn = ({uri}) => {
  const [aspect, setH] = useState(1);
  Image.getSize(uri, (width, height) => {
    setH(width / height);
  });
  return (
    <Image
      source={{uri}}
      style={{flex: 1, aspectRatio: aspect, backgroundColor: 'lightgrey'}}
      resizeMode={'contain'}
    />
  );
};
const Status = ({title}) => {
  const [more, setMore] = useState(false);
  if (title.length > 50 && !more)
    return (
      <Text category="p2" style={{flex: 1, flexWrap: 'wrap'}}>
        {title.slice(0, 50)}{' '}
        <Text
          style={{color: 'grey'}}
          onPress={() => setMore(true)}
          category="p2">
          more
        </Text>
      </Text>
    );
  else
    return (
      <Text category="p2" style={{flex: 1}}>
        {title}
      </Text>
    );
};
export default Feed = withStyles(Feed, (theme) => ({
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
