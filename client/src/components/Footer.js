import React from "react";
import "../App.css";

export default () => {
  return (
    <div className="bottom section-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <p style={{ color: "white" }}>
              WISMA PERHUTANI, JL. VILLA No. 1 GATOT SUBROTO Kav. 17-18 JAKARTA SELATAN 12930 Telp / Fax : 021-5252983{" "}
              <br />
              <a href="https://wa.me/6282211115076" target="_blank" rel="noopener noreferrer">
                <span style={{ color: "white" }}>WhatsApp : 0822 1111 5076</span>
              </a>
              <br />
              E-mail : yayasanjatisejahtera@yahoo.co.id , admin@jatisejahtera.or.id
            </p>
            <div className="copyright">
              <p>
                © <span>2023</span>{" "}
                <a href="/data/cms" className="transition">
                  Jati Sejahtera
                </a>{" "}
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
