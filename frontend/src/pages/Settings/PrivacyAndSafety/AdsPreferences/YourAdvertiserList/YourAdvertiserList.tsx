import React, { FC, ReactElement } from "react";
import { Divider, Link as MuiLink, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { PRIVACY_CONTROLS_FOR_TAILORED_ADS } from "../../../../../constants/url-constants";

const YourAdvertiserList: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle1" component="div">
                    {t("YOUR_ADVERTISER_LIST_DESCRIPTION", {
                        defaultValue: `Tailored audiences are often built from email lists or browsing behaviors. 
                        They help advertisers reach prospective customers or people who have already expressed interest 
                        in their business.`
                    })}
                    {" "}
                    <MuiLink href={PRIVACY_CONTROLS_FOR_TAILORED_ADS} variant="subtitle2" target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                </Typography>
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="body1" component="div">
                    {t("YOU_ARE_CURRENTLY_A_PART_OF", { defaultValue: "You are currently a part of" })}
                    <Typography variant="h6" component="span">
                        {" 0 "}{t("AUDIENCES", { defaultValue: "audiences" })}
                    </Typography>
                    {" "}
                    {t("FROM", { defaultValue: "from" })}
                    <Typography variant="h6" component="span">
                        {" 0 "}{t("ADVERTISERS", { defaultValue: "advertisers" })}
                    </Typography>
                </Typography>
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle1" component="div">
                    {t("YOUR_ADVERTISER_LIST_TWITTER_DESCRIPTION", {
                        defaultValue: `You can opt out of interest-based advertising in your personalization and data 
                        settings. This will change the ads you see on Twitter, however it won’t remove you from 
                        advertisers’ audiences.`
                    })}
                </Typography>
            </div>
        </>
    );
};

export default withDocumentTitle(YourAdvertiserList)("Your advertiser list");
