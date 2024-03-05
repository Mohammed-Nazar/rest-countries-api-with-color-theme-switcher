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
  const [Load, setLoad] = useState(false)
  useEffect(()=>{
    getCountries();
    
  }, []);
  useEffect(() => {
    showCountries(arrOfData);
  }, [arrOfData]);
  async function getCountries() {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    setArrOfData(data);
    setLoad(true)

  }



  function showCountries(arr) {
    setArr(
      arr.map((i) => {
        return (
          <Link
            key={i.name.common}
            href={{
              pathname: `/country`,
              query: {
                name: i.name.common,
                darkTheme: darkTheme,
              },
            }}
          >
            <div
            
              className={`${theme} rounded-md shadow-sm hover:cursor-pointer lg:h-[28rem]`}
              key={i.name.common}
            >
              <img className="lg:object-contain lg:h-[200px] " src={i.flags.svg} />
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
    Load? 
    <div className={`${darkTheme ? "bg-[#333E48]": "bg-[#fafafa]"} flex flex-col justify-center items-center`}>
    <div className="flex flex-col lg:flex-row lg:justify-between lg:w-[100%] lg:px-10">
      <div className="bg-[#2b3945] px-6 flex mx-10 ml-0 my-10 mb-6 w-[90%] rounded-lg lg:w-[20%]">
        <FontAwesomeIcon className="w-4 mt-5 text-gray-300" icon={faSearch} />
        <input
        
        onChange={(i)=>seacrhCountry(i, arrOfData)}
          className="px-3 p rounded-md outline-none text-s py-4 bg-[#2b3945]"
          type="text"
        />
    </div>
    <div className='filter bg-white rounded-lg self-start font-extralight mx-4 ml-0 p-2 lg:self-center'>
        <select onChange={(i)=>filterFunc(i, arrOfData)} className="pr-5 text-lg rounded-xl outline-none">
        <option value='all'>Filter by region</option>
            <option value='africa'>Africa</option>
            <option value='americas'>Americas</option>
            <option value='asia'>Asia</option>
            <option value='europe'>Europe</option>
            <option value='oceania'>Oceania</option>
        </select>
    </div>
    </div>
      <div className="grid grid-cols-1 gap-12 m-5 my-10 lg:grid-cols-4">{arr}</div>
    </div>
  : <Loading/>
  );
};

export default MainC;
