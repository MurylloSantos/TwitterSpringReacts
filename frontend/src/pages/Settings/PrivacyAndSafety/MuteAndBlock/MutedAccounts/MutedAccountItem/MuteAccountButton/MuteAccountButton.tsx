import React, { FC, memo, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import ActionIconButton from "../../../../../../../components/ActionIconButton/ActionIconButton";
import { MuteIcon, UnmuteIcon } from "../../../../../../../icons";
import { processUserToMuteList } from "../../../../../../../store/ducks/user/actionCreators";
import { setOpenSnackBar } from "../../../../../../../store/ducks/actionSnackbar/actionCreators";
import { useMuteAccountButtonStyles } from "./MuteAccountButtonStyles";

interface MuteAccountButtonProps {
    userId: number;
    username: string;
    isUserMuted: boolean;
}

const MuteAccountButton: FC<MuteAccountButtonProps> = memo(({ userId, username, isUserMuted }): ReactElement => {
    const dispatch = useDispatch();
    const classes = useMuteAccountButtonStyles({ isUserMuted });
    const { t } = useTranslation();

    const unmuteUser = (): void => {
        dispatch(processUserToMuteList({ userId }));
        dispatch(setOpenSnackBar(isUserMuted
            ? t("UNMUTE_USER_POPUP_MESSAGE", { username, defaultValue: `@${username} has been unmuted` })
            : t("MUTE_USER_POPUP_MESSAGE", { username, defaultValue: `@${username} has been muted` })));
    };

    return (
        <div className={classes.muteButton}>
            <ActionIconButton
                onClick={unmuteUser}
                actionText={isUserMuted
                    ? t("UNMUTE", { defaultValue: "Unmute" })
                    : t("MUTE", { defaultValue: "Mute" })}
                icon={isUserMuted ? MuteIcon : UnmuteIcon}
            />
        </div>
    );
});

export default MuteAccountButton;
