import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Link as MuiLink, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { ArrowRightIcon } from "../../../../icons";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import {
    SETTINGS_NOTIFICATION_EMAIL_NOTIFICATIONS,
    SETTINGS_NOTIFICATION_PUSH_NOTIFICATIONS
} from "../../../../constants/path-constants";
import { NOTIFICATIONS_ON_MOBILE_DEVICES } from "../../../../constants/url-constants";

const Preferences: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("PREFERENCES_DESCRIPTIONS", { defaultValue: "Select your preferences by notification type." })}
                    {" "}
                    <MuiLink href={NOTIFICATIONS_ON_MOBILE_DEVICES} variant="subtitle2" target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                </Typography>
            </div>
            <Link to={SETTINGS_NOTIFICATION_PUSH_NOTIFICATIONS} className={globalClasses.linkWrapper}>
                <div className={globalClasses.contentLink}>
                    <Typography variant="body1" component="span">
                        {t("PUSH_NOTIFICATIONS", { defaultValue: "Push notifications" })}
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
            <Link to={SETTINGS_NOTIFICATION_EMAIL_NOTIFICATIONS} className={globalClasses.linkWrapper}>
                <div className={globalClasses.contentLink}>
                    <Typography variant="body1" component="span">
                        {t("EMAIL_NOTIFICATIONS", { defaultValue: "Email notifications" })}
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
        </>
    );
};

export default withDocumentTitle(Preferences)("Preferences");
