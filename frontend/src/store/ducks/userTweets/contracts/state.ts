import { TweetResponse } from "../../../../types/tweet";
import { LoadingStatus } from "../../../../types/common";

export interface UserTweetsState {
    items: TweetResponse[];
    pagesCount: number;
    loadingState: LoadingStatus;
    pinnedTweetLoadingState: LoadingStatus;
}

export interface BookmarkedTweetPayload {
    tweetId: number;
    isTweetBookmarked: boolean;
}

export interface UserTweetRequest {
    userId: string;
    page: number;
}

export interface UserPinnedTweetRequest {
    userId: string;
}
