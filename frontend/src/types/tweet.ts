import { Image, LinkCoverSize, ReplyType, TweetType } from "./common";
import { TaggedUserResponse } from "./user";
import { TweetListResponse } from "./lists";

export interface TweetResponse {
    id: number;
    text: string;
    tweetType: TweetType;
    createdAt: string;
    scheduledDate: string;
    addressedUsername: string;
    addressedId: number;
    addressedTweetId: number;
    replyType: ReplyType;
    link: string;
    linkTitle: string;
    linkDescription: string;
    linkCover: string;
    linkCoverSize: LinkCoverSize;
    gifImage: GifImageResponse;
    author: UserTweetResponse;
    images: Image[];
    imageDescription: string;
    taggedImageUsers: TaggedUserResponse[];
    quoteTweet: QuoteTweetResponse;
    tweetList: TweetListResponse;
    poll: PollResponse;
    retweetsCount: number;
    likesCount: number;
    repliesCount: number;
    quotesCount: number;
    isDeleted: boolean;
    isTweetLiked: boolean;
    isTweetRetweeted: boolean;
    isUserFollowByOtherUser: boolean;
    isTweetDeleted: boolean;
    isTweetBookmarked: boolean;
}

export interface TweetAdditionalInfoResponse {
    text: string;
    replyType: ReplyType;
    addressedTweetId: number;
    isDeleted: boolean;
    author: {
        id: number;
        fullName: string;
        username: string;
        isFollower: boolean;
        isMyProfileBlocked: boolean;
        isUserBlocked: boolean;
        isUserMuted: boolean;
    };
}

export interface UserTweetResponse {
    id: number;
    fullName: string;
    username: string;
    avatar: string;
    pinnedTweetId: number;
    isPrivateProfile: boolean;
    isFollower: boolean;
    isMyProfileBlocked: boolean;
    isUserBlocked: boolean;
    isUserMuted: boolean;
}

export interface QuoteTweetResponse {
    id: number;
    text: string;
    createdAt: string;
    link: string;
    linkTitle: string;
    linkDescription: string;
    linkCover: string;
    linkCoverSize: string;
    isDeleted: boolean;
    author: UserTweetResponse;
}

export interface PollResponse {
    id: number;
    createdAt: string;
    pollChoices: PollChoiceResponse[];
}

export interface PollChoiceResponse {
    id: number;
    choice: string;
    votedUser: VotedUserResponse[];
}

export interface VotedUserResponse {
    id: number;
}

export interface TweetImageResponse {
    tweetId: number;
    imageId: number;
    src: string;
}

export interface GifImageResponse {
    id?: number;
    url: string;
    width: number;
    height: number;
}

export interface GiphyDataProps {
    id: string;
    title: string;
    images: {
        downsized: GifImageResponse;
        downsized_still: GifImageResponse;
    };
}

interface TweetsActionsPayload {
    userId: number;
    tweetId: number;
}

export interface FollowToTweetsPayload extends TweetsActionsPayload {
    isFollower: boolean;
}

export interface BlockedToTweetsPayload extends TweetsActionsPayload {
    isUserBlocked: boolean;
}

export interface MutedToTweetsPayload extends TweetsActionsPayload {
    isUserMuted: boolean;
}
