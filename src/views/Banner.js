import React from 'react'
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import BaseComponent from '../components/BaseComponent'
import Swiper from 'react-native-swiper'
import Colors from '../utils/Colors'

import data from '../../data.json'
import config from '../../config.json'

const finalStyle = { width: DEVICE.width, height: DEVICE.width * 0.5 };

//this.props.id 0推荐 1电影 2电视剧 3动漫 4综艺
export default class Banner extends BaseComponent {

    containerStyle = finalStyle;

    state = {
        datas: [],
        classDatas: []
    }

    filterData(data) {
        //过滤掉广告轮播
        return data.filter(item => {
            return item.targetType === 2 && item.videoInfoId !== 0;
        })
    }

    initData() {
        // setTimeout(() => {
        //     let result = this.props.id === 0 ? data.RecommendBannerData : (
        //         this.props.id === 1 ? data.MovieBannerData : (
        //             this.props.id === 2 ? data.TVBannerData : (
        //                 this.props.id === 3 ? data.CartoonBannerData : data.VarietyBannerData
        //             )
        //         )
        //     );
        //     console.log(1,result.data);
        //     this.setState({
        //         datas: this.filterData(result.data)
        //     }, () => this.update(this.LOAD_SUCCESS))
        // }, config.delayed);
        // console.log(9999999999);
        let result = this.props.id === 0 ? "RecommendBannerData" : (
        this.props.id === 1 ? "MovieBannerData" : (
          this.props.id === 2 ? "TVBannerData" : (
            this.props.id === 3 ? "CartoonBannerData" : "VarietyBannerData"
          )
        ));
        let url = "http://10.240.176.145:10086/video_info?name="+result;
        console.log(url);
        fetch(url)
            .then((response) => {
              return response.json()       // json方式解析，如果是text就是 response.text()
            })
            .then((responseData) => {   // 获取到的数据处理
                  // const data = responseData.json();
                  // console.log(1,responseData.data.data);
              this.setState({
                datas: this.filterData(responseData.data.data)
              }, () => this.update(this.LOAD_SUCCESS))
                })
            .catch((error) => {     // 错误处理
                })
            .done();
    }

    _enterVideoInfo = data => {
        data.coverUrl = data.thumbnailUrl;
        console.log(456,data);
        this.props.navigation.navigate("VideoInfoPage", { data })
    }

    renderComponent() {
        let items = [];
        for (let i = 0; i < this.state.datas.length; i++) {
            let obj = this.state.datas[i];
            let image = obj.thumbnailUrl ? { uri: obj.thumbnailUrl } : require('../../source/image/nor.png');
            // console.log(image);
            let item = (
                <TouchableOpacity
                    key={'banner' + i}
                    onPress={() => this._enterVideoInfo(obj)}
                    activeOpacity={1}>
                    <Image style={finalStyle} source={image} resizeMode="cover"/>
                    <View style={{ position: 'absolute', bottom: 0, paddingBottom: 25, paddingTop: 5, paddingLeft: 5, width: '100%', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        <Text
                            numberOfLines={1}
                            style={{ color: 'white', fontWeight: '400', fontSize: 15 }}>{obj.title}</Text>
                    </View>
                </TouchableOpacity>
            );
            items.push(item)
        }
        return (
            <Swiper
                removeClippedSubviews={DEVICE.android ? true : false}
                paginationStyle={{ bottom: 10, justifyContent: 'flex-end', paddingRight: 5 }}
                style={finalStyle}
                width={finalStyle.width}
                height={finalStyle.height}
                loop={true}
                activeDotColor={Colors.mainColor}
                dotColor="white"
                autoplay={true}
                showsPagination={true}>
                {items}
            </Swiper>
        );
    }
}
