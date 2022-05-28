import Chart from "./Charts";
import FeaturedInfo from "./featuredInfo/FeaturedInfo";
import "./Home.css";
import { userData } from "./dummyData";
import WidgetSm from "./widgetSm/WidgetSm";
import WidgetLg from "./widgetLg/WidgetLg";

export default function Homepage() {
  return (
    <div className="home">
      <FeaturedInfo />
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}