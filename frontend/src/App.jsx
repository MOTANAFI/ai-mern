import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = () => {
  return <h1>Home pages</h1>;
};
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
