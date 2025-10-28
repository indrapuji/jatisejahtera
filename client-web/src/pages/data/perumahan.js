import React, { useEffect, useState } from "react";
import Navigation from "@components/Navigation";
import Footer from "@components/Footer";
import Image from "next/image";
import Layout from "@components/Layout";
import axios from "axios";

export default () => {
  const [dataPerumahan, setDataPerumahan] = useState();

  useEffect(() => {
    getDataPerumahan();
  }, []);

  const getDataPerumahan = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${process.env.API_URL}/content?category=perumahan&status=true`,
      });
      console.log(data);
      setDataPerumahan(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout pageTitle={"REALISASI PERUMAHAN || JATISEJAHTERA"}>
      <Navigation />
      <div className="flex flex-col justify-between">
        <section className="bg-white dark:bg-gray-900">
          <div className="container flex flex-col items-center px-4 py-12 mx-auto text-center">
            <h2 className="max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white">
              Realisasi Perumahan
            </h2>
            {dataPerumahan &&
              dataPerumahan.map((item) => (
                <div key={item.id} className="max-w-4xl my-6">
                  <Image
                    src={item.image_url}
                    width={1000}
                    height={700}
                    alt="pop up"
                  />
                  <p className="font-bold px-2 py-8">{item.title}</p>
                </div>
              ))}
          </div>
        </section>

        <Footer />
      </div>
    </Layout>
  );
};
