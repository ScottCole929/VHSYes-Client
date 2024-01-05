import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorized } from "./components/Authorized";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AllTapes } from "./components/AllTapes";
import { TapeReviews } from "./components/TapeReviews";
import { MyRentals } from "./components/MyRentals";
import { Confirmation } from "./components/Confirmation"
import { LeaveReview } from "./components/LeaveReview";
import { MyReviews } from "./components/MyReviews";
import { EditUserReview } from "./components/EditReview";
import { MyProfile } from "./components/MyProfile";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<AllTapes />} />
          <Route path="/review/:tapeId" element={<TapeReviews />} />
          <Route path="/myrentals" element={<MyRentals />} />
          <Route path="/reviewform/:tapeId" element={<LeaveReview />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/myreviews" element={<MyReviews />} />
          <Route path="/edit-review/:reviewId" element={<EditUserReview />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

