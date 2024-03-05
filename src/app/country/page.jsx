"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Layout from "../Components/Layout";
import Link from "next/link";
import MyContext from "../context/appContext";
import { useContext } from "react";

const Country = ({ searchParams }) => {
  let darkTheme = true;
  let theme = darkTheme ? "bg-[#333E48] text-[#fafafa]" : "bg-white";

  const [arr, setArr] = useState([]);
  const [name, setName] = useState("");

  getContry(searchParams.name);

  async function getContry(name) {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const data = await res.json();
    showContryDetails(data);
  }

  function showContryDetails(CountryDetails) {
    setArr(
      CountryDetails.map((i) => {
        return (
          <>
            <Link
              href={{
                pathname: "/",

              }}
            >
              <button
                className={`${
                  darkTheme ? "bg-white text-[#333e48]" : ""
                } p-2 rounded-md m-5 my-10 pr-4`}
              >
                <FontAwesomeIcon className="pr-3 pl-2" icon={faArrowLeft} />
                Back{" "}
              </button>
            </Link>
            <div className={`p-5 ${theme}`} key={i.name.official}>
              <div className="lg:flex lg:h-screen lg:w-[100%]">
                <div className="flex flex-col">
                  <img className="lg:w-[90%]" src={i.flags.svg} />
                  <h1 className="font-bold text-2xl mt-8">{i.name.official}</h1>
                </div>
              <div className="lg:flex lg:justify-between lg:w-[100%]">
                <div className="my-5 mt-10">
                  <h6 className="font-semibold mt-2">
                    Native Name:
                    <span className="font-light">
                      {" "}
                      {
                        i.name.nativeName[Object.keys(i.name.nativeName)[0]]
                          .common
                      }
                    </span>
                  </h6>
                  <h6 className="font-semibold mt-2">
                    Population:
                    <span className="font-light"> {i.population}</span>
                  </h6>
                  <h6 className="font-semibold mt-2">
                    Region:
                    <span className="font-light"> {i.region}</span>
                  </h6>
                  <h6 className="font-semibold mt-2">
                    Sub Region:
                    <span className="font-light"> {i.subregion}</span>
                  </h6>
                  <h6 className="font-semibold mt-2">
                    Capital:
                    <span className="font-light"> {i.capital}</span>
                  </h6>
                </div>
                <div className="mt-10">
                  <h6 className="font-semibold mt-2">
                    Top Level Domain:
                    <span className="font-light"> {i.tld[0]}</span>
                  </h6>
                  <h6 className="font-semibold mt-2">
                    Currencies:
                    <span className="font-light">
                      {" "}
                      {i.currencies[Object.keys(i.currencies)[0]].name}
                    </span>
                  </h6>
                  <h6 className="font-semibold mt-2">
                    Languages:
                    <span className="font-light">
                      {" "}
                      {i.languages[Object.keys(i.languages)[0]]}{" "}
                      {i.languages[Object.keys(i.languages)[1]]}{" "}
                      {i.languages[Object.keys(i.languages)[3]]}
                    </span>
                  </h6>
                </div>
                <div className="my-10">
                  <h3 className="font-bold">
                    {i.borders ? <span> Border Countries:</span> : null}
                  </h3>
                  <div className="flex flex-wrap">
                    {i.borders?.map((c) => {
                      return (
                        <Link
                          key={c}
                          href={{
                            pathname: "/country",
                            query: {
                              name: c,
                            },
                          }}
                        >
                          <p
                            className={`${theme} font-light p-3 px-5  mt-2 mr-2 rounded-md`}
                          >
                            {" "}
                            {c}
                          </p>
                        </Link>
                        
                      );
                    })}
                  </div>
                </div>
              </div>
              </div>
            </div>
          </>
        );
      })
    );
  }

  return (
    <Layout className={`${theme}`}>
      <div className={`${theme}`}>{arr}</div>
    </Layout>
  );
};

export default Country;
