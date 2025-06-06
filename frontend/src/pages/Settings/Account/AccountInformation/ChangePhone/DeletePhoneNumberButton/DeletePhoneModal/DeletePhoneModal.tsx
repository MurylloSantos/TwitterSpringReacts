import React, { FC, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { Button, Dialog, DialogContent, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useDeletePhoneNumberButtonStyles } from "./DeletePhoneModalStyles";
import { deletePhoneNumber } from "../../../../../../../store/ducks/user/actionCreators";

interface DeletePhoneModalProps {
    visible?: boolean;
    onClose: () => void;
}

const DeletePhoneModal: FC<DeletePhoneModalProps> = ({ visible, onClose }): ReactElement | null => {
    const classes = useDeletePhoneNumberButtonStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onClickDeletePhoneNumber = (): void => {
        dispatch(deletePhoneNumber());
        onClose();
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog
            className={classes.dialog}
            open={visible}
            onClick={(event) => event.stopPropagation()}
            onClose={onClose}
        >
            <DialogContent>
                <Typography variant="h5" component="div">
                    {t("DELETE_PHONE_NUMBER_TITLE", { defaultValue: "Delete phone number?" })}
                </Typography>
                <Typography variant="subtitle1" component="div" className={classes.text}>
                    {t("DELETE_PHONE_NUMBER_DESCRIPTION", {
                        defaultValue: `This will remove this number from your account, 
                        and you will no longer be able to receive notifications or login codes to it.`
                    })}
                </Typography>
                <Button
                    className={classes.blockButton}
                    onClick={onClickDeletePhoneNumber}
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                >
                    {t("DELETE", { defaultValue: "Delete" })}
                </Button>
                <Button
                    onClick={onClose}
                    color="primary"
                    variant="outlined"
                    size="large"
                    fullWidth
                >
                    {t("CANCEL", { defaultValue: "Cancel" })}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default DeletePhoneModal;
