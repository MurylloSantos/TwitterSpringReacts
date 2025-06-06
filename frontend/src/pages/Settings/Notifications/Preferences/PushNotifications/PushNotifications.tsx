import React, { FC, ReactElement } from "react";
import { Switch, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";

const PushNotifications: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h6" component="div">
                    {t("PUSH_NOTIFICATIONS", { defaultValue: "Push notifications" })}
                    <span className={globalClasses.switch}>
                        <Switch defaultChecked />
                    </span>
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("PUSH_NOTIFICATIONS_DESCRIPTIONS", {
                        defaultValue: `Get push notifications to find out what’s going on when you’re not on Twitter. 
                        You can turn them off anytime.`
                    })}
                </Typography>
            </div>
            <div className={globalClasses.infoText}>
                <Typography variant="h4" component="div">
                    {t("TURN_ON_PUSH_NOTIFICATIONS", { defaultValue: "Turn on push notifications" })}
                </Typography>
                <Typography variant="subtitle1" component="div">
                    {t("TURN_ON_PUSH_NOTIFICATIONS_DESCRIPTIONS", {
                        defaultValue: `To receive notifications as they happen, turn on push notifications. 
                        You’ll also receive them when you’re not on Twitter. Turn them off anytime.`
                    })}
                </Typography>
            </div>
        </>
    );
};

export default withDocumentTitle(PushNotifications)("Push notifications");
