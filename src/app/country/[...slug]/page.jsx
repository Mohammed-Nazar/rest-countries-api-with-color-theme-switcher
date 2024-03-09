"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MyContext } from "../../context/appContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Loading from "@/app/Components/Loading";

const Country = ({ searchParams }) => {
  let { darkTheme, changeTheme } = useContext(MyContext);
  let theme = darkTheme ? "bg-[#202c37] text-[#fafafa]" : "bg-white";

  const [Load, setLoad] = useState(true);

  const router = useRouter();
  const path = usePathname()
    .slice(usePathname().lastIndexOf("/"), usePathname().length)
    .replace("/", "");

  useEffect(() => {
    getContry(path);
    
  }, []);

  async function getContry(name) {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const data = await res.json();
    showContryDetails(data);
    setLoad(false);
  }

  const [arr, setArr] = useState([]);

  function goBack() {
    router.back();
  }

  function showContryDetails(CountryDetails) {
    setArr(
      CountryDetails.map((i) => {
        return (
          <div className="my-20 md:my-20 md:flex pb-20">
            <img className="md:w-[50%] h-72 object-fill" src={i.flags.svg} />
            <div className="md:grid md:grid-cols-1 lg:grid-cols-2 gap-x-20 ">
              <div className="my-5 mt-10 md:m-0 md:ml-10">
                <h1 className="font-bold text-xl my-5">{i.name.official}</h1>
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
                  <span className="font-light"> {i.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
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
              <div className="mt-10 md:ml-10">
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
              <div className="mt-10 md:ml-10">
                <h3 className="font-bold">
                  {i.borders ? <span> Border Countries:</span> : null}
                </h3>
                <div className="flex flex-wrap mt-2 w-[200px]">
                  {i.borders?.map((c) => {
                    return (
                      <Link
                        key={c}
                        href={{
                          pathname: `/country/${c}`,
                        }}
                      >
                        <p
                          className={`${
                            darkTheme ? "bg-[#2b3945]" : "bg-white text-red"
                          } font-light p-1 px-6  mt-2 mr-2 rounded-md`}
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
        );
      })
    );
  }

  return (
    Load ? <Loading/>:
    <div
      className={`${
        darkTheme ? "bg-[#202c37] text-[#fafafa]" : "bg-[#fafafa]"
      } md:px-16 px-10 py-10`}
    >
      {arr[0] && (
        <button
          onClick={goBack}
          className={`${
            darkTheme ? "bg-[#2b3945]" : " bg-white"
          } p-2 rounded-md shadow-xl drop-shadow-sm px-4`}
        >
          <FontAwesomeIcon className="pr-2" icon={faArrowLeft} /> Back
        </button>
      )}
      {arr}
    </div>
  );
};

export default Country;
