import React from 'react';
import mockData from './mockData';
import { Icon, Popover } from 'antd';
import HBizContent from './HBizContent';
import './index.less';

interface BizSelectProps {
  title?: string;
}

const BizSelect = (props: BizSelectProps) => {
  return (
    <div className="h-biz-select-container">
      <Popover
        content={<HBizContent data={mockData} />}
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
