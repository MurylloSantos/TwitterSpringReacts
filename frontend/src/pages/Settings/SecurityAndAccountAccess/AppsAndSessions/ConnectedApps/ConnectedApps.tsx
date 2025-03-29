import React, { FC, ReactElement } from "react";
import { Link as MuiLink, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { ACCESS_TO_THIRD_PARTY_APPS } from "../../../../../constants/url-constants";

const ConnectedApps: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("CONNECTED_APPS_DESCRIPTION", {
                        defaultValue: `These are the apps which you connected to your account. You can see the 
                        information these apps have access to and revoke access.`
                    })}
                    {" "}
                    <MuiLink href={ACCESS_TO_THIRD_PARTY_APPS} variant="subtitle2" target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                </Typography>
            </div>
            <div className={globalClasses.infoText}>
                <Typography variant="h4" component="div">
                    {t("YOU_DONT_HAVE_ANY_CONNECTED_APPS", { defaultValue: "You don’t have any connected apps" })}
                </Typography>
                <Typography variant="subtitle1" component="div">
                    {t("YOU_DONT_HAVE_ANY_CONNECTED_APPS_DESCRIPTION", {
                        defaultValue: `When you connect a third-party app to your Twitter account, you are granting 
                        that app access to use your account.`
                    })}
                </Typography>
            </div>
        </>
    );
};

export default withDocumentTitle(ConnectedApps)("Connected apps");
