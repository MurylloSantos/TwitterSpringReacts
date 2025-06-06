import React from "react";
import ReactRouter from "react-router";
import Tab from "@material-ui/core/Tab";
import InfiniteScroll from "react-infinite-scroll-component";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { UserTweetsActionType } from "../../../../store/ducks/userTweets/contracts/actionTypes";
import UserTweets from "../UserTweets";
import { mockTweets } from "../../../../util/test-utils/mock-test-data";
import Spinner from "../../../../components/Spinner/Spinner";
import TweetComponent from "../../../../components/TweetComponent/TweetComponent";

window.scrollTo = jest.fn();

describe("UserTweets", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    const mockWithTweets = {
        ...mockRootState,
        userTweets: { ...mockRootState.userTweets, items: mockTweets, pagesCount: 10 }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ userId: "2" });
    });

    it("should click tweet Tab and fetch user tweets", () => {
        testClickTab(0, "Tweets", UserTweetsActionType.FETCH_TWEETS);
    });

    it("should click tweet Tab and fetch user tweets", () => {
        testClickTab(1, "Tweets & replies", UserTweetsActionType.FETCH_RETWEETS_AND_REPLIES);
    });

    it("should click tweet Tab and fetch user tweets", () => {
        testClickTab(2, "Media", UserTweetsActionType.FETCH_MEDIA_TWEETS);
    });

    it("should click tweet Tab and fetch user tweets", () => {
        testClickTab(3, "Likes", UserTweetsActionType.FETCH_LIKED_TWEETS);
    });

    it("should scroll and fetch User Tweets", () => {
        testLoadUserTweets(0, UserTweetsActionType.FETCH_TWEETS);
    });

    it("should scroll and fetch User Retweets And Replies", () => {
        testLoadUserTweets(1, UserTweetsActionType.FETCH_RETWEETS_AND_REPLIES);
    });

    it("should scroll and fetch User Media Tweets", () => {
        testLoadUserTweets(2, UserTweetsActionType.FETCH_MEDIA_TWEETS);
    });

    it("should scroll and fetch User Liked Tweets", () => {
        testLoadUserTweets(3, UserTweetsActionType.FETCH_LIKED_TWEETS);
    });

    it("should render Loading Spinner", () => {
        const wrapper = mountWithStore(
            <UserTweets userTweetsActiveTab={0} handleChangeUserTweetsTab={jest.fn()} />,
            createMockRootState(LoadingStatus.LOADING));
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render Tweet Components", () => {
        const wrapper = mountWithStore(
            <UserTweets userTweetsActiveTab={0} handleChangeUserTweetsTab={jest.fn()} />,
            mockWithTweets);
        expect(wrapper.find(TweetComponent).length).toEqual(2);
    });

    const testClickTab = (tabIndex: number, tabText: string, typeAction: UserTweetsActionType): void => {
        const wrapper = mountWithStore(<UserTweets userTweetsActiveTab={tabIndex} handleChangeUserTweetsTab={jest.fn()} />, mockRootState);
        wrapper.find(Tab).at(tabIndex).simulate("click");
        expect(wrapper.find(Tab).at(tabIndex).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(tabIndex).text().includes(tabText)).toBe(true);
        expect(mockDispatchFn).nthCalledWith(2, { payload: { userId: "2", page: 0 }, type: typeAction });
    };

    const testLoadUserTweets = (tabIndex: number, actionType: UserTweetsActionType): void => {
        const wrapper = mountWithStore(<UserTweets userTweetsActiveTab={tabIndex} handleChangeUserTweetsTab={jest.fn()} />, mockRootState);
        wrapper.find(Tab).at(tabIndex).simulate("click");
        wrapper.find(InfiniteScroll).prop("next")();
        expect(mockDispatchFn).nthCalledWith(2, { payload: { userId: "2", page: 0 }, type: actionType });
    };
});
