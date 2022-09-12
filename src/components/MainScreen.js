import * as React from 'react';
import { StyleSheet, Text, View, FlatList, Button ,TouchableOpacity} from "react-native";
import { Video, AVPlaybackStatus } from 'expo-av';
import axios from "axios";
import play from '../../assets/play.png'
import { formatTimeStampToDate } from '../timeStampToDate';
import { connect } from 'react-redux';
import {getVideosData} from '../redux/actions'


const VideoItem = React.forwardRef(({ url }, ref) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  React.useImperativeHandle(ref, () => ({
    full: () => {
      video.current.presentFullscreenPlayer();
    }
  }), [])

  const isVideoPlay =()=>{
    status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
  }

  return (
    <TouchableOpacity onPress={() => isVideoPlay()}>
     <Video
        ref={video}
        source={{uri: url}}
        style={styles.videoItemStyling}
        //usePoster= {true}
        posterSource= {play.toString()}
        posterStyle= {styles.posterStyling}
        useNativeControls
        resizeMode="stretch"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </TouchableOpacity>
      )
});

function MainScreen(props) {
  const videoRefs = React.useRef([]);

  React.useEffect(() => {
  axios.get('https://ucat-olp-test.medentry.edu.au/test')
  .then(response => {
    props.saveVideos(response.data);
  }, error => {
    console.log('Error***********************',error);
  });
  }, [])

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleTextStyle}>Classes Recording</Text>
      <FlatList
        data={props.videos}
        renderItem={({ item, index }) => (<View style={styles.videoListStyle}>
          <VideoItem ref={ref => videoRefs.current[index] = ref} url={item.url} />
          <Text style={styles.videoTitleStyle}>{item.title}</Text>
          <Text style={styles.dateText}>{formatTimeStampToDate(item.date, "DD MMMM, YYYY")}</Text>
        </View>)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer: {
  },
  titleTextStyle:{
    fontSize:18,
    textAlign:'center',
    fontWeight:'bold',
    marginVertical:20
  },
  videoListStyle:{
    flex:1,
    marginVertical:15,
    shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        
        elevation: 6
  },
  videoTitleStyle:{
    fontSize:16,fontWeight:'bold',marginVertical:5
  },
  dateText:{
    marginBottom:5,
    fontSize:14,
    fontWeight:'normal'
  },
  posterStyling:{
    width: 80,
    height: 80,
    position:'absolute',
    top:50,
    start:120
  },
  videoItemStyling:{
    width: 320,
    height: 180,
    borderRadius:8,
  }
  
});

const mapStateToProps = state => ({
  videos : state.videos
});
const mapDispatchToProps = dispatch => ({
  saveVideos: (videos) => dispatch(getVideosData(videos)),
  
 
});
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
