import React, { useState, useEffect } from "react";
import { Icon, Popover } from "antd";
import HBizContent from "./HBizContent";
import "./index.less";

interface BizSelectProps {
  title?: string;
  data?: {
    key: string;
    title: string;
    list: { title: string; key: string; status: boolean; unit: string }[];
  }[];
}

const BizSelect = (props: BizSelectProps) => {
  return (
    <div className="h-biz-select-container">
      <Popover
        content={<HBizContent data={props.data} />}
        title={null}
        visible
        trigger="hover"
        placement="bottom"
        getPopupContainer={p => {
          return p;
        }}
        overlayClassName="h-biz-pop-wrap"
      >
        <div className="h-biz-title">
          <span>{props.title}</span>
          <span className="h-biz-select-icon">
            <Icon type="right" />
          </span>
        </div>
      </Popover>
    </div>
  );
};

export default BizSelect;
