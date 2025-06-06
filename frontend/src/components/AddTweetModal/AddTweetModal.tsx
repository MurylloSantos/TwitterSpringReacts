import React, { FC, ReactElement, useEffect } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { useAddTweetModalStyles } from "./AddTweetModalStyles";
import AddTweetForm from "../AddTweetForm/AddTweetForm";
import { selectIsTweetsLoaded } from "../../store/ducks/tweets/selectors";
import DialogTitleComponent from "../DialogTitleComponent/DialogTitleComponent";

interface AddTweetModalProps {
    title?: string;
    visible?: boolean;
    onClose: () => void;
}

const AddTweetModal: FC<AddTweetModalProps> = ({ title, visible, onClose }): ReactElement | null => {
    const classes = useAddTweetModalStyles();
    const isTweetAdded = useSelector(selectIsTweetsLoaded);
    const { t } = useTranslation();

    useEffect(() => {
        onClose();
    }, [isTweetAdded]);

    if (!visible) {
        return null;
    }

    return (
        <Dialog className={classes.content} open={visible} onClose={onClose}>
            <DialogTitleComponent title={title} onClose={onClose}/>
            <DialogContent className={classes.dialogContent}>
                <AddTweetForm
                    maxRows={6}
                    minRows={6}
                    title={t("WHATS_HAPPENING", { defaultValue: "What's happening?" })}
                    buttonName="Tweet"
                />
            </DialogContent>
        </Dialog>
    );
};

export default AddTweetModal;
