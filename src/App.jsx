import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import InnerLayout from "./components/InnerLayout"; // Ensure correct capitalization
import Home from "./pages/Home";
import Funding from "./pages/funding/Funding";
import Mentor from "./pages/mentors/Mentor";
import Workshop from "./pages/workshop/Workshop";
import Article from "./pages/article/Article";
import FundingDetails from "./pages/funding/FundingDetails";
import ConfirmDelete from "./pages/funding/ConfirmDelete";
import AddFunding from "./pages/funding/AddFunding";
import AddMentor from "./pages/mentors/AddMentor";
import MentorDetails from "./pages/mentors/MentorDetails";
import AddWorkshop from "./pages/workshop/AddWorkshop";
import WorkshopDetails from "./pages/workshop/WorkshopDetails";
import ConfrimMentorDelete from "./pages/mentors/ConfrimMentorDelete";
import ConfirmWorkshop from "./pages/workshop/ConfirmWorkshop";
import AddArticle from "./pages/article/AddArticle";
import ArticleDetails from "./pages/article/ArticleDetails";
import ConfirmArticle from "./pages/article/ConfirmArticle";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Main layout */}
          <Route path="/" element={<Layout />}>
            {/* Home page */}
            <Route index element={<Home />} />

            {/* Nested layout for opportunities */}
            <Route path="opportunities" element={<InnerLayout />}>
              <Route path="fundings" element={<Funding />} />
              <Route path="fundings/add" element={<AddFunding />} />
              <Route path="fundings/:id" element={<FundingDetails />} />
              <Route path="fundings/delete/:id" element={<ConfirmDelete />} />

              <Route path="mentors" element={<Mentor />} />
              <Route path="mentors/add" element={<AddMentor />} />
              <Route path="mentors/:id" element={<MentorDetails />} />
              <Route
                path="mentors/delete/:id"
                element={<ConfrimMentorDelete />}
              />

              <Route path="workshops" element={<Workshop />} />
              <Route path="workshops/add" element={<AddWorkshop />} />
              <Route path="workshops/:id" element={<WorkshopDetails />} />
              <Route
                path="workshops/delete/:id"
                element={<ConfirmWorkshop />}
              />

              <Route path="articles" element={<Article />} />
              <Route path="articles/add" element={<AddArticle />} />
              <Route path="articles/:id" element={<ArticleDetails />} />
              <Route path="articles/delete/:id" element={<ConfirmArticle />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
