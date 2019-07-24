import React from "react";
import BizSelect from "../../components/BizSelect";
import "./index.less";
import mockData from "../../components/BizSelect/mockData";

const BizSelectPage = () => {
  return (
    <div className="biz-select-page-wrap">
      <BizSelect title="更多" data={mockData} />
    </div>
  );
};

export default BizSelectPage;
