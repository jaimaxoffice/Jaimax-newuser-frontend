import { useGetRoundQuery } from "../dashBoard/DashboardApliSlice";
import WithDrawal from "./withDrawal";
import UsdtWithdrawal from "./UsdtWithdrawal";
import Loader from "../../../../ReusableComponents/Loader/loader";

function WithdrawalRoute() {
  const { data, isLoading, isFetching, isError } = useGetRoundQuery();
  const activeMethod =
    data?.activeWithdrawlMethod ||
    data?.data?.activeWithdrawlMethod ||
    data?.data?.[0]?.activeWithdrawlMethod;

  if (isLoading || isFetching) {
    return (
      <div style={{ padding: 20 }}>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return  <WithDrawal />;
  }
  if (!activeMethod) {
    return <WithDrawal />;
  }

  return activeMethod === "INR" ? <WithDrawal /> : <UsdtWithdrawal />;
}

export default WithdrawalRoute;
