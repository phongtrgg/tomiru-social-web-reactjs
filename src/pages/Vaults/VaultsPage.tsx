import { Paper, Typography } from "@material-ui/core";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { useGlobalStyles } from "../../util/globalClasses";
import { useVaultsStyles } from "./VaultsPageStyle";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectVaultsList, selectVaultsLoadingStatus } from "../../store/ducks/vault/selectors";
import { fetchVault } from "../../store/ducks/vault/actionCreators";
import { LoadingStatus } from "../../types/common";
import Spinner from "../../components/Spinner/Spinner";
import { VaultResponse } from "../../store/ducks/vault/contract/states";
import VaultItem from "./VaultItem/VaultItem";
import VaultInfoModal from "./VaultItem/VaultInfoModal";

const VaultsPage: FC = (): ReactElement => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const vaults = useSelector(selectVaultsList);
    const status = useSelector(selectVaultsLoadingStatus);
    const globalClasses = useGlobalStyles({});
    const classes = useVaultsStyles();
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [selectedVault, setSelectedVault] = useState<VaultResponse | undefined>(undefined);
    const clickVaultInfo = (vault: VaultResponse) => {
        setSelectedVault(vault);
        setShowInfoModal(true);
    };

    useEffect(() => {
        dispatch(fetchVault());
    }, []);
    return (
        <>
            <Paper className={globalClasses.pageContainer} variant="outlined">
                <Paper className={classNames(globalClasses.pageHeader, classes.header)} variant="outlined">
                    <Typography variant={"body1"} component={"div"}>
                        <span className={classes.vaultsTitle}> {t("mutual_funds")}</span>
                    </Typography>
                </Paper>
                {status === LoadingStatus.LOADING ? (
                    <Spinner />
                ) : status === LoadingStatus.ERROR ? (
                    <h1>{t("error")}</h1>
                ) : (
                    <div className={classes.addForm}>
                        {vaults &&
                            vaults.map((vault: VaultResponse, i: number) => {
                                return <VaultItem index={i} vault={vault} onClick={clickVaultInfo} />;
                            })}
                    </div>
                )}
            </Paper>
            <VaultInfoModal
                vault={selectedVault}
                show={showInfoModal}
                onClose={() => {
                    setShowInfoModal(false);
                }}
            />
        </>
    );
};
export default VaultsPage;
