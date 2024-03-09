'use client'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Loading from "./Loading";
import  {MyContext}  from "../context/appContext";
import { useContext } from "react";

const MainC = () => {
  const {darkTheme, changeTheme} = useContext(MyContext)
 
  let theme = darkTheme? "bg-[#2b3945] text-white" : "bg-white";

  const [arr, setArr] = useState([]);
  const [arrOfData, setArrOfData] = useState([])


  const [Load, setLoad] = useState(true)


  useEffect(()=>{
    getCountries();
    
  }, []);
  
  useEffect(() => {
    showCountries(arrOfData);
  }, [arrOfData,darkTheme]);
  
  async function getCountries() {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    setArrOfData(data);
    setLoad(false)

  }



  function showCountries(arr) {
    setArr(
      arr.map((i) => {
        return (
          <Link
            key={i.name.common}
            href={{
              pathname: `/country/${i.name.common}`,
            }}
          >
            <div
            
              className={`${theme} rounded-md shadow-sm hover:cursor-pointer h-full `}
              key={i.name.common}
            >
              <img className="md:w-full md:h-48 md:object-cover " src={i.flags.svg} />
              <div className="px-5 py-5 pb-12">
                <h1 className="font-bold  text-3xl my-4">{i.name.common}</h1>
                <h4 className="font-semibold">
                  Population:{" "}
                  <span className="font-extralight">{i.population}</span>
                </h4>
                <h4 className="font-semibold">
                  Region: <span className="font-extralight">{i.region}</span>
                </h4>
                <h4 className="font-semibold">
                  Capital: <span className="font-extralight">{i.capital}</span>
                </h4>
              </div>
            </div>
          </Link>
        );
      })
    );
  }



  function seacrhCountry(i,arrOfData) {
    const arr = arrOfData.filter((a)=> a.name.common.toLowerCase().indexOf(i.target.value.toLowerCase()) !== -1)
   return showCountries(arr);
  }

  function filterFunc(i, arrOfData) {
    if (i.target.value === "all") {
      return showCountries(arrOfData);
    }else{
    const arr = arrOfData.filter((a)=> a.region.toLowerCase().indexOf(i.target.value.toLowerCase()) !== -1);
    return showCountries(arr)
    }
  }


  return (
    Load? <Loading/>:
    <div className={`${darkTheme ? "bg-[#202c37] text-[#fafafa]": "bg-[#fafafa]"} flex flex-col justify-center items-center h-full`}>
    <div className="flex flex-col md:flex-row md:justify-between md:w-[100%] md:px-14">
      <div className={`${theme} px-6 flex mx-10 ml-0 my-10 mb-6 w-[90%] rounded-md md:w-[20%]`}>
        <FontAwesomeIcon className="w-4 mt-5 text-gray-300" icon={faSearch} />
        <input
        placeholder="Country Name"
        onChange={(i)=>seacrhCountry(i, arrOfData)}
          className={`${theme} px-3 p rounded-md outline-none text-s py-4`}
          type="text"
        />
    </div>
    <div className={`${theme} filter rounded-md self-start font-extralight mx-4 ml-0 p-4 md:self-center mt-4`}>
        <select onChange={(i)=>filterFunc(i, arrOfData)} className={`${theme} pr-5 text-md rounded-xl outline-none`}>
        <option value='all'>Filter by region</option>
            <option value='africa'>Africa</option>
            <option value='americas'>Americas</option>
            <option value='asia'>Asia</option>
            <option value='europe'>Europe</option>
            <option value='oceania'>Oceania</option>
        </select>
    </div>
    </div>
      <div className="grid grid-cols-1 gap-12 m-5 my-10 md:grid-cols-4 p-10 h-full">{arr}</div>
    </div>
  
  );
};

export default MainC;
