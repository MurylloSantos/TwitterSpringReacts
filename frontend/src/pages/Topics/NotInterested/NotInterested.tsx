import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import TopicItem from "../TopicItem/TopicItem";
import { fetchNotInterestedTopics, resetTopicsState } from "../../../store/ducks/topics/actionCreators";
import { selectIsTopicsLoading, selectTopicsItems } from "../../../store/ducks/topics/selectors";
import EmptyPageDescription from "../../../components/EmptyPageDescription/EmptyPageDescription";
import Spinner from "../../../components/Spinner/Spinner";

const NotInterested = (): ReactElement => {
    const dispatch = useDispatch();
    const topics = useSelector(selectTopicsItems);
    const isTopicsLoading = useSelector(selectIsTopicsLoading);
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchNotInterestedTopics());

        return () => {
            dispatch(resetTopicsState());
        };
    }, []);

    return (
        <>
            {isTopicsLoading ? (
                <Spinner />
            ) : (
                (topics.length === 0) ? (
                    <EmptyPageDescription
                        title={t("NOT_INTERESTED_TITLE", { defaultValue: "No interest? No problem." })}
                        subtitle={t("NOT_INTERESTED_DESCRIPTION", {
                            defaultValue: "When you tell us you're not interested in a Topic, it will show up here. " +
                                "We won't recommend Tweets, events, or ads related to Topics you aren't into." })}
                    />
                ) : (
                    topics.map((topic) => <TopicItem key={topic.id} topic={topic} />)
                )
            )}
        </>
    );
};

export default NotInterested;
