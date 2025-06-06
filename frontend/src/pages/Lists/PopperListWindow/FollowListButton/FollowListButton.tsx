import React, { memo, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { usePopperListWindowStyles } from "../PopperListWindowStyles";
import { followList } from "../../../../store/ducks/lists/actionCreators";
import { selectListDetailItemId } from "../../../../store/ducks/listDetail/selectors";

const FollowListButton = memo((): ReactElement => {
    const classes = usePopperListWindowStyles();
    const dispatch = useDispatch();
    const listId = useSelector(selectListDetailItemId);
    const { t } = useTranslation();

    const handleFollow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(followList(listId!));
    };

    return (
        <Button
            className={classes.outlinedButton}
            onClick={handleFollow}
            variant="outlined"
            color="primary"
            size="small"
        >
            {t("FOLLOW", { defaultValue: "Follow" })}
        </Button>
    );
});

export default FollowListButton;
