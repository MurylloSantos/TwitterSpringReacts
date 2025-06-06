import React, { FC, memo, ReactElement } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useFullListUserCountStyles } from "./FullListUserCountStyles";
import { MembersAndFollowersEnum } from "../../../../hook/useListModal";

interface FullListUserCountProps {
    id: string;
    userCount?: number;
    titleKey: MembersAndFollowersEnum;
    titleDefaultValue: string;
    onOpenModalWindow: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, modalType: MembersAndFollowersEnum) => void;
}

const FullListUserCount: FC<FullListUserCountProps> = memo((
    {
        id,
        userCount,
        titleKey,
        titleDefaultValue,
        onOpenModalWindow
    }
): ReactElement => {
    const classes = useFullListUserCountStyles();
    const { t } = useTranslation();

    return (
        <span id={id} className={classes.listMembers} onClick={(event) => onOpenModalWindow(event, titleKey)}>
            <Typography variant={"h6"} component={"span"}>
                {userCount}
            </Typography>
            <Typography variant={"subtitle1"} component={"span"}>
                {" "}{t(titleKey, { defaultValue: titleDefaultValue })}
            </Typography>
        </span>
    );
});

export default FullListUserCount;
