import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Divider, Link as MuiLink, Typography } from "@material-ui/core";
import { Trans, useTranslation } from "react-i18next";

import { useDeactivateAccountStyles } from "./DeactivateAccountStyles";
import {
    selectUserDataId,
    selectUserProfileAvatar,
    selectUserProfileFullName,
    selectUserProfileUsername
} from "../../../../store/ducks/user/selectors";
import { REMOVE_TWITTER_PROFILE_FROM_GOOGLE_SEARCH } from "../../../../constants/url-constants";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import { PROFILE, SETTINGS_INFO } from "../../../../constants/path-constants";

const DeactivateAccount: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useDeactivateAccountStyles();
    const myProfileId = useSelector(selectUserDataId);
    const myProfileAvatar = useSelector(selectUserProfileAvatar);
    const myProfileFullName = useSelector(selectUserProfileFullName);
    const myProfileUsername = useSelector(selectUserProfileUsername);
    const { t } = useTranslation();

    return (
        <div>
            <Link to={`${PROFILE}/${myProfileId}`} className={globalClasses.linkWrapper}>
                <div className={classes.userInfoWrapper}>
                    <Avatar className={globalClasses.avatar} src={myProfileAvatar} alt={`avatar ${myProfileId}`} />
                    <div className={classes.usernameWrapper}>
                        <Typography variant="h6" component="div">
                            {myProfileFullName}
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                            @{myProfileUsername}
                        </Typography>
                    </div>
                </div>
            </Link>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h5" component="div">
                    {t("DEACTIVATE_ACCOUNT_TITLE", { defaultValue: "This will deactivate your account" })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("DEACTIVATE_ACCOUNT_DESCRIPTION", {
                        defaultValue: `You’re about to start the process of deactivating your Twitter account. 
                        Your display name, @username, and public profile will no longer be viewable on Twitter.com, 
                        Twitter for iOS, or Twitter for Android.`
                    })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h5" component="div">
                    {t("WHAT_ELSE_YOU_SHOULD_KNOW", { defaultValue: "What else you should know" })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("DEACTIVATION_DESCRIPTION", {
                        defaultValue: `You can restore your Twitter account if it was accidentally or wrongfully 
                        deactivated for up to 30 days after deactivation.`
                    })}
                </Typography>
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("DEACTIVATION_ACCOUNT_DESCRIPTION", {
                        defaultValue: "Some account information may still be available in search engines, such as Google or Bing."
                    })}
                    {" "}
                    <MuiLink href={REMOVE_TWITTER_PROFILE_FROM_GOOGLE_SEARCH} variant="subtitle2" target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                </Typography>
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    <Trans
                        i18nKey={t("DEACTIVATION_USERNAME_DESCRIPTION", {
                            defaultValue: `If you just want to change your @username, 
                            you don’t need to deactivate your account — edit it in your settings.`
                        })}
                        components={{
                            settingsLink: <MuiLink variant="subtitle2" to={SETTINGS_INFO} component={Link} />
                        }}
                    />
                </Typography>
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    <Trans
                        i18nKey={t("DEACTIVATION_TWITTER_ACCOUNT_DESCRIPTION", {
                            defaultValue: `To use your current @username or email address with a different Twitter account, 
                            change them before you deactivate this account.`
                        })}
                        components={{
                            settingsLink: <MuiLink variant="subtitle2" to={SETTINGS_INFO} component={Link} />
                        }}
                    />
                </Typography>
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("DEACTIVATION_TWITTER_DATA_DESCRIPTION", {
                        defaultValue: `If you want to download your Twitter data, you’ll need to complete both the request 
                        and download process before deactivating your account. Links to download your data cannot be 
                        sent to deactivated accounts.`
                    })}
                </Typography>
            </div>
            <Divider />
            <div className={classes.deleteUser}>
                <Typography variant="body1" component="span">
                    {t("DEACTIVATE", { defaultValue: "Deactivate" })}
                </Typography>
            </div>
        </div>
    );
};

export default withDocumentTitle(DeactivateAccount)("Deactivate account");
