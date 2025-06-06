import React, { FC, ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { Divider, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useChangeEmailStyles } from "./ChangeEmailStyles";
import { ChangeInfoTextField } from "../../../ChangeInfoTextField/ChangeInfoTextField";
import { selectUserIsLoaded, selectUserProfileEmail } from "../../../../../store/ducks/user/selectors";
import ChangeEmailModal from "./ChangeEmailModal/ChangeEmailModal";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { useModalWindow } from "../../../../../hook/useModalWindow";

const ChangeEmail: FC = (): ReactElement => {
    const classes = useChangeEmailStyles();
    const myProfileEmail = useSelector(selectUserProfileEmail);
    const isUpdatedSuccess = useSelector(selectUserIsLoaded);
    const { t } = useTranslation();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    useEffect(() => {
        onCloseModalWindow();
    }, [isUpdatedSuccess]);

    return (
        <>
            <div className={classes.textFieldWrapper}>
                <ChangeInfoTextField
                    label={t("CURRENT", { defaultValue: "Current" })}
                    type="text"
                    variant="filled"
                    value={myProfileEmail}
                    fullWidth
                    disabled
                />
            </div>
            <Divider />
            <div
                id="openChangeEmailModal"
                className={classes.updateEmailAddress}
                onClick={onOpenModalWindow}
            >
                <Typography variant="body1" component="span">
                    {t("UPDATE_EMAIL_ADDRESS", { defaultValue: "Update email address" })}
                </Typography>
            </div>
            <ChangeEmailModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
};

export default withDocumentTitle(ChangeEmail)("Change email");
