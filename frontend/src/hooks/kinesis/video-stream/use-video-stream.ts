import { useEffect, useState } from "react";
import AWS from "aws-sdk";

const options = {
  // ON_DEMAND - media playlist is typically static for sessions, LIVE - media playlist is continually updated with new fragments for sessions
  PlaybackMode: "LIVE",
  // NEVER /ALWAYS
  DisplayFragmentTimestamp: "ALWAYS",
  // how much time link is valid in seconds, this value can be between 300 (5 minutes) and 43200 (12 hours).
  Expires: 600, // 10 min
  // FRAGMENTED_MP4 - container format packages the media into MP4 fragments, MPEG_TS - only supported packaging on older HLS players, has a 5-25 % consts more
  ContainerFormat: "FRAGMENTED_MP4",
  // ALWAYS - recommended to use if fragment timestamps are not accurate,and server timestamp is selected, NEVER - option for producer timestamp, ON_DISCONTINUITY - adviced option for most cases, media player timeline is only reset when there is a significant issue with the media timeline (e.g. a missing fragment)
  DiscontinuityMode: "ALWAYS",
  HLSFragmentSelector: {
    // PRODUCER_TIMESTAMP, SERVER_TIMESTAMP
    FragmentSelectorType: "SERVER_TIMESTAMP",
  },
};

const { VITE_AWS_REGION } = import.meta.env;

// create instance of kinesis video, pass AWS region as param
const kinesisVideo = new AWS.KinesisVideo({
  region: VITE_AWS_REGION,
});

type kvs = {
  url: any;
};

export const useKinesisHlsVideo = (streamName: string) => {
  const [hlsUrl, setHlsUrl] = useState<kvs>();

  useEffect(() => {
    getLiveStream(streamName).then((result) => setHlsUrl(result));
  }, []);

  return hlsUrl;
};

async function getLiveStream(streamName: string) {
  // creating video stream endpoint
  try {
    const endpointObject = await kinesisVideo
      .getDataEndpoint({
        StreamName: streamName,
        APIName: "GET_HLS_STREAMING_SESSION_URL",
      })
      .promise();

    if (endpointObject.DataEndpoint) {
      const data = {
        //get stream session url, url is valid from 5 min to 12 h. depending on hereabove options
        url: await getStreamSessionURL(
          endpointObject.DataEndpoint,
          streamName,
          options,
        ),
      };
      return data;
    } else {
      throw new Error("Cannot get the url");
    }
  } catch (err) {
    console.log(err);
  }
}

async function getStreamSessionURL(
  endpoint: any,
  streamName: string,
  options: any,
) {
  // https://docs.AWS.amazon.com/AWSJavaScriptSDK/latest/AWS/KinesisVideoArchivedMedia.html
  const kinesisVideoArchivedMedia = new AWS.KinesisVideoArchivedMedia({
    region: VITE_AWS_REGION,
    endpoint: new AWS.Endpoint(endpoint),
  });

  // get HLSS sourse of the stream as will use HLSS player. Other option is DASH - getDASHStreamingSessionURL
  const data = await kinesisVideoArchivedMedia
    .getHLSStreamingSessionURL({
      StreamName: streamName,
      ...options,
    })
    .promise();

  return data.HLSStreamingSessionURL;
}
