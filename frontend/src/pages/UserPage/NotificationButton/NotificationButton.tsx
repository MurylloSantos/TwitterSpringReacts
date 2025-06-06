import React, { memo, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { NotificationsAddFilledIcon, NotificationsAddIcon } from "../../../icons";
import { useGlobalStyles } from "../../../util/globalClasses";
import { selectUserProfileId, selectUserProfileIsSubscriber } from "../../../store/ducks/userProfile/selectors";
import { processSubscribe } from "../../../store/ducks/userProfile/actionCreators";

const NotificationButton = memo((): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const isSubscriber = useSelector(selectUserProfileIsSubscriber);
    const { t } = useTranslation();

    const handleSubscribeToNotifications = (): void => {
        dispatch(processSubscribe(userProfileId!));
    };

    return (
        <span className={globalClasses.userPageIconButton}>
            <ActionIconButton
                actionText={isSubscriber
                    ? t("TURN_OFF_NOTIFICATIONS", { defaultValue: "Turn off notifications" })
                    : t("NOTIFY", { defaultValue: "Notify" })}
                icon={isSubscriber ? NotificationsAddFilledIcon : NotificationsAddIcon}
                onClick={handleSubscribeToNotifications}
            />
        </span>
    );
});

export default NotificationButton;
