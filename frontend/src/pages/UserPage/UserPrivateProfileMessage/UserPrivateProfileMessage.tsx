import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link as MuiLink, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { PUBLIC_AND_PROTECTED_TWEETS } from "../../../constants/url-constants";
import { selectUserProfileUsername } from "../../../store/ducks/userProfile/selectors";
import { useUserPageStyles } from "../UserPageStyles";

const UserPrivateProfileMessage = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const username = useSelector(selectUserProfileUsername);
    const { t } = useTranslation();

    return (
        <div className={classes.privateProfileInfo}>
            <Typography variant="h4" component="div">
                {t("PROTECTED_TWEETS_TITLE", { defaultValue: "These Tweets are protected" })}
            </Typography>
            <Typography variant="subtitle1" component="div">
                {t("PROTECTED_TWEETS_DESCRIPTION", {
                    username,
                    defaultValue: `Only approved followers can see @${username}’s Tweets. To request access, click Follow.` })
                }
                {" "}
                <MuiLink href={PUBLIC_AND_PROTECTED_TWEETS} variant="subtitle1" target="_blank" rel="noopener">
                    {t("LEARN_MORE", { defaultValue: "Learn more" })}
                </MuiLink>
            </Typography>
        </div>
    );
});

export default UserPrivateProfileMessage;
