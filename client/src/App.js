import React from "react";
import {
  Berita,
  Contact,
  Galery,
  Home,
  About,
  Kepengurusan,
  Cabang,
  Sejarah,
  Pendidikan,
  Sosial,
  Perumahan,
  Kesehatan,
  Update,
  Upload,
  // Realisasi,
  Profile,
  Claim,
  FormLogin,
  New,
  UpdateProfile,
  RegisterNew,
} from "./pages";
import {
  ClaimKematian,
  ClaimKesehatan,
  ClaimManfaat,
  ClaimPendidikan,
} from "./pages/claimPage";
import {
  RealisasiKesehatan,
  RealisasiPendidikan,
  RealisasiPerumahan,
  RealisasiSosial,
} from "./pages";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./pages/ScrollToTop";

function App() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/profile/about">
            <About />
          </Route>
          <Route exact path="/profile/kepengurusan">
            <Kepengurusan />
          </Route>
          <Route exact path="/profile/cabang">
            <Cabang />
          </Route>
          <Route exact path="/profile/sejarah">
            <Sejarah />
          </Route>
          <Route exact path="/program/pendidikan">
            <Pendidikan />
          </Route>
          <Route exact path="/program/sosial">
            <Sosial />
          </Route>
          <Route exact path="/program/perumahan">
            <Perumahan />
          </Route>
          <Route exact path="/program/kesehatan">
            <Kesehatan />
          </Route>
          <Route exact path="/data/update">
            <Update />
          </Route>
          <Route exact path="/pembaharuan">
            <New />
          </Route>
          <Route exact path="/daftar-baru">
            <RegisterNew />
          </Route>
          <Route exact path="/data/realisasipendidikan">
            <RealisasiPendidikan />
          </Route>
          <Route exact path="/data/realisasiperumahan">
            <RealisasiPerumahan />
          </Route>
          <Route exact path="/data/realisasikesehatan">
            <RealisasiKesehatan />
          </Route>
          <Route exact path="/data/upload">
            <Upload />
          </Route>
          <Route exact path="/data/realisasisosial">
            <RealisasiSosial />
          </Route>
          <Route exact path="/data/claim">
            <Claim />
          </Route>
          <Route exact path="/claim/kematian">
            <ClaimKematian />
          </Route>
          <Route exact path="/claim/Kesehatan">
            <ClaimKesehatan />
          </Route>
          <Route exact path="/claim/manfaat">
            <ClaimManfaat />
          </Route>
          <Route exact path="/claim/kacamata">
            <ClaimPendidikan />
          </Route>
          <Route path="/berita">
            <Berita />
          </Route>
          <Route path="/galery">
            <Galery />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route exact path="/profile/update">
            <UpdateProfile />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/login">
            <FormLogin />
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  );
}

export default App;
