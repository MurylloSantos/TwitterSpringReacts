import React, { FC, ReactElement } from "react";
import { Paper, Popover } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Picker } from "emoji-mart";
import { useTranslation } from "react-i18next";

import { EmojiIcon, GifIcon, MediaIcon, SendMessageIcon } from "../../../../icons";
import { MessageInput } from "../../MessageInput/MessageInput";
import { useChatFooterStyles } from "./ChatFooterStyles";
import { addChatMessage } from "../../../../store/ducks/chatMessages/actionCreators";
import ActionIcon from "../../ActionIcon/ActionIcon";
import { usePopup } from "../../../../hook/usePopup";
import { useInputText } from "../../../../hook/useInputText";

interface ChatFooterProps {
    chatId: number;
}

const ChatFooter: FC<ChatFooterProps> = ({ chatId }): ReactElement => {
    const classes = useChatFooterStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { text, setText, handleChangeText, addEmoji, textConverter } = useInputText();
    const { popoverId, anchorEl, openPopover, handleOpenPopup, handleClosePopup } = usePopup();

    const onSendMessage = (): void => {
        if (text !== "") {
            dispatch(addChatMessage({ chatId: chatId, text: textConverter() }));
            setText("");
        }
    };

    return (
        <Paper className={classes.chatFooter}>
            <ActionIcon
                actionText={"Media"}
                translationKey={"MEDIA"}
                className={"chatIcon"}
                icon={MediaIcon}
                positionTop
            />
            <ActionIcon
                actionText={"GIF"}
                translationKey={"GIF"}
                className={"chatIcon"}
                icon={GifIcon}
                positionTop
            />
            <MessageInput
                multiline
                value={text}
                onChange={handleChangeText}
                variant="outlined"
                placeholder={t("START_A_NEW_MESSAGE", { defaultValue: "Start a new message" })}
            />
            <div id={"handleOpenPopup"} onClick={handleOpenPopup}>
                <ActionIcon
                    actionText={"Emoji"}
                    translationKey={"EMOJI"}
                    className={"emojiIcon"}
                    icon={EmojiIcon}
                    positionTop
                />
            </div>
            <div style={{ marginLeft: 8 }}>
                <ActionIcon
                    onClick={onSendMessage}
                    actionText={"Send"}
                    translationKey={"SEND"}
                    className={"chatIcon"}
                    icon={SendMessageIcon}
                    disabled={text.length === 0}
                    positionTop
                />
            </div>
            <Popover
                id={popoverId}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopup}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Picker title="" emoji="wave" onSelect={addEmoji} set="twitter" />
            </Popover>
        </Paper>
    );
};

export default ChatFooter;
