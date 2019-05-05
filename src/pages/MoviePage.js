import React from 'react'
import { DeviceEventEmitter, View } from 'react-native'
import BaseFlatListComponent from '../components/BaseFlatListComponent'
import Banner from '../views/Banner'
import ListItem from '../views/ListItem'
import MainTabNavigatorHeader from '../views/MainTabNavigatorHeader'
// import data from '../../data.json'
// import config from '../../config.json'

export default class Movie extends BaseFlatListComponent {

    pageSize = 4;
    controllerLoadMore = false;
    _renderHeader() {
        return <MainTabNavigatorHeader
            onRightClick={() => {
                this.props.navigation.navigate('QueryMoreVideoPage',{id:1,title:'电影'})
            }}
            rightIcon={require('../../source/image/sx_icon.png')}
            navigation={this.props.navigation} />
    }

    getRequestAction(pageIndex, pageSize) {
        return fetch("http://10.240.176.145:10086/video_info?name=MoviePageData")
            .then((response) => {
                return response.json()       // json方式解析，如果是text就是 response.text()
            })
    }

    filterResponse(result) {
        return result.data.data;
    }

    renderFlatViewHeader = () => {
        return <Banner id={1} navigation={this.props.navigation}></Banner>
    }

    renderRow = rowData => {
        return (
            <ListItem navigation={this.props.navigation} data={rowData}></ListItem>
        );
    }
}
