import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { AccessibilityIcon, ArrowRightIcon, DisplayIcon, LanguagesIcon, TweetActivityIcon } from "../../../icons";
import { useGlobalStyles } from "../../../util/globalClasses";
import { withDocumentTitle } from "../../../hoc/withDocumentTitle";
import {
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_ACCESSIBILITY,
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DATA,
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DISPLAY,
    SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_LANGUAGES
} from "../../../constants/path-constants";

const AccessibilityDisplayLanguages: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("ACCESSIBILITY_DISPLAY_LANGUAGES_DESCRIPTION", {
                        defaultValue: "Manage how Twitter content is displayed to you."
                    })}
                </Typography>
            </div>
            <div className={globalClasses.listItemWrapper}>
                <List component="nav" aria-label="main mailbox folders">
                    <Link to={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_ACCESSIBILITY}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {AccessibilityIcon}
                            </div>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("ACCESSIBILITY", { defaultValue: "Accessibility" })}
                                </Typography>
                                <Typography variant="subtitle2" component="div">
                                    {t("ACCESSIBILITY_DESCRIPTION", {
                                        defaultValue: `Manage aspects of your Twitter experience such as limiting color 
                                        contrast and motion.`
                                    })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DISPLAY}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {DisplayIcon}
                            </div>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("DISPLAY", { defaultValue: "Display" })}
                                </Typography>
                                <Typography variant="subtitle2" component="div">
                                    {t("DISPLAY_DESCRIPTION", {
                                        defaultValue: `Manage your font size, color, and background. 
                                        These settings affect all the Twitter accounts on this browser.`
                                    })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_LANGUAGES}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {LanguagesIcon}
                            </div>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("LANGUAGES", { defaultValue: "Languages" })}
                                </Typography>
                                <Typography variant="subtitle2" component="div">
                                    {t("LANGUAGES_DESCRIPTION", {
                                        defaultValue: "Manage which languages are used to personalize your Twitter experience."
                                    })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                    <Link to={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_DATA}>
                        <ListItem>
                            <div className={globalClasses.listIconWrapper}>
                                {TweetActivityIcon}
                            </div>
                            <div>
                                <Typography variant="body1" component="div">
                                    {t("DATA_USAGE", { defaultValue: "Data usage" })}
                                </Typography>
                                <Typography variant="subtitle2" component="div">
                                    {t("DATA_USAGE_DESCRIPTION", {
                                        defaultValue: `Limit how Twitter uses some of your network data. 
                                        These settings affect all the Twitter accounts on this browser.`
                                    })}
                                </Typography>
                            </div>
                            <div className={globalClasses.arrowIcon}>
                                {ArrowRightIcon}
                            </div>
                        </ListItem>
                    </Link>
                </List>
            </div>
        </>
    );
};

export default withDocumentTitle(AccessibilityDisplayLanguages)("Accessibility, display and languages");
