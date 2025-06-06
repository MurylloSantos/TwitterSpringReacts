import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, Link as MuiLink, Typography } from "@material-ui/core";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import { useChangeCountryStyles } from "./ChangeCountryStyles";
import { FilledSelect } from "../../../../../components/FilledSelect/FilledSelect";
import { selectUserDataId, selectUserProfileCountry } from "../../../../../store/ducks/user/selectors";
import { updateCountry } from "../../../../../store/ducks/user/actionCreators";
import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { HOW_TO_CHANGE_COUNTRY_SETTINGS } from "../../../../../constants/url-constants";
import { fetchCountryCodes, resetLocalizationState } from "../../../../../store/ducks/localization/actionCreators";
import {
    selectCountryCodes,
    selectIsLocalizationError,
    selectIsLocalizationLoading
} from "../../../../../store/ducks/localization/selectors";

const ChangeCountry: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useChangeCountryStyles();
    const dispatch = useDispatch();
    const countryCodes = useSelector(selectCountryCodes);
    const countryCodesLoading = useSelector(selectIsLocalizationLoading);
    const countryCodesError = useSelector(selectIsLocalizationError);
    const myProfileId = useSelector(selectUserDataId);
    const myProfileCountry = useSelector(selectUserProfileCountry);
    const { t } = useTranslation();
    const [country, setCountry] = useState<string>("");

    useEffect(() => {
        dispatch(fetchCountryCodes());

        if (myProfileId) {
            setCountry(myProfileCountry!);
        }

        return () => {
            dispatch(resetLocalizationState());
        };
    }, []);

    const onChangeCountry = (event: ChangeEvent<{ value: unknown }>): void => {
        setCountry(event.target.value as string);
        dispatch(updateCountry({ country: event.target.value as string }));
    };

    return (
        <div className={classnames(classes.selectWrapper, globalClasses.itemInfoWrapper)}>
            <FormControl variant="filled">
                <InputLabel id="select-language" shrink>
                    {t("COUNTRY", { defaultValue: "Country" })}
                </InputLabel>
                <FilledSelect
                    variant="filled"
                    labelId="select-country"
                    id="select-country"
                    native
                    value={country}
                    onChange={onChangeCountry}
                    disabled={countryCodesLoading}
                    error={countryCodesError}
                    label={t("COUNTRY", { defaultValue: "Country" })}
                    fullWidth
                >
                    <option aria-label="None" />
                    {countryCodes.map(countryCode => (
                            <option key={countryCode.id} value={countryCode.country}>
                                {countryCode.country}
                            </option>
                        )
                    )}
                </FilledSelect>
            </FormControl>
            <Typography variant="subtitle2" component="div">
                {t("CHANGE_COUNTRY_DESCRIPTION", {
                    defaultValue: `This is the primary country associated with your account. 
                    Your country helps us to customize your Twitter experience.`
                })}
                {" "}
                <MuiLink href={HOW_TO_CHANGE_COUNTRY_SETTINGS} variant="subtitle2" target="_blank" rel="noopener">
                    {t("LEARN_MORE", { defaultValue: "Learn more" })}
                </MuiLink>
            </Typography>
        </div>
    );
};

export default withDocumentTitle(ChangeCountry)("Change country");
