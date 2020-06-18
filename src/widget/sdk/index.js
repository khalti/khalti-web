//widget/sdk/index.js
import React, { useEffect, useState } from "react";
import KhaltiWallet from "./type/KhaltiWallet";
import EBanking from "./type/EBanking";
import MobileBanking from "./type/MobileBanking";
import ConnectIPS from "./type/ConnectIPS";
import SCTCard from "./type/SCTCard";

import * as styles from "../css/index.css";
import {
  CLOSE_ICON,
  CONNECT_IPS_ICON,
  EBANKING_ICON,
  MYWALLET_ICON,
  SCT_CARD_ICON,
  MBANKING_ICON,
} from "../../assets/constants";

import {
  EBANKING,
  EBANKING_VALUE,
  MOBILE_BANKING,
  MOBILE_BANKING_VALUE,
  KHALTI,
  KHALTI_VALUE,
  CONNECT_IPS,
  CONNECT_IPS_VALUE,
  SCT,
  SCT_VALUE,
} from "./constants/literal";

const SDK = ({
  public_key,
  product_identity,
  product_name,
  amount,
  product_url,
  hideModal,
  payment_preference,
}) => {
  const [activeTab, setActiveTab] = useState({ tab: payment_preference[0] });

  const [loading, setLoading] = useState(true);
  const getActiveTab = (obj) => {
    setActiveTab(obj);
  };

  useEffect(() => {
    setLoading(false);
  }, []);
  const scrollRef = React.createRef();
  const scrollLeft = () => {
    console.log("left scroll");
    sideScroll(scrollRef.current, "left", 10, 200, 10);
  };
  const scrollRight = () => {
    console.log("right scroll");
    sideScroll(scrollRef.current, "right", 10, 200, 10);
  };
  const sideScroll = (ele, direction, speed, distance, step) => {
    let scrollAmount = 0;
    let slideTimer = setInterval(function () {
      if (direction == "left") {
        ele.scrollLeft -= step;
      } else {
        ele.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  };
  return (
    <React.Fragment>
      {
        <div className={styles.iframeWidget}>
          {loading && (
            <div className="ui active dimmer">
              <div className="ui text loader">Loading</div>
            </div>
          )}

          {!loading && (
            <div className={styles.modalScreen}>
              <div className="ui ">
                {public_key && public_key.includes("test") && (
                  <span
                    class="ui orange ribbon label"
                    style={{
                      position: "absolute",
                      left: "-16px",
                    }}
                  >
                    TEST MODE
                  </span>
                )}
                <div
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                    color: "#5d2e8e",
                    marginTop: "25px",
                  }}
                >
                  Choose your payment method
                </div>
                <div style={{ padding: "15px 15px 0 15px" }}>
                  <div className={styles.scrollTrigger}>
                    <span className={styles.Prev}>
                      <i
                        onClick={scrollLeft}
                        className="icon angle left large"
                      />
                    </span>
                    <span className={styles.Next}>
                      <i
                        onClick={scrollRight}
                        className="icon angle right large"
                      />
                    </span>
                  </div>
                  <div className={styles.parentBar}>
                    <div
                      ref={scrollRef}
                      className={
                        "ui pointing secondary menu " + styles.onHoverBar
                      }
                    >
                      {payment_preference.map((item, index) => {
                        return (
                          <a
                            className={
                              activeTab.tab == item ? "item active " : "item"
                            }
                            style={{
                              paddingLeft: "0px",
                              paddingTop: "18px",
                              paddingBottom: "18px",
                              paddingRight: "18px",
                            }}
                            data-tab={item}
                            key={index}
                            onClick={() => getActiveTab({ tab: item })}
                          >
                            {item == KHALTI && (
                              <React.Fragment>
                                <img
                                  src={MYWALLET_ICON}
                                  style={{ height: "16px" }}
                                />
                                {KHALTI_VALUE}
                              </React.Fragment>
                            )}
                            {item == MOBILE_BANKING && (
                              <React.Fragment>
                                <img
                                  src={MBANKING_ICON}
                                  style={{ height: "16px" }}
                                />
                                {MOBILE_BANKING_VALUE}
                              </React.Fragment>
                            )}
                            {item == EBANKING && (
                              <React.Fragment>
                                <img
                                  src={EBANKING_ICON}
                                  style={{ height: "16px" }}
                                />
                                {EBANKING_VALUE}
                              </React.Fragment>
                            )}
                            {item == CONNECT_IPS && (
                              <React.Fragment>
                                <img
                                  src={CONNECT_IPS_ICON}
                                  style={{ height: "16px" }}
                                />
                                {CONNECT_IPS_VALUE}
                              </React.Fragment>
                            )}
                            {item == SCT && (
                              <React.Fragment>
                                <img
                                  src={SCT_CARD_ICON}
                                  style={{ height: "16px" }}
                                />
                                {SCT_VALUE}
                              </React.Fragment>
                            )}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute ",
                    top: 0,
                    right: 0,
                    padding: "10px",
                    cursor: "pointer",
                  }}
                  onClick={hideModal}
                >
                  <img src={CLOSE_ICON} height="14px" />
                </div>
                <div className={styles.bottomPadding}>
                  {activeTab && activeTab.tab && (
                    <React.Fragment>
                      <div
                        className={
                          activeTab.tab == KHALTI ? "ui tab active" : "ui tab"
                        }
                      >
                        {
                          <KhaltiWallet
                            public_key={public_key}
                            product_identity={product_identity}
                            product_name={product_name}
                            amount={amount}
                            product_url={product_url}
                          />
                        }
                      </div>
                      <div
                        className={
                          activeTab.tab == EBANKING ? "ui tab active" : "ui tab"
                        }
                      >
                        {
                          <EBanking
                            public_key={public_key}
                            product_identity={product_identity}
                            product_name={product_name}
                            amount={amount}
                            product_url={product_url}
                          />
                        }
                      </div>
                      <div
                        className={
                          activeTab.tab == MOBILE_BANKING
                            ? "ui tab active"
                            : "ui tab"
                        }
                      >
                        {
                          <MobileBanking
                            public_key={public_key}
                            product_identity={product_identity}
                            product_name={product_name}
                            amount={amount}
                            product_url={product_url}
                          />
                        }
                      </div>
                      <div
                        className={
                          activeTab.tab == CONNECT_IPS
                            ? "ui tab active"
                            : "ui tab"
                        }
                      >
                        {
                          <ConnectIPS
                            public_key={public_key}
                            product_identity={product_identity}
                            product_name={product_name}
                            amount={amount}
                            product_url={product_url}
                          />
                        }
                      </div>
                      <div
                        className={
                          activeTab.tab == SCT ? "ui tab active" : "ui tab"
                        }
                      >
                        {
                          <SCTCard
                            public_key={public_key}
                            product_identity={product_identity}
                            product_name={product_name}
                            amount={amount}
                            product_url={product_url}
                          />
                        }
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      }
    </React.Fragment>
  );
};
export default SDK;
/*

*/
