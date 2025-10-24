import React, { useState, useEffect } from "react";
import {
  useGetOrdersAbove25kQuery,
  useGetAllWealthPlanOrdersQuery,
  useActivateTheWealthPlanMutation,
  useDeActivateTheWealthPlanMutation,
  useGetAllCompletedWealthPlanOrdersQuery,
  useGetWealthOrderTransactionsQuery,
} from "./guaranteedWealthPlanApiSlice";
import { useUserDataQuery } from "../dashBoard/DashboardApliSlice";
import {
  Wallet,
  DollarSign,
  Clock,
  Users,
  ArrowRight,
  Info,
  Check,
  X,
  PieChart,
  Calendar,
  Activity,
  TrendingUp,
  CreditCard,
  Award,
  Gift,
  AlertCircle,
  Coins,
  CalendarClock,
  Target,
  Star,
  CheckCircle2,
  Receipt,
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
  BarChart,
  IndianRupee,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../../ReusableComponents/Loader/loader";
const formatDateWithAmPm = (isoString) => {
  const date = new Date(isoString);
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = date.getUTCFullYear();
  let hh = date.getUTCHours();
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  const ampm = hh >= 12 ? "PM" : "AM";
  hh = hh % 12 || 12;
  return `${dd}-${mm}-${yyyy} ${hh}:${min} ${ampm}`;
};
const formatDate = (isoString) => {
  const date = new Date(isoString);
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = date.getUTCFullYear();
  let hh = date.getUTCHours();
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  const ampm = hh >= 12 ? "PM" : "AM";
  hh = hh % 12 || 12;
  return `${dd}-${mm}-${yyyy} `;
};
const GuaranteedWealthDashboard = () => {
  const [activeTab, setActiveTab] = useState("above25k");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPlanDetailsModal, setShowPlanDetailsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [pendingActivationId, setPendingActivationId] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // API Hooks
  const {
    data: ordersAbove25kResponse,
    isLoading: loadingAbove25k,
    refetch: refetchAbove25k,
  } = useGetOrdersAbove25kQuery();
  const {
    data: allWealthOrdersResponse,
    isLoading: loadingAllOrders,
    refetch: refetchAllOrders,
  } = useGetAllWealthPlanOrdersQuery();
  const {
    data: completedWealthPlansResponse,
    isLoading: loadingCompletedPlans,
    refetch: refetchCompletedPlans,
  } = useGetAllCompletedWealthPlanOrdersQuery();
  const [activateWealthPlan, { isLoading: activating }] =
    useActivateTheWealthPlanMutation();
  const [deactivateWealthPlan, { isLoading: deactivating }] =
    useDeActivateTheWealthPlanMutation();
  const { data: userData, refetch } = useUserDataQuery();
  const ordersAbove25k = ordersAbove25kResponse?.data || [];
  const allWealthOrders = allWealthOrdersResponse?.data || [];
  const completedWealthPlans = completedWealthPlansResponse?.data || [];

  // Handle viewing plan details
  const handleViewPlanDetails = (order) => {
    setSelectedOrder(order);
    setShowPlanDetailsModal(true);
  };

  // Handle activate - Show terms first
  const handleActivateClick = (_id) => {
    setPendingActivationId(_id);
    setShowTermsModal(true);
    setTermsAccepted(false);
  };

  // Proceed with activation after terms accepted
  const handleActivateConfirm = async () => {
    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions to proceed.");
      return;
    }

    try {
      const response = await activateWealthPlan(pendingActivationId).unwrap();
      refetchAbove25k();
      refetchAllOrders();
      refetchCompletedPlans();
      setShowTermsModal(false);
      setPendingActivationId(null);
      setTermsAccepted(false);

      // Show success message or any message from the response
      if (response && response.message) {
        toast.success(response.message);
      } else {
        toast.success("Wealth plan activated successfully!");
      }
    } catch (error) {
      console.error("Failed to activate:", error);
      // Display the exact error message from the API
      if (error.data && error.data.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Failed to activate the wealth plan");
      }
    }
  };

  const handleDeactivate = async (_id) => {
    try {
      const response = await deactivateWealthPlan(_id).unwrap();
      refetchAbove25k();
      refetchAllOrders();
      refetchCompletedPlans();

      // Show success message or any message from the response
      if (response && response.message) {
        toast.success(response.message);
      } else {
        toast.success("Wealth plan deactivated successfully!");
      }
    } catch (error) {
      console.error("Failed to deactivate:", error);
      // Display the exact error message from the API
      if (error.data && error.data.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Failed to deactivate the wealth plan");
      }
    }
  };

  // Calculate overall stats
  const activeOrders = allWealthOrders.filter(
    (order) => order.isGuaranteedWealthOpted
  );

  const totalInvestment = allWealthOrders.reduce(
    (total, order) => total + (order.amount || 0),
    0
  );

  const totalDisbursed = allWealthOrders.reduce(
    (total, order) => total + (order.totalAmountDisbursedForWealthPlan || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 p-2 md:p-4">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl shadow-md p-4 md:p-5 mb-4 border border-teal-400 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div>
              <h1 className="text-xl md:text-3xl font-bold flex items-center">
                {/* <Sparkles className="mr-2 h-5 w-5 md:h-7 md:w-7" />  */}
                Guaranteed Wealth Plan
              </h1>
              <p className="text-teal-100 text-sm mt-1">
                Manage and monitor your wealth plan investments
              </p>
            </div>
            <div className="flex items-center space-x-2 text-white bg-teal-600/30 px-3 py-1 rounded-full">
              <Clock size={18} />
              <span className="text-xs md:text-sm font-medium">
                {new Date().toLocaleDateString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4">
          <StatsCard
            title="Orders Above 25K"
            value={ordersAbove25k.length}
            icon={<CreditCard size={16} className="md:w-5 md:h-5" />}
            color="from-teal-500 to-teal-600"
          />
          <StatsCard
            title="Active Wealth Plans"
            value={allWealthOrders.length}
            icon={<PieChart size={16} className="md:w-5 md:h-5" />}
            color="from-teal-500 to-teal-600"
          />
          <StatsCard
            title="Completed Plans"
            value={completedWealthPlans.length}
            icon={<TrendingUp size={16} className="md:w-5 md:h-5" />}
            color="from-teal-500 to-teal-600"
          />
          <StatsCard
            title="Total Wealth Income"
            value={`₹${
              userData?.data?.totalWealthPlanCollectedAmount?.toLocaleString(
                "en-IN"
              ) || "0"
            }`}
            icon={<Coins size={16} className="md:w-5 md:h-5" />}
            color="from-teal-500 to-teal-600"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md border border-teal-100 overflow-hidden">
          <div className="border-b border-teal-100">
            <nav className="flex overflow-x-auto hide-scrollbar">
              <button
                onClick={() => setActiveTab("above25k")}
                className={`py-3 px-3 md:px-6 text-xs md:text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                  activeTab === "above25k"
                    ? "border-teal-600 text-teal-600 bg-teal-50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <CreditCard size={14} className="mr-1.5" />
                  Orders Above 25K
                  {ordersAbove25k.length > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-teal-100 text-teal-700 rounded-full">
                      {ordersAbove25k.length}
                    </span>
                  )}
                </div>
              </button>
              <button
                onClick={() => setActiveTab("allOrders")}
                className={`py-3 px-3 md:px-6 text-xs md:text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                  activeTab === "allOrders"
                    ? "border-teal-600 text-teal-600 bg-teal-50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <PieChart size={14} className="mr-1.5" />
                  Active Wealth Plans
                  {allWealthOrders.length > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-teal-100 text-teal-700 rounded-full">
                      {allWealthOrders.length}
                    </span>
                  )}
                </div>
              </button>
              <button
                onClick={() => setActiveTab("completedPlans")}
                className={`py-3 px-3 md:px-6 text-xs md:text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                  activeTab === "completedPlans"
                    ? "border-teal-600 text-teal-600 bg-teal-50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <CheckCircle2 size={14} className="mr-1.5" />
                  Completed Plans
                  {completedWealthPlans.length > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-teal-100 text-teal-700 rounded-full">
                      {completedWealthPlans.length}
                    </span>
                  )}
                </div>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-3 md:p-4">
            {activeTab === "above25k" ? (
              <OrdersTable
                orders={ordersAbove25k}
                loading={loadingAbove25k}
                onActivate={handleActivateClick}
                onDeactivate={handleDeactivate}
                onViewDetails={handleViewPlanDetails}
                isProcessing={activating || deactivating}
                emptyMessage="No orders above 25,000 found"
                isMobileView={isMobileView}
              />
            ) : activeTab === "allOrders" ? (
              <OrdersTable
                orders={allWealthOrders}
                loading={loadingAllOrders}
                onActivate={handleActivateClick}
                onDeactivate={handleDeactivate}
                onViewDetails={handleViewPlanDetails}
                isProcessing={activating || deactivating}
                emptyMessage="No wealth plan orders found"
                isMobileView={isMobileView}
              />
            ) : (
              <CompletedPlansTable
                plans={completedWealthPlans}
                loading={loadingCompletedPlans}
                onViewDetails={handleViewPlanDetails}
                emptyMessage="No completed wealth plans found"
                isMobileView={isMobileView}
              />
            )}
          </div>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <TermsModal
          isOpen={showTermsModal}
          onClose={() => {
            setShowTermsModal(false);
            setPendingActivationId(null);
            setTermsAccepted(false);
            toast.info("Activation cancelled");
          }}
          onAccept={handleActivateConfirm}
          termsAccepted={termsAccepted}
          setTermsAccepted={setTermsAccepted}
          isProcessing={activating}
        />
      )}

      {/* Plan Details Modal */}
      {showPlanDetailsModal && (
        <PlanDetailsModal
          isOpen={showPlanDetailsModal}
          onClose={() => setShowPlanDetailsModal(false)}
          orderDetails={selectedOrder}
        />
      )}
    </div>
  );
};

const CompletedPlansTable = ({
  plans,
  loading,
  onViewDetails,
  emptyMessage,
  isMobileView,
}) => {
  if (loading) {
    return <Loader />;
  }

  if (!Array.isArray(plans) || plans.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-xl">
        <div className="text-gray-400 mb-3">
          <CheckCircle2 size={40} className="mx-auto text-teal-100" />
        </div>
        <p className="text-gray-500 text-sm md:text-base font-medium">
          {emptyMessage || "No completed plans found"}
        </p>
        <p className="text-gray-400 text-xs mt-1 max-w-xs mx-auto">
          Completed plans will appear here once you finish the 300-day period.
        </p>
      </div>
    );
  }

  // Mobile view - cards for completed plans
  if (isMobileView) {
    return (
      <div className="space-y-3">
        {plans.map((plan, index) => (
          <div
            key={plan._id || index}
            className="bg-white border border-teal-100 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 transform hover:translate-y-[-2px]"
          >
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-2 border-b flex justify-between items-center">
              <div className="font-medium text-white text-xs flex items-center">
                {/* <CheckCircle2 size={12} className="mr-1.5" /> */}
                {plan._id ? plan._id : "N/A"}
              </div>
              <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                <span className="flex items-center">
                  <Check size={10} className="mr-1" /> Completed
                </span>
              </span>
            </div>

            <div className="p-2.5">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 flex items-center">
                    <IndianRupee size={12} className="mr-1 text-purple-600" />
                    Investment:
                  </span>
                  <span className="font-semibold text-purple-700 text-xs">
                    {plan.amount || 0}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 flex items-center">
                    <Calendar size={12} className="mr-1 text-purple-600" />
                    Completed On:
                  </span>
                  <span className="text-gray-800 text-xs">
                    {formatDateWithAmPm(plan.guaranteedWealthPlanCompletedDate)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 flex items-center">
                    <Coins size={12} className="mr-1 text-purple-600" />
                    Total Earned:
                  </span>
                  <span className="text-gray-800 text-xs font-semibold">
                    {plan.totalAmountDisbursedForWealthPlan || 0}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 flex items-center">
                    <Gift size={12} className="mr-1 text-purple-600" />
                    Coins Collected:
                  </span>
                  <span className="text-gray-800 text-xs font-semibold">
                    {plan.totalCoinsCollectedFormUser}
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <button
                  onClick={() => onViewDetails(plan)}
                  className="w-full px-2 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-medium flex items-center justify-center text-xs shadow-sm"
                >
                  <Info size={12} className="mr-1" /> View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Desktop view - table for completed plans
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Plan ID
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Investment
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Completed On
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Total Earned
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Coins Collected
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {plans.map((plan, index) => (
            <tr
              key={plan._id || index}
              className="hover:bg-purple-50 transition-colors duration-150"
            >
              <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                {plan._id ? plan._id : "N/A"}
              </td>

              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">
                <span className="font-semibold text-purple-700">
                  {plan.amount || 0}
                </span>
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">
                {formatDateWithAmPm(plan.guaranteedWealthPlanCompletedDate)}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700 font-semibold">
                {plan.totalAmountDisbursedForWealthPlan || 0}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700 font-semibold">
                {plan.totalCoinsCollectedFormUser || 0}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-xs font-medium">
                <button
                  onClick={() => onViewDetails(plan)}
                  className="px-2 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center shadow-sm"
                >
                  <Info size={12} className="mr-1" /> View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PlanDetailsModal = ({ isOpen, onClose, orderDetails }) => {
  const [showTransactions, setShowTransactions] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (!isOpen || !orderDetails) return null;

  const completedDays = orderDetails.wealthPalnDisbursedDays || 0;
  const totalDays = 300;
  const progressPercentage = (completedDays / totalDays) * 100;
  const totalAmountDisbursed =
    orderDetails.totalAmountDisbursedForWealthPlan || 0;
  const dailyAmount = orderDetails.guaranteedAmountToBeDisburse || 0;
  const totalExpectedAmount = dailyAmount * totalDays;
  const tokensToCollect = orderDetails.guaranteedTokensToBeCollect || 0;

  const remainingDays = totalDays - completedDays;
  const projectedCompletionDate = new Date();
  projectedCompletionDate.setDate(
    projectedCompletionDate.getDate() + remainingDays
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/30 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-2 md:p-4">
        <div className="relative w-full max-w-md md:max-w-3xl bg-gradient-to-b from-white to-teal-50 rounded-xl shadow-2xl overflow-hidden transition-all duration-200 animate-fadeIn">
          {/* Header with creative design */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-teal-600 opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-500"></div>
            <div className="relative p-4 md:p-5 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Calendar className="text-white" size={22} />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-white">
                      Wealth Plan Details
                    </h2>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white hover:text-teal-200 transition-colors rounded-full bg-white/20 p-1.5"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Decorative waves */}
            <div className="absolute bottom-0 left-0 right-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 120"
                fill="white"
              >
                <path d="M0,96L80,101.3C160,107,320,117,480,112C640,107,800,85,960,80C1120,75,1280,85,1360,90.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
              </svg>
            </div>
          </div>

          {/* Toggle between Details and Transactions */}
          <div className="bg-white border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setShowTransactions(false)}
                className={`flex-1 py-2.5 px-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                  !showTransactions
                    ? "border-teal-600 text-teal-600 bg-teal-50"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center justify-center">
                  {/* <Info size={14} className="mr-1.5" /> */}
                  Plan Details
                </div>
              </button>
              <button
                onClick={() => setShowTransactions(true)}
                className={`flex-1 py-2.5 px-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                  showTransactions
                    ? "border-teal-600 text-teal-600 bg-teal-50"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center justify-center">
                  {/* <Receipt size={14} className="mr-1.5" /> */}
                  Transactions
                  {completedDays > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-teal-100 text-teal-700 rounded-full">
                      {completedDays}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto">
            {!showTransactions ? (
              // Original Plan Details Content
              <>
                {/* Investment amount card with creative design */}
                <div className="mb-5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white p-4 shadow-md transform hover:scale-[1.01] transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-teal-100 text-xs">Total Investment</p>
                      <p className="text-2xl md:text-3xl font-bold">
                        {" "}
                        ₹{(orderDetails.amount || 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between items-center text-xs">
                    <div>
                      <p className="text-teal-100 text-sm">Daily Reward</p>
                      <p className="font-semibold text-sm"> ₹{dailyAmount}</p>
                    </div>
                    <div>
                      <p className="text-teal-100 text-sm">Status</p>
                      <div>
                        <p className="font-semibold flex items-center text-sm">
                          {orderDetails.isGuaranteedWealthOpted ? (
                            <>
                              <Check size={12} className="mr-1" /> Active
                            </>
                          ) : orderDetails.isCompleted ||
                            orderDetails.wealthPlanCompleted ? (
                            <>
                              <CheckCircle2 size={12} className="mr-1" />{" "}
                              Completed
                            </>
                          ) : (
                            <>
                              <X size={12} className="mr-1" /> Inactive
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-teal-100 text-sm">Start Date</p>
                      <p className="font-semibold text-sm">
                        {orderDetails.guaranteedWealthPlanChosenDate
                          ? formatDate(
                              orderDetails.guaranteedWealthPlanChosenDate
                            )
                          : "Not started"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress and metrics section */}
                <div className="mb-5">
                  <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                    <Target size={16} className="mr-2 text-teal-600" />
                    Plan Progress
                  </h3>

                  {/* Progress circular indicator */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Left side - circular progress */}
                    <div className="relative w-32 h-32">
                      <svg className="w-32 h-32" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#e6e6e6"
                          strokeWidth="8"
                        />

                        {/* Progress circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={
                            orderDetails.isCompleted ? "#10b981" : "#0d9488"
                          }
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${
                            2 * Math.PI * 40 * (1 - progressPercentage / 100)
                          }`}
                          transform="rotate(-90 50 50)"
                        />

                        {/* Text in the center */}
                        <text
                          x="50"
                          y="45"
                          textAnchor="middle"
                          fontSize="16"
                          fontWeight="bold"
                          fill={
                            orderDetails.isCompleted ? "#10b981" : "#0d9488"
                          }
                        >
                          {Math.round(progressPercentage)}%
                        </text>

                        <text
                          x="50"
                          y="65"
                          textAnchor="middle"
                          fontSize="10"
                          fill="#666"
                        >
                          Progress
                        </text>
                      </svg>
                    </div>

                    {/* Right side - metrics */}
                    <div className="flex-1 grid grid-cols-2 gap-2 w-full">
                      <MetricCard
                        title="Days Completed"
                        value={`${completedDays} / ${totalDays}`}
                        icon={<Calendar size={16} />}
                        color="bg-blue-500"
                      />

                      <MetricCard
                        title={
                          orderDetails.isCompleted
                            ? "Completion Date"
                            : "Days Remaining"
                        }
                        value={
                          orderDetails.isCompleted
                            ? orderDetails.completedDate
                              ? new Date(
                                  orderDetails.completedDate
                                ).toLocaleDateString("en-IN")
                              : "N/A"
                            : remainingDays
                        }
                        icon={<Clock size={16} />}
                        color="bg-amber-500"
                      />

                      <MetricCard
                        title="Disbursed"
                        value={`₹${totalAmountDisbursed.toLocaleString(
                          "en-IN"
                        )}`}
                        icon={<Wallet size={16} />}
                        color="bg-emerald-500"
                      />

                      <MetricCard
                        title={
                          orderDetails.isCompleted
                            ? "Total Earned"
                            : "Remaining"
                        }
                        value={`₹${
                          orderDetails.isCompleted
                            ? totalAmountDisbursed.toLocaleString("en-IN")
                            : (
                                orderDetails.amount - totalAmountDisbursed
                              ).toLocaleString("en-IN")
                        }`}
                        color="bg-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Coins section */}

                {/* Timeline - Activity History */}
                <div className="border-t border-gray-200 pt-4 mb-3">
                  <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                    <Activity size={16} className="mr-2 text-teal-600" />
                    Activity History
                  </h3>

                  {orderDetails.guaranteedWealthPlanActivatedDates?.length >
                  0 ? (
                    <div className="border-l-2 border-teal-400 pl-4 pb-2 space-y-3 ml-2 text-xs md:text-sm">
                      {orderDetails.guaranteedWealthPlanActivatedDates?.map(
                        (date, index) => (
                          <div key={`act-${index}`} className="relative">
                            <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-teal-500 border-2 border-white"></div>
                            <div className="bg-white rounded-lg shadow-sm p-2 border border-gray-100 transform transition hover:translate-x-1">
                              <p className="text-gray-700">
                                <span className="font-medium text-teal-700 flex items-center mb-1">
                                  <Check size={14} className="mr-1" /> Plan
                                  Activated
                                </span>
                                <span className="text-gray-500 text-xs flex items-center">
                                  <Clock size={12} className="mr-1" />
                                  {date ? formatDateWithAmPm(date) : "N/A"}
                                </span>
                              </p>
                            </div>
                            {orderDetails
                              .guaranteedWealthPlanDeactivatedDates?.[
                              index
                            ] && (
                              <div className="mt-3 relative">
                                <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white"></div>
                                <div className="bg-white rounded-lg shadow-sm p-2 border border-gray-100 transform transition hover:translate-x-1">
                                  <p className="text-gray-700">
                                    <span className="font-medium text-red-700 flex items-center mb-1">
                                      <X size={14} className="mr-1" /> Plan
                                      Deactivated
                                    </span>
                                    <span className="text-gray-500 text-xs flex items-center">
                                      <Clock size={12} className="mr-1" />
                                      {orderDetails
                                        .guaranteedWealthPlanDeactivatedDates[
                                        index
                                      ]
                                        ? formatDateWithAmPm(
                                            orderDetails
                                              .guaranteedWealthPlanDeactivatedDates[
                                              index
                                            ]
                                          )
                                        : "N/A"}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      )}

                      {/* Show completion event if completed */}
                      {orderDetails.isCompleted &&
                        orderDetails.completedDate && (
                          <div className="relative">
                            <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                            <div className="bg-green-50 rounded-lg shadow-sm p-2 border border-green-100 transform transition hover:translate-x-1">
                              <p className="text-gray-700">
                                <span className="font-medium text-green-700 flex items-center mb-1">
                                  <CheckCircle2 size={14} className="mr-1" />{" "}
                                  Plan Completed
                                </span>
                                <span className="text-gray-500 text-xs flex items-center">
                                  <Clock size={12} className="mr-1" />
                                  {new Date(
                                    orderDetails.completedDate
                                  ).toLocaleString("en-IN", {
                                    timeZone: "Asia/Kolkata",
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                </span>
                              </p>
                            </div>
                          </div>
                        )}
                    </div>
                  ) : (
                    <div className="py-2 text-center text-gray-500 text-sm italic bg-gray-50 rounded-lg">
                      No activation history available
                    </div>
                  )}
                </div>

                {/* Plan ID details in a compact format */}
                <div className="bg-gray-50 rounded-lg p-3 mb-3 text-xs">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500">Plan ID:</span>
                    <span className="font-medium text-gray-700">
                      {orderDetails._id}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Created On:</span>
                    <span className="font-medium text-gray-700">
                      {orderDetails.createdAt
                        ? formatDateWithAmPm(orderDetails.createdAt)
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              // Transaction History Tab
              <TransactionHistory
                orderId={orderDetails._id}
                isMobileView={isMobileView}
              />
            )}
          </div>

          {/* Footer */}
          <div className="bg-white border-t border-gray-200 p-3">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 font-medium text-sm flex items-center shadow-sm"
              >
                Close <X size={14} className="ml-1.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-2 border border-gray-100 flex items-center">
      <div className={`₹{color} p-2 rounded-lg mr-2 text-white`}>{icon}</div>
      <div className="flex-1">
        <p className="text-xs text-gray-500">{title}</p>
        <p className="font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

const TermsModal = ({
  isOpen,
  onClose,
  onAccept,
  termsAccepted,
  setTermsAccepted,
  isProcessing,
}) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop - clientHeight < 10) {
      setHasScrolledToBottom(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/30 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-2 md:p-4">
        <div className="relative w-full max-w-sm md:max-w-lg bg-white rounded-xl shadow-xl overflow-hidden animate-scaleIn">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-teal-600 border-b border-teal-700 rounded-t-xl p-3 md:p-4 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Award className="text-white mr-2" size={20} />
                <h2 className="text-md md:text-lg font-bold text-white">
                  Investment Plan Terms & Conditions
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-teal-200 transition-colors rounded-full bg-white/20 p-1.5"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Terms Content with enhanced design */}
          <div
            className="p-4 md:p-5 max-h-[50vh] overflow-y-auto text-sm md:text-base"
            onScroll={handleScroll}
          >
            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-md font-bold text-blue-800 mb-2 flex items-center">
                  <Users className="mr-2" size={16} /> 1. Eligibility
                </h3>
                <div className="space-y-2 text-blue-700 text-sm">
                  <p className="flex items-start">
                    <Check className="mr-1 flex-shrink-0 mt-1" size={14} />
                    <span>
                      Open to all registered users who have completed KYC
                      verification.
                    </span>
                  </p>
                  <p className="flex items-start">
                    <Check className="mr-1 flex-shrink-0 mt-1" size={14} />
                    <span>
                      One active plan per user unless otherwise permitted.
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50 p-3 rounded-lg border-l-4 border-emerald-500">
                <h3 className="text-md font-bold text-emerald-800 mb-2 flex items-center">
                  2. Investment Details
                </h3>
                <div className="space-y-2 text-emerald-700 text-sm">
                  <p className="flex items-start">
                    <Check className="mr-1 flex-shrink-0 mt-1" size={14} />
                    <span>
                      Minimum investment:{" "}
                      <span className="font-bold">25,000</span>
                    </span>
                  </p>
                  <p className="flex items-start">
                    <Check className="mr-1 flex-shrink-0 mt-1" size={14} />
                    <span>Daily rewards = investment amount ÷ 300 days.</span>
                  </p>

                  <div className="bg-white p-2 rounded-lg ml-2 border border-emerald-200 text-xs">
                    <p className="font-semibold text-emerald-800">Examples:</p>
                    <ul className="mt-1 space-y-1">
                      <li className="flex items-center">
                        <ArrowRight
                          size={12}
                          className="mr-1 text-emerald-600"
                        />
                        25,000 investment → 83.33/day
                      </li>
                      <li className="flex items-center">
                        <ArrowRight
                          size={12}
                          className="mr-1 text-emerald-600"
                        />
                        50,000 investment → 166.67/day
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-500">
                <h3 className="text-md font-bold text-amber-800 mb-2 flex items-center">
                  <Calendar className="mr-2" size={16} /> 3. Daily Rewards
                </h3>
                <div className="space-y-2 text-amber-700 text-sm">
                  <p className="flex items-start">
                    <Check className="mr-1 flex-shrink-0 mt-1" size={14} />
                    <span>Rewards start from Day 1 after activation.</span>
                  </p>
                  <p className="flex items-start">
                    <Check className="mr-1 flex-shrink-0 mt-1" size={14} />
                    <span>
                      Continues for 300 days unless paused/terminated.
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-md font-bold text-purple-800 mb-2 flex items-center">
                  <Coins className="mr-2" size={16} /> 4. Coins Distribution
                </h3>
                <div className="space-y-2 text-purple-700 text-sm">
                  <p className="flex items-start">
                    <Check className="mr-1 flex-shrink-0 mt-1" size={14} />
                    <span>
                      After 300 days:{" "}
                      <span className="font-bold">50% coins</span> of plan
                      amount.
                    </span>
                  </p>
                  <p className="flex items-start">
                    <Check className="mr-1 flex-shrink-0 mt-1" size={14} />
                    <span>
                      Based on daily coin price over the 300-day period.
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border-t border-teal-100 p-4 rounded-lg">
                <p className="font-semibold text-teal-800 mb-2 flex items-center">
                  <Star className="mr-2" size={16} />
                  By activating, you acknowledge:
                </p>
                <ul className="space-y-2 text-sm text-teal-700">
                  <li className="flex items-start">
                    <Check className="mr-2 flex-shrink-0 mt-0.5" size={14} />
                    <span>
                      You have read and agreed to these Terms and Conditions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 flex-shrink-0 mt-0.5" size={14} />
                    <span>
                      You understand the reward calculation and duration
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 flex-shrink-0 mt-0.5" size={14} />
                    <span>The Company may modify the plan as necessary</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer with Actions */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 rounded-b-xl p-3">
            <div className="space-y-2">
              <label className="flex items-start gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  disabled={!hasScrolledToBottom}
                  className="mt-1 w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 disabled:opacity-50"
                />
                <span
                  className={`text-xs ${
                    !hasScrolledToBottom ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  I agree to the Terms & Conditions and understand this
                  investment carries risks.
                </span>
              </label>

              <div className="flex gap-2 justify-end">
                <button
                  onClick={onClose}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 text-xs md:text-sm font-medium flex items-center"
                  disabled={isProcessing}
                >
                  <X size={14} className="mr-1" /> Cancel
                </button>
                <button
                  onClick={onAccept}
                  disabled={!termsAccepted || isProcessing}
                  className="px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 text-xs md:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 shadow-sm"
                >
                  {isProcessing ? (
                    <>
                      <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check size={14} className="mr-1" /> Accept & Activate
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrdersTable = ({
  orders,
  loading,
  onActivate,
  onDeactivate,
  onViewDetails,
  isProcessing,
  emptyMessage,
  isMobileView,
}) => {
  if (loading) {
    return <Loader />;
  }

  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-xl">
        <div className="text-gray-400 mb-3">
          <PieChart size={40} className="mx-auto text-teal-100" />
        </div>
        <p className="text-gray-500 text-sm md:text-base font-medium">
          {emptyMessage || "No orders found"}
        </p>
        <p className="text-gray-400 text-xs mt-1 max-w-xs mx-auto">
          Orders will appear here once created. Check back later or create a new
          order.
        </p>
      </div>
    );
  }

  // Mobile view - cards with enhanced styling
  if (isMobileView) {
    return (
      <div className="space-y-3">
        {orders.map((order, index) => (
          <div
            key={order._id || index}
            className="bg-white border border-teal-100 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 transform hover:translate-y-[-2px]"
          >
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 border-b flex justify-between items-center">
              <div className="font-medium text-white text-xs flex items-center">
                <CreditCard size={12} className="mr-1.5" />
                {order._id ? order._id : "N/A"}
              </div>
              <span
                className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  order.isGuaranteedWealthOpted
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {order.isGuaranteedWealthOpted ? (
                  <span className="flex items-center">
                    <Check size={10} className="mr-1" /> Active
                  </span>
                ) : (
                  <span className="flex items-center">
                    <X size={10} className="mr-1" /> Inactive
                  </span>
                )}
              </span>
            </div>

            <div className="p-2.5">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 flex items-center">
                    ₹ Amount:
                  </span>
                  <span className="font-semibold text-teal-700 text-xs">
                    {order.amount || order.order_amount || 0}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 flex items-center">
                    <Calendar size={12} className="mr-1 text-teal-600" />
                    Date:
                  </span>
                  <span className="text-gray-800 text-xs">
                    {order.date || order.createdAt
                      ? new Date(
                          order.date || order.createdAt
                        ).toLocaleDateString("en-IN")
                      : "N/A"}
                  </span>
                </div>

                <div>
                  <div className="text-xs text-gray-600 mb-1 flex justify-between">
                    <span className="flex items-center">
                      <Activity size={12} className="mr-1 text-teal-600" />
                      Progress:
                    </span>
                    <span className="text-teal-700 font-medium">
                      {order.wealthPalnDisbursedDays || 0}/300
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2 rounded-full"
                      style={{
                        width: `${
                          ((order.wealthPalnDisbursedDays || 0) / 300) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex gap-1 text-xs">
                <button
                  onClick={() => onViewDetails(order)}
                  className="flex-1 px-2 py-1.5 bg-teal-50 text-teal-700 rounded-lg border border-teal-200 hover:bg-teal-100 transition-all duration-200 font-medium flex items-center justify-center"
                >
                  <Info size={12} className="mr-1" /> Details
                </button>

                {order.isGuaranteedWealthOpted ? (
                  <button
                    onClick={() => onDeactivate(order._id || order.id)}
                    disabled={isProcessing}
                    className="flex-1 px-2 py-1.5 bg-red-50 text-red-700 rounded-lg border border-red-200 hover:bg-red-100 transition-all duration-200 font-medium flex items-center justify-center disabled:opacity-50"
                  >
                    <X size={12} className="mr-1" /> Deactivate
                  </button>
                ) : (
                  <button
                    onClick={() => onActivate(order._id || order.id)}
                    className="flex-1 px-2 py-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 font-medium flex items-center justify-center disabled:opacity-50 shadow-sm"
                    disabled={isProcessing}
                  >
                    <Check size={12} className="mr-1" /> Activate
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Desktop view - enhanced table
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Amount
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Date
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Status
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Progress
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order, index) => (
            <tr
              key={order._id || index}
              className="hover:bg-teal-50 transition-colors duration-150"
            >
              <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                {order._id ? order._id : "N/A"}
              </td>

              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">
                <span className="font-semibold text-teal-700">
                  {order.amount || 0}
                </span>
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">
                {order.date || order.createdAt
                  ? new Date(order.date || order.createdAt).toLocaleDateString(
                      "en-IN"
                    )
                  : "N/A"}
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.isGuaranteedWealthOpted
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.isGuaranteedWealthOpted ? (
                    <span className="flex items-center">
                      <Check size={10} className="mr-1" /> Active
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <X size={10} className="mr-1" /> Inactive
                    </span>
                  )}
                </span>
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2 rounded-full"
                      style={{
                        width: `${
                          ((order.wealthPalnDisbursedDays || 0) / 300) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span>{order.wealthPalnDisbursedDays || 0}/300</span>
                </div>
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-xs font-medium">
                <div className="flex gap-1">
                  <button
                    onClick={() => onViewDetails(order)}
                    className="px-2 py-1.5 bg-teal-50 text-teal-700 rounded-lg border border-teal-200 hover:bg-teal-100 transition-all duration-200 flex items-center shadow-sm"
                  >
                    <Info size={12} className="mr-1" /> Details
                  </button>

                  {order.isGuaranteedWealthOpted ? (
                    <button
                      onClick={() => onDeactivate(order._id || order.id)}
                      disabled={isProcessing}
                      className="px-2 py-1.5 bg-red-50 text-red-700 rounded-lg border border-red-200 hover:bg-red-100 transition-all duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      <X size={12} className="mr-1" /> Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => onActivate(order._id || order.id)}
                      disabled={isProcessing}
                      className="px-2 py-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      <Check size={12} className="mr-1" /> Activate
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-xs font-medium">{title}</p>
          <p className="text-sm md:text-lg font-bold text-gray-900 mt-1 line-clamp-1">
            {value}
          </p>
        </div>
        <div
          className={`p-1.5 md:p-2.5 rounded-lg bg-gradient-to-br ${color} text-white shadow-sm`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};
const TransactionHistory = ({ orderId, isMobileView }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(3);

  const {
    data: transactionsResponse,
    isLoading: loadingTransactions,
    isFetching,
    refetch,
  } = useGetWealthOrderTransactionsQuery(
    { orderId, page: currentPage, limit },
    { skip: !orderId }
  );

  // Updated to match your API response structure
  const transactions = transactionsResponse?.data?.data || [];
  const totalPages = transactionsResponse?.data?.totalPages || 1;
  const totalTransactions = transactionsResponse?.data?.totalCount || 0;

  // Get amount from first transaction (if available)
  const firstTransactionAmount =
    transactions.length > 0 ? transactions[0].amountDisbursed : 0;

  // Calculate total count * first transaction amount
  const totalCountTimesAmount = totalTransactions * firstTransactionAmount;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Extract day number from reason text
  const extractDayNumber = (reason) => {
    const match = reason?.match(/day (\d+)/i);
    return match ? match[1] : "N/A";
  };

  if (loadingTransactions) {
    return <Loader />;
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-6 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-sm">No transactions found</p>
        <p className="text-gray-400 text-xs mt-1">
          Transactions will appear here once daily rewards are disbursed
        </p>
      </div>
    );
  }

  // Mobile view - transaction cards
  if (isMobileView) {
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center">
            <Receipt size={14} className="mr-1.5 text-teal-600" />
            Transaction History
          </h4>
        </div>

        {transactions.map((transaction, index) => (
          <div
            key={transaction._id || index}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-all duration-200"
          >
            {/* Transaction header with gradient */}
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-2 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar size={12} className="mr-1.5" />
                  <span className="text-xs font-medium">
                    Day {extractDayNumber(transaction.reason)}
                  </span>
                </div>
                <span className="text-xs">
                  {new Date(transaction.createdOn).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="p-3">
              {/* Amount Disbursed */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="p-1.5 rounded-full bg-green-100 mr-2">
                    <ArrowDownRight size={14} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Amount Disbursed</p>
                    <p className="text-sm font-semibold text-green-600">
                      +₹
                      {transaction.amountDisbursed?.toLocaleString("en-IN") ||
                        0}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">Coins Collected</p>
                  <p className="text-sm font-semibold text-amber-600 flex items-center justify-end">
                    <Coins size={12} className="mr-1" />
                    {transaction.tokensCollected?.toLocaleString("en-IN") || 0}
                  </p>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="bg-gray-50 rounded-lg p-2 mt-2">
                <p className="text-xs text-gray-600 mb-1">
                  Transaction Details:
                </p>
                <p className="text-xs text-gray-700 font-medium line-clamp-2">
                  {transaction.reason}
                </p>
              </div>

              {/* Transaction ID and Name */}
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                <div className="text-xs">
                  <span className="text-gray-500">TxID: </span>
                  <span className="font-mono text-gray-700">
                    {transaction.transactionId}
                  </span>
                </div>
                <div className="text-xs">
                  <span className="text-gray-500">Name: </span>
                  <span className="font-medium text-gray-700">
                    {transaction.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Mobile Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center pt-4 mt-4 border-t border-teal-100">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isFetching}
              className="px-4 py-2 text-sm font-medium bg-teal-600 rounded-md shadow-sm text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 transition-all flex items-center"
            >
              <ChevronLeft size={16} className="mr-1.5" /> Previous
            </button>

            <span className="text-sm text-teal-700 font-medium px-3 py-1.5 bg-white border border-teal-200 rounded-md">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isFetching}
              className="px-4 py-2 text-sm font-medium bg-teal-600 rounded-md shadow-sm text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 transition-all flex items-center"
            >
              Next <ChevronRight size={16} className="ml-1.5" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Desktop view - transaction table
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-semibold text-gray-700 flex items-center">
          <IndianRupee size={16} className="mr-2 text-teal-600" />
          Transaction History
        </h4>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 text-xs bg-teal-50 text-teal-700 rounded-md border border-teal-100 flex items-center">
            <IndianRupee size={14} className="mr-1.5" /> Transactions:{" "}
            {totalTransactions}
          </span>
          <span className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-md border border-blue-100 flex items-center">
            {/* <Calculator size={14} className="mr-1.5" /> Total Amount: ₹{totalCountTimesAmount.toLocaleString("en-IN")} */}
          </span>
          <button
            onClick={refetch}
            className="text-xs bg-teal-50 text-teal-700 px-3 py-1.5 rounded-md border border-teal-100 hover:bg-teal-100 transition-colors flex items-center"
          >
            <Activity size={14} className="mr-1.5" /> Refresh
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Day
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Transaction ID
              </th>

              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider">
                Amount Disbursed
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider">
                Coins Collected
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <tr
                key={transaction._id || index}
                className="hover:bg-teal-50 transition-colors"
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                    Day {extractDayNumber(transaction.reason)}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm ">
                  <div>
                    <p className="text-xs">
                      {formatDateWithAmPm(transaction.createdOn).split(" ")[0]}{" "}
                      {/* Date */}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {formatDateWithAmPm(transaction.createdOn)
                        .split(" ")
                        .slice(1)
                        .join(" ")}{" "}
                      {/* Time */}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className=" text-xs text-gray-700">
                      {transaction.transactionId}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end">
                    <ArrowDownRight size={12} className="mr-1 text-green-500" />
                    <span className="text-sm font-semibold text-green-600">
                      +₹
                      {transaction.amountDisbursed?.toLocaleString("en-IN") ||
                        0}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end">
                    <Coins size={12} className="mr-1 text-amber-500" />
                    <span className="text-sm font-semibold text-amber-600">
                      {transaction.tokensCollected?.toLocaleString("en-IN") ||
                        0}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Desktop Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-xs text-gray-600">
            Showing {(currentPage - 1) * limit + 1} to{" "}
            {Math.min(currentPage * limit, totalTransactions)} of{" "}
            {totalTransactions} transactions
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isFetching}
              className="px-3 py-1.5 text-xs bg-teal-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors flex items-center"
            >
              <ChevronLeft size={14} className="mr-1" /> Previous
            </button>

            <div className="flex space-x-1">
              {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = idx + 1;
                } else if (currentPage <= 3) {
                  pageNum = idx + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + idx;
                } else {
                  pageNum = currentPage - 2 + idx;
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(pageNum)}
                    disabled={isFetching}
                    className={`px-2.5 py-1 text-xs rounded-lg transition-colors ${
                      currentPage === pageNum
                        ? "bg-teal-600 text-white"
                        : "bg-white border border-teal-200 text-teal-700 hover:bg-teal-50"
                    } disabled:cursor-not-allowed`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isFetching}
              className="px-3 py-1.5 text-xs bg-teal-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors flex items-center"
            >
              Next <ChevronRight size={14} className="ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
const style = document.createElement("style");
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes scaleIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  .animate-scaleIn {
    animation: scaleIn 0.2s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default GuaranteedWealthDashboard;
