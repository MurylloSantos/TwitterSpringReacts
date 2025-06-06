import React, { FC, ReactElement } from "react";
import { Checkbox, Link as MuiLink, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { TWO_FACTOR_AUTHENTICATION } from "../../../../../constants/url-constants";

const TwoFactorAuthentication: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h5" component="div">
                    {t("TWO_FACTOR_AUTHENTICATION", { defaultValue: "Two-factor authentication" })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("TEXT_MESSAGE", { defaultValue: "Text message" })}
                    </Typography>
                    <Checkbox />
                </div>
                <Typography variant="subtitle2" component="div">
                    {t("TEXT_MESSAGE_DESCRIPTION", {
                        defaultValue: `Use your mobile phone to receive a text message with an authentication code to 
                            enter when you log in to Twitter.`
                    })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("AUTHENTICATION_APP", { defaultValue: "Authentication app" })}
                    </Typography>
                    <Checkbox />
                </div>
                <Typography variant="subtitle2" component="div">
                    {t("AUTHENTICATION_APP_DESCRIPTION", {
                        defaultValue: `Use a mobile authentication app to get a verification code to enter every time 
                        you log in to Twitter.`
                    })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("SECURITY_KEY", { defaultValue: "Security key" })}
                    </Typography>
                    <Checkbox />
                </div>
                <Typography variant="subtitle2" component="div">
                    {t("SECURITY_KEY_DESCRIPTION", {
                        defaultValue: `Use a security key that inserts into your computer or syncs to your mobile 
                        device when you log in to Twitter. You’ll need to use a supported mobile device or web browser.`
                    })}
                    {" "}
                    <MuiLink href={TWO_FACTOR_AUTHENTICATION} variant="subtitle2" target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                </Typography>
            </div>
        </>
    );
};

export default withDocumentTitle(TwoFactorAuthentication)("Two-factor authentication");
