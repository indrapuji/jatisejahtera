import React, { useEffect } from "react";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

export default () => {
  const history = useHistory();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  function handdleAbout() {
    history.push("/profile/about");
  }
  function handdleCabang() {
    history.push("/profile/cabang");
  }
  function handdleSejarah() {
    history.push("/profile/sejarah");
  }
  return (
    <>
      <div data-aos="fade-up">
        <Image
          src={require("../assets/landingpage/profile.jpg")}
          className="profile"
        />
        <div data-aos="fade-up" className="profileCard">
          <Image
            src={require("../assets/landingpage/profile_1.jpg")}
            onClick={handdleAbout}
            style={{ height: 120 }}
          />
          <Image
            src={require("../assets/landingpage/profile_2.jpg")}
            onClick={handdleAbout}
            style={{ height: 120 }}
          />
          <Image
            src={require("../assets/landingpage/profile_3.jpg")}
            onClick={handdleCabang}
            style={{ height: 120 }}
          />
          <Image
            src={require("../assets/landingpage/profile_4.jpg")}
            onClick={handdleSejarah}
            style={{ height: 120 }}
          />
        </div>
      </div>
    </>
  );
};
