import { SAVE_VIDEO_LIST } from "./types";

export function getVideosData (videos) {
    return{
        type : SAVE_VIDEO_LIST,
        payload: videos
    }

}