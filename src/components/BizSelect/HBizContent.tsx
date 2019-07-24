import React from 'react';
import { Checkbox } from 'antd';
import './hBizContent.less';

interface ItemData {
  key: string;
  status: boolean;
  title: string;
}
interface BodyData {
  key: string;
  list: Array<ItemData>;
  title: string;
}

interface BizSelectContentProps {
  data?: Array<BodyData>;
}

const HBizContent = (props: BizSelectContentProps) => {
  const { data = [] } = props;
  const isCheckAll = data.every(item => item.list.every(el => el.status));
  const isCancelAll = data.every(item => item.list.every(el => !el.status));
  return (
    <div className="h-biz-content">
      <div className="h-biz-header">
        <span>
          <Checkbox checked={isCheckAll} />
          &nbsp;全选
        </span>
        <span>
          <Checkbox checked={isCancelAll} />
          &nbsp;全不选
        </span>
        <span>
          <Checkbox />
          &nbsp;反选
        </span>
      </div>
      <div className="h-biz-body">
        {data.map(item => {
          return (
            <div key={item.key} className="body-section">
              <div>
                <Checkbox checked={item.list.every(el => el.status)} />
                &nbsp;{item.title}
              </div>
              <div className="section-items-wrap">
                {item.list.map(el => (
                  <span key={el.key} className="section-items">
                    <Checkbox checked={el.status} />
                    &nbsp;{el.title}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HBizContent;
