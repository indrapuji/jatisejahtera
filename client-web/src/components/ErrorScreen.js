import React from "react";

function ErrorScreen() {
  return (
    // <section
    //   className="min-h-screen bg-cover "
    //   style={{
    //     backgroundImage: `url('https://atlassianblog.wpengine.com/wp-content/uploads/2017/12/screen-shot-2017-11-16-at-3.50.20-pm-1.png`,
    //   }}

    // ></section>
    <div className="h-screen w-screen bg-[#e5e5e5] flex">
      <div class="m-auto">
        <p class="text-9xl text-center">404 Error</p>
        <p class="text-3xl text-center">This page doesn't exist.</p>
        <p class="text-3xl text-center">
          Would you like to{" "}
          <span class="text-3xl text-[#dc2626] text-center">
            learn bout HTTP errors?
          </span>
        </p>
      </div>
    </div>
  );
}

export default ErrorScreen;
