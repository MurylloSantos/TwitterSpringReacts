import React, { FC, memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Paper } from "@material-ui/core";

import { useTweetComponentStyles } from "./TweetComponentStyles";
import { selectUserDataId } from "../../store/ducks/user/selectors";
import TweetComponentActions from "../TweetComponentActions/TweetComponentActions";
import ShareTweetIconButton from "../ShareTweetIconButton/ShareTweetIconButton";
import VoteComponent from "../VoteComponent/VoteComponent";
import QuoteIconButton from "../QuoteIconButton/QuoteIconButton";
import Quote from "../Quote/Quote";
import { TweetResponse } from "../../types/tweet";
import { ReplyType } from "../../types/common";
import TweetDeleted from "../TweetDeleted/TweetDeleted";
import LikeIconButton from "./LikeIconButton/LikeIconButton";
import ReplyIconButton from "./ReplyIconButton/ReplyIconButton";
import AnalyticsIconButton from "./AnalyticsIconButton/AnalyticsIconButton";
import TweetMedia from "./TweetMedia/TweetMedia";
import TweetHeader from "./TweetHeader/TweetHeader";
import TweetAvatar from "./TweetAvatar/TweetAvatar";
import TweetReplyingUsername from "./TweetReplyingUsername/TweetReplyingUsername";
import TweetText from "./TweetText/TweetText";
import TweetImage from "./TweetImage/TweetImage";
import TweetReplyConversation from "./TweetReplyConversation/TweetReplyConversation";
import TweetActions from "./TweetActions/TweetActions";
import { DEFAULT_PROFILE_IMG } from "../../constants/url-constants";
import TweetListComponent from "../TweetListComponent/TweetListComponent";
import GifImage from "../GifImage/GifImage";

export interface TweetComponentProps {
    tweet?: TweetResponse;
    activeTab?: number;
    isTweetImageModal?: boolean;
}

const TweetComponent: FC<TweetComponentProps> = memo(({ tweet, activeTab, isTweetImageModal }): ReactElement => {
    const myProfileId = useSelector(selectUserDataId);
    const isUserCanReply = (tweet?.replyType === ReplyType.MENTION) && (myProfileId !== tweet?.author.id);
    const classes = useTweetComponentStyles({ isTweetImageModal });

    return (
        <Paper className={classes.container} variant="outlined">
            <TweetActions tweetId={tweet?.id} tweetType={tweet?.tweetType} activeTab={activeTab} />
            <div className={classes.tweetWrapper}>
                <TweetAvatar userId={tweet?.author.id} src={tweet?.author.avatar ?? DEFAULT_PROFILE_IMG} />
                <div className={classes.tweetContainer}>
                    <div className={classes.header}>
                        <TweetHeader
                            userId={tweet?.author.id}
                            fullName={tweet?.author.fullName}
                            username={tweet?.author.username}
                            isPrivateProfile={tweet?.author.isPrivateProfile}
                            dateTime={tweet!.createdAt}
                        />
                        <TweetComponentActions tweetId={tweet!.id} />
                    </div>
                    <div className={classes.tweetContent}>
                        {tweet?.addressedUsername && (
                            <TweetReplyingUsername
                                addressedId={tweet?.addressedId}
                                addressedUsername={tweet.addressedUsername}
                            />
                        )}
                        <TweetText text={tweet?.text} tweetId={tweet?.id} />
                        {(tweet?.images?.length !== 0) && (
                            <TweetImage
                                tweetId={tweet?.id}
                                imageSrc={tweet?.images?.[0].src}
                                imageDescription={tweet?.imageDescription}
                                taggedImageUsers={tweet?.taggedImageUsers}
                            />
                        )}
                        {tweet?.gifImage && <GifImage tweetId={tweet?.id} gifImage={tweet?.gifImage} withLink />}
                        {tweet?.poll && <VoteComponent tweetId={tweet?.id} poll={tweet?.poll} />}
                        {(tweet?.author.isFollower && tweet?.replyType === ReplyType.FOLLOW) && (
                            <TweetReplyConversation />
                        )}
                        {tweet?.quoteTweet && (
                            tweet?.quoteTweet.isDeleted ? (
                                <TweetDeleted />
                            ) : (
                                <Quote quoteTweet={tweet?.quoteTweet} />
                            ))
                        }
                        <TweetMedia
                            link={tweet?.link}
                            linkTitle={tweet?.linkTitle}
                            linkDescription={tweet?.linkDescription}
                            linkCover={tweet?.linkCover}
                            linkCoverSize={tweet?.linkCoverSize}
                        />
                        {tweet?.tweetList && <TweetListComponent tweetList={tweet.tweetList} />}
                    </div>
                    <div className={classes.footer}>
                        <ReplyIconButton
                            tweetId={tweet?.id}
                            text={tweet?.text}
                            image={tweet?.images?.[0]}
                            createdAt={tweet?.createdAt}
                            tweetAuthor={tweet?.author}
                            repliesCount={tweet?.repliesCount}
                            isUserCanReply={isUserCanReply}
                        />
                        <QuoteIconButton
                            tweetId={tweet?.id}
                            createdAt={tweet?.createdAt}
                            text={tweet?.text}
                            author={tweet?.author}
                            isTweetRetweeted={tweet?.isTweetRetweeted}
                            retweetsCount={tweet?.retweetsCount}
                        />
                        <LikeIconButton
                            tweetId={tweet?.id}
                            isTweetLiked={tweet?.isTweetLiked}
                            likesCount={tweet?.likesCount}
                        />
                        <ShareTweetIconButton tweetId={tweet!.id} />
                        {(myProfileId === tweet?.author.id) && (
                            <AnalyticsIconButton
                                tweetUserFullName={tweet?.author.fullName}
                                tweetUserName={tweet?.author.username}
                                tweetText={tweet?.text}
                                isUserCanReply={isUserCanReply}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Paper>
    );
});

export default TweetComponent;
