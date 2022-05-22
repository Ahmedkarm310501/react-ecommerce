import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Pending</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$1,000</span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,000</span>

        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$3,000</span>

        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
