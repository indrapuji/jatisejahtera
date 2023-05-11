import React from "react";
import { Route } from "react-router";

export default (
  <Route>
    <Route path="/" />
    <Route exact path="/profile/about" />
    <Route exact path="/profile/kepengurusan" />
    <Route exact path="/profile/cabang" />
    <Route exact path="/profile/sejarah" />
    <Route exact path="/program/pendidikan" />
    <Route exact path="/program/sosial" />
    <Route exact path="/program/perumahan" />
    <Route exact path="/program/kesehatan" />
    <Route path="/galery" />
  </Route>
);
