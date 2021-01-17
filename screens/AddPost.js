import React, {Component, useState} from 'react';
import {Image, View, TouchableOpacity, Dimensions} from 'react-native';
import {Text, Avatar, withStyles, List, Icon} from 'react-native-ui-kitten';
import {connect} from 'react-redux';

class AddPost extends Component {
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
            <Bk current={item} bookmarks={this.props.bk} />
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
        <TouchableOpacity style={{marginLeft: 5}}>
          <Text
            category="p2"
            style={{
              ...this.props.themedStyle.cardTitle,
              fontWeight: 'bold',
              color: 'grey',
            }}>
            View all comments
          </Text>
        </TouchableOpacity>
      </View>
    );
    const Bk = ({current, bookmarks, addBk}) => {
      const ids = bookmarks.map(({id}) => id);
      return (
        <TouchableOpacity>
          <Icon
            name={
              ids.indexOf(current.id) > -1 ? 'bookmark' : 'bookmark-outline'
            }
            width={25}
            height={25}
            fill={'#111'}
          />
        </TouchableOpacity>
      );
    };
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
      return (
        <Text category="p2" style={{flex: 1}}>
          {title}
        </Text>
      );
    };
    return (
      <List
        style={this.props.themedStyle.container}
        data={this.props.bk}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bk: state.bookmarkReducer.bookmark,
  };
};
AddPost = withStyles(AddPost, (theme) => ({
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

export default connect(mapStateToProps, null)(AddPost);
