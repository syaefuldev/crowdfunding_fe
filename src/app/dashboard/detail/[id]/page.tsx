import {
  DUProjectImg,
  DUProjectImg1,
  DUProjectImg2,
  DUProjectImg3,
  DUProjectImg4,
} from "@/assets";
import {
  DetailProjectDashboard,
  GetStarted,
  ImageCard,
  Navbar,
} from "@/components";
import { formatAmount, getCampaignByID } from "@/services";
import Link from "next/link";
import React from "react";

type DetailsProjectDashboardPage = { params: { id: string } };
const DetailProjectDashboardPage = async (
  props: DetailsProjectDashboardPage
) => {
  try {
    const { id } = props.params;
    const res = await getCampaignByID(parseInt(id));
    const data = res.data;

    let amount = data.goal_amount;
    const amountIDR = formatAmount(amount);
    amount = amountIDR;

    return (
      <section className="antialiased">
        <div>
          <section className="bg-blue-700 pb-10 h-[150px] relative bottom-[100px]" />
          <section className="container mx-auto pt-8 px-10">
            <div className="flex justify-between items-center">
              <div className="w-full mr-6">
                <h2 className="text-4xl text-gray-900 mb-2 font-medium">
                  Dashboard
                </h2>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-3/4 mr-6">
                <h3 className="text-2xl text-gray-900 mb-4">
                  Campaign Details
                </h3>
              </div>
              <div className="w-1/4 text-right">
                <Link
                  href="/dashboard/projects/create"
                  className="bg-green-button hover:bg-green-button text-white font-bold px-4 py-1 rounded inline-flex items-center"
                >
                  Edit
                </Link>
              </div>
            </div>
            <DetailProjectDashboard
              description={data.description}
              amount={amount}
              title={data.name}
              perks={data.perks}
            />
            <div className="flex justify-between items-center">
              <div className="w-3/4 mr-6">
                <h3 className="text-2xl text-gray-900 mb-4 mt-5">Gallery</h3>
              </div>
              <div className="w-1/4 text-right">
                <a
                  href="#"
                  className="bg-green-button hover:bg-green-button text-white font-bold px-4 py-1 rounded inline-flex items-center"
                >
                  Upload
                </a>
              </div>
            </div>
            <div className="flex -mx-2">
              <ImageCard image={DUProjectImg} />
              <ImageCard image={DUProjectImg1} />
              <ImageCard image={DUProjectImg2} />
              <ImageCard image={DUProjectImg3} />
              <ImageCard image={DUProjectImg4} />
            </div>
            <div className="flex justify-between items-center">
              <div className="w-3/4 mr-6">
                <h3 className="text-2xl text-gray-900 mb-4 mt-5">
                  Transaction History
                </h3>
              </div>
            </div>
            <div className="block mb-2">
              <div className="w-full lg:max-w-full lg:flex mb-4">
                <div className="w-full border border-gray-400 lg:border-gray-400 bg-white rounded p-8 flex flex-col justify-between leading-normal">
                  <div>
                    <div className="text-gray-900 font-bold text-xl mb-1">
                      Galih Pratama
                    </div>
                    <p className="text-sm text-gray-600 flex items-center mb-2">
                      Rp. 200.000 &middot; 12 September 2020
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="cta-clip -mt-20"></div>
          <GetStarted />
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching campaign details:", error);
    // Tambahkan penanganan error di sini, misalnya tampilkan pesan kesalahan kepada pengguna.
    return <div>Error fetching campaign details. Please try again later.</div>;
  }
};

export default DetailProjectDashboardPage;
